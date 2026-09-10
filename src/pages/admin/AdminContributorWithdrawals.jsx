import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { Pagination, StatusBadge, EmptyState, Skeleton, Button } from '../../components/ui';
import { AdminGuard, AdminLayout } from './AdminLogin';

export default function AdminContributorWithdrawals() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('PENDING');

  async function load(currentPage = page) {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(currentPage) });
      if (status) params.set('status', status);
      const { data } = await api.get(`/api/admin/contributor-withdrawals?${params}`);
      setWithdrawals(data.withdrawals);
      setPagination(data.pagination);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to load');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(page);
  }, [page, status]);

  async function process(id, action) {
    try {
      await api.post(`/api/admin/contributor-withdrawals/${id}/process`, { action });
      toast.success(action === 'REJECT' ? 'Rejected & refunded' : 'Processed');
      load(page);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed');
    }
  }

  return (
    <AdminGuard>
      <AdminLayout title="Contributor withdrawals" description="MoMo payouts for uplink partners">
        <div className="mb-4">
          <select
            className="px-3 py-2 border rounded-lg text-sm"
            value={status}
            onChange={(e) => {
              setPage(1);
              setStatus(e.target.value);
            }}
          >
            <option value="">All</option>
            <option value="PENDING">PENDING</option>
            <option value="APPROVED">APPROVED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>
        {loading ? (
          <Skeleton className="h-48 rounded-xl" />
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b bg-gray-50">
                  <th className="p-3">Date</th>
                  <th className="p-3">Contributor</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {withdrawals.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-8">
                      <EmptyState title="No withdrawals" />
                    </td>
                  </tr>
                ) : (
                  withdrawals.map((w) => (
                    <tr key={w.id} className="border-b border-gray-50">
                      <td className="p-3">{new Date(w.createdAt).toLocaleString()}</td>
                      <td className="p-3">
                        <p className="font-medium">{w.contributor?.name}</p>
                        <p className="text-xs text-navy/45">{w.contributor?.email}</p>
                      </td>
                      <td className="p-3">{w.amountXaf.toLocaleString()} XAF</td>
                      <td className="p-3">{w.phoneNumber}</td>
                      <td className="p-3">
                        <StatusBadge status={w.status} />
                        {w.adminNote && <p className="text-xs text-gray-400 mt-1">{w.adminNote}</p>}
                      </td>
                      <td className="p-3">
                        {w.status === 'PENDING' && (
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              onClick={() => process(w.id, 'RETRY_DISBURSE')}
                              className="text-xs px-3 py-1 rounded-lg bg-brand/10 text-brand"
                            >
                              Retry MoMo
                            </button>
                            <button
                              type="button"
                              onClick={() => process(w.id, 'APPROVE')}
                              className="text-xs px-3 py-1 rounded-lg bg-green-100 text-green-700"
                            >
                              Mark paid
                            </button>
                            <button
                              type="button"
                              onClick={() => process(w.id, 'REJECT')}
                              className="text-xs px-3 py-1 rounded-lg bg-red-100 text-red-700"
                            >
                              Reject
                            </button>
                          </div>
                        )}
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
      </AdminLayout>
    </AdminGuard>
  );
}
