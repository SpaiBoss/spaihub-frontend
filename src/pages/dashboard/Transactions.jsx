import { useEffect, useState } from 'react';
import { Download } from 'lucide-react';
import api from '../../services/api';
import { StatusBadge } from '../../components/ui';

export default function Transactions() {
  const [data, setData] = useState({ transactions: [], pagination: {} });
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    locationId: '',
    status: '',
    dateFrom: '',
    dateTo: '',
    page: 1,
  });

  useEffect(() => {
    api.get('/api/owner/locations').then((res) => setLocations(res.data));
  }, []);

  useEffect(() => {
    setLoading(true);
    const params = new URLSearchParams();
    Object.entries(filters).forEach(([k, v]) => { if (v) params.set(k, v); });
    api.get(`/api/owner/transactions?${params}`)
      .then((res) => setData(res.data))
      .finally(() => setLoading(false));
  }, [filters]);

  async function exportCsv() {
    const params = new URLSearchParams();
    if (filters.locationId) params.set('locationId', filters.locationId);
    if (filters.status) params.set('status', filters.status);
    if (filters.dateFrom) params.set('dateFrom', filters.dateFrom);
    if (filters.dateTo) params.set('dateTo', filters.dateTo);

    const response = await api.get(`/api/owner/transactions/export?${params}`, { responseType: 'blob' });
    const url = URL.createObjectURL(response.data);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'transactions.csv';
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div>
      <div className="flex flex-wrap gap-3 mb-6">
        <select
          value={filters.locationId}
          onChange={(e) => setFilters({ ...filters, locationId: e.target.value, page: 1 })}
          className="px-3 py-2 border rounded-lg text-sm"
        >
          <option value="">All locations</option>
          {locations.map((l) => <option key={l.id} value={l.id}>{l.name}</option>)}
        </select>
        <select
          value={filters.status}
          onChange={(e) => setFilters({ ...filters, status: e.target.value, page: 1 })}
          className="px-3 py-2 border rounded-lg text-sm"
        >
          <option value="">All statuses</option>
          <option value="SUCCESS">Success</option>
          <option value="PENDING">Pending</option>
          <option value="FAILED">Failed</option>
        </select>
        <input type="date" value={filters.dateFrom} onChange={(e) => setFilters({ ...filters, dateFrom: e.target.value, page: 1 })} className="px-3 py-2 border rounded-lg text-sm" />
        <input type="date" value={filters.dateTo} onChange={(e) => setFilters({ ...filters, dateTo: e.target.value, page: 1 })} className="px-3 py-2 border rounded-lg text-sm" />
        <button onClick={exportCsv} className="flex items-center gap-2 ml-auto px-4 py-2 bg-brand text-white rounded-lg text-sm hover:bg-brand/90">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b bg-gray-50">
              <th className="p-3">Date/Time</th>
              <th className="p-3">Phone</th>
              <th className="p-3">Location</th>
              <th className="p-3">Package</th>
              <th className="p-3">Amount</th>
              <th className="p-3">Your Share</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={7} className="p-8 text-center text-gray-400">Loading...</td></tr>
            ) : data.transactions.length === 0 ? (
              <tr><td colSpan={7} className="p-8 text-center text-gray-400">No transactions found</td></tr>
            ) : (
              data.transactions.map((tx) => (
                <tr key={tx.id} className="border-b border-gray-50">
                  <td className="p-3">{new Date(tx.createdAt).toLocaleString()}</td>
                  <td className="p-3">{tx.subscriberPhone}</td>
                  <td className="p-3">{tx.locationName}</td>
                  <td className="p-3">{tx.packageName}</td>
                  <td className="p-3">{tx.amountXaf.toLocaleString()} XAF</td>
                  <td className="p-3">{tx.ownerCreditXaf.toLocaleString()} XAF</td>
                  <td className="p-3"><StatusBadge status={tx.status} /></td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {data.pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-4 mt-4">
          <button
            disabled={filters.page <= 1}
            onClick={() => setFilters({ ...filters, page: filters.page - 1 })}
            className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">
            Page {filters.page} of {data.pagination.totalPages}
          </span>
          <button
            disabled={filters.page >= data.pagination.totalPages}
            onClick={() => setFilters({ ...filters, page: filters.page + 1 })}
            className="px-4 py-2 border rounded-lg text-sm disabled:opacity-50"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
