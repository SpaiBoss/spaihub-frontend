import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { Pagination, StatusBadge, EmptyState, Skeleton, Button } from '../../components/ui';
import { AdminGuard, AdminLayout } from './AdminLogin';

export default function AdminContributors() {
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
      setError(err.response?.data?.error || 'Failed to load');
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
      toast.success('Contributor activated');
      load(page);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed');
    }
  }

  async function toggleStatus(id, current) {
    const status = current === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    try {
      await api.patch(`/api/admin/contributors/${id}/status`, { status });
      toast.success(`Contributor ${status.toLowerCase()}`);
      load(page);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed');
    }
  }

  return (
    <AdminGuard>
      <AdminLayout title="Contributors" description="Approve accounts and manage uplink partners">
        {loading ? (
          <Skeleton className="h-48 rounded-xl" />
        ) : error ? (
          <EmptyState title="Could not load contributors" description={error} action={<Button onClick={() => load(page)}>Retry</Button>} />
        ) : (
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500 border-b bg-gray-50">
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Verified</th>
                  <th className="p-3">Balance</th>
                  <th className="p-3">Links</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {contributors.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8">
                      <EmptyState title="No contributors yet" />
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
                      <td className="p-3">{c.emailVerified ? 'Yes' : 'No'}</td>
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
                              Activate
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
                              {c.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
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
          Manage physical links on{' '}
          <Link to="/admin/contributor-links" className="text-brand font-medium">
            Contributor links
          </Link>
          .
        </p>
      </AdminLayout>
    </AdminGuard>
  );
}
