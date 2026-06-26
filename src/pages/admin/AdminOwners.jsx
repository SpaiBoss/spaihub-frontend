import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { Pagination, StatusBadge, EmptyState, Skeleton, Button } from '../../components/ui';
import { AdminGuard, AdminLayout } from './AdminLogin';

export default function AdminOwners() {
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
      setError(err.response?.data?.error || 'Failed to load owners');
      setOwners([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { load(page); }, [page]);

  async function toggleStatus(id, currentStatus) {
    const newStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    try {
      await api.patch(`/api/admin/owners/${id}/status`, { status: newStatus });
      toast.success(`Owner ${newStatus.toLowerCase()}`);
      load(page);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update owner status');
    }
  }

  return (
    <AdminGuard>
      <AdminLayout title="Owners">
        {error ? (
          <EmptyState
            title="Could not load owners"
            description={error}
            action={<Button onClick={() => load(page)}>Retry</Button>}
          />
        ) : (
        <div className="table-shell">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Status</th>
                <th>Locations</th>
                <th>Transactions</th>
                <th>Revenue</th>
                <th>Wallet</th>
                <th>Joined</th>
                <th>Actions</th>
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
                    <EmptyState title="No owners yet" description="Registered hotspot owners will appear here." />
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
                    <td>
                      <button
                        onClick={() => toggleStatus(o.id, o.status)}
                        className={`text-xs px-3 py-1 rounded-lg ${o.status === 'ACTIVE' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
                      >
                        {o.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                      </button>
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
