import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import { Pagination, StatusBadge, EmptyState, Skeleton, Button, Input, Modal } from '../../components/ui';
import { AdminGuard, AdminLayout } from './AdminLogin';

export default function AdminContributorLinks() {
  const { t } = useTranslation('admin');
  const { t: tc } = useTranslation('common');
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
      toast.error(err.response?.data?.error || t('links.loadError'));
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
      toast.error(err.response?.data?.error || t('links.formFailed'));
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
      toast.success(t('links.created'));
      setShowCreate(false);
      load(page);
    } catch (err) {
      toast.error(err.response?.data?.error || t('links.createFailed'));
    } finally {
      setSubmitting(false);
    }
  }

  async function setStatus(id, status) {
    try {
      await api.patch(`/api/admin/contributor-links/${id}`, { status });
      toast.success(status === 'ACTIVE' ? t('links.activated') : t('links.paused'));
      load(page);
    } catch (err) {
      toast.error(err.response?.data?.error || t('links.updateFailed'));
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
          ? t('links.sampleSaved', { reason: data.reason })
          : t('links.accrued', { amount: data.accrual?.amountXaf?.toLocaleString() || 0 })
      );
      setMeterLink(null);
      setBytesTotal('');
      load(page);
    } catch (err) {
      toast.error(err.response?.data?.error || t('links.meterFailed'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AdminGuard>
      <AdminLayout title={t('links.title')} description={t('links.description')}>
        <div className="mb-4 flex justify-between items-center gap-3">
          <Link to="/admin/contributors" className="text-sm text-brand font-medium">
            {t('links.back')}
          </Link>
          <Button onClick={openCreate}>{t('links.add')}</Button>
        </div>

        {loading ? (
          <Skeleton className="h-48 rounded-xl" />
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b bg-gray-50">
                  <th className="p-3">{t('cols.contributor')}</th>
                  <th className="p-3">{t('cols.location')}</th>
                  <th className="p-3">{t('cols.interface')}</th>
                  <th className="p-3">{t('cols.capRate')}</th>
                  <th className="p-3">{t('cols.status')}</th>
                  <th className="p-3">{t('cols.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {links.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8">
                      <EmptyState title={t('links.emptyTitle')} description={t('links.emptyBody')} />
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
                        {t('links.capRateValue', { cap: l.capMbps, rate: l.rateXafPerGb })}
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
                            {t('links.postMeter')}
                          </button>
                          {l.status === 'ACTIVE' ? (
                            <button
                              type="button"
                              onClick={() => setStatus(l.id, 'PAUSED')}
                              className="text-xs px-3 py-1 rounded-lg bg-amber-100 text-amber-800"
                            >
                              {t('actions.pause')}
                            </button>
                          ) : (
                            <button
                              type="button"
                              onClick={() => setStatus(l.id, 'ACTIVE')}
                              className="text-xs px-3 py-1 rounded-lg bg-green-100 text-green-700"
                            >
                              {t('actions.activate')}
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

        <Modal open={showCreate} onClose={() => setShowCreate(false)} title={t('links.addTitle')}>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">{t('cols.contributor')}</label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={form.contributorId}
                onChange={(e) => setForm({ ...form, contributorId: e.target.value })}
                required
              >
                <option value="">{t('links.select')}</option>
                {contributors.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.email})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">{t('cols.location')}</label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={form.locationId}
                onChange={(e) => setForm({ ...form, locationId: e.target.value })}
                required
              >
                <option value="">{t('links.select')}</option>
                {locations.map((loc) => (
                  <option key={loc.id} value={loc.id}>
                    {loc.name} — {loc.owner?.name || loc.ownerId}
                  </option>
                ))}
              </select>
            </div>
            <Input
              label={t('links.interfaceName')}
              value={form.interfaceName}
              onChange={(e) => setForm({ ...form, interfaceName: e.target.value })}
              required
            />
            <Input
              label={t('links.capMbps')}
              type="number"
              value={form.capMbps}
              onChange={(e) => setForm({ ...form, capMbps: e.target.value })}
              required
            />
            <Input
              label={t('links.rateGb')}
              type="number"
              value={form.rateXafPerGb}
              onChange={(e) => setForm({ ...form, rateXafPerGb: e.target.value })}
              required
            />
            <div>
              <label className="block text-sm font-medium mb-1">{t('cols.status')}</label>
              <select
                className="w-full px-3 py-2 border rounded-lg"
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
              >
                <option value="PENDING">{tc('status.PENDING')}</option>
                <option value="ACTIVE">{tc('status.ACTIVE')}</option>
                <option value="PAUSED">{tc('status.PAUSED')}</option>
                <option value="DISABLED">{tc('status.DISABLED')}</option>
              </select>
            </div>
            <Input
              label={t('links.notes')}
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
            />
            <Button type="submit" disabled={submitting} className="w-full">
              {submitting ? t('links.creating') : t('links.createLink')}
            </Button>
          </form>
        </Modal>

        <Modal open={!!meterLink} onClose={() => setMeterLink(null)} title={t('links.meterTitle')}>
          {meterLink && (
            <form onSubmit={postMeter} className="space-y-4">
              <p className="text-sm text-navy/60">
                {t('links.meterMeta', {
                  name: meterLink.contributor?.name,
                  iface: meterLink.interfaceName,
                  location: meterLink.location?.name,
                })}
              </p>
              <Input
                label={t('links.bytesTotal')}
                value={bytesTotal}
                onChange={(e) => setBytesTotal(e.target.value.replace(/\D/g, ''))}
                required
              />
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting ? t('links.posting') : t('links.postSample')}
              </Button>
            </form>
          )}
        </Modal>
      </AdminLayout>
    </AdminGuard>
  );
}
