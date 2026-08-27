import { useEffect, useState, useCallback } from 'react';
import { Check, Copy, ChevronLeft, ChevronRight, Cloud, Loader, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';
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

const STEPS = [
  { id: 'prerequisites', title: 'Prerequisites' },
  { id: 'network', title: 'Network layout' },
  { id: 'bootstrap', title: 'Bootstrap script' },
  { id: 'hotspot', title: 'SpaiHub hotspot' },
  { id: 'connect', title: 'Connect to SpaiHub' },
  { id: 'verify', title: 'Verify connection' },
  { id: 'done', title: 'Complete' },
];

function ScriptBlock({ script, onCopy, copied }) {
  if (!script) {
    return <p className="text-sm text-navy/50">Loading script...</p>;
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
      toast.error(err.response?.data?.error || 'Failed to load scripts');
    } finally {
      setLoadingSetup(false);
    }
  }, [locationId, router?.id]);

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
      toast.success('Network settings saved');
      setStep(2);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save network settings');
    } finally {
      setSavingConfig(false);
    }
  }

  function copyScript(text) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Copied to clipboard');
  }

  function handleClose() {
    if (onlineStatus?.isOnline && onComplete) onComplete();
    onClose();
  }

  if (!router) return null;

  const previewUrl = setup?.previewPortalUrl || router.previewPortalUrl;

  return (
    <Modal open={open} onClose={handleClose} title="MikroTik CHR onboarding" size="lg">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-3">
          <Cloud className="w-5 h-5 text-brand" />
          <p className="font-semibold text-navy">{router.name}</p>
        </div>
        <div className="flex flex-wrap gap-1">
          {STEPS.map((s, i) => (
            <span
              key={s.id}
              className={`text-xs px-2 py-1 rounded ${
                i === step ? 'bg-brand text-white' : i < step ? 'bg-signal-muted text-signal' : 'bg-surface-muted text-navy/50 border border-gray-200'
              }`}
            >
              {i + 1}. {s.title}
            </span>
          ))}
        </div>
      </div>

      {step === 0 && (
        <div className="space-y-4 text-sm text-navy/70">
          <p>Before you start, confirm your CHR environment:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>RouterOS license includes <strong>Hotspot</strong> (Level 4+ on CHR).</li>
            <li>CHR can reach the SpaiHub API over HTTPS (outbound port 443).</li>
            <li>Cloud firewall / security group allows egress to the internet.</li>
            <li>CHR has no built-in Wi‑Fi — connect an AP or switch to the LAN bridge.</li>
          </ul>
          <p>
            See{' '}
            <a
              href="https://help.mikrotik.com/docs/display/ROS/Cloud+Hosted+Router"
              target="_blank"
              rel="noreferrer"
              className="text-brand hover:underline"
            >
              MikroTik CHR documentation
            </a>{' '}
            for VM setup.
          </p>
          <p className="text-amber-700 bg-amber-50 rounded-lg p-3 text-xs">
            Run scripts in order on a fresh CHR or backup your config first. Verify interface names with{' '}
            <code className="font-mono">/interface print</code>.
          </p>
        </div>
      )}

      {step === 1 && (
        <div className="space-y-4">
          <p className="text-sm text-navy/60">
            Default layout: WAN on ether1, LAN/AP on ether2, hotspot bridge at 192.168.88.0/24.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              label="WAN interface"
              value={chrConfig.wanInterface}
              onChange={(e) => setChrConfig({ ...chrConfig, wanInterface: e.target.value })}
            />
            <Input
              label="LAN interface"
              value={chrConfig.lanInterface}
              onChange={(e) => setChrConfig({ ...chrConfig, lanInterface: e.target.value })}
            />
            <Input
              label="Bridge name"
              value={chrConfig.bridgeName}
              onChange={(e) => setChrConfig({ ...chrConfig, bridgeName: e.target.value })}
            />
            <Input
              label="Hotspot name"
              value={chrConfig.hotspotName}
              onChange={(e) => setChrConfig({ ...chrConfig, hotspotName: e.target.value })}
            />
            <Input
              label="Local network (CIDR)"
              value={chrConfig.localNetwork}
              onChange={(e) => setChrConfig({ ...chrConfig, localNetwork: e.target.value })}
            />
            <Input
              label="Gateway IP"
              value={chrConfig.gatewayIp}
              onChange={(e) => setChrConfig({ ...chrConfig, gatewayIp: e.target.value })}
            />
            <Input
              label="DHCP pool"
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
            Paste this into the MikroTik terminal first. It creates bridge, DHCP, hotspot, and NAT.
          </p>
          {loadingSetup ? (
            <div className="flex justify-center py-8"><Loader className="w-6 h-6 animate-spin text-brand" /></div>
          ) : (
            <ScriptBlock script={setup?.chrBootstrapScript} onCopy={copyScript} copied={copied} />
          )}
        </div>
      )}

      {step === 3 && (
        <div className="space-y-3">
          <p className="text-sm text-navy/60">
            Run after bootstrap. Adds walled garden, SpaiHub profiles, and downloads <code className="text-xs">hotspot/login.html</code> to redirect clients to the captive portal.
          </p>
          <ScriptBlock script={setup?.hotspotSetupScript} onCopy={copyScript} copied={copied} />
        </div>
      )}

      {step === 4 && (
        <div className="space-y-3">
          <p className="text-sm text-navy/60">
            Run last. Starts heartbeat and command polling so SpaiHub can grant access after payment.
          </p>
          <ScriptBlock script={setup?.connectionScript} onCopy={copyScript} copied={copied} />
        </div>
      )}

      {step === 5 && (
        <div className="space-y-4 text-center py-4">
          {polling && !onlineStatus?.isOnline ? (
            <>
              <Loader className="w-10 h-10 animate-spin text-brand mx-auto" />
              <p className="font-medium text-navy mt-4">Waiting for router heartbeat...</p>
              <p className="text-sm text-navy/50 mt-2">
                After pasting all three scripts, the router should appear online within 1–2 minutes.
              </p>
            </>
          ) : onlineStatus?.isOnline ? (
            <p className="text-emerald-600 font-medium">Router is online!</p>
          ) : (
            <>
              <p className="text-navy/70 text-sm">Not online yet. Check:</p>
              <ul className="text-left text-sm text-navy/60 list-disc pl-5 space-y-1 max-w-md mx-auto">
                <li>All three scripts pasted without errors</li>
                <li>Schedulers <code className="font-mono">spaihub-heartbeat</code> and <code className="font-mono">spaihub-commands</code> exist</li>
                <li>CHR can reach your SpaiHub API over HTTPS</li>
                <li>Walled garden includes portal and API hosts from script 2</li>
              </ul>
            </>
          )}
        </div>
      )}

      {step === 6 && (
        <div className="space-y-4 text-center py-4">
          <Check className="w-12 h-12 text-emerald-500 mx-auto" />
          <p className="font-semibold text-navy">CHR is connected to SpaiHub</p>
          <p className="text-sm text-navy/60">Add packages at this location, then test the captive portal.</p>
          {previewUrl && (
            <a
              href={previewUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-brand font-medium hover:underline"
            >
              <ExternalLink className="w-4 h-4" /> Preview captive portal
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
          {step === 0 ? 'Close' : 'Back'}
        </Button>

        {step === 1 && (
          <Button onClick={saveNetworkConfig} disabled={savingConfig}>
            {savingConfig ? 'Saving...' : 'Save & continue'}
          </Button>
        )}

        {step >= 0 && step <= 4 && step !== 1 && (
          <Button onClick={() => setStep(step + 1)} className="gap-1">
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        )}

        {step === 5 && !onlineStatus?.isOnline && (
          <Button onClick={() => setStep(4)} variant="secondary">
            Re-check scripts
          </Button>
        )}

        {step === 6 && (
          <Button onClick={handleClose}>Done</Button>
        )}
      </div>
    </Modal>
  );
}
