import { useEffect, useState, Fragment } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { Pagination, StatusBadge, EmptyState, Skeleton, Button, Input, Modal } from '../../components/ui';
import { AdminGuard, AdminLayout } from './AdminLogin';

export default function AdminLocations() {
  const [locations, setLocations] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [q, setQ] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [detail, setDetail] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [busyId, setBusyId] = useState(null);
  const [confirmDelete, setConfirmDelete] = useState(null);

  async function load(currentPage = page) {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({ page: String(currentPage) });
      if (q.trim()) params.set('q', q.trim());
      if (statusFilter === 'active') params.set('isActive', 'true');
      if (statusFilter === 'inactive') params.set('isActive', 'false');
      const { data } = await api.get(`/api/admin/managed-locations?${params}`);
      setLocations(data.locations);
      setPagination(data.pagination);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to load locations');
      setLocations([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(page);
  }, [page, statusFilter]);

  async function openDetail(id) {
    if (expanded === id) {
      setExpanded(null);
      setDetail(null);
      return;
    }
    setExpanded(id);
    setDetailLoading(true);
    try {
      const { data } = await api.get(`/api/admin/managed-locations/${id}`);
      setDetail(data);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to load location detail');
      setExpanded(null);
    } finally {
      setDetailLoading(false);
    }
  }

  async function setLocationActive(id, isActive) {
    setBusyId(id);
    try {
      await api.patch(`/api/admin/managed-locations/${id}/status`, { isActive });
      toast.success(isActive ? 'Location activated' : 'Location deactivated');
      await load(page);
      if (expanded === id) {
        const { data } = await api.get(`/api/admin/managed-locations/${id}`);
        setDetail(data);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update location');
    } finally {
      setBusyId(null);
    }
  }

  async function setPackageActive(packageId, isActive) {
    setBusyId(packageId);
    try {
      await api.patch(`/api/admin/packages/${packageId}/status`, { isActive });
      toast.success(isActive ? 'Package activated' : 'Package deactivated');
      if (expanded) {
        const { data } = await api.get(`/api/admin/managed-locations/${expanded}`);
        setDetail(data);
      }
      await load(page);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update package');
    } finally {
      setBusyId(null);
    }
  }

  async function runDelete() {
    if (!confirmDelete) return;
    setBusyId(confirmDelete.id);
    try {
      if (confirmDelete.kind === 'location') {
        await api.delete(`/api/admin/managed-locations/${confirmDelete.id}`);
        toast.success('Location permanently deleted');
        setExpanded(null);
        setDetail(null);
      } else {
        await api.delete(`/api/admin/packages/${confirmDelete.id}`);
        toast.success('Package permanently deleted');
        if (expanded) {
          const { data } = await api.get(`/api/admin/managed-locations/${expanded}`);
          setDetail(data);
        }
      }
      setConfirmDelete(null);
      await load(page);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Delete failed');
    } finally {
      setBusyId(null);
    }
  }

  return (
    <AdminGuard>
      <AdminLayout
        title="Locations"
        description="Manage owner sites, packages, and routers across the platform"
      >
        <div className="flex flex-col sm:flex-row sm:items-end gap-3 mb-5">
          <div className="flex-1 min-w-0">
            <label className="label-field">Search</label>
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Name, address, owner…"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setPage(1);
                  load(1);
                }
              }}
            />
          </div>
          <div className="w-full sm:w-44">
            <label className="label-field">Status</label>
            <select
              className="select-field"
              value={statusFilter}
              onChange={(e) => {
                setPage(1);
                setStatusFilter(e.target.value);
              }}
            >
              <option value="">All</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <Button
            className="sm:mb-0.5"
            onClick={() => {
              setPage(1);
              load(1);
            }}
          >
            Search
          </Button>
        </div>

        {error ? (
          <EmptyState
            title="Could not load locations"
            description={error}
            action={<Button onClick={() => load(page)}>Retry</Button>}
          />
        ) : (
          <div className="table-shell overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>Location</th>
                  <th>Owner</th>
                  <th>Status</th>
                  <th>Routers</th>
                  <th>Packages</th>
                  <th>Txns</th>
                  <th className="min-w-[220px]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i}>
                      <td colSpan={7}>
                        <Skeleton className="h-10 my-1" />
                      </td>
                    </tr>
                  ))
                ) : locations.length === 0 ? (
                  <tr>
                    <td colSpan={7}>
                      <EmptyState title="No locations" description="Owner sites will appear here." />
                    </td>
                  </tr>
                ) : (
                  locations.map((loc) => (
                    <Fragment key={loc.id}>
                      <tr>
                        <td>
                          <p className="font-medium text-navy">{loc.name}</p>
                          <p className="text-xs text-navy/45 mt-0.5 max-w-[16rem] truncate">{loc.address}</p>
                        </td>
                        <td>
                          <p className="text-navy">{loc.owner?.name}</p>
                          <p className="text-xs text-navy/45">{loc.owner?.email}</p>
                        </td>
                        <td>
                          <StatusBadge status={loc.isActive ? 'ACTIVE' : 'SUSPENDED'} />
                        </td>
                        <td>
                          {loc.onlineRouters}/{loc.routerCount}
                        </td>
                        <td>{loc.packageCount}</td>
                        <td>{loc.transactionCount}</td>
                        <td>
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              className="admin-action-neutral"
                              onClick={() => openDetail(loc.id)}
                            >
                              {expanded === loc.id ? 'Hide' : 'Manage'}
                            </button>
                            <button
                              type="button"
                              disabled={busyId === loc.id}
                              className={loc.isActive ? 'admin-action-warn' : 'admin-action-success'}
                              onClick={() => setLocationActive(loc.id, !loc.isActive)}
                            >
                              {loc.isActive ? 'Deactivate' : 'Activate'}
                            </button>
                            <button
                              type="button"
                              disabled={busyId === loc.id || !loc.canHardDelete}
                              title={
                                loc.canHardDelete
                                  ? 'Permanently delete empty location'
                                  : 'Has history — deactivate instead'
                              }
                              className="admin-action-danger"
                              onClick={() =>
                                setConfirmDelete({
                                  kind: 'location',
                                  id: loc.id,
                                  name: loc.name,
                                  canHardDelete: loc.canHardDelete,
                                })
                              }
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expanded === loc.id && (
                        <tr className="bg-surface-muted/60">
                          <td colSpan={7} className="!py-4">
                            {detailLoading || !detail ? (
                              <Skeleton className="h-24" />
                            ) : (
                              <div className="grid gap-5 lg:grid-cols-2">
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-wide text-navy/50 mb-2">
                                    Packages
                                  </p>
                                  {detail.packages?.length === 0 ? (
                                    <p className="text-sm text-navy/45">No packages</p>
                                  ) : (
                                    <div className="space-y-2">
                                      {detail.packages.map((pkg) => (
                                        <div
                                          key={pkg.id}
                                          className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2.5"
                                        >
                                          <div className="min-w-0">
                                            <p className="font-medium text-navy text-sm">{pkg.name}</p>
                                            <p className="text-xs text-navy/45 mt-1 flex flex-wrap items-center gap-2">
                                              <span>{pkg.priceXaf.toLocaleString()} XAF</span>
                                              <StatusBadge status={pkg.isActive ? 'ACTIVE' : 'SUSPENDED'} />
                                            </p>
                                          </div>
                                          <div className="flex gap-2">
                                            <button
                                              type="button"
                                              disabled={busyId === pkg.id}
                                              className="text-xs px-2.5 py-1 rounded-md bg-navy/5 text-navy"
                                              onClick={() => setPackageActive(pkg.id, !pkg.isActive)}
                                            >
                                              {pkg.isActive ? 'Deactivate' : 'Activate'}
                                            </button>
                                            <button
                                              type="button"
                                              disabled={busyId === pkg.id || !pkg.canHardDelete}
                                              className="text-xs px-2.5 py-1 rounded-md bg-red-50 text-red-700 disabled:opacity-40"
                                              onClick={() =>
                                                setConfirmDelete({
                                                  kind: 'package',
                                                  id: pkg.id,
                                                  name: pkg.name,
                                                  canHardDelete: pkg.canHardDelete,
                                                })
                                              }
                                            >
                                              Delete
                                            </button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-wide text-navy/50 mb-2">
                                    Routers
                                  </p>
                                  {detail.routers?.length === 0 ? (
                                    <p className="text-sm text-navy/45">No routers</p>
                                  ) : (
                                    <div className="space-y-2">
                                      {detail.routers.map((r) => (
                                        <div
                                          key={r.id}
                                          className="rounded-lg border border-gray-200 bg-white px-3 py-2.5"
                                        >
                                          <p className="font-medium text-navy text-sm">{r.name}</p>
                                          <p className="text-xs text-navy/45 mt-0.5 flex flex-wrap items-center gap-2">
                                            <StatusBadge status={r.status} />
                                            <span>{r.isActive ? 'Enabled' : 'Disabled'}</span>
                                            {r.lastSeenAt ? (
                                              <span>seen {new Date(r.lastSeenAt).toLocaleString()}</span>
                                            ) : null}
                                          </p>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
                          </td>
                        </tr>
                      )}
                    </Fragment>
                  ))
                )}
              </tbody>
            </table>
            <Pagination
              className="p-4 border-t"
              page={pagination.page}
              totalPages={pagination.totalPages}
              total={pagination.total}
              onPageChange={setPage}
            />
          </div>
        )}

        <Modal
          open={!!confirmDelete}
          onClose={() => !busyId && setConfirmDelete(null)}
          title={confirmDelete?.kind === 'location' ? 'Delete location' : 'Delete package'}
          description={
            confirmDelete?.canHardDelete
              ? `Permanently remove “${confirmDelete?.name}”? This cannot be undone.`
              : 'This item has history and cannot be permanently deleted. Deactivate it instead.'
          }
        >
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setConfirmDelete(null)} disabled={!!busyId}>
              Cancel
            </Button>
            {confirmDelete?.canHardDelete && (
              <Button onClick={runDelete} disabled={!!busyId} className="!bg-red-600 hover:!bg-red-700">
                Delete permanently
              </Button>
            )}
          </div>
        </Modal>
      </AdminLayout>
    </AdminGuard>
  );
}
