import { useEffect, useState } from 'react';
import { Plus, ChevronDown, ChevronUp, Copy, Check, MapPin, ExternalLink, Router, Shield, Pencil, Trash2, UserX } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { Modal, StatusBadge, Button, Card, EmptyState } from '../../components/ui';
import PackageFormModal from '../../components/PackageFormModal';
import { formatOwnerPackageSummary, PACKAGE_TYPE_LABELS } from '../../utils/packages';

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState(null);
  const [tab, setTab] = useState('routers');
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [showAddRouter, setShowAddRouter] = useState(false);
  const [showAddPackage, setShowAddPackage] = useState(false);
  const [editingPackage, setEditingPackage] = useState(null);
  const [showScript, setShowScript] = useState(null);
  const [scriptTab, setScriptTab] = useState('hotspot');
  const [routers, setRouters] = useState([]);
  const [packages, setPackages] = useState([]);
  const [copied, setCopied] = useState(false);
  const [expandLoading, setExpandLoading] = useState(false);
  const [showEditLocation, setShowEditLocation] = useState(false);
  const [editLocForm, setEditLocForm] = useState({ name: '', address: '' });
  const [sessions, setSessions] = useState([]);

  const [locForm, setLocForm] = useState({ name: '', address: '' });
  const [routerForm, setRouterForm] = useState({ name: '' });
  const [accessPolicy, setAccessPolicy] = useState({
    allowHotspotSharing: false,
    maxHotspotDevices: 0,
    maxDevicesPerAccessCode: 0,
  });
  const [savingPolicy, setSavingPolicy] = useState(false);

  async function loadLocations() {
    try {
      const { data } = await api.get('/api/owner/locations');
      setLocations(data);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to load locations');
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
        allowHotspotSharing: loc.allowHotspotSharing ?? false,
        maxHotspotDevices: loc.maxHotspotDevices ?? 0,
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
      toast.error(err.response?.data?.error || 'Failed to load location details');
    } finally {
      setExpandLoading(false);
    }
  }

  async function saveAccessPolicy() {
    setSavingPolicy(true);
    try {
      const { data } = await api.patch(`/api/owner/locations/${expanded}`, accessPolicy);
      toast.success('Access policy saved');
      setLocations((prev) => prev.map((loc) => (loc.id === expanded ? { ...loc, ...data } : loc)));
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save access policy');
    } finally {
      setSavingPolicy(false);
    }
  }

  async function createLocation(e) {
    e.preventDefault();
    try {
      await api.post('/api/owner/locations', locForm);
      toast.success('Location created');
      setShowAddLocation(false);
      setLocForm({ name: '', address: '' });
      loadLocations();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to create location');
    }
  }

  async function updateLocation(e) {
    e.preventDefault();
    try {
      const { data } = await api.patch(`/api/owner/locations/${expanded}`, editLocForm);
      toast.success('Location updated');
      setShowEditLocation(false);
      setLocations((prev) => prev.map((loc) => (loc.id === expanded ? { ...loc, ...data } : loc)));
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update location');
    }
  }

  async function toggleLocationActive(loc) {
    try {
      const { data } = await api.patch(`/api/owner/locations/${loc.id}`, {
        isActive: !loc.isActive,
      });
      toast.success(data.isActive ? 'Location activated' : 'Location suspended');
      setLocations((prev) => prev.map((l) => (l.id === loc.id ? { ...l, ...data } : l)));
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update location status');
    }
  }

  async function deleteRouter(routerId) {
    if (!window.confirm('Remove this router? Subscribers will no longer reach the portal through it.')) return;
    try {
      await api.delete(`/api/owner/locations/${expanded}/routers/${routerId}`);
      toast.success('Router removed');
      expandLocation(expanded);
      loadLocations();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to remove router');
    }
  }

  async function kickSession(transactionId) {
    try {
      await api.post(`/api/owner/sessions/${transactionId}/kick`);
      toast.success('Session ended');
      expandLocation(expanded);
      loadLocations();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to end session');
    }
  }

  async function createRouter(e) {
    e.preventDefault();
    try {
      const { data } = await api.post(`/api/owner/locations/${expanded}/routers`, routerForm);
      toast.success('Router added');
      setShowAddRouter(false);
      setShowScript(data);
      setScriptTab('hotspot');
      setRouterForm({ name: '' });
      expandLocation(expanded);
      loadLocations();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to add router');
    }
  }

  async function savePackage(payload) {
    try {
      if (editingPackage) {
        await api.patch(`/api/owner/locations/${expanded}/packages/${editingPackage.id}`, payload);
        toast.success('Package updated');
      } else {
        await api.post(`/api/owner/locations/${expanded}/packages`, payload);
        toast.success('Package created');
      }
      expandLocation(expanded);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to save package');
      throw err;
    }
  }

  async function deactivatePackage(packageId) {
    try {
      await api.delete(`/api/owner/locations/${expanded}/packages/${packageId}`);
      toast.success('Package deactivated');
      expandLocation(expanded);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to deactivate package');
    }
  }

  function copyScript(text) {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast.success('Copied to clipboard');
  }

  async function openRouterSetup(routerId) {
    const { data } = await api.get(`/api/owner/locations/${expanded}/routers/${routerId}/setup`);
    setScriptTab('hotspot');
    setShowScript(data);
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
      <div className="flex justify-between items-center mb-6">
        <p className="text-sm text-navy/50 font-medium">
          {locations.length} location{locations.length !== 1 ? 's' : ''}
        </p>
        <Button onClick={() => setShowAddLocation(true)} className="gap-2">
          <Plus className="w-4 h-4" /> Add Location
        </Button>
      </div>

      {locations.length === 0 ? (
        <Card>
          <EmptyState
            icon={MapPin}
            title="No locations yet"
            description="Add your first hotspot location to start deploying routers and selling internet packages."
            action={
              <Button onClick={() => setShowAddLocation(true)}>
                <Plus className="w-4 h-4" /> Add Location
              </Button>
            }
          />
        </Card>
      ) : (
      <div className="space-y-4">
        {locations.map((loc) => (
          <div key={loc.id} className="card overflow-hidden hover:shadow-card-hover transition-shadow duration-200">
            <button
              onClick={() => expandLocation(loc.id)}
              className="w-full card-body flex items-center justify-between text-left hover:bg-brand/[0.02] transition-colors"
            >
              <div>
                <h3 className="font-semibold text-navy">{loc.name}</h3>
                <p className="text-sm text-navy/50 mt-0.5">{loc.address}</p>
                <div className="flex gap-4 mt-2 text-xs text-navy/40 font-medium">
                  <span>{loc.onlineRouters}/{loc.routerCount} routers online</span>
                  <span>{loc.activeSessions} active sessions</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <StatusBadge status={loc.isActive ? 'ACTIVE' : 'SUSPENDED'} />
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLocationActive(loc);
                  }}
                  className="text-xs px-2 py-1 rounded-lg bg-gray-100 text-navy/70 hover:bg-gray-200"
                >
                  {loc.isActive ? 'Suspend' : 'Activate'}
                </button>
                {expanded === loc.id ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </div>
            </button>

            {expanded === loc.id && (
              <div className="border-t border-gray-100 p-5">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
                  <div className="flex gap-2">
                  {[
                    { id: 'routers', label: 'Routers' },
                    { id: 'packages', label: 'Packages' },
                    { id: 'sessions', label: 'Sessions' },
                    { id: 'access', label: 'Access policy' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      onClick={() => setTab(t.id)}
                      className={`px-4 py-1.5 rounded-lg text-sm font-medium ${
                        tab === t.id ? 'bg-brand text-white' : 'bg-gray-100 text-gray-600'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowEditLocation(true)}
                    className="text-xs text-navy/60 hover:text-navy inline-flex items-center gap-1"
                  >
                    <Pencil className="w-3.5 h-3.5" /> Edit location
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
                        <Plus className="w-4 h-4" /> Add Router
                      </button>
                    </div>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-500 border-b">
                          <th className="pb-2">Name</th>
                          <th className="pb-2">Status</th>
                          <th className="pb-2">Last Seen</th>
                          <th className="pb-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {routers.length === 0 ? (
                          <tr>
                            <td colSpan={4} className="py-6 text-center text-navy/50 text-sm">
                              No routers yet. Add one to get your captive portal link — no physical router needed to preview.
                            </td>
                          </tr>
                        ) : (
                        routers.map((r) => (
                          <tr key={r.id} className="border-b border-gray-50">
                            <td className="py-2 font-medium">{r.name}</td>
                            <td className="py-2"><StatusBadge status={r.status} /></td>
                            <td className="py-2 text-gray-400">
                              {r.lastSeenAt ? new Date(r.lastSeenAt).toLocaleString() : 'Never (normal without MikroTik)'}
                            </td>
                            <td className="py-2 whitespace-nowrap space-x-2 text-right">
                              <button
                                type="button"
                                onClick={() => openPreviewPortal(r)}
                                className="text-brand text-xs font-medium hover:text-brand-dark inline-flex items-center gap-1"
                              >
                                <ExternalLink className="w-3.5 h-3.5" /> Preview portal
                              </button>
                              <button
                                type="button"
                                onClick={() => openRouterSetup(r.id)}
                                className="text-navy/60 text-xs font-medium hover:text-navy inline-flex items-center gap-1"
                              >
                                <Router className="w-3.5 h-3.5" /> Setup script
                              </button>
                              <button
                                type="button"
                                onClick={() => deleteRouter(r.id)}
                                className="text-red-500 text-xs font-medium hover:text-red-700 inline-flex items-center gap-1"
                              >
                                <Trash2 className="w-3.5 h-3.5" /> Remove
                              </button>
                            </td>
                          </tr>
                        ))
                        )}
                      </tbody>
                    </table>
                  </div>
                )}

                {tab === 'access' && (
                  <div className="max-w-md">
                    <div className="flex items-start gap-3 mb-6">
                      <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center shrink-0">
                        <Shield className="w-4 h-4 text-brand" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-navy">Access policy</h4>
                        <p className="text-sm text-navy/50 mt-0.5">
                          Control how many devices can use each voucher or access code, and whether hotspot sharing is allowed.
                        </p>
                      </div>
                    </div>

                    <div className="space-y-5">
                      <div>
                        <label className="label-field">Devices per access code</label>
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
                          0 = one device per voucher or WiFi code (default). Maps to MikroTik <code className="text-navy/60">shared-users</code> on the router.
                        </p>
                      </div>

                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={accessPolicy.allowHotspotSharing}
                          onChange={(e) =>
                            setAccessPolicy({
                              ...accessPolicy,
                              allowHotspotSharing: e.target.checked,
                              ...(e.target.checked ? {} : { maxHotspotDevices: 0 }),
                            })
                          }
                          className="mt-1 rounded border-gray-300 text-brand focus:ring-brand"
                        />
                        <span>
                          <span className="font-medium text-navy block">Allow hotspot sharing</span>
                          <span className="text-sm text-navy/50">
                            When enabled, additional devices can connect using the same access code via hotspot. Disabling this adds TTL anti-tethering rules on the router setup script.
                          </span>
                        </span>
                      </label>

                      <div className={accessPolicy.allowHotspotSharing ? '' : 'opacity-50 pointer-events-none'}>
                        <label className="label-field">Max hotspot devices per code</label>
                        <input
                          type="number"
                          min={0}
                          value={accessPolicy.maxHotspotDevices}
                          onChange={(e) =>
                            setAccessPolicy({
                              ...accessPolicy,
                              maxHotspotDevices: Math.max(0, Number(e.target.value) || 0),
                            })
                          }
                          className="input-field"
                          disabled={!accessPolicy.allowHotspotSharing}
                        />
                        <p className="text-xs text-navy/45 mt-1.5">
                          0 = hotspot sharing disabled (default). Primary device only. Does not include the main device.
                        </p>
                      </div>

                      <Button onClick={saveAccessPolicy} disabled={savingPolicy} className="w-full sm:w-auto">
                        {savingPolicy ? 'Saving...' : 'Save access policy'}
                      </Button>
                    </div>
                  </div>
                )}

                {tab === 'sessions' && (
                  <div>
                    {sessions.length === 0 ? (
                      <p className="text-sm text-navy/50 text-center py-8">No active sessions at this location.</p>
                    ) : (
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left text-gray-500 border-b">
                            <th className="pb-2">Device</th>
                            <th className="pb-2">Package</th>
                            <th className="pb-2">Router</th>
                            <th className="pb-2">Ends</th>
                            <th className="pb-2"></th>
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
                              <td className="py-2 text-gray-400">{new Date(s.sessionEnd).toLocaleString()}</td>
                              <td className="py-2 text-right">
                                <button
                                  type="button"
                                  onClick={() => kickSession(s.id)}
                                  className="text-red-500 text-xs font-medium hover:text-red-700 inline-flex items-center gap-1"
                                >
                                  <UserX className="w-3.5 h-3.5" /> Kick
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
                        <Plus className="w-4 h-4" /> Add Package
                      </button>
                    </div>
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left text-gray-500 border-b">
                          <th className="pb-2">Name</th>
                          <th className="pb-2">Type</th>
                          <th className="pb-2">Details</th>
                          <th className="pb-2">Price</th>
                          <th className="pb-2">Status</th>
                          <th className="pb-2"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {packages.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="py-8 text-center text-navy/50 text-sm">
                              No packages yet. Add one so subscribers can buy internet on your portal.
                            </td>
                          </tr>
                        ) : (
                        packages.map((p) => (
                          <tr key={p.id} className="border-b border-gray-50">
                            <td className="py-2 font-medium">{p.name}</td>
                            <td className="py-2">
                              <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-navy font-medium">
                                {PACKAGE_TYPE_LABELS[p.type] || 'Time-based'}
                              </span>
                            </td>
                            <td className="py-2 text-navy/70">{formatOwnerPackageSummary(p)}</td>
                            <td className="py-2">{p.priceXaf.toLocaleString()} XAF</td>
                            <td className="py-2"><StatusBadge status={p.isActive ? 'ACTIVE' : 'SUSPENDED'} /></td>
                            <td className="py-2 space-x-2">
                              {p.isActive && (
                                <>
                                  <button
                                    onClick={() => {
                                      setEditingPackage(p);
                                      setShowAddPackage(true);
                                    }}
                                    className="text-brand text-xs hover:text-brand/80"
                                  >
                                    Edit
                                  </button>
                                  <button
                                    onClick={() => deactivatePackage(p.id)}
                                    className="text-red-500 text-xs hover:text-red-700"
                                  >
                                    Deactivate
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
                )}
                </>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
      )}

      <Modal open={showEditLocation} onClose={() => setShowEditLocation(false)} title="Edit location">
        <form onSubmit={updateLocation} className="space-y-4">
          <input
            placeholder="Location name"
            value={editLocForm.name}
            onChange={(e) => setEditLocForm({ ...editLocForm, name: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            placeholder="Address"
            value={editLocForm.address}
            onChange={(e) => setEditLocForm({ ...editLocForm, address: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
          <button type="submit" className="w-full bg-brand text-white py-2 rounded-lg">Save changes</button>
        </form>
      </Modal>

      <Modal open={showAddLocation} onClose={() => setShowAddLocation(false)} title="Add Location">
        <form onSubmit={createLocation} className="space-y-4">
          <input
            placeholder="Location name"
            value={locForm.name}
            onChange={(e) => setLocForm({ ...locForm, name: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
          <input
            placeholder="Address"
            value={locForm.address}
            onChange={(e) => setLocForm({ ...locForm, address: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
          <button type="submit" className="w-full bg-brand text-white py-2 rounded-lg">Create</button>
        </form>
      </Modal>

      <Modal open={showAddRouter} onClose={() => setShowAddRouter(false)} title="Add Router">
        <form onSubmit={createRouter} className="space-y-4">
          <input
            placeholder="Router name"
            value={routerForm.name}
            onChange={(e) => setRouterForm({ name: e.target.value })}
            required
            className="w-full px-3 py-2 border rounded-lg"
          />
          <button type="submit" className="w-full bg-brand text-white py-2 rounded-lg">Add Router</button>
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

      <Modal open={!!showScript} onClose={() => setShowScript(null)} title="Router & captive portal setup" size="lg">
        <p className="text-sm text-navy/60 mb-4">
          Test the subscriber portal now with <strong>Preview portal</strong>. When you get a MikroTik, run these scripts on the router.
        </p>

        {showScript?.previewPortalUrl && (
          <div className="rounded-xl bg-brand/5 border border-brand/10 p-4 mb-4">
            <p className="text-xs font-semibold text-navy/50 uppercase tracking-wide mb-1">Test without a router</p>
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

        <div className="flex gap-2 mb-4">
          {[
            { id: 'hotspot', label: '1. Hotspot setup (once)' },
            { id: 'connection', label: '2. Connect to SpaiHub' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setScriptTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold ${
                scriptTab === tab.id ? 'bg-brand text-white' : 'bg-gray-100 text-navy/60'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="relative">
          <pre className="bg-navy-dark text-green-400 p-4 rounded-xl text-xs overflow-x-auto whitespace-pre-wrap max-h-80">
            {scriptTab === 'hotspot' ? showScript?.hotspotSetupScript : showScript?.connectionScript}
          </pre>
          <button
            type="button"
            onClick={() =>
              copyScript(scriptTab === 'hotspot' ? showScript?.hotspotSetupScript : showScript?.connectionScript)
            }
            className="absolute top-2 right-2 p-2 bg-white/10 rounded-lg text-white hover:bg-white/20"
          >
            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>
      </Modal>
    </div>
  );
}
