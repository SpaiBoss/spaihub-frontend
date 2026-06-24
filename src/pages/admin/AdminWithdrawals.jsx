import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { Modal, StatusBadge } from '../../components/ui';
import { AdminGuard, AdminLayout } from './AdminLogin';

export default function AdminWithdrawals() {
  const [withdrawals, setWithdrawals] = useState([]);
  const [rejecting, setRejecting] = useState(null);
  const [note, setNote] = useState('');

  async function load() {
    const { data } = await api.get('/api/admin/withdrawals');
    setWithdrawals(data);
  }

  useEffect(() => { load(); }, []);

  async function process(id, action, adminNote) {
    await api.post(`/api/admin/withdrawals/${id}/process`, { action, adminNote });
    toast.success(`Withdrawal ${action.toLowerCase()}`);
    setRejecting(null);
    setNote('');
    load();
  }

  const pending = withdrawals.filter((w) => w.status === 'PENDING');
  const history = withdrawals.filter((w) => w.status !== 'PENDING');

  return (
    <AdminGuard>
      <AdminLayout title="Withdrawals">
        <h3 className="font-semibold mb-3">Pending ({pending.length})</h3>
        <div className="bg-white rounded-xl border shadow-sm overflow-x-auto mb-8">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b bg-gray-50">
                <th className="p-3">Owner</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Method</th>
                <th className="p-3">Date</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pending.length === 0 ? (
                <tr><td colSpan={6} className="p-6 text-center text-gray-400">No pending withdrawals</td></tr>
              ) : (
                pending.map((w) => (
                  <tr key={w.id} className="border-b">
                    <td className="p-3">{w.owner.name}</td>
                    <td className="p-3">{w.amountXaf.toLocaleString()} XAF</td>
                    <td className="p-3">{w.phoneNumber}</td>
                    <td className="p-3">{w.method.replace('_', ' ')}</td>
                    <td className="p-3">{new Date(w.createdAt).toLocaleString()}</td>
                    <td className="p-3 flex gap-2">
                      <button onClick={() => process(w.id, 'APPROVED')} className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-xs">Approve</button>
                      <button onClick={() => setRejecting(w)} className="px-3 py-1 bg-red-100 text-red-700 rounded-lg text-xs">Reject</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <h3 className="font-semibold mb-3">History</h3>
        <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b bg-gray-50">
                <th className="p-3">Owner</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {history.map((w) => (
                <tr key={w.id} className="border-b">
                  <td className="p-3">{w.owner.name}</td>
                  <td className="p-3">{w.amountXaf.toLocaleString()} XAF</td>
                  <td className="p-3">
                    <StatusBadge status={w.status} />
                    {w.adminNote && <p className="text-xs text-gray-400">{w.adminNote}</p>}
                  </td>
                  <td className="p-3">{new Date(w.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal open={!!rejecting} onClose={() => setRejecting(null)} title="Reject Withdrawal">
          <textarea
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Reason for rejection"
            required
            className="w-full px-3 py-2 border rounded-lg h-24"
          />
          <button
            onClick={() => process(rejecting.id, 'REJECTED', note)}
            className="w-full mt-4 bg-red-600 text-white py-2 rounded-lg"
          >
            Confirm Rejection
          </button>
        </Modal>
      </AdminLayout>
    </AdminGuard>
  );
}
