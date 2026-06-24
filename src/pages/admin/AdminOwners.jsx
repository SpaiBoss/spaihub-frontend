import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { StatusBadge } from '../../components/ui';
import { AdminGuard, AdminLayout } from './AdminLogin';

export default function AdminOwners() {
  const [owners, setOwners] = useState([]);

  async function load() {
    const { data } = await api.get('/api/admin/owners');
    setOwners(data.owners);
  }

  useEffect(() => { load(); }, []);

  async function toggleStatus(id, currentStatus) {
    const newStatus = currentStatus === 'ACTIVE' ? 'SUSPENDED' : 'ACTIVE';
    await api.patch(`/api/admin/owners/${id}/status`, { status: newStatus });
    toast.success(`Owner ${newStatus.toLowerCase()}`);
    load();
  }

  return (
    <AdminGuard>
      <AdminLayout title="Owners">
        <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b bg-gray-50">
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Status</th>
                <th className="p-3">Locations</th>
                <th className="p-3">Transactions</th>
                <th className="p-3">Revenue</th>
                <th className="p-3">Wallet</th>
                <th className="p-3">Joined</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {owners.map((o) => (
                <tr key={o.id} className="border-b">
                  <td className="p-3">{o.name}</td>
                  <td className="p-3">{o.email}</td>
                  <td className="p-3"><StatusBadge status={o.status} /></td>
                  <td className="p-3">{o.locationCount}</td>
                  <td className="p-3">{o.totalTransactions}</td>
                  <td className="p-3">{o.totalRevenue.toLocaleString()} XAF</td>
                  <td className="p-3">{o.walletBalance.toLocaleString()} XAF</td>
                  <td className="p-3">{new Date(o.createdAt).toLocaleDateString()}</td>
                  <td className="p-3">
                    <button
                      onClick={() => toggleStatus(o.id, o.status)}
                      className={`text-xs px-3 py-1 rounded-lg ${o.status === 'ACTIVE' ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}
                    >
                      {o.status === 'ACTIVE' ? 'Suspend' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
