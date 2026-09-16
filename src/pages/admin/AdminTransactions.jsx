import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import { Pagination, StatusBadge, Button, TableShell, EmptyState, Skeleton } from '../../components/ui';
import { AdminGuard, AdminLayout } from './AdminLogin';

const STATUS_OPTIONS = ['', 'SUCCESS', 'PENDING', 'FAILED'];

export default function AdminTransactions() {
  const { t } = useTranslation('admin');
  const { t: tc } = useTranslation('common');
  const [data, setData] = useState({ transactions: [], pagination: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reconcilingId, setReconcilingId] = useState(null);
  const [filters, setFilters] = useState({
    page: 1,
    status: '',
    dateFrom: '',
    dateTo: '',
  });

  useEffect(() => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    api.get(`/api/admin/transactions?${params}`)
      .then((res) => setData(res.data))
      .catch((err) => {
        setError(err.response?.data?.error || t('transactions.loadError'));
        setData({ transactions: [], pagination: {} });
      })
      .finally(() => setLoading(false));
  }, [filters]);

  async function exportCsv() {
    try {
      const params = new URLSearchParams();
      if (filters.status) params.set('status', filters.status);
      if (filters.dateFrom) params.set('dateFrom', filters.dateFrom);
      if (filters.dateTo) params.set('dateTo', filters.dateTo);
      const response = await api.get(`/api/admin/transactions/export?${params}`, { responseType: 'blob' });
      const url = URL.createObjectURL(response.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'platform-transactions.csv';
      a.click();
      URL.revokeObjectURL(url);
      toast.success(t('transactions.csvExported'));
    } catch (err) {
      toast.error(err.response?.data?.error || tc('errors.exportFailed'));
    }
  }

  async function reconcilePayment(id) {
    setReconcilingId(id);
    try {
      const { data } = await api.post(`/api/admin/transactions/${id}/reconcile`);
      toast.success(data.message || t('transactions.reconciled'));
      setFilters({ ...filters });
    } catch (err) {
      toast.error(err.response?.data?.error || t('transactions.reconcileFailed'));
    } finally {
      setReconcilingId(null);
    }
  }

  return (
    <AdminGuard>
      <AdminLayout title={t('transactions.title')} description={t('transactions.description')}>
        <div className="flex flex-wrap gap-3 mb-6">
          <select
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
            className="select-field w-auto min-w-[140px] py-2"
          >
            <option value="">{t('allStatuses')}</option>
            {STATUS_OPTIONS.filter(Boolean).map((s) => (
              <option key={s} value={s}>{tc(`status.${s}`)}</option>
            ))}
          </select>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value, page: 1 })}
            className="input-field w-auto py-2"
          />
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilters({ ...filters, dateTo: e.target.value, page: 1 })}
            className="input-field w-auto py-2"
          />
          <Button variant="secondary" onClick={exportCsv} className="gap-2 ml-auto">
            <Download className="w-4 h-4" /> {tc('actions.export')}
          </Button>
        </div>

        {error ? (
          <EmptyState
            title={t('transactions.couldNotLoad')}
            description={error}
            action={<Button onClick={() => setFilters({ ...filters })}>{tc('actions.retry')}</Button>}
          />
        ) : (
        <TableShell>
          <table>
            <thead>
              <tr>
                <th>{t('cols.date')}</th>
                <th>{t('cols.owner')}</th>
                <th>{t('cols.location')}</th>
                <th>{t('cols.package')}</th>
                <th>{t('cols.amount')}</th>
                <th>{t('cols.fee')}</th>
                <th>{t('cols.source')}</th>
                <th>{t('cols.status')}</th>
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
              ) : data.transactions.length === 0 ? (
                <tr>
                  <td colSpan={9}>
                    <EmptyState title={t('transactions.emptyTitle')} description={t('transactions.emptyBody')} />
                  </td>
                </tr>
              ) : (
                data.transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td>{new Date(tx.createdAt).toLocaleString()}</td>
                    <td>
                      <p className="font-medium text-navy">{tx.owner.name}</p>
                      <p className="text-xs text-navy/45">{tx.owner.email}</p>
                    </td>
                    <td>{tx.location.name}</td>
                    <td>{tx.package.name}</td>
                    <td className="font-medium">{tx.amountXaf.toLocaleString()} XAF</td>
                    <td>{tx.platformFeeXaf.toLocaleString()} XAF</td>
                    <td>{tx.voucherId ? t('source.voucher') : t('source.momo')}</td>
                    <td><StatusBadge status={tx.status} /></td>
                    <td className="sticky-actions">
                      {tx.status === 'FAILED' && tx.campayReference && (
                        <button
                          type="button"
                          onClick={() => reconcilePayment(tx.id)}
                          disabled={reconcilingId === tx.id}
                          className="text-xs px-3 py-1 rounded-lg bg-blue-100 text-blue-700 disabled:opacity-50"
                        >
                          {reconcilingId === tx.id ? t('checking') : t('transactions.reconcile')}
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </TableShell>
        )}

        <Pagination
          className="mt-4"
          page={filters.page}
          totalPages={data.pagination.totalPages}
          total={data.pagination.total}
          limit={data.pagination.limit}
          onPageChange={(p) => setFilters({ ...filters, page: p })}
        />
      </AdminLayout>
    </AdminGuard>
  );
}
