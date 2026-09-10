import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { Pagination, StatusBadge, EmptyState, Skeleton, Button, Input, Modal } from '../../components/ui';
import { AdminGuard, AdminLayout } from './AdminLogin';

export default function AdminContributorLinks() {
  const [links, setLinks] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [contributors, setContributors] = useState([]);
  const [locations, setLocations] = useState([]);
  const [form, setForm] = useState({
    contributorId: '',
    locationId: '',
    interfaceName: 'ether5',
    capMbps: '30',
    rateXafPerGb: '50',
    status: 'ACTIVE',
    notes: '',
  });
  const [meterLink, setMeterLink] = useState(null);
  const [bytesTotal, setBytesTotal] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function load(currentPage = page) {
    setLoading(true);
    try {
      const { data } = await api.get(`/api/admin/contributor-links?page=${currentPage}`);
      setLinks(data.links);
      setPagination(data.pagination);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to load links');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(page);
  }, [page]);

  async function openCreate() {
    try {
      const [cRes, locRes] = await Promise.all([
        api.get('/api/admin/contributors?page=1'),
        api.get('/api/admin/locations'),
      ]);
      setContributors(cRes.data.contributors || []);
      setLocations(locRes.data.locations || []);
      setShowCreate(true);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to load form data');
    }
  }

  async function handleCreate(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await api.post('/api/admin/contributor-links', {
        contributorId: form.contributorId,
        locationId: form.locationId,
        interfaceName: form.interfaceName,
        capMbps: Number(form.capMbps),
        rateXafPerGb: Number(form.rateXafPerGb),
        status: form.status,
        notes: form.notes || undefined,
      });
      toast.success('Link created');
      setShowCreate(false);
      load(page);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Create failed');
    } finally {
      setSubmitting(false);
    }
  }

  async function setStatus(id, status) {
    try {
      await api.patch(`/api/admin/contributor-links/${id}`, { status });
      toast.success(`Link ${status.toLowerCase()}`);
      load(page);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Update failed');
    }
  }

  async function postMeter(e) {
    e.preventDefault();
    setSubmitting(true);
    try {
      const { data } = await api.post(`/api/admin/contributor-links/${meterLink.id}/meters`, {
        bytesTotal,
      });
      toast.success(
        data.skipped
          ? `Sample saved (${data.reason})`
          : `Accrued ${data.accrual?.amountXaf?.toLocaleString() || 0} XAF`
      );
      setMeterLink(null);
      setBytesTotal('');
      load(page);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Meter failed');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AdminGuard>
      <AdminLayout title="Contributor links" description="Register physical WANs and post meter readings">
        <div className="mb-4 flex justify-between items-center gap-3">
          <Link to="/admin/contributors" className="text-sm text-brand font-medium">
            ← Contributors
          </Link>
          <Button onClick={openCreate}>Add link</Button>
        </div>

        {loading ? (
          <Skeleton className="h-48 rounded-xl" />
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b bg-gray-50">
                  <th className="p-3">Contributor</th>
                  <th className="p-3">Location</th>
                  <th className="p-3">Interface</th>
                  <th className="p-3">Cap / Rate</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {links.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8">
                      <EmptyState title="No links yet" description="Create a link after the Hex port is wired." />
                    </td>
                  </tr>
                ) : (
                  links.map((l) => (
                    <tr key={l.id} className="border-b border-gray-50">
                      <td className="p-3">
                        <p className="font-medium">{l.contributor?.name}</p>
                        <p className="text-xs text-navy/45">{l.contributor?.email}</p>
                      </td>
                      <td className="p-3">{l.location?.name}</td>
                      <td className="p-3 font-mono text-xs">{l.interfaceName}</td>
                      <td className="p-3">
                        {l.capMbps} Mbps · {l.rateXafPerGb} XAF/GB
                      </td>
                      <td className="p-3">
                        <StatusBadge status={l.status} />
                      </td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => setMeterLink(l)}
                            className="text-xs px-3 py-1 rounded-lg bg-brand/10 text-brand"
                          >
                            Post meter
                          </button>
                          {l.status === 'ACTIVE' ? (
                            <button
                              type="button"
                              onClick={() => setStatus(l.id, 'PAUSED')}
                              className="text-xs px-3 py-1 rounded-lg bg-amber-100 text-amber-800"
                            >
                              Pause
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setStatus(l.id, 'ACTIVE')}
                              className="text-xs px-3 py-1 rounded-lg bg-green-100 text-green-700"
                            >
                              Activate
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
            <Pagination
              className="p-4 border-t"
              page={pagination.page}
              totalPages={pagination.totalPages}
              total={pagination.total}
              limit={pagination.limit}
              onPageChange={setPage}
            />
          </div>
        )}

        <Modal open={showCreate} onClose={() => setShowCreate(false)} title="Add contributor link">
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Contributor</label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={form.contributorId}
                onChange={(e) => setForm({ ...form, contributorId: e.target.value })}
                required
              >
                <option value="">Select…</option>
                {contributors.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.email})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Location</label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={form.locationId}
                onChange={(e) => setForm({ ...form, locationId: e.target.value })}
                required
              >
                <option value="">Select…</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} — {loc.owner?.name || loc.ownerId}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label="Interface name"
              value={form.interfaceName}
              onChange={(e) => setForm({ ...form, interfaceName: e.target.value })}
              required
            />
            <Input
              label="Cap (Mbps)"
              type="number"
              value={form.capMbps}
              onChange={(e) => setForm({ ...form, capMbps: e.target.value })}
              required
            />
            <Input
              label="Rate (XAF per GB)"
              type="number"
              value={form.rateXafPerGb}
              onChange={(e) => setForm({ ...form, rateXafPerGb: e.target.value })}
              required
            />
            <div>
              <label className="block text-sm font-medium mb-1">Status</label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="PENDING">PENDING</option>
                <option value="ACTIVE">ACTIVE</option>
                <option value="PAUSED">PAUSED</option>
                <option value="DISABLED">DISABLED</option>
              </select>
            </div>
            <Input
              label="Notes"
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? 'Creating…' : 'Create link'}
            </Button>
          </form>
        </Modal>

        <Modal open={!!meterLink} onClose={() => setMeterLink(null)} title="Post meter reading">
          {meterLink && (
            <form onSubmit={postMeter} className="space-y-4">
              <p className="text-sm text-navy/60">
                {meterLink.contributor?.name} · {meterLink.interfaceName} at {meterLink.location?.name}
              </p>
              <Input
                label="bytesTotal (monotonic counter)"
                value={bytesTotal}
                onChange={(e) => setBytesTotal(e.target.value.replace(/\D/g, ''))}
                required
              />
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? 'Posting…' : 'Post sample'}
              </Button>
            </form>
          )}
        </Modal>
      </AdminLayout>
    </AdminGuard>
  );
}
