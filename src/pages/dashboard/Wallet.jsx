import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { Loader } from 'lucide-react';
import api from '../../services/api';
import { Modal, Pagination, StatusBadge, Button, Input, Skeleton, EmptyState } from '../../components/ui';
import { detectCameroonOperator, paymentMethodForOperator } from '../../utils/phone';
import { usePublicConfig } from '../../hooks/usePublicConfig';

export default function Wallet() {
  const { platformFeePercent } = usePublicConfig();
  const [wallet, setWallet] = useState(null);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, totalPages: 1 });
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [form, setForm] = useState({ amountXaf: '', phoneNumber: '', method: 'MTN_MOMO' });
  const idempotencyKeyRef = useRef(null);

  async function loadWallet(currentPage = page) {
    try {
      setError(null);
      const { data } = await api.get(`/api/owner/wallet?page=${currentPage}`);
      setWallet(data);
      setPagination(data.pagination);
    } catch (err) {
      setWallet(null);
      setError(err.response?.data?.error || 'Failed to load wallet');
    }
  }

  useEffect(() => {
    setLoading(true);
    loadWallet(page).finally(() => setLoading(false));
  }, [page]);

  function openWithdrawModal() {
    idempotencyKeyRef.current = crypto.randomUUID();
    setShowWithdraw(true);
  }

  function closeWithdrawModal() {
    if (submitting) return;
    setShowWithdraw(false);
  }

  async function handleWithdraw(e) {
    e.preventDefault();
    if (submitting) return;

    if (!idempotencyKeyRef.current) {
      idempotencyKeyRef.current = crypto.randomUUID();
    }

    setSubmitting(true);
    try {
      const { data } = await api.post(
        '/api/owner/wallet/withdraw',
        {
          amountXaf: Number(form.amountXaf),
          phoneNumber: form.phoneNumber,
          method: form.method,
          idempotencyKey: idempotencyKeyRef.current,
        },
        {
          headers: { 'Idempotency-Key': idempotencyKeyRef.current },
        }
      );
      toast.success(data.pendingAdminRetry ? data.message : 'Withdrawal sent to your MoMo');
      setShowWithdraw(false);
      setForm({ amountXaf: '', phoneNumber: '', method: 'MTN_MOMO' });
      idempotencyKeyRef.current = null;
      loadWallet(page);
    } catch (err) {
      const data = err.response?.data;
      if (data?.pendingAdminRetry) {
        toast.success(data.message || 'Withdrawal queued for processing');
        setShowWithdraw(false);
        setForm({ amountXaf: '', phoneNumber: '', method: 'MTN_MOMO' });
        idempotencyKeyRef.current = null;
        loadWallet(page);
        return;
      }
      toast.error(data?.error || 'Withdrawal failed');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <Skeleton className="h-48 rounded-xl" />;

  if (error || !wallet) {
    return (
      <EmptyState
        title="Could not load wallet"
        description={error || 'Something went wrong'}
        action={<Button onClick={() => loadWallet(page)}>Retry</Button>}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-100 p-6 sm:p-8 shadow-sm text-center">
        <p className="text-gray-500 text-sm">
          {(wallet.contributorReservedXaf || 0) > 0 ? 'Available to withdraw' : 'Available Balance'}
        </p>
        <p className="text-3xl sm:text-4xl font-bold text-navy mt-2">
          {(wallet.availableXaf ?? wallet.walletBalance).toLocaleString()} XAF
        </p>
        {(wallet.contributorReservedXaf || 0) > 0 && (
          <div className="mt-3 text-sm text-navy/55 space-y-1">
            <p>Wallet total: {wallet.walletBalance.toLocaleString()} XAF</p>
            <p>
              Reserved for contributors:{' '}
              <span className="font-medium text-navy">{wallet.contributorReservedXaf.toLocaleString()} XAF</span>
            </p>
          </div>
        )}
        <Button onClick={openWithdrawModal} className="mt-4 w-full sm:w-auto min-h-[48px] text-base">
          Withdraw to MoMo
        </Button>
        <p className="mt-4 text-xs text-navy/45 max-w-sm mx-auto leading-relaxed">
          MoMo sales credit your wallet after the platform fee ({platformFeePercent}%). Voucher stock you sold offline does not add wallet balance.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <h3 className="p-4 font-semibold border-b">Withdrawal History</h3>

        <div className="md:hidden divide-y divide-gray-100">
          {wallet.withdrawals.length === 0 ? (
            <p className="p-8 text-center text-gray-400 text-sm">No withdrawals yet</p>
          ) : (
            wallet.withdrawals.map((w) => (
              <div key={w.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <p className="font-semibold text-navy">{w.amountXaf.toLocaleString()} XAF</p>
                  <StatusBadge status={w.status} />
                </div>
                <p className="text-xs text-navy/50 mt-1">
                  {w.method.replace('_', ' ')} · {w.phoneNumber}
                </p>
                <p className="text-xs text-navy/40 mt-1">{new Date(w.createdAt).toLocaleString()}</p>
                {w.adminNote && <p className="text-xs text-gray-400 mt-1">{w.adminNote}</p>}
              </div>
            ))
          )}
        </div>

        <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b bg-gray-50">
              <th className="p-3">Date</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Method</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {wallet.withdrawals.length === 0 ? (
              <tr><td colSpan={5} className="p-8 text-center text-gray-400">No withdrawals yet</td></tr>
            ) : (
              wallet.withdrawals.map((w) => (
                <tr key={w.id} className="border-b border-gray-50">
                  <td className="p-3">{new Date(w.createdAt).toLocaleString()}</td>
                  <td className="p-3">{w.amountXaf.toLocaleString()} XAF</td>
                  <td className="p-3">{w.method.replace('_', ' ')}</td>
                  <td className="p-3">{w.phoneNumber}</td>
                  <td className="p-3">
                    <StatusBadge status={w.status} />
                    {w.adminNote && <p className="text-xs text-gray-400 mt-1">{w.adminNote}</p>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>
        <Pagination
          className="p-4 border-t"
          page={pagination.page}
          totalPages={pagination.totalPages}
          total={pagination.total}
          limit={pagination.limit}
          onPageChange={setPage}
        />
      </div>

      <Modal open={showWithdraw} onClose={closeWithdrawModal} title="Request Withdrawal">
        <form onSubmit={handleWithdraw} className="space-y-4">
          <div>
            <Input
              label="Amount (XAF)"
              type="number"
              min={100}
              max={wallet.availableXaf ?? wallet.walletBalance}
              value={form.amountXaf}
              onChange={(e) => setForm({ ...form, amountXaf: e.target.value })}
              required
              disabled={submitting}
            />
            <p className="text-xs text-gray-400 mt-1">
              Minimum 100 XAF
              {(wallet.contributorReservedXaf || 0) > 0
                ? ` · Max ${Number(wallet.availableXaf).toLocaleString()} XAF available`
                : ''}
            </p>
          </div>
          <div>
            <Input
              label="Phone Number"
              type="tel"
              placeholder="6XXXXXXXX"
              value={form.phoneNumber}
              onChange={(e) => {
                const phoneNumber = e.target.value.replace(/\D/g, '').slice(0, 9);
                const operator = detectCameroonOperator(phoneNumber);
                const method = paymentMethodForOperator(operator) || form.method;
                setForm({ ...form, phoneNumber, method });
              }}
              required
              disabled={submitting}
            />
            {detectCameroonOperator(form.phoneNumber) && (
              <p className="text-xs text-navy/50 mt-1">
                Detected: {detectCameroonOperator(form.phoneNumber)}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Payment Method</label>
            <select
              value={form.method}
              onChange={(e) => setForm({ ...form, method: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg bg-gray-50 disabled:opacity-60"
              disabled={submitting || Boolean(detectCameroonOperator(form.phoneNumber))}
            >
              <option value="MTN_MOMO">MTN MoMo</option>
              <option value="ORANGE_MONEY">Orange Money</option>
            </select>
          </div>
          <p className="text-xs text-gray-500 bg-gray-50 p-3 rounded-lg">
            Withdrawals are sent automatically to your MoMo number via Campay.
          </p>
          {submitting && (
            <div className="flex items-center justify-center gap-2 text-sm text-navy/60 py-2">
              <Loader className="w-4 h-4 animate-spin text-brand" />
              Sending withdrawal to your MoMo — please wait…
            </div>
          )}
          <Button type="submit" className="w-full" disabled={submitting}>
            {submitting ? 'Processing withdrawal…' : 'Submit Withdrawal'}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
