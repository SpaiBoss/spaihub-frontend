import { useEffect, useState, Fragment } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import { Pagination, StatusBadge, EmptyState, Skeleton, Button, Input, Modal } from '../../components/ui';
import { AdminGuard, AdminLayout } from './AdminLogin';

export default function AdminLocations() {
  const { t } = useTranslation('admin');
  const { t: tc } = useTranslation('common');
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
      setError(err.response?.data?.error || t('locations.loadError'));
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
      toast.error(err.response?.data?.error || t('locations.detailFailed'));
      setExpanded(null);
    } finally {
      setDetailLoading(false);
    }
  }

  async function setLocationActive(id, isActive) {
    setBusyId(id);
    try {
      await api.patch(`/api/admin/managed-locations/${id}/status`, { isActive });
      toast.success(isActive ? t('locations.activated') : t('locations.deactivated'));
      await load(page);
      if (expanded === id) {
        const { data } = await api.get(`/api/admin/managed-locations/${id}`);
        setDetail(data);
      }
    } catch (err) {
      toast.error(err.response?.data?.error || t('locations.updateFailed'));
    } finally {
      setBusyId(null);
    }
  }

  async function setPackageActive(packageId, isActive) {
    setBusyId(packageId);
    try {
      await api.patch(`/api/admin/packages/${packageId}/status`, { isActive });
      toast.success(isActive ? t('locations.pkgActivated') : t('locations.pkgDeactivated'));
      if (expanded) {
        const { data } = await api.get(`/api/admin/managed-locations/${expanded}`);
        setDetail(data);
      }
      await load(page);
    } catch (err) {
      toast.error(err.response?.data?.error || t('locations.pkgUpdateFailed'));
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
        toast.success(t('locations.locDeleted'));
        setExpanded(null);
        setDetail(null);
      } else {
        await api.delete(`/api/admin/packages/${confirmDelete.id}`);
        toast.success(t('locations.pkgDeleted'));
        if (expanded) {
          const { data } = await api.get(`/api/admin/managed-locations/${expanded}`);
          setDetail(data);
        }
      }
      setConfirmDelete(null);
      await load(page);
    } catch (err) {
      toast.error(err.response?.data?.error || t('locations.deleteFailed'));
    } finally {
      setBusyId(null);
    }
  }

  return (
    <AdminGuard>
      <AdminLayout
        title={t('locations.title')}
        description={t('locations.description')}
      >
        <div className="flex flex-col sm:flex-row sm:flex-wrap sm:items-end gap-3 mb-5">
          <div className="w-full sm:max-w-sm min-w-0">
            <label className="label-field">{tc('actions.search')}</label>
            <Input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t('locations.searchPh')}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setPage(1);
                  load(1);
                }
              }}
            />
          </div>
          <div className="w-full sm:w-40">
            <label className="label-field">{t('cols.status')}</label>
            <select
              className="select-field"
              value={statusFilter}
              onChange={(e) => {
                setPage(1);
                setStatusFilter(e.target.value);
              }}
            >
              <option value="">{t('all')}</option>
              <option value="active">{tc('status.ACTIVE')}</option>
              <option value="inactive">{t('inactive')}</option>
            </select>
          </div>
          <Button
            className="sm:mb-0.5 w-full sm:w-auto"
            onClick={() => {
              setPage(1);
              load(1);
            }}
          >
            {tc('actions.search')}
          </Button>
        </div>

        {error ? (
          <EmptyState
            title={t('locations.couldNotLoad')}
            description={error}
            action={<Button onClick={() => load(page)}>{tc('actions.retry')}</Button>}
          />
        ) : (
          <div className="table-shell overflow-x-auto">
            <table>
              <thead>
                <tr>
                  <th>{t('cols.location')}</th>
                  <th>{t('cols.owner')}</th>
                  <th>{t('cols.status')}</th>
                  <th>{t('cols.routers')}</th>
                  <th>{t('cols.packages')}</th>
                  <th>{t('cols.txns')}</th>
                  <th className="sticky-actions">{t('cols.actions')}</th>
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
                      <EmptyState title={t('locations.emptyTitle')} description={t('locations.emptyBody')} />
                    </td>
                  </tr>
                ) : (
                  locations.map((loc) => (
                    <Fragment key={loc.id}>
                      <tr>
                        <td>
                          <p className="font-medium text-navy">{loc.name}</p>
                          <p className="text-xs text-navy/45 mt-0.5 max-w-[14rem] truncate">{loc.address}</p>
                        </td>
                        <td>
                          <p className="text-navy">{loc.owner?.name}</p>
                          <p className="text-xs text-navy/45 truncate max-w-[12rem]">{loc.owner?.email}</p>
                        </td>
                        <td>
                          <StatusBadge status={loc.isActive ? 'ACTIVE' : 'SUSPENDED'} />
                        </td>
                        <td>
                          {loc.onlineRouters}/{loc.routerCount}
                        </td>
                        <td>{loc.packageCount}</td>
                        <td>{loc.transactionCount}</td>
                        <td className="sticky-actions">
                          <div className="flex flex-wrap gap-2">
                            <button
                              type="button"
                              className="admin-action-neutral"
                              onClick={() => openDetail(loc.id)}
                            >
                              {expanded === loc.id ? t('actions.hide') : t('actions.manage')}
                            </button>
                            <button
                              type="button"
                              disabled={busyId === loc.id}
                              className={loc.isActive ? 'admin-action-warn' : 'admin-action-success'}
                              onClick={() => setLocationActive(loc.id, !loc.isActive)}
                            >
                              {loc.isActive ? t('actions.deactivate') : t('actions.activate')}
                            </button>
                            <button
                              type="button"
                              disabled={busyId === loc.id || !loc.canHardDelete}
                              title={
                                loc.canHardDelete
                                  ? t('locations.deleteEmptyTitle')
                                  : t('locations.hasHistory')
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
                              {tc('actions.delete')}
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
                                    {t('cols.packages')}
                                  </p>
                                  {detail.packages?.length === 0 ? (
                                    <p className="text-sm text-navy/45">{t('locations.noPackages')}</p>
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
                                              {pkg.isActive ? t('actions.deactivate') : t('actions.activate')}
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
                                              {tc('actions.delete')}
                                            </button>
                                          </div>
                                        </div>
                                      ))}
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <p className="text-xs font-semibold uppercase tracking-wide text-navy/50 mb-2">
                                    {t('cols.routers')}
                                  </p>
                                  {detail.routers?.length === 0 ? (
                                    <p className="text-sm text-navy/45">{t('locations.noRouters')}</p>
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
                                            <span>{r.isActive ? t('locations.enabled') : t('locations.disabled')}</span>
                                            {r.lastSeenAt ? (
                                              <span>{t('locations.seen', { date: new Date(r.lastSeenAt).toLocaleString() })}</span>
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
          title={confirmDelete?.kind === 'location' ? t('locations.deleteLoc') : t('locations.deletePkg')}
          description={
            confirmDelete?.canHardDelete
              ? t('locations.confirmRemove', { name: confirmDelete?.name })
              : t('locations.cannotHardDelete')
          }
        >
          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setConfirmDelete(null)} disabled={!!busyId}>
              {tc('actions.cancel')}
            </Button>
            {confirmDelete?.canHardDelete && (
              <Button onClick={runDelete} disabled={!!busyId} className="!bg-red-600 hover:!bg-red-700">
                {t('actions.deletePermanently')}
              </Button>
            )}
          </div>
        </Modal>
      </AdminLayout>
    </AdminGuard>
  );
}
