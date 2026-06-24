import { useEffect, useState } from 'react';
import { TrendingUp, Users, Wifi, Wallet } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import api from '../../services/api';
import { Card, EmptyState, Skeleton, StatCard, StatusBadge } from '../../components/ui';

function formatXaf(amount) {
  return `${Number(amount).toLocaleString()} XAF`;
}

const chartTooltipStyle = {
  borderRadius: '12px',
  border: '1px solid #e5e7eb',
  boxShadow: '0 4px 12px rgb(26 60 94 / 0.08)',
  fontSize: '13px',
};

export default function Home() {
  const [stats, setStats] = useState(null);
  const [chart, setChart] = useState([]);
  const [routers, setRouters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    Promise.all([
      api.get('/api/owner/stats'),
      api.get('/api/owner/stats/revenue-chart'),
      api.get('/api/owner/stats/routers'),
    ])
      .then(([statsRes, chartRes, routersRes]) => {
        setStats(statsRes.data);
        setChart(chartRes.data);
        setRouters(routersRes.data);
      })
      .catch(() => setError('Failed to load dashboard data. Try signing in again.'))
      .finally(() => setLoading(false));
  }, []);

  const trend =
    stats && stats.yesterdayRevenue > 0
      ? Math.round(((stats.todayRevenue - stats.yesterdayRevenue) / stats.yesterdayRevenue) * 100)
      : stats?.todayRevenue > 0
        ? 100
        : 0;

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-32" />)}
        </div>
        <Skeleton className="h-72" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <Card>
        <EmptyState
          title="Unable to load dashboard"
          description={error || 'No dashboard data available.'}
        />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Today's Revenue" value={formatXaf(stats.todayRevenue)} icon={TrendingUp} trend={trend} accent="green" />
        <StatCard title="This Month" value={formatXaf(stats.monthRevenue)} icon={TrendingUp} accent="brand" />
        <StatCard title="Active Sessions" value={stats.activeSessions} icon={Users} accent="navy" />
        <StatCard title="Wallet Balance" value={formatXaf(stats.walletBalance)} icon={Wallet} accent="amber" />
      </div>

      <Card>
        <h3 className="font-semibold text-navy mb-1">Revenue — Last 30 Days</h3>
        <p className="text-xs text-navy/50 mb-5">Daily earnings across all locations</p>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={chart}>
            <CartesianGrid strokeDasharray="3 3" stroke="#eef2f6" vertical={false} />
            <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(d) => d.slice(5)} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
            <Tooltip formatter={(v) => formatXaf(v)} contentStyle={chartTooltipStyle} />
            <Bar dataKey="amount" fill="#5463FF" radius={[6, 6, 0, 0]} maxBarSize={32} />
          </BarChart>
        </ResponsiveContainer>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-9 h-9 rounded-xl bg-brand/10 flex items-center justify-center">
              <Wifi className="w-4 h-4 text-brand" />
            </div>
            <h3 className="font-semibold text-navy">Router Status</h3>
          </div>
          {routers.length === 0 ? (
            <p className="text-sm text-navy/50 text-center py-6">No routers configured yet</p>
          ) : (
            <div className="space-y-1">
              {routers.map((r) => (
                <div key={r.id} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <div>
                    <p className="font-medium text-sm text-navy">{r.name}</p>
                    <p className="text-navy/50 text-xs mt-0.5">{r.locationName}</p>
                  </div>
                  <div className="text-right">
                    <StatusBadge status={r.status} />
                    <p className="text-navy/40 text-xs mt-1">
                      {r.lastSeenAt ? new Date(r.lastSeenAt).toLocaleString() : 'Never seen'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <h3 className="font-semibold text-navy mb-5">Top Packages Today</h3>
          {stats.topPackages.length === 0 ? (
            <p className="text-sm text-navy/50 text-center py-6">No sales today yet</p>
          ) : (
            <div className="space-y-1">
              {stats.topPackages.map((pkg, i) => (
                <div key={pkg.packageId} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                  <span className="font-medium text-sm text-navy">
                    <span className="text-brand mr-2">{i + 1}.</span>
                    {pkg.name}
                  </span>
                  <span className="text-sm text-navy/60 font-medium">{pkg.count} sales</span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
