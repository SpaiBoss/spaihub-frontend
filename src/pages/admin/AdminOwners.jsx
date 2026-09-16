import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import { Pagination, StatusBadge, EmptyState, Skeleton, Button } from '../../components/ui';
import { AdminGuard, AdminLayout } from './AdminLogin';

export default function AdminOwners() {
  const { t } = useTranslation('admin');
  const { t: tc } = useTranslation('common');
  const [owners, setOwners] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load(currentPage = page) {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/api/admin/owners?page=${currentPage}`);
      setOwners(data.owners);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.response?.data?.error || t('owners.loadError'));
      setOwners([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(page); }, [page]);

  async function activateOwner(id) {
    try {
      await api.post(`/api/admin/owners/${id}/activate`);
      toast.success(t('owners.activated'));
      load(page);
    } catch (err) {
      toast.error(err.response?.data?.error || t('owners.activateFailed'));
    }
  }

  async function toggleStatus(id, currentStatus) {
    const newStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    try {
      await api.patch(`/api/admin/owners/${id}/status`, { status: newStatus });
      toast.success(newStatus === 'ACTIVE' ? t('owners.activated') : t('owners.suspended'));
      load(page);
    } catch (err) {
      toast.error(err.response?.data?.error || t('owners.statusFailed'));
    }
  }

  return (
    <AdminGuard>
      <AdminLayout title={t('owners.title')} description={t('owners.description')}>
        {error ? (
          <EmptyState
            title={t('owners.couldNotLoad')}
            description={error}
            action={<Button onClick={() => load(page)}>{tc('actions.retry')}</Button>}
          />
        ) : (
        <div className="table-shell overflow-x-auto">
          <table>
            <thead>
              <tr>
                <th>{t('cols.name')}</th>
                <th>{t('cols.email')}</th>
                <th>{t('cols.status')}</th>
                <th>{t('cols.locations')}</th>
                <th>{t('cols.transactions')}</th>
                <th>{t('cols.revenue')}</th>
                <th>{t('cols.wallet')}</th>
                <th>{t('cols.joined')}</th>
                <th className="sticky-actions">{t('cols.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                [...Array(5)].map((_, i) => (
                  <tr key={i}>
                    <td colSpan={9}><Skeleton className="h-10 my-1" /></td>
                  </tr>
                ))
              ) : owners.length === 0 ? (
                <tr>
                  <td colSpan={9}>
                    <EmptyState title={t('owners.emptyTitle')} description={t('owners.emptyBody')} />
                  </td>
                </tr>
              ) : (
                owners.map((o) => (
                  <tr key={o.id}>
                    <td>{o.name}</td>
                    <td>{o.email}</td>
                    <td><StatusBadge status={o.status} /></td>
                    <td>{o.locationCount}</td>
                    <td>{o.totalTransactions}</td>
                    <td>{o.totalRevenue.toLocaleString()} XAF</td>
                    <td>{o.walletBalance.toLocaleString()} XAF</td>
                    <td>{new Date(o.createdAt).toLocaleDateString()}</td>
                    <td className="sticky-actions">
                      <div className="flex flex-wrap gap-2">
                        {o.status === 'PENDING' && (
                          <button
                            type="button"
                            onClick={() => activateOwner(o.id)}
                            className="admin-action-success"
                          >
                            {t('actions.activate')}
                          </button>
                        )}
                        {o.status !== 'PENDING' && (
                          <button
                            type="button"
                            onClick={() => toggleStatus(o.id, o.status)}
                            className={o.status === 'ACTIVE' ? 'admin-action-danger' : 'admin-action-success'}
                          >
                            {o.status === 'ACTIVE' ? t('actions.suspend') : t('actions.activate')}
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        )}

        <Pagination
          className="mt-4"
          page={pagination.page}
          totalPages={pagination.totalPages}
          total={pagination.total}
          limit={pagination.limit}
          onPageChange={setPage}
        />
      </AdminLayout>
    </AdminGuard>
  );
}
