import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { Skeleton, StatusBadge, EmptyState } from '../../components/ui';

export default function ContributorHome() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/api/contributor/dashboard')
      .then((res) => setData(res.data))
      .catch((err) => setError(err.response?.data?.error || 'Failed to load'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Skeleton className="h-48 rounded-xl" />;
  if (error || !data) {
    return <EmptyState title="Could not load dashboard" description={error} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-navy">Welcome, {data.name}</h1>
        <p className="text-sm text-navy/50 mt-1">Spare uplink contribution overview</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <p className="text-xs text-navy/50 uppercase tracking-wide">Balance</p>
          <p className="text-2xl font-bold text-navy mt-1">{data.walletBalance.toLocaleString()} XAF</p>
          <Link to="/contributor/wallet" className="text-sm text-brand font-medium mt-2 inline-block">
            Withdraw →
          </Link>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <p className="text-xs text-navy/50 uppercase tracking-wide">Today</p>
          <p className="text-2xl font-bold text-navy mt-1">{data.today.gb.toFixed(2)} GB</p>
          <p className="text-sm text-navy/50 mt-1">{data.today.amountXaf.toLocaleString()} XAF</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <p className="text-xs text-navy/50 uppercase tracking-wide">This month</p>
          <p className="text-2xl font-bold text-navy mt-1">{data.month.gb.toFixed(2)} GB</p>
          <p className="text-sm text-navy/50 mt-1">{data.month.amountXaf.toLocaleString()} XAF</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold text-navy">Your links</h2>
          <span className="text-xs text-navy/45">{data.activeLinkCount} active</span>
        </div>
        {data.links.length === 0 ? (
          <div className="p-6">
            <EmptyState
              title="No links yet"
              description="SpaiHub will attach a physical uplink at a nearby hotspot and list it here."
            />
          </div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {data.links.map((link) => (
              <li key={link.id} className="p-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-medium text-navy">{link.location?.name || 'Location'}</p>
                  <p className="text-xs text-navy/50 font-mono mt-0.5">
                    {link.interfaceName} · {link.capMbps} Mbps · {link.rateXafPerGb} XAF/GB
                  </p>
                </div>
                <StatusBadge status={link.status} />
              </li>
            ))}
          </ul>
        )}
        <div className="p-4 border-t">
          <Link to="/contributor/links" className="text-sm font-medium text-brand hover:text-brand/80">
            View all links →
          </Link>
        </div>
      </div>
    </div>
  );
}
