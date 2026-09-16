import { useEffect, useState } from 'react';
import { Plus, ChevronDown, ChevronUp, Copy, Check, MapPin, ExternalLink, Router, Pencil, Trash2, UserX, Cloud } from 'lucide-react';
import toast from 'react-hot-toast';
import { Trans, useTranslation } from 'react-i18next';
import api from '../../services/api';
import { Modal, StatusBadge, Button, Card, EmptyState } from '../../components/ui';
import PackageFormModal from '../../components/PackageFormModal';
import ChrOnboardingWizard, { DEFAULT_CHR_CONFIG } from '../../components/ChrOnboardingWizard';
import HelpTip from '../../components/HelpTip';
import { LocaleLink } from '../../components/LocaleLink';
import { formatOwnerPackageSummary } from '../../utils/packages';

const LOCATION_TABS = [
  { id: 'routers', labelKey: 'tabRouters', shortKey: 'tabRoutersShort' },
  { id: 'packages', labelKey: 'tabPackages', shortKey: 'tabPackagesShort' },
  { id: 'sessions', labelKey: 'tabSessions', shortKey: 'tabSessionsShort' },
  { id: 'access', labelKey: 'tabAccess', shortKey: 'tabAccessShort' },
];

export default function Locations() {
  const { t } = useTranslation('owner');
  const { t: tc } = useTranslation('common');
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [tab, setTab] = useState('routers');
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [showAddRouter, setShowAddRouter] = useState(false);
  const [showAddPackage, setShowAddPackage] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [showScript, setShowScript] = useState(null);
  const [setupRouterId, setSetupRouterId] = useState(null);
  const [physicalSetupMode, setPhysicalSetupMode] = useState('existing');
  const [lanIf, setLanIf] = useState('ether2');
  const [wanIf, setWanIf] = useState('ether1');
  const [scriptLoading, setScriptLoading] = useState(false);
  const [chrWizardRouter, setChrWizardRouter] = useState(null);
  const [scriptTab, setScriptTab] = useState('hotspot');
  const [routers, setRouters] = useState([]);
  const [packages, setPackages] = useState([]);
  const [copied, setCopied] = useState(false);
  const [expandLoading, setExpandLoading] = useState(false);
  const [showEditLocation, setShowEditLocation] = useState(false);
  const [editLocForm, setEditLocForm] = useState({ name: '', address: '' });
  const [sessions, setSessions] = useState([]);

  const [locForm, setLocForm] = useState({ name: '', address: '' });
  const [routerForm, setRouterForm] = useState({ name: '', deploymentType: 'PHYSICAL' });
  const [accessPolicy, setAccessPolicy] = useState({
    maxDevicesPerAccessCode: 0,
  });
  const [savingPolicy, setSavingPolicy] = useState(false);

  async function loadLocations() {
    try {
      const { data } = await api.get('/api/owner/locations');
      setLocations(data);
    } catch (err) {
      toast.error(err.response?.data?.error || t('toast.loadLocations'));
    }
  }

  useEffect(() => {
    loadLocations().finally(() => setLoading(false));
  }, []);

  async function expandLocation(id) {
    if (expanded === id) {
      setExpanded(null);
      return;
    }
    setExpanded(id);
    setExpandLoading(true);
    const loc = locations.find((l) => l.id === id);
    if (loc) {
      setAccessPolicy({
        maxDevicesPerAccessCode: loc.maxDevicesPerAccessCode ?? 0,
      });
      setEditLocForm({ name: loc.name, address: loc.address });
    }
    try {
      const [r, p, s] = await Promise.all([
        api.get(`/api/owner/locations/${id}/routers`),
        api.get(`/api/owner/locations/${id}/packages`),
        api.get('/api/owner/sessions'),
      ]);
      setRouters(r.data);
      setPackages(p.data);
      setSessions(s.data.filter((session) => session.location.id === id));
    } catch (err) {
      toast.error(err.response?.data?.error || t('toast.loadDetails'));
    } finally {
      setExpandLoading(false);
    }
  }

  async function saveAccessPolicy() {
    setSavingPolicy(true);
    try {
      const { data } = await api.patch(`/api/owner/locations/${expanded}`, accessPolicy);
      toast.success(t('toast.policySaved'));
      setLocations((prev) => prev.map((loc) => (loc.id === expanded ? { ...loc, ...data } : loc)));
    } catch (err) {
      toast.error(err.response?.data?.error || t('toast.policyFailed'));
    } finally {
      setSavingPolicy(false);
    }
  }

  async function createLocation(e) {
    e.preventDefault();
    try {
      await api.post('/api/owner/locations', locForm);
      toast.success(t('toast.locCreated'));
      setShowAddLocation(false);
      setLocForm({ name: '', address: '' });
      loadLocations();
    } catch (err) {
      toast.error(err.response?.data?.error || t('toast.locCreateFailed'));
    }
  }

  async function updateLocation(e) {
    e.preventDefault();
    try {
      const { data } = await api.patch(`/api/owner/locations/${expanded}`, editLocForm);
      toast.success(t('toast.locUpdated'));
      setShowEditLocation(false);
      setLocations((prev) => prev.map((loc) => (loc.id === expanded ? { ...loc, ...data } : loc)));
    } catch (err) {
      toast.error(err.response?.data?.error || t('toast.locUpdateFailed'));
    }
  }

  async function toggleLocationActive(loc) {
    try {
      const { data } = await api.patch(`/api/owner/locations/${loc.id}`, {
        isActive: !loc.isActive,
      });
      toast.success(data.isActive ? t('toast.locActivated') : t('toast.locSuspended'));
      setLocations((prev) => prev.map((l) => (l.id === loc.id ? { ...l, ...data } : l)));
    } catch (err) {
      toast.error(err.response?.data?.error || t('toast.locStatusFailed'));
    }
  }

  async function deleteRouter(routerId) {
    if (!window.confirm(t('toast.removeRouterConfirm'))) return;
    try {
      await api.delete(`/api/owner/locations/${expanded}/routers/${routerId}`);
      toast.success(t('toast.routerRemoved'));
      expandLocation(expanded);
      loadLocations();
    } catch (err) {
      toast.error(err.response?.data?.error || t('toast.routerRemoveFailed'));
    }
  }

  async function kickSession(transactionId) {
    try {
      await api.post(`/api/owner/sessions/${transactionId}/kick`);
      toast.success(t('toast.sessionEnded'));
      expandLocation(expanded);
      loadLocations();
    } catch (err) {
      toast.error(err.response?.data?.error || t('toast.sessionEndFailed'));
    }
  }

  async function createRouter(e) {
    e.preventDefault();
    try {
      const payload = {
        name: routerForm.name,
        deploymentType: routerForm.deploymentType,
      };
      if (routerForm.deploymentType === 'CHR') {
        payload.chrConfig = DEFAULT_CHR_CONFIG;
      }
      const { data } = await api.post(`/api/owner/locations/${expanded}/routers`, payload);
      toast.success(t('toast.routerAdded'));
      setShowAddRouter(false);
      setRouterForm({ name: '', deploymentType: 'PHYSICAL' });
      expandLocation(expanded);
      loadLocations();
      if (data.deploymentType === 'CHR') {
        setChrWizardRouter(data);
      } else {
        setSetupRouterId(data.id || data.router?.id);
        setPhysicalSetupMode('existing');
        setLanIf('ether2');
        setWanIf('ether1');
        setShowScript(data);
        setScriptTab('hotspot');
      }
    } catch (err) {
      toast.error(err.response?.data?.error || t('toast.routerAddFailed'));
    }
  }

  async function savePackage(payload) {
    try {
      if (editingPackage) {
        await api.patch(`/api/owner/locations/${expanded}/packages/${editingPackage.id}`, payload);
        toast.success(t('toast.pkgUpdated'));
      } else {
        await api.post(`/api/owner/locations/${expanded}/packages`, payload);
        toast.success(t('toast.pkgCreated'));
      }
      expandLocation(expanded);
    } catch (err) {
      toast.error(err.response?.data?.error || t('toast.pkgSaveFailed'));
      throw err;
    }
  }

  async function deactivatePackage(packageId) {
    try {
      await api.delete(`/api/owner/locations/${expanded}/packages/${packageId}`);
      toast.success(t('toast.pkgDeactivated'));
      expandLocation(expanded);
    } catch (err) {
      toast.error(err.response?.data?.error || t('toast.pkgDeactivateFailed'));
    }
  }

  function copyScript(text) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success(t('toast.copied'));
  }

  function openChrWizard(router) {
    setChrWizardRouter(router);
  }

  async function loadPhysicalSetup(routerId, mode = physicalSetupMode, lan = lanIf, wan = wanIf) {
    if (!expanded || !routerId) return;
    setScriptLoading(true);
    try {
      const params = new URLSearchParams({
        mode,
        lanIf: lan,
        wanIf: wan,
      });
      const { data } = await api.get(
        `/api/owner/locations/${expanded}/routers/${routerId}/setup?${params}`
      );
      setShowScript(data);
      setSetupRouterId(routerId);
    } catch (err) {
      toast.error(err.response?.data?.error || t('toast.setupFailed'));
    } finally {
      setScriptLoading(false);
    }
  }

  async function openRouterSetup(routerId) {
    const router = routers.find((r) => r.id === routerId);
    if (router?.deploymentType === 'CHR') {
      openChrWizard(router);
      return;
    }
    setPhysicalSetupMode('existing');
    setLanIf('ether2');
    setWanIf('ether1');
    setScriptTab('hotspot');
    await loadPhysicalSetup(routerId, 'existing', 'ether2', 'ether1');
  }

  function openPreviewPortal(router) {
    const url = router.previewPortalUrl || `/portal/${router.routerToken}`;
    window.open(url.startsWith('http') ? url : `${window.location.origin}${url}`, '_blank');
  }

  if (loading) {
    return <div className="animate-pulse bg-gray-200/80 rounded-2xl h-48" />;
  }

  return (
    <div>
      <div className="flex justify-between items-center gap-3 mb-6">
        <p className="text-sm text-navy/50 font-medium">
          {t('locations.count', { count: locations.length })}
        </p>
        <Button onClick={() => setShowAddLocation(true)} className="gap-2 min-h-[44px] shrink-0">
          <Plus className="w-4 h-4" />
          <span className="sm:hidden">{tc('actions.add')}</span>
          <span className="hidden sm:inline">{t('locations.add')}</span>
        </Button>
      </div>

      {locations.length === 0 ? (
        <Card>
          <EmptyState
            icon={MapPin}
            title={t('locations.emptyTitle')}
            description={t('locations.emptyBody')}
            action={
              <div className="flex flex-col items-center gap-3">
                <Button onClick={() => setShowAddLocation(true)}>
                  <Plus className="w-4 h-4" /> {t('locations.add')}
                </Button>
                <LocaleLink to="/help/add-location" className="text-sm font-medium text-brand hover:text-brand-dark">
                  {tc('actions.readHelp')}
                </LocaleLink>
              </div>
            }
          />
        </Card>
      ) : (
      <div className="space-y-4">
        {locations.map((loc) => (
          <div key={loc.id} className="card overflow-hidden hover:shadow-card-hover transition-shadow duration-200">
            <button
              onClick={() => expandLocation(loc.id)}
              className="w-full card-body flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-left hover:bg-brand/[0.02] transition-colors"
            >
              <div className="min-w-0">
                <h3 className="font-semibold text-navy">{loc.name}</h3>
                <p className="text-sm text-navy/50 mt-0.5">{loc.address}</p>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-navy/40 font-medium">
                  <span>{t('locations.routersOnline', { online: loc.onlineRouters, total: loc.routerCount })}</span>
                  <span>{t('locations.activeSessions', { count: loc.activeSessions })}</span>
                </div>
              </div>
              <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
                <StatusBadge status={loc.isActive ? 'ACTIVE' : 'SUSPENDED'} />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLocationActive(loc);
                  }}
                  className="text-xs px-3 py-2 min-h-[40px] rounded-lg bg-gray-100 text-navy/70 hover:bg-gray-200 font-medium"
                >
                  {loc.isActive ? t('locations.suspend') : t('locations.activate')}
                </button>
                {expanded === loc.id ? <ChevronUp className="w-5 h-5 shrink-0" /> : <ChevronDown className="w-5 h-5 shrink-0" />}
              </div>
            </button>

            {expanded === loc.id && (
              <div className="border-t border-gray-100 p-4 sm:p-5">
                <div className="flex flex-col gap-3 mb-4">
                  <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1 scrollbar-thin">
                  {LOCATION_TABS.map((tabDef) => (
                    <button
                      key={tabDef.id}
                      onClick={() => setTab(tabDef.id)}
                      className={`px-3.5 py-2 min-h-[40px] rounded-lg text-sm font-medium whitespace-nowrap shrink-0 ${
                        tab === tabDef.id ? 'bg-brand text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      <span className="sm:hidden">{t(`locations.${tabDef.shortKey}`)}</span>
                      <span className="hidden sm:inline">{t(`locations.${tabDef.labelKey}`)}</span>
                    </button>
                  ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowEditLocation(true)}
                    className="text-sm text-navy/60 hover:text-navy inline-flex items-center gap-1.5 self-start min-h-[40px]"
                  >
                    <Pencil className="w-3.5 h-3.5" /> {t('locations.edit')}
                  </button>
                </div>

                {expandLoading ? (
                  <div className="animate-pulse bg-gray-200/80 rounded-xl h-32" />
                ) : (
                <>
                {tab === 'routers' && (
                  <div>
                    <div className="flex justify-end mb-3">
                      <button
                        onClick={() => setShowAddRouter(true)}
                        className="flex items-center gap-1 text-sm text-brand hover:text-brand/80"
                      >
                        <Plus className="w-4 h-4" /> {t('locations.addRouter')}
                      </button>
                    </div>
                    <div className="overflow-x-auto -mx-1 px-1">
                    <table className="w-full text-sm min-w-[36rem]">
                      <thead>
                        <tr className="text-left text-gray-500 border-b">
                          <th className="pb-2">{t('locations.name')}</th>
                          <th className="pb-2">{t('locations.status')}</th>
                          <th className="pb-2">{t('locations.lastSeen')}</th>
                          <th className="pb-2 sticky-actions">{t('locations.actions')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {routers.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="py-6 text-center text-navy/50 text-sm">
                              {t('locations.noRouters')}
                            </td>
                          </tr>
                        ) : (
                        routers.map((r) => (
                          <tr key={r.id} className="border-b border-gray-50">
                            <td className="py-2 font-medium">
                              {r.name}
                              {r.deploymentType === 'CHR' && (
                                <span className="ml-2 inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wide bg-surface-muted text-navy/70 border border-gray-200">
                                  <Cloud className="w-3 h-3" /> {t('locations.chr')}
                                </span>
                              )}
                            </td>
                            <td className="py-2"><StatusBadge status={r.status} /></td>
                            <td className="py-2 text-gray-400">
                              {r.lastSeenAt ? new Date(r.lastSeenAt).toLocaleString() : t('locations.neverSeen')}
                            </td>
                            <td className="py-2 sticky-actions">
                              <div className="flex flex-col sm:flex-row sm:flex-wrap sm:justify-end gap-2">
                              {r.deploymentType === 'CHR' ? (
                                <button
                                  type="button"
                                  onClick={() => openChrWizard(r)}
                                  className="text-brand text-xs font-medium hover:text-brand-dark inline-flex items-center justify-center gap-1 min-h-[40px] px-3 rounded-lg bg-brand/10 sm:bg-transparent sm:px-0 sm:min-h-0"
                                >
                                  <Cloud className="w-3.5 h-3.5" /> {t('locations.setupChr')}
                                </button>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => openRouterSetup(r.id)}
                                  className="text-navy/70 text-xs font-medium hover:text-navy inline-flex items-center justify-center gap-1 min-h-[40px] px-3 rounded-lg bg-navy/5 sm:bg-transparent sm:px-0 sm:min-h-0"
                                >
                                  <Router className="w-3.5 h-3.5" /> {t('locations.setupScript')}
                                </button>
                              )}
                              <button
                                type="button"
                                onClick={() => openPreviewPortal(r)}
                                className="text-brand text-xs font-medium hover:text-brand-dark inline-flex items-center justify-center gap-1 min-h-[40px] px-3 rounded-lg bg-brand/10 sm:bg-transparent sm:px-0 sm:min-h-0"
                              >
                                <ExternalLink className="w-3.5 h-3.5" /> {t('locations.previewPortal')}
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteRouter(r.id)}
                                className="text-red-500 text-xs font-medium hover:text-red-700 inline-flex items-center justify-center gap-1 min-h-[40px] px-3 rounded-lg bg-red-50 sm:bg-transparent sm:px-0 sm:min-h-0"
                              >
                                <Trash2 className="w-3.5 h-3.5" /> {tc('actions.remove')}
                              </button>
                              </div>
                            </td>
                          </tr>
                        ))
                        )}
                      </tbody>
                    </table>
                    </div>
                  </div>
                )}

                {tab === 'access' && (
                  <div className="max-w-md">
                    <div className="mb-6">
                      <h4 className="font-semibold text-navy">{t('locations.accessTitle')}</h4>
                      <p className="text-sm text-navy/50 mt-0.5">
                        {t('locations.accessIntro')}
                      </p>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className="label-field">
                          {t('locations.devicesFallback')}
                          <HelpTip slug="reference-access-policy" />
                        </label>
                        <input
                          type="number"
                          min={0}
                          value={accessPolicy.maxDevicesPerAccessCode}
                          onChange={(e) =>
                            setAccessPolicy({
                              ...accessPolicy,
                              maxDevicesPerAccessCode: Math.max(0, Number(e.target.value) || 0),
                            })
                          }
                          className="input-field"
                        />
                        <p className="text-xs text-navy/45 mt-1.5">
                          <Trans i18nKey="locations.devicesHint" ns="owner" components={{ strong: <strong /> }} />
                        </p>
                      </div>

                      <p className="text-xs text-navy/50 rounded-lg border border-gray-200 bg-surface-muted px-3 py-2.5">
                        {t('locations.accessTip')}
                      </p>

                      <Button onClick={saveAccessPolicy} disabled={savingPolicy} className="w-full sm:w-auto">
                        {savingPolicy ? tc('actions.saving') : t('locations.savePolicy')}
                      </Button>
                    </div>
                  </div>
                )}

                {tab === 'sessions' && (
                  <div>
                    {sessions.length === 0 ? (
                      <div className="text-center py-8 space-y-2">
                        <p className="text-sm text-navy/50">{t('locations.noSessions')}</p>
                        <p className="text-xs text-navy/40 max-w-sm mx-auto">
                          {t('locations.noSessionsHint')}
                        </p>
                      </div>
                    ) : (
                      <div className="overflow-x-auto -mx-1 px-1">
                      <p className="text-xs text-navy/45 mb-3">
                        {t('locations.onRouterHint')}
                      </p>
                      <table className="w-full text-sm min-w-[36rem]">
                        <thead>
                          <tr className="text-left text-gray-500 border-b">
                            <th className="pb-2">{t('locations.device')}</th>
                            <th className="pb-2">{t('locations.package')}</th>
                            <th className="pb-2">{t('locations.router')}</th>
                            <th className="pb-2">{t('locations.status')}</th>
                            <th className="pb-2">{t('locations.ends')}</th>
                            <th className="pb-2 sticky-actions">{t('locations.actions')}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sessions.map((s) => (
                            <tr key={s.id} className="border-b border-gray-50">
                              <td className="py-2">
                                <p className="font-medium">{s.subscriberPhone}</p>
                                <p className="text-xs text-navy/45">{s.paymentSource}</p>
                              </td>
                              <td className="py-2">{s.packageName}</td>
                              <td className="py-2">{s.router?.name || '—'}</td>
                              <td className="py-2">
                                {s.routerSeen ? (
                                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-signal">
                                    <span className="w-1.5 h-1.5 rounded-sm bg-signal" />
                                    {t('locations.onRouter')}
                                    {s.routerMac ? (
                                      <span className="text-navy/40 font-normal">· {s.routerMac}</span>
                                    ) : null}
                                  </span>
                                ) : (
                                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-navy/45">
                                    <span className="w-1.5 h-1.5 rounded-sm bg-gray-300" />
                                    {t('locations.notSeen')}
                                  </span>
                                )}
                              </td>
                              <td className="py-2 text-gray-400">{new Date(s.sessionEnd).toLocaleString()}</td>
                              <td className="py-2 sticky-actions text-right">
                                <button
                                  type="button"
                                  onClick={() => kickSession(s.id)}
                                  className="text-red-500 text-xs font-medium hover:text-red-700 inline-flex items-center gap-1"
                                >
                                  <UserX className="w-3.5 h-3.5" /> {t('locations.kick')}
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      </div>
                    )}
                  </div>
                )}

                {tab === 'packages' && (
                  <div>
                    <div className="flex justify-end mb-3">
                      <button
                        onClick={() => {
                          setEditingPackage(null);
                          setShowAddPackage(true);
                        }}
                        className="flex items-center gap-1 text-sm text-brand hover:text-brand/80"
                      >
                        <Plus className="w-4 h-4" /> {t('locations.addPackage')}
                      </button>
                    </div>
                    <div className="overflow-x-auto -mx-1 px-1">
                    <table className="w-full text-sm min-w-[40rem]">
                      <thead>
                        <tr className="text-left text-gray-500 border-b">
                          <th className="pb-2">{t('locations.name')}</th>
                          <th className="pb-2">{t('locations.type')}</th>
                          <th className="pb-2">{t('locations.details')}</th>
                          <th className="pb-2">{t('locations.price')}</th>
                          <th className="pb-2">{t('locations.status')}</th>
                          <th className="pb-2 sticky-actions">{t('locations.actions')}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {packages.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-navy/50 text-sm">
                              {t('locations.noPackages')}{' '}
                              <LocaleLink to="/help/create-time-package" className="text-brand font-medium hover:text-brand-dark">
                                {tc('actions.readHelp')}
                              </LocaleLink>
                            </td>
                          </tr>
                        ) : (
                        packages.map((p) => (
                          <tr key={p.id} className="border-b border-gray-50">
                            <td className="py-2 font-medium">{p.name}</td>
                            <td className="py-2">
                              <span className="text-xs px-2 py-0.5 rounded bg-surface-muted border border-gray-200 text-navy font-medium whitespace-nowrap">
                                {p.type === 'DATA_BASED' ? t('locations.dataBased') : t('locations.timeBased')}
                              </span>
                            </td>
                            <td className="py-2 text-navy/70">{formatOwnerPackageSummary(p)}</td>
                            <td className="py-2 whitespace-nowrap">{p.priceXaf.toLocaleString()} XAF</td>
                            <td className="py-2"><StatusBadge status={p.isActive ? 'ACTIVE' : 'SUSPENDED'} /></td>
                            <td className="py-2 sticky-actions space-x-2 whitespace-nowrap">
                              {p.isActive && (
                                <>
                                  <button
                                    onClick={() => {
                                      setEditingPackage(p);
                                      setShowAddPackage(true);
                                    }}
                                    className="text-brand text-xs hover:text-brand/80"
                                  >
                                    {tc('actions.edit')}
                                  </button>
                                  <button
                                    onClick={() => deactivatePackage(p.id)}
                                    className="text-red-500 text-xs hover:text-red-700"
                                  >
                                    {t('locations.deactivate')}
                                  </button>
                                </>
                              )}
                            </td>
                          </tr>
                        ))
                        )}
                      </tbody>
                    </table>
                    </div>
                  </div>
                )}
                </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      )}

      <Modal open={showEditLocation} onClose={() => setShowEditLocation(false)} title={t('locations.editTitle')}>
        <form onSubmit={updateLocation} className="space-y-4">
          <input
            placeholder={t('locations.locName')}
            value={editLocForm.name}
            onChange={(e) => setEditLocForm({ ...editLocForm, name: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            placeholder={t('locations.address')}
            value={editLocForm.address}
            onChange={(e) => setEditLocForm({ ...editLocForm, address: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
          <Button type="submit" className="w-full">{t('locations.saveChanges')}</Button>
        </form>
      </Modal>

      <Modal open={showAddLocation} onClose={() => setShowAddLocation(false)} title={t('locations.add')}>
        <form onSubmit={createLocation} className="space-y-4">
          <input
            placeholder={t('locations.locName')}
            value={locForm.name}
            onChange={(e) => setLocForm({ ...locForm, name: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            placeholder={t('locations.address')}
            value={locForm.address}
            onChange={(e) => setLocForm({ ...locForm, address: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
          <Button type="submit" className="w-full">{t('locations.create')}</Button>
        </form>
      </Modal>

      <Modal open={showAddRouter} onClose={() => setShowAddRouter(false)} title={t('locations.addRouterTitle')}>
        <form onSubmit={createRouter} className="space-y-4">
          <input
            placeholder={t('locations.routerName')}
            value={routerForm.name}
            onChange={(e) => setRouterForm({ ...routerForm, name: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
          <div>
            <p className="text-sm font-medium text-navy mb-2">{t('locations.routerType')}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {[
                { id: 'PHYSICAL', label: t('locations.physical'), hint: t('locations.physicalHint'), helpSlug: 'setup-mikrotik-hex-existing' },
                { id: 'CHR', label: t('locations.chrLabel'), hint: t('locations.chrHint'), helpSlug: 'setup-chr' },
              ].map((type) => (
                <label
                  key={type.id}
                  className={`flex flex-col p-3 rounded-xl border cursor-pointer transition-colors ${
                    routerForm.deploymentType === type.id
                      ? 'border-brand bg-brand/5 ring-1 ring-brand/20'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <span className="flex items-center gap-2 font-medium text-sm text-navy">
                    <input
                      type="radio"
                      name="deploymentType"
                      value={type.id}
                      checked={routerForm.deploymentType === type.id}
                      onChange={() => setRouterForm({ ...routerForm, deploymentType: type.id })}
                      className="text-brand"
                    />
                    {type.id === 'CHR' ? <Cloud className="w-4 h-4 text-brand" /> : <Router className="w-4 h-4" />}
                    {type.label}
                    <HelpTip slug={type.helpSlug} />
                  </span>
                  <span className="text-xs text-navy/50 mt-1 ml-6">{type.hint}</span>
                </label>
              ))}
            </div>
          </div>
          <Button type="submit" className="w-full">
            {routerForm.deploymentType === 'CHR' ? t('locations.addChr') : t('locations.addRouter')}
          </Button>
        </form>
      </Modal>

      <PackageFormModal
        open={showAddPackage}
        onClose={() => {
          setShowAddPackage(false);
          setEditingPackage(null);
        }}
        onSubmit={savePackage}
        initialPackage={editingPackage}
      />

      <Modal
        open={!!showScript}
        onClose={() => {
          setShowScript(null);
          setSetupRouterId(null);
        }}
        title={t('locations.setupTitle')}
        size="lg"
      >
        <p className="text-sm text-navy/60 mb-4">
          <Trans i18nKey="locations.setupIntro" ns="owner" components={{ strong: <strong /> }} />
        </p>

        {showScript?.previewPortalUrl && (
          <div className="rounded-xl bg-brand/5 border border-brand/10 p-4 mb-4">
            <p className="text-xs font-semibold text-navy/50 uppercase tracking-wide mb-1">{t('locations.testWithout')}</p>
            <a
              href={showScript.previewPortalUrl}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-brand font-medium break-all hover:underline"
            >
              {showScript.previewPortalUrl}
            </a>
          </div>
        )}

        <div className="mb-4">
          <p className="text-xs font-semibold text-navy/50 uppercase tracking-wide mb-2">{t('locations.script1Path')}</p>
          <div className="flex gap-2 mb-3">
            {[
              { id: 'existing', label: t('locations.existing') },
              { id: 'create', label: t('locations.createGuest') },
            ].map((path) => (
              <button
                key={path.id}
                type="button"
                onClick={() => {
                  setPhysicalSetupMode(path.id);
                  if (setupRouterId) loadPhysicalSetup(setupRouterId, path.id, lanIf, wanIf);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                  physicalSetupMode === path.id ? 'bg-brand text-white' : 'bg-gray-100 text-navy/60'
                }`}
              >
                {path.label}
              </button>
            ))}
          </div>
          {physicalSetupMode === 'existing' ? (
            <p className="text-xs text-navy/55 leading-relaxed">
              {t('locations.existingHint')}
            </p>
          ) : (
            <div className="space-y-3">
              <p className="text-xs text-navy/55 leading-relaxed">
                <Trans i18nKey="locations.createHint" ns="owner" components={{ code: <code className="font-mono" /> }} />
              </p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-field">{t('locations.lanGuest')}</label>
                  <input
                    className="input-field font-mono text-sm"
                    value={lanIf}
                    onChange={(e) => setLanIf(e.target.value)}
                    onBlur={() => {
                      if (setupRouterId) loadPhysicalSetup(setupRouterId, 'create', lanIf, wanIf);
                    }}
                  />
                </div>
                <div>
                  <label className="label-field">{t('locations.wan')}</label>
                  <input
                    className="input-field font-mono text-sm"
                    value={wanIf}
                    onChange={(e) => setWanIf(e.target.value)}
                    onBlur={() => {
                      if (setupRouterId) loadPhysicalSetup(setupRouterId, 'create', lanIf, wanIf);
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-2 mb-4">
          {[
            { id: 'hotspot', label: t('locations.scriptHotspot') },
            { id: 'connection', label: t('locations.scriptConnect') },
          ].map((scriptTabDef) => (
            <button
              key={scriptTabDef.id}
              type="button"
              onClick={() => setScriptTab(scriptTabDef.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                scriptTab === scriptTabDef.id ? 'bg-brand text-white' : 'bg-gray-100 text-navy/60'
              }`}
            >
              {scriptTabDef.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <pre className="bg-navy-dark text-green-400 p-4 rounded-xl text-xs overflow-x-auto whitespace-pre-wrap max-h-80">
            {scriptLoading
              ? t('locations.loadingScript')
              : scriptTab === 'hotspot'
                ? showScript?.hotspotSetupScript
                : showScript?.connectionScript}
          </pre>
          <button
            type="button"
            disabled={scriptLoading}
            onClick={() =>
              copyScript(scriptTab === 'hotspot' ? showScript?.hotspotSetupScript : showScript?.connectionScript)
            }
            className="absolute top-2 right-2 p-2 bg-white/10 rounded-lg text-white hover:bg-white/20 disabled:opacity-40"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </Modal>

      <ChrOnboardingWizard
        open={!!chrWizardRouter}
        onClose={() => setChrWizardRouter(null)}
        locationId={expanded}
        router={chrWizardRouter}
        onComplete={() => {
          setChrWizardRouter(null);
          expandLocation(expanded);
          loadLocations();
        }}
      />
    </div>
  );
}
