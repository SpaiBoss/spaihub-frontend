import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import api from '../../services/api';
import { Pagination, StatusBadge, Button } from '../../components/ui';
import { AdminGuard, AdminLayout } from './AdminLogin';

const STATUS_OPTIONS = ['', 'SUCCESS', 'PENDING', 'FAILED'];

export default function AdminTransactions() {
  const [data, setData] = useState({ transactions: [], pagination: {} });
  const [filters, setFilters] = useState({
    page: 1,
    status: '',
    dateFrom: '',
    dateTo: '',
  });

  useEffect(() => {
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => {
      if (v) params.set(k, v);
    });
    api.get(`/api/admin/transactions?${params}`).then((res) => setData(res.data));
  }, [filters]);

  async function exportCsv() {
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
  }

  return (
    <AdminGuard>
      <AdminLayout title="All transactions" description="Filter and export platform-wide payment activity">
        <div className="flex flex-wrap gap-3 mb-6">
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
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>

        <div className="table-shell">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Owner</th>
                <th>Location</th>
                <th>Package</th>
                <th>Amount</th>
                <th>Fee</th>
                <th>Source</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.transactions.map((tx) => (
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
                  <td>{tx.voucherId ? 'Voucher' : 'MoMo'}</td>
                  <td><StatusBadge status={tx.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

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
