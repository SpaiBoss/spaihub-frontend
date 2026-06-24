import { useEffect, useState } from 'react';
import { Plus, Download, Copy, Ban, Ticket, FileText } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { StatusBadge, Button, Card, EmptyState, Pagination, TableShell } from '../../components/ui';
import VoucherFormModal from '../../components/VoucherFormModal';
import VoucherPdfModal from '../../components/VoucherPdfModal';
import { formatPortalPackageSummary } from '../../utils/packages';

const STATUS_OPTIONS = ['', 'UNUSED', 'REDEEMED', 'EXPIRED', 'REVOKED'];

export default function Vouchers() {
  const [locations, setLocations] = useState([]);
  const [packagesByLocation, setPackagesByLocation] = useState({});
  const [stats, setStats] = useState(null);
  const [data, setData] = useState({ vouchers: [], pagination: {} });
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [showPdfExport, setShowPdfExport] = useState(false);
  const [branding, setBranding] = useState(null);
  const [filters, setFilters] = useState({ locationId: '', status: '', page: 1 });

  async function loadLocations() {
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
  }

  async function loadVouchers() {
    setLoading(true);
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => { if (v) params.set(k, v); });
    const [listRes, statsRes] = await Promise.all([
      api.get(`/api/owner/vouchers?${params}`),
      api.get('/api/owner/vouchers/stats'),
    ]);
    setData(listRes.data);
    setStats(statsRes.data);
    setLoading(false);
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

  async function revokeVoucher(id) {
    await api.post(`/api/owner/vouchers/${id}/revoke`);
    toast.success('Voucher revoked');
    loadVouchers();
  }

  async function exportPdf(perPage) {
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
  }

  async function exportCsv() {
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

      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={filters.locationId}
          onChange={(e) => setFilters({ ...filters, locationId: e.target.value, page: 1 })}
          className="select-field w-auto min-w-[160px] py-2"
        >
          <option value="">All locations</option>
          {locations.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
          className="select-field w-auto min-w-[140px] py-2"
        >
          <option value="">All statuses</option>
          {STATUS_OPTIONS.filter(Boolean).map((s) => (
            <option key={s} value={s}>{s.charAt(0) + s.slice(1).toLowerCase()}</option>
          ))}
        </select>
        <Button onClick={() => setShowCreate(true)} className="gap-2">
          <Plus className="w-4 h-4" /> Generate vouchers
        </Button>
        <Button variant="secondary" onClick={() => setShowPdfExport(true)} className="gap-2 ml-auto">
          <FileText className="w-4 h-4" /> Print PDF
        </Button>
        <Button variant="secondary" onClick={exportCsv} className="gap-2">
          <Download className="w-4 h-4" /> Export CSV
        </Button>
      </div>

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
              <th></th>
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
                    <p className="text-xs text-navy/50">{formatPortalPackageSummary(v.package)}</p>
                  </td>
                  <td className="text-navy/70">{v.batchLabel || '—'}</td>
                  <td><StatusBadge status={v.status} /></td>
                  <td className="text-navy/70">
                    {v.expiresAt ? new Date(v.expiresAt).toLocaleString() : '—'}
                  </td>
                  <td className="text-navy/70">
                    {v.redeemedAt ? new Date(v.redeemedAt).toLocaleString() : '—'}
                  </td>
                  <td className="whitespace-nowrap">
                    <button onClick={() => copyCode(v.code)} className="text-brand text-xs mr-3 hover:text-brand-dark font-medium">
                      <Copy className="w-3.5 h-3.5 inline" />
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
