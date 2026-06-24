import { useEffect, useState } from 'react';
import api from '../../services/api';
import { StatusBadge } from '../../components/ui';
import { AdminGuard, AdminLayout } from './AdminLogin';

export default function AdminTransactions() {
  const [data, setData] = useState({ transactions: [], pagination: {} });
  const [page, setPage] = useState(1);

  useEffect(() => {
    api.get(`/api/admin/transactions?page=${page}`).then((res) => setData(res.data));
  }, [page]);

  return (
    <AdminGuard>
      <AdminLayout title="All Transactions">
        <div className="bg-white rounded-xl border shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-500 border-b bg-gray-50">
                <th className="p-3">Date</th>
                <th className="p-3">Owner</th>
                <th className="p-3">Location</th>
                <th className="p-3">Package</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Fee</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {data.transactions.map((tx) => (
                <tr key={tx.id} className="border-b">
                  <td className="p-3">{new Date(tx.createdAt).toLocaleString()}</td>
                  <td className="p-3">{tx.owner.name}</td>
                  <td className="p-3">{tx.location.name}</td>
                  <td className="p-3">{tx.package.name}</td>
                  <td className="p-3">{tx.amountXaf.toLocaleString()} XAF</td>
                  <td className="p-3">{tx.platformFeeXaf.toLocaleString()} XAF</td>
                  <td className="p-3"><StatusBadge status={tx.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {data.pagination.totalPages > 1 && (
          <div className="flex justify-center gap-4 mt-4">
            <button disabled={page <= 1} onClick={() => setPage(page - 1)} className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50">Previous</button>
            <span className="text-sm text-gray-500">Page {page} of {data.pagination.totalPages}</span>
            <button disabled={page >= data.pagination.totalPages} onClick={() => setPage(page + 1)} className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50">Next</button>
          </div>
        )}
      </AdminLayout>
    </AdminGuard>
  );
}
