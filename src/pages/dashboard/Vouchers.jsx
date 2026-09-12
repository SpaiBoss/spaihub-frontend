import { useEffect, useState } from 'react';
import { Plus, Download, Copy, Ban, Ticket, FileText, RefreshCw } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { StatusBadge, Button, Card, EmptyState, Pagination, TableShell } from '../../components/ui';
import VoucherFormModal from '../../components/VoucherFormModal';
import VoucherPdfModal from '../../components/VoucherPdfModal';
import { formatOwnerPackageSummary } from '../../utils/packages';

const STATUS_OPTIONS = ['', 'UNUSED', 'REDEEMED', 'EXPIRED', 'REVOKED'];

export default function Vouchers() {
  const [locations, setLocations] = useState([]);
  const [packagesByLocation, setPackagesByLocation] = useState({});
  const [stats, setStats] = useState(null);
  const [data, setData] = useState({ vouchers: [], pagination: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [showPdfExport, setShowPdfExport] = useState(false);
  const [branding, setBranding] = useState(null);
  const [filters, setFilters] = useState({ locationId: '', status: '', page: 1 });
  const [syncing, setSyncing] = useState(false);

  async function loadLocations() {
    try {
      const { data: locs } = await api.get('/api/owner/locations');
      setLocations(locs);

      const pkgMap = {};
      await Promise.all(
        locs.map(async (loc) => {
          const { data: pkgs } = await api.get(`/api/owner/locations/${loc.id}/packages`);
          pkgMap[loc.id] = pkgs;
        })
      );
      setPackagesByLocation(pkgMap);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to load locations');
    }
  }

  async function loadVouchers() {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      Object.entries(filters).forEach(([k, v]) => { if (v) params.set(k, v); });
      const [listRes, statsRes] = await Promise.all([
        api.get(`/api/owner/vouchers?${params}`),
        api.get('/api/owner/vouchers/stats'),
      ]);
      setData(listRes.data);
      setStats(statsRes.data);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load vouchers');
      setData({ vouchers: [], pagination: {} });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLocations();
    api.get('/api/owner/branding').then((res) => setBranding(res.data.resolved)).catch(() => {});
  }, []);

  useEffect(() => {
    loadVouchers();
  }, [filters]);

  async function createVouchers(locationId, payload) {
    const { data: result } = await api.post(`/api/owner/locations/${locationId}/vouchers`, payload);
    loadVouchers();
    return result;
  }

  async function syncUnusedToRouter() {
    if (!filters.locationId) {
      toast.error('Select a location first');
      return;
    }
    setSyncing(true);
    try {
      const { data: result } = await api.post(
        `/api/owner/locations/${filters.locationId}/vouchers/sync`
      );
      toast.success(result.message || 'Sync queued');
      if (result.queued > 0) {
        toast.success('Wait ~15s for spaihub-commands to import, then check Hotspot users');
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Could not sync vouchers to router');
    } finally {
      setSyncing(false);
    }
  }

  async function revokeVoucher(id) {
    try {
      await api.post(`/api/owner/vouchers/${id}/revoke`);
      toast.success('Voucher revoked');
      loadVouchers();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to revoke voucher');
    }
  }

  async function exportPdf(perPage) {
    try {
      const params = new URLSearchParams({ perPage: String(perPage) });
      if (filters.locationId) params.set('locationId', filters.locationId);
      if (filters.status) params.set('status', filters.status);
      const response = await api.get(`/api/owner/vouchers/export/pdf?${params}`, { responseType: 'blob' });
      const url = URL.createObjectURL(response.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `spaihub-vouchers-${perPage}up.pdf`;
      a.click();
      URL.revokeObjectURL(url);
      toast.success('PDF ready to print');
    } catch (err) {
      toast.error(err.response?.data?.error || 'PDF export failed');
    }
  }

  async function exportCsv() {
    try {
      const params = new URLSearchParams();
      if (filters.locationId) params.set('locationId', filters.locationId);
      if (filters.status) params.set('status', filters.status);
      const response = await api.get(`/api/owner/vouchers/export?${params}`, { responseType: 'blob' });
      const url = URL.createObjectURL(response.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'vouchers.csv';
      a.click();
      URL.revokeObjectURL(url);
      toast.success('CSV exported');
    } catch (err) {
      toast.error(err.response?.data?.error || 'CSV export failed');
    }
  }

  function copyCode(code) {
    navigator.clipboard.writeText(code);
    toast.success('Code copied');
  }

  return (
    <div>
      {stats && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Unused', value: stats.unused, color: 'text-brand' },
            { label: 'Redeemed', value: stats.redeemed, color: 'text-emerald-600' },
            { label: 'Expired', value: stats.expired, color: 'text-amber-600' },
            { label: 'Revoked', value: stats.revoked, color: 'text-red-500' },
          ].map((s) => (
            <Card key={s.label} bodyClassName="p-4">
              <p className="text-xs font-semibold text-navy/50 uppercase tracking-wide">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.color}`}>{s.value}</p>
            </Card>
          ))}
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-6">
        <select
          value={filters.locationId}
          onChange={(e) => setFilters({ ...filters, locationId: e.target.value, page: 1 })}
          className="select-field w-full sm:w-auto sm:min-w-[160px] py-2.5 min-h-[44px]"
        >
          <option value="">All locations</option>
          {locations.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
          className="select-field w-full sm:w-auto sm:min-w-[140px] py-2.5 min-h-[44px]"
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.filter(Boolean).map((s) => (
            <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>
          ))}
        </select>
        <Button onClick={() => setShowCreate(true)} className="gap-2 w-full sm:w-auto min-h-[44px]">
          <Plus className="w-4 h-4" /> Generate vouchers
        </Button>
        <Button
          variant="secondary"
          onClick={syncUnusedToRouter}
          disabled={syncing || !filters.locationId}
          className="gap-2 w-full sm:w-auto min-h-[44px]"
          title={!filters.locationId ? 'Select a location first' : 'Queue unused vouchers onto the MikroTik'}
        >
          <RefreshCw className={`w-4 h-4 ${syncing ? 'animate-spin' : ''}`} />
          {syncing ? 'Syncing…' : 'Sync to router'}
        </Button>
        <div className="flex gap-3 w-full sm:w-auto sm:ml-auto">
          <Button variant="secondary" onClick={() => setShowPdfExport(true)} className="gap-2 flex-1 sm:flex-none min-h-[44px]">
            <FileText className="w-4 h-4" /> PDF
          </Button>
          <Button variant="secondary" onClick={exportCsv} className="gap-2 flex-1 sm:flex-none min-h-[44px]">
            <Download className="w-4 h-4" /> CSV
          </Button>
        </div>
      </div>

      {error && (
        <Card className="mb-6">
          <EmptyState
            title="Could not load vouchers"
            description={error}
            action={<Button onClick={loadVouchers}>Retry</Button>}
          />
        </Card>
      )}

      {/* Phone-friendly cards */}
      <div className="md:hidden space-y-3">
        {loading ? (
          <Card bodyClassName="p-6 text-center text-navy/40 text-sm">Loading vouchers...</Card>
        ) : data.vouchers.length === 0 ? (
          <Card>
            <EmptyState
              icon={Ticket}
              title="No vouchers yet"
              description="Generate prepaid codes for subscribers to redeem on your captive portal."
              action={
                <Button onClick={() => setShowCreate(true)}>
                  <Plus className="w-4 h-4" /> Generate vouchers
                </Button>
              }
            />
          </Card>
        ) : (
          data.vouchers.map((v) => (
            <div key={v.id} className="card p-4">
              <div className="flex items-start justify-between gap-3">
                <p className="font-mono font-semibold text-navy text-sm break-all">{v.code}</p>
                <StatusBadge status={v.status} />
              </div>
              <p className="text-sm text-navy mt-2 font-medium">{v.package.name}</p>
              <p className="text-xs text-navy/50 mt-0.5">{formatOwnerPackageSummary(v.package)}</p>
              <p className="text-xs text-navy/45 mt-2">
                {v.location.name}
                {v.batchLabel ? ` · ${v.batchLabel}` : ''}
              </p>
              <div className="flex gap-2 mt-3">
                <button
                  type="button"
                  onClick={() => copyCode(v.code)}
                  className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand/10 text-brand text-sm font-medium"
                >
                  <Copy className="w-4 h-4" /> Copy
                </button>
                {v.status === 'UNUSED' && (
                  <button
                    type="button"
                    onClick={() => revokeVoucher(v.id)}
                    className="flex-1 min-h-[44px] inline-flex items-center justify-center gap-1.5 rounded-lg bg-red-50 text-red-600 text-sm font-medium"
                  >
                    <Ban className="w-4 h-4" /> Revoke
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="hidden md:block">
      <TableShell>
        <table>
          <thead>
            <tr>
              <th>Code</th>
              <th>Location</th>
              <th>Package</th>
              <th>Batch</th>
              <th>Status</th>
              <th>Expires</th>
              <th>Redeemed</th>
              <th className="sticky-actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={8} className="p-12 text-center text-navy/40">Loading vouchers...</td></tr>
            ) : data.vouchers.length === 0 ? (
              <tr>
                <td colSpan={8}>
                  <EmptyState
                    icon={Ticket}
                    title="No vouchers yet"
                    description="Generate prepaid codes for subscribers to redeem on your captive portal."
                    action={
                      <Button onClick={() => setShowCreate(true)}>
                        <Plus className="w-4 h-4" /> Generate vouchers
                      </Button>
                    }
                  />
                </td>
              </tr>
            ) : (
              data.vouchers.map((v) => (
                <tr key={v.id}>
                  <td className="font-mono font-semibold text-navy">{v.code}</td>
                  <td>{v.location.name}</td>
                  <td>
                    <p className="font-medium">{v.package.name}</p>
                    <p className="text-xs text-navy/50">{formatOwnerPackageSummary(v.package)}</p>
                  </td>
                  <td className="text-navy/70">{v.batchLabel || '—'}</td>
                  <td><StatusBadge status={v.status} /></td>
                  <td className="text-navy/70">
                    {v.expiresAt ? new Date(v.expiresAt).toLocaleString() : '—'}
                  </td>
                  <td className="text-navy/70">
                    {v.redeemedAt ? new Date(v.redeemedAt).toLocaleString() : '—'}
                  </td>
                  <td className="sticky-actions whitespace-nowrap">
                    <button onClick={() => copyCode(v.code)} className="text-brand text-xs mr-3 hover:text-brand-dark font-medium">
                      <Copy className="w-3.5 h-3.5 inline" /> Copy
                    </button>
                    {v.status === 'UNUSED' && (
                      <button onClick={() => revokeVoucher(v.id)} className="text-red-500 text-xs hover:text-red-700 font-medium">
                        <Ban className="w-3.5 h-3.5 inline" /> Revoke
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </TableShell>
      </div>

      <Pagination
        className="mt-6"
        page={filters.page}
        totalPages={data.pagination.totalPages}
        total={data.pagination.total}
        limit={data.pagination.limit}
        onPageChange={(p) => setFilters({ ...filters, page: p })}
      />

      <VoucherFormModal
        open={showCreate}
        onClose={() => setShowCreate(false)}
        onSubmit={createVouchers}
        locations={locations}
        packagesByLocation={packagesByLocation}
      />

      <VoucherPdfModal
        open={showPdfExport}
        onClose={() => setShowPdfExport(false)}
        onExport={exportPdf}
        filters={filters}
        branding={branding}
        loading={loading}
      />
    </div>
  );
}
