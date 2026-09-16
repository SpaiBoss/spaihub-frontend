import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import { detectCameroonOperator } from '../../utils/phone';
import { Modal, Pagination, StatusBadge } from '../../components/ui';
import { AdminGuard, AdminLayout } from './AdminLogin';

export default function AdminWithdrawals() {
  const { t } = useTranslation('admin');
  const [pending, setPending] = useState([]);
  const [history, setHistory] = useState([]);
  const [historyPagination, setHistoryPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [historyPage, setHistoryPage] = useState(1);
  const [processingId, setProcessingId] = useState(null);
  const [checkingId, setCheckingId] = useState(null);
  const [campayCheck, setCampayCheck] = useState(null);
  const [rejecting, setRejecting] = useState(null);
  const [note, setNote] = useState('');

  function formatCampayStatus(status) {
    if (!status) return '—';
    if (typeof status === 'object' && status.error) return t('withdrawals.campayError', { error: status.error });
    return String(status);
  }

  async function loadPending() {
    const { data } = await api.get('/api/admin/withdrawals?status=PENDING');
    setPending(data.withdrawals);
  }

  async function loadHistory(currentPage = historyPage) {
    const { data } = await api.get(`/api/admin/withdrawals?history=true&page=${currentPage}`);
    setHistory(data.withdrawals);
    setHistoryPagination(data.pagination);
  }

  async function load() {
    await Promise.all([loadPending(), loadHistory(historyPage)]);
  }

  useEffect(() => { loadPending(); }, []);
  useEffect(() => { loadHistory(historyPage); }, [historyPage]);

  async function checkCampay(id) {
    setCheckingId(id);
    try {
      const { data } = await api.get(`/api/admin/withdrawals/${id}/campay-check`);
      setCampayCheck(data);
    } catch (err) {
      toast.error(err.response?.data?.error || t('withdrawals.campayFailed'));
    } finally {
      setCheckingId(null);
    }
  }

  async function process(id, action, adminNote) {
    setProcessingId(id);
    try {
      await api.post(`/api/admin/withdrawals/${id}/process`, { action, adminNote });
      const messages = {
        APPROVED: t('withdrawals.momoSent'),
        MANUAL_APPROVED: t('withdrawals.markedPaid'),
        REJECTED: t('withdrawals.rejected'),
      };
      toast.success(messages[action] || t('withdrawals.done'));
      setRejecting(null);
      setNote('');
      load();
    } catch (err) {
      toast.error(err.response?.data?.error || t('withdrawals.processFailed'));
    } finally {
      setProcessingId(null);
    }
  }

  return (
    <AdminGuard>
      <AdminLayout title={t('withdrawals.title')} description={t('withdrawals.description')}>
        <h3 className="font-semibold text-navy mb-3">{t('withdrawals.pending', { count: pending.length })}</h3>
        <div className="table-shell overflow-x-auto mb-8">
          <table>
            <thead>
              <tr className="text-left text-gray-500 border-b bg-gray-50">
                <th className="p-3">{t('cols.owner')}</th>
                <th className="p-3">{t('cols.amount')}</th>
                <th className="p-3">{t('cols.phone')}</th>
                <th className="p-3">{t('cols.network')}</th>
                <th className="p-3">{t('cols.method')}</th>
                <th className="p-3">{t('cols.date')}</th>
                <th className="p-3">{t('cols.lastError')}</th>
                <th className="p-3 sticky-actions">{t('cols.actions')}</th>
              </tr>
            </thead>
            <tbody>
              {pending.length === 0 ? (
                <tr><td colSpan={8} className="p-6 text-center text-gray-400">{t('withdrawals.emptyPending')}</td></tr>
              ) : (
                pending.map((w) => (
                  <tr key={w.id} className="border-b">
                    <td className="p-3">{w.owner.name}</td>
                    <td className="p-3">{w.amountXaf.toLocaleString()} XAF</td>
                    <td className="p-3">{w.phoneNumber}</td>
                    <td className="p-3">{detectCameroonOperator(w.phoneNumber) || '—'}</td>
                    <td className="p-3">{w.method.replace('_', ' ')}</td>
                    <td className="p-3">{new Date(w.createdAt).toLocaleString()}</td>
                    <td className="p-3 text-xs text-red-600 max-w-xs">{w.adminNote || '—'}</td>
                    <td className="p-3 sticky-actions">
                      <div className="flex flex-wrap gap-2">
                      <button
                        type="button"
                        onClick={() => checkCampay(w.id)}
                        disabled={checkingId === w.id}
                        className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-xs disabled:opacity-50"
                      >
                        {checkingId === w.id ? t('checking') : t('withdrawals.checkCampay')}
                      </button>
                      <button
                        onClick={() => process(w.id, 'APPROVED')}
                        disabled={processingId === w.id}
                        className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs disabled:opacity-50"
                      >
                        {processingId === w.id ? t('withdrawals.sending') : t('withdrawals.sendMomo')}
                      </button>
                      <button
                        type="button"
                        onClick={() => process(w.id, 'MANUAL_APPROVED', t('withdrawals.manualNote'))}
                        disabled={processingId === w.id}
                        className="px-3 py-1 bg-amber-100 text-amber-800 rounded-lg text-xs disabled:opacity-50"
                      >
                        {t('withdrawals.markPaid')}
                      </button>
                      <button onClick={() => setRejecting(w)} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs">{t('actions.reject')}</button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <h3 className="font-semibold mb-3">{t('withdrawals.history')}</h3>
        <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b bg-gray-50">
                <th className="p-3">{t('cols.owner')}</th>
                <th className="p-3">{t('cols.amount')}</th>
                <th className="p-3">{t('cols.status')}</th>
                <th className="p-3">{t('cols.date')}</th>
              </tr>
            </thead>
            <tbody>
              {history.length === 0 ? (
                <tr><td colSpan={4} className="p-6 text-center text-gray-400">{t('withdrawals.emptyHistory')}</td></tr>
              ) : (
                history.map((w) => (
                  <tr key={w.id} className="border-b">
                    <td className="p-3">{w.owner.name}</td>
                    <td className="p-3">{w.amountXaf.toLocaleString()} XAF</td>
                    <td className="p-3">
                      <StatusBadge status={w.status} />
                      {w.adminNote && <p className="text-xs text-gray-400">{w.adminNote}</p>}
                    </td>
                    <td className="p-3">{new Date(w.createdAt).toLocaleString()}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          className="mt-4"
          page={historyPagination.page}
          totalPages={historyPagination.totalPages}
          total={historyPagination.total}
          limit={historyPagination.limit}
          onPageChange={setHistoryPage}
        />

        <Modal open={!!campayCheck} onClose={() => setCampayCheck(null)} title={t('withdrawals.campayTitle')}>
          {campayCheck && (
            <div className="space-y-2 text-sm">
              <p><strong>{t('withdrawals.apiPhone')}</strong> {campayCheck.campayPhone}</p>
              <p><strong>{t('withdrawals.network')}</strong> {campayCheck.operator || '—'}</p>
              <p><strong>{t('withdrawals.momoName')}</strong> {campayCheck.holderName || campayCheck.holderError || '—'}</p>
              {campayCheck.campayReference && (
                <>
                  <p><strong>{t('withdrawals.campayRef')}</strong> <span className="font-mono text-xs">{campayCheck.campayReference}</span></p>
                  <p><strong>{t('withdrawals.payoutStatus')}</strong> {formatCampayStatus(campayCheck.campayTransactionStatus)}</p>
                </>
              )}
              {campayCheck.balance && (
                <>
                  <p>
                    <strong>{t('withdrawals.appWallet')}</strong> {campayCheck.balance.total.toLocaleString()} {campayCheck.balance.currency}
                    {campayCheck.balance.usesTotalFallback && (
                      <span className="text-gray-500"> {t('withdrawals.splitsNotReported')}</span>
                    )}
                  </p>
                  <p>
                    <strong>{t('withdrawals.payoutPools')}</strong>{' '}
                    {t('withdrawals.payoutPoolsValues', {
                      mtn: campayCheck.balance.mtn.toLocaleString(),
                      orange: campayCheck.balance.orange.toLocaleString(),
                      currency: campayCheck.balance.currency,
                    })}
                  </p>
                </>
              )}
              {campayCheck.balanceDiagnosis && (
                <p className="text-amber-700 bg-amber-50 p-2 rounded">{campayCheck.balanceDiagnosis}</p>
              )}
              {campayCheck.balanceError && <p className="text-red-600">{campayCheck.balanceError}</p>}
              {campayCheck.apiWithdrawalHint && (
                <p className="text-xs text-gray-600 bg-gray-50 p-2 rounded">{campayCheck.apiWithdrawalHint}</p>
              )}
              <p className="text-xs text-gray-400">
                {t('withdrawals.apiLabel')} {campayCheck.campayBaseUrl}
                {campayCheck.isDemo && ` ${t('withdrawals.demoHint')}`}
                {campayCheck.usesPermanentToken && t('withdrawals.permanentToken')}
              </p>
              {campayCheck.rawBalance && (
                <p className="text-xs text-gray-400 font-mono break-all">
                  {t('withdrawals.rawBalance', { raw: JSON.stringify(campayCheck.rawBalance) })}
                </p>
              )}
            </div>
          )}
        </Modal>

        <Modal open={!!rejecting} onClose={() => setRejecting(null)} title={t('withdrawals.rejectTitle')}>
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={t('withdrawals.rejectPh')}
            required
            className="w-full px-3 py-2 border rounded-lg h-24"
          />
          <button
            onClick={() => process(rejecting.id, 'REJECTED', note)}
            className="w-full mt-4 bg-red-600 text-white py-2 rounded-lg"
          >
            {t('withdrawals.confirmReject')}
          </button>
        </Modal>
      </AdminLayout>
    </AdminGuard>
  );
}
