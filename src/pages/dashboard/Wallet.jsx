import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { Modal, StatusBadge } from '../../components/ui';

export default function Wallet() {
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showWithdraw, setShowWithdraw] = useState(false);
  const [form, setForm] = useState({ amountXaf: '', phoneNumber: '', method: 'MTN_MOMO' });

  async function loadWallet() {
    const { data } = await api.get('/api/owner/wallet');
    setWallet(data);
  }

  useEffect(() => {
    loadWallet().finally(() => setLoading(false));
  }, []);

  async function handleWithdraw(e) {
    e.preventDefault();
    try {
      await api.post('/api/owner/wallet/withdraw', {
        amountXaf: Number(form.amountXaf),
        phoneNumber: form.phoneNumber,
        method: form.method,
      });
      toast.success('Withdrawal requested');
      setShowWithdraw(false);
      setForm({ amountXaf: '', phoneNumber: '', method: 'MTN_MOMO' });
      loadWallet();
    } catch (err) {
      toast.error(err.response?.data?.error || 'Withdrawal failed');
    }
  }

  if (loading) return <div className="animate-pulse bg-gray-200 rounded-xl h-48" />;

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl border border-gray-100 p-8 shadow-sm text-center">
        <p className="text-gray-500 text-sm">Available Balance</p>
        <p className="text-4xl font-bold text-navy mt-2">
          {wallet.walletBalance.toLocaleString()} XAF
        </p>
        <button
          onClick={() => setShowWithdraw(true)}
          className="mt-4 bg-brand text-white px-6 py-2.5 rounded-lg font-medium hover:bg-brand/90"
        >
          Withdraw
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <h3 className="p-4 font-semibold border-b">Withdrawal History</h3>
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

      <Modal open={showWithdraw} onClose={() => setShowWithdraw(false)} title="Request Withdrawal">
        <form onSubmit={handleWithdraw} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Amount (XAF)</label>
            <input
              type="number"
              min={1000}
              max={wallet.walletBalance}
              value={form.amountXaf}
              onChange={(e) => setForm({ ...form, amountXaf: e.target.value })}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
            <p className="text-xs text-gray-400 mt-1">Minimum 1,000 XAF</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <input
              type="tel"
              placeholder="6XXXXXXXX"
              value={form.phoneNumber}
              onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })}
              required
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Payment Method</label>
            <select
              value={form.method}
              onChange={(e) => setForm({ ...form, method: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="MTN_MOMO">MTN MoMo</option>
              <option value="ORANGE_MONEY">Orange Money</option>
            </select>
          </div>
          <p className="text-xs text-yellow-600 bg-yellow-50 p-3 rounded-lg">
            Withdrawals are processed within 24 hours.
          </p>
          <button type="submit" className="w-full bg-brand text-white py-2.5 rounded-lg font-medium">
            Submit Withdrawal
          </button>
        </form>
      </Modal>
    </div>
  );
}
