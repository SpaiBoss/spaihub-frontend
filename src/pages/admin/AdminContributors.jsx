import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import { Pagination, StatusBadge, EmptyState, Skeleton, Button } from '../../components/ui';
import { AdminGuard, AdminLayout } from './AdminLogin';

export default function AdminContributors() {
  const { t } = useTranslation('admin');
  const { t: tc } = useTranslation('common');
  const [contributors, setContributors] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function load(currentPage = page) {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get(`/api/admin/contributors?page=${currentPage}`);
      setContributors(data.contributors);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.response?.data?.error || t('contributors.loadError'));
      setContributors([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(page);
  }, [page]);

  async function activate(id) {
    try {
      await api.post(`/api/admin/contributors/${id}/activate`);
      toast.success(t('contributors.activated'));
      load(page);
    } catch (err) {
      toast.error(err.response?.data?.error || t('contributors.failed'));
    }
  }

  async function toggleStatus(id, current) {
    const status = current === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    try {
      await api.patch(`/api/admin/contributors/${id}/status`, { status });
      toast.success(status === 'ACTIVE' ? t('contributors.activated') : t('contributors.suspended'));
      load(page);
    } catch (err) {
      toast.error(err.response?.data?.error || t('contributors.failed'));
    }
  }

  return (
    <AdminGuard>
      <AdminLayout title={t('contributors.title')} description={t('contributors.description')}>
        {loading ? (
          <Skeleton className="h-48 rounded-xl" />
        ) : error ? (
          <EmptyState title={t('contributors.couldNotLoad')} description={error} action={<Button onClick={() => load(page)}>{tc('actions.retry')}</Button>} />
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b bg-gray-50">
                  <th className="p-3">{t('cols.name')}</th>
                  <th className="p-3">{t('cols.email')}</th>
                  <th className="p-3">{t('cols.status')}</th>
                  <th className="p-3">{t('cols.verified')}</th>
                  <th className="p-3">{t('cols.balance')}</th>
                  <th className="p-3">{t('cols.links')}</th>
                  <th className="p-3">{t('cols.actions')}</th>
                </tr>
              </thead>
              <tbody>
                {contributors.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8">
                      <EmptyState title={t('contributors.empty')} />
                    </td>
                  </tr>
                ) : (
                  contributors.map((c) => (
                    <tr key={c.id} className="border-b border-gray-50">
                      <td className="p-3 font-medium">{c.name}</td>
                      <td className="p-3">{c.email}</td>
                      <td className="p-3">
                        <StatusBadge status={c.status} />
                      </td>
                      <td className="p-3">{c.emailVerified ? t('yes') : t('no')}</td>
                      <td className="p-3">{c.walletBalance.toLocaleString()} XAF</td>
                      <td className="p-3">{c.linkCount}</td>
                      <td className="p-3">
                        <div className="flex flex-wrap gap-2">
                          {c.status === 'PENDING' && (
                            <button
                              type="button"
                              onClick={() => activate(c.id)}
                              className="text-xs px-3 py-1 rounded-lg bg-green-100 text-green-700"
                            >
                              {t('actions.activate')}
                            </button>
                          )}
                          {c.status !== 'PENDING' && (
                            <button
                              type="button"
                              onClick={() => toggleStatus(c.id, c.status)}
                              className={`text-xs px-3 py-1 rounded-lg ${
                                c.status === 'ACTIVE' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                              }`}
                            >
                              {c.status === 'ACTIVE' ? t('actions.suspend') : t('actions.activate')}
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
        <p className="mt-4 text-sm text-navy/50">
          {t('contributors.manageLinks')}{' '}
          <Link to="/admin/contributor-links" className="text-brand font-medium">
            {t('contributors.linksPage')}
          </Link>
          .
        </p>
      </AdminLayout>
    </AdminGuard>
  );
}
