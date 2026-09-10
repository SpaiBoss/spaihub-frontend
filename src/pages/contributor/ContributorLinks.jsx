import { useEffect, useState } from 'react';
import api from '../../services/api';
import { Skeleton, StatusBadge, EmptyState } from '../../components/ui';

export default function ContributorLinks() {
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get('/api/contributor/links')
      .then((res) => setLinks(res.data.links || []))
      .catch((err) => setError(err.response?.data?.error || 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Skeleton className="h-40 rounded-xl" />;
  if (error) return <EmptyState title="Could not load links" description={error} />;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-navy">Links</h1>
        <p className="text-sm text-navy/50 mt-1">Physical uplinks SpaiHub configured for you</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b bg-gray-50">
              <th className="p-3">Location</th>
              <th className="p-3">Interface</th>
              <th className="p-3">Cap</th>
              <th className="p-3">Rate</th>
              <th className="p-3">Last meter</th>
              <th className="p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {links.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-400">
                  No links yet
                </td>
              </tr>
            ) : (
              links.map((l) => (
                <tr key={l.id} className="border-b border-gray-50">
                  <td className="p-3">{l.location?.name || '—'}</td>
                  <td className="p-3 font-mono text-xs">{l.interfaceName}</td>
                  <td className="p-3">{l.capMbps} Mbps</td>
                  <td className="p-3">{l.rateXafPerGb} XAF/GB</td>
                  <td className="p-3 text-xs text-navy/55">
                    {l.lastMeterAt
                      ? `${Number(l.lastMeterBytes || 0).toLocaleString()} B · ${new Date(l.lastMeterAt).toLocaleString()}`
                      : '—'}
                  </td>
                  <td className="p-3">
                    <StatusBadge status={l.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
