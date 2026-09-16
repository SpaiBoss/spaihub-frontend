import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import { Pagination, StatusBadge, Button, TableShell, EmptyState, Skeleton } from '../../components/ui';

export default function Transactions() {
  const { t } = useTranslation('owner');
  const { t: tc } = useTranslation('common');
  const [data, setData] = useState({ transactions: [], pagination: {} });
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    locationId: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    page: 1,
  });

  useEffect(() => {
    api.get('/api/owner/locations').then((res) => setLocations(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    setLoading(true);
    setError(null);
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => { if (v) params.set(k, v); });
    api.get(`/api/owner/transactions?${params}`)
      .then((res) => setData(res.data))
      .catch((err) => {
        setError(err.response?.data?.error || t('tx.loadFailed'));
        setData({ transactions: [], pagination: {} });
      })
      .finally(() => setLoading(false));
  }, [filters, t]);

  async function exportCsv() {
    try {
      const params = new URLSearchParams();
      if (filters.locationId) params.set('locationId', filters.locationId);
      if (filters.status) params.set('status', filters.status);
      if (filters.dateFrom) params.set('dateFrom', filters.dateFrom);
      if (filters.dateTo) params.set('dateTo', filters.dateTo);

      const response = await api.get(`/api/owner/transactions/export?${params}`, { responseType: 'blob' });
      const url = URL.createObjectURL(response.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'transactions.csv';
      a.click();
      URL.revokeObjectURL(url);
      toast.success(t('tx.csv'));
    } catch (err) {
      toast.error(err.response?.data?.error || tc('errors.exportFailed'));
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-6">
        <select
          value={filters.locationId}
          onChange={(e) => setFilters({ ...filters, locationId: e.target.value, page: 1 })}
          className="select-field w-full sm:w-auto sm:min-w-[160px] py-2.5 min-h-[44px]"
        >
          <option value="">{t('tx.allLocations')}</option>
          {locations.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
          className="select-field w-full sm:w-auto sm:min-w-[140px] py-2.5 min-h-[44px]"
        >
          <option value="">{t('tx.allStatuses')}</option>
          <option value="SUCCESS">{tc('status.SUCCESS')}</option>
          <option value="PENDING">{tc('status.PENDING')}</option>
          <option value="FAILED">{tc('status.FAILED')}</option>
        </select>
        <input
          type="date"
          value={filters.dateFrom}
          onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value, page: 1 })}
          className="input-field w-full sm:w-auto py-2.5 min-h-[44px]"
        />
        <input
          type="date"
          value={filters.dateTo}
          onChange={(e) => setFilters({ ...filters, dateTo: e.target.value, page: 1 })}
          className="input-field w-full sm:w-auto py-2.5 min-h-[44px]"
        />
        <Button variant="secondary" onClick={exportCsv} className="gap-2 w-full sm:w-auto sm:ml-auto min-h-[44px]">
          <Download className="w-4 h-4" /> {tc('actions.export')}
        </Button>
      </div>

      {error ? (
        <EmptyState
          title={t('tx.loadTitle')}
          description={error}
          action={
            <Button onClick={() => setFilters({ ...filters })}>{tc('actions.retry')}</Button>
          }
        />
      ) : (
      <>
      <div className="md:hidden space-y-3">
        {loading ? (
          [...Array(4)].map((_, i) => <Skeleton key={i} className="h-24" />)
        ) : data.transactions.length === 0 ? (
          <EmptyState title={t('tx.emptyTitle')} description={t('tx.emptyBody')} />
        ) : (
          data.transactions.map((tx) => (
            <div key={tx.id} className="card p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <p className="font-semibold text-navy">{tx.amountXaf.toLocaleString()} XAF</p>
                  <p className="text-xs text-navy/50 mt-0.5">
                    {t('tx.youKeep', { amount: tx.ownerCreditXaf.toLocaleString() })}
                  </p>
                </div>
                <StatusBadge status={tx.status} />
              </div>
              <p className="text-sm text-navy mt-2">{tx.packageName}</p>
              <p className="text-xs text-navy/50 mt-1">
                {tx.locationName} · {tx.subscriberPhone}
              </p>
              <p className="text-xs text-navy/40 mt-2">{new Date(tx.createdAt).toLocaleString()}</p>
            </div>
          ))
        )}
      </div>

      <div className="hidden md:block">
      <TableShell>
        <table>
          <thead>
            <tr>
              <th>{t('tx.dateTime')}</th>
              <th>{t('tx.phone')}</th>
              <th>{t('tx.location')}</th>
              <th>{t('tx.package')}</th>
              <th>{t('tx.amount')}</th>
              <th>{t('tx.yourShare')}</th>
              <th>{t('tx.status')}</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <tr key={i}>
                  <td colSpan={7}><Skeleton className="h-10 my-1" /></td>
                </tr>
              ))
            ) : data.transactions.length === 0 ? (
              <tr>
                <td colSpan={7}>
                  <EmptyState title={t('tx.emptyTitle')} description={t('tx.emptyBody')} />
                </td>
              </tr>
            ) : (
              data.transactions.map((tx) => (
                <tr key={tx.id}>
                  <td>{new Date(tx.createdAt).toLocaleString()}</td>
                  <td>{tx.subscriberPhone}</td>
                  <td>{tx.locationName}</td>
                  <td>{tx.packageName}</td>
                  <td className="font-medium">{tx.amountXaf.toLocaleString()} XAF</td>
                  <td>{tx.ownerCreditXaf.toLocaleString()} XAF</td>
                  <td><StatusBadge status={tx.status} /></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </TableShell>
      </div>
      </>
      )}

      <Pagination
        className="mt-4"
        page={filters.page}
        totalPages={data.pagination.totalPages}
        total={data.pagination.total}
        limit={data.pagination.limit}
        onPageChange={(p) => setFilters({ ...filters, page: p })}
      />
    </div>
  );
}
