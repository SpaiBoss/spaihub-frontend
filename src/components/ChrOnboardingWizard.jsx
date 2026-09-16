import { useEffect, useState, useCallback } from 'react';
import { Check, Copy, ChevronLeft, ChevronRight, Cloud, Loader, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
import { Trans, useTranslation } from 'react-i18next';
import api from '../services/api';
import { Button, Input, Modal } from './ui';

export const DEFAULT_CHR_CONFIG = {
  wanInterface: 'ether1',
  lanInterface: 'ether2',
  bridgeName: 'bridge-spaihub',
  hotspotName: 'hotspot1',
  localNetwork: '192.168.88.0/24',
  gatewayIp: '192.168.88.1',
  dhcpPool: '192.168.88.10-192.168.88.254',
};

const STEP_IDS = ['prerequisites', 'network', 'bootstrap', 'hotspot', 'connect', 'verify', 'done'];
const STEP_TITLE_KEYS = {
  prerequisites: 'chr.stepPrereq',
  network: 'chr.stepNetwork',
  bootstrap: 'chr.stepBootstrap',
  hotspot: 'chr.stepHotspot',
  connect: 'chr.stepConnect',
  verify: 'chr.stepVerify',
  done: 'chr.stepDone',
};

function ScriptBlock({ script, onCopy, copied, loadingLabel }) {
  if (!script) {
    return <p className="text-sm text-navy/50">{loadingLabel}</p>;
  }
  return (
    <div className="relative">
      <pre className="bg-navy-dark text-green-400 p-4 rounded-xl text-xs overflow-x-auto whitespace-pre-wrap max-h-64">
        {script}
      </pre>
      <button
        type="button"
        onClick={() => onCopy(script)}
        className="absolute top-2 right-2 p-2 bg-white/10 rounded-lg text-white hover:bg-white/20"
      >
        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  );
}

export default function ChrOnboardingWizard({ open, onClose, locationId, router, onComplete }) {
  const { t } = useTranslation('owner');
  const { t: tc } = useTranslation('common');
  const [step, setStep] = useState(0);
  const [chrConfig, setChrConfig] = useState({ ...DEFAULT_CHR_CONFIG });
  const [setup, setSetup] = useState(null);
  const [loadingSetup, setLoadingSetup] = useState(false);
  const [savingConfig, setSavingConfig] = useState(false);
  const [copied, setCopied] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(null);
  const [polling, setPolling] = useState(false);

  const loadSetup = useCallback(async (config) => {
    if (!router?.id) return;
    setLoadingSetup(true);
    try {
      const params = new URLSearchParams({
        chrConfig: JSON.stringify(config),
      });
      const { data } = await api.get(
        `/api/owner/locations/${locationId}/routers/${router.id}/setup?${params}`
      );
      setSetup(data);
    } catch (err) {
      toast.error(err.response?.data?.error || t('chr.scriptsFailed'));
    } finally {
      setLoadingSetup(false);
    }
  }, [locationId, router?.id, t]);

  useEffect(() => {
    if (!open || !router) return;
    setStep(0);
    const initial = router.chrConfig ? { ...DEFAULT_CHR_CONFIG, ...router.chrConfig } : { ...DEFAULT_CHR_CONFIG };
    setChrConfig(initial);
    setOnlineStatus(null);
    loadSetup(initial);
  }, [open, router, loadSetup]);

  useEffect(() => {
    if (!open || step !== 5 || !router?.id) return undefined;

    let cancelled = false;
    setPolling(true);

    const poll = async () => {
      try {
        const { data } = await api.get(
          `/api/owner/locations/${locationId}/routers/${router.id}/onboarding-status`
        );
        if (cancelled) return;
        setOnlineStatus(data);
        if (data.isOnline) {
          setPolling(false);
          setStep(6);
        }
      } catch {
        if (!cancelled) setPolling(false);
      }
    };

    poll();
    const id = setInterval(poll, 10000);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, [open, step, locationId, router?.id]);

  async function saveNetworkConfig() {
    setSavingConfig(true);
    try {
      await api.patch(`/api/owner/locations/${locationId}/routers/${router.id}`, { chrConfig });
      await loadSetup(chrConfig);
      toast.success(t('chr.networkSaved'));
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.error || t('chr.networkSaveFailed'));
    } finally {
      setSavingConfig(false);
    }
  }

  function copyScript(text) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success(t('toast.copied'));
  }

  function handleClose() {
    if (onlineStatus?.isOnline && onComplete) onComplete();
    onClose();
  }

  if (!router) return null;

  const previewUrl = setup?.previewPortalUrl || router.previewPortalUrl;
  const scriptLoadingLabel = t('chr.loadingScript');

  return (
    <Modal open={open} onClose={handleClose} title={t('chr.title')} size="lg">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Cloud className="w-5 h-5 text-brand" />
          <p className="font-semibold text-navy">{router.name}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {STEP_IDS.map((id, i) => (
            <span
              key={id}
              className={`text-xs px-2 py-1 rounded ${
                i === step ? 'bg-brand text-white' : i < step ? 'bg-signal-muted text-signal' : 'bg-surface-muted text-navy/50 border border-gray-200'
              }`}
            >
              {i + 1}. {t(STEP_TITLE_KEYS[id])}
            </span>
          ))}
        </div>
      </div>

      {step === 0 && (
        <div className="space-y-4 text-sm text-navy/70">
          <p>{t('chr.prereqIntro')}</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              <Trans i18nKey="chr.prereq1" ns="owner" components={{ strong: <strong /> }} />
            </li>
            <li>{t('chr.prereq2')}</li>
            <li>{t('chr.prereq3')}</li>
            <li>{t('chr.prereq4')}</li>
          </ul>
          <p>
            <Trans
              i18nKey="chr.seeDocs"
              ns="owner"
              components={{
                docs: (
                  <a
                    href="https://help.mikrotik.com/docs/display/ROS/Cloud+Hosted+Router"
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand hover:underline"
                  />
                ),
              }}
            />
          </p>
          <p className="text-amber-700 bg-amber-50 rounded-lg p-3 text-xs">
            <Trans i18nKey="chr.warning" ns="owner" components={{ code: <code className="font-mono" /> }} />
          </p>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <p className="text-sm text-navy/60">
            {t('chr.networkIntro')}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label={t('chr.wanIf')}
              value={chrConfig.wanInterface}
              onChange={(e) => setChrConfig({ ...chrConfig, wanInterface: e.target.value })}
            />
            <Input
              label={t('chr.lanIf')}
              value={chrConfig.lanInterface}
              onChange={(e) => setChrConfig({ ...chrConfig, lanInterface: e.target.value })}
            />
            <Input
              label={t('chr.bridge')}
              value={chrConfig.bridgeName}
              onChange={(e) => setChrConfig({ ...chrConfig, bridgeName: e.target.value })}
            />
            <Input
              label={t('chr.hotspotName')}
              value={chrConfig.hotspotName}
              onChange={(e) => setChrConfig({ ...chrConfig, hotspotName: e.target.value })}
            />
            <Input
              label={t('chr.cidr')}
              value={chrConfig.localNetwork}
              onChange={(e) => setChrConfig({ ...chrConfig, localNetwork: e.target.value })}
            />
            <Input
              label={t('chr.gateway')}
              value={chrConfig.gatewayIp}
              onChange={(e) => setChrConfig({ ...chrConfig, gatewayIp: e.target.value })}
            />
            <Input
              label={t('chr.dhcp')}
              className="sm:col-span-2"
              value={chrConfig.dhcpPool}
              onChange={(e) => setChrConfig({ ...chrConfig, dhcpPool: e.target.value })}
            />
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-3">
          <p className="text-sm text-navy/60">
            {t('chr.bootstrapIntro')}
          </p>
          {loadingSetup ? (
            <div className="flex justify-center py-8"><Loader className="w-6 h-6 animate-spin text-brand" /></div>
          ) : (
            <ScriptBlock script={setup?.chrBootstrapScript} onCopy={copyScript} copied={copied} loadingLabel={scriptLoadingLabel} />
          )}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3">
          <p className="text-sm text-navy/60">
            <Trans i18nKey="chr.hotspotIntro" ns="owner" components={{ code: <code className="text-xs" /> }} />
          </p>
          <ScriptBlock script={setup?.hotspotSetupScript} onCopy={copyScript} copied={copied} loadingLabel={scriptLoadingLabel} />
        </div>
      )}

      {step === 4 && (
        <div className="space-y-3">
          <p className="text-sm text-navy/60">
            {t('chr.connectIntro')}
          </p>
          <ScriptBlock script={setup?.connectionScript} onCopy={copyScript} copied={copied} loadingLabel={scriptLoadingLabel} />
        </div>
      )}

      {step === 5 && (
        <div className="space-y-4 text-center py-4">
          {polling && !onlineStatus?.isOnline ? (
            <>
              <Loader className="w-10 h-10 animate-spin text-brand mx-auto" />
              <p className="font-medium text-navy mt-4">{t('chr.waiting')}</p>
              <p className="text-sm text-navy/50 mt-2">
                {t('chr.waitingHint')}
              </p>
            </>
          ) : onlineStatus?.isOnline ? (
            <p className="text-emerald-600 font-medium">{t('chr.online')}</p>
          ) : (
            <>
              <p className="text-navy/70 text-sm">{t('chr.notOnline')}</p>
              <ul className="text-left text-sm text-navy/60 list-disc pl-5 space-y-1 max-w-md mx-auto">
                <li>{t('chr.check1')}</li>
                <li>
                  <Trans i18nKey="chr.check2" ns="owner" components={{ code: <code className="font-mono" /> }} />
                </li>
                <li>{t('chr.check3')}</li>
                <li>{t('chr.check4')}</li>
              </ul>
            </>
          )}
        </div>
      )}

      {step === 6 && (
        <div className="space-y-4 text-center py-4">
          <Check className="w-12 h-12 text-emerald-500 mx-auto" />
          <p className="font-semibold text-navy">{t('chr.connected')}</p>
          <p className="text-sm text-navy/60">{t('chr.connectedHint')}</p>
          {previewUrl && (
            <a
              href={previewUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-brand font-medium hover:underline"
            >
              <ExternalLink className="w-4 h-4" /> {t('chr.previewPortal')}
            </a>
          )}
        </div>
      )}

      <div className="flex justify-between mt-8 pt-4 border-t border-gray-100">
        <Button
          variant="secondary"
          onClick={() => (step === 0 ? handleClose() : setStep(step - 1))}
          className="gap-1"
        >
          <ChevronLeft className="w-4 h-4" />
          {step === 0 ? tc('actions.close') : tc('actions.back')}
        </Button>

        {step === 1 && (
          <Button onClick={saveNetworkConfig} disabled={savingConfig}>
            {savingConfig ? tc('actions.saving') : t('chr.saveContinue')}
          </Button>
        )}

        {step >= 0 && step <= 4 && step !== 1 && (
          <Button onClick={() => setStep(step + 1)} className="gap-1">
            {tc('actions.next')} <ChevronRight className="w-4 h-4" />
          </Button>
        )}

        {step === 5 && !onlineStatus?.isOnline && (
          <Button onClick={() => setStep(4)} variant="secondary">
            {t('chr.recheck')}
          </Button>
        )}

        {step === 6 && (
          <Button onClick={handleClose}>{t('chr.done')}</Button>
        )}
      </div>
    </Modal>
  );
}
