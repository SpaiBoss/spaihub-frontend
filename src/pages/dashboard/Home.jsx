import { useEffect, useState } from 'react';
import { TrendingUp, Users, Wifi, Wallet, BarChart3, Ticket, Smartphone } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
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

const PAYMENT_COLORS = ['#5463FF', '#1A3C5E'];

export default function Home() {
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
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
      .then(async ([statsRes, chartRes, routersRes]) => {
        setStats(statsRes.data);
        setChart(chartRes.data);
        setRouters(routersRes.data);
        try {
          const analyticsRes = await api.get('/api/owner/stats/analytics');
          setAnalytics(analyticsRes.data);
        } catch {
          setAnalytics({ revenueByLocation: [], paymentMix: { momo: 0, voucher: 0 }, vouchers: null });
        }
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

  const paymentMix = analytics
    ? [
        { name: 'Mobile Money', value: analytics.paymentMix.momo },
        { name: 'Vouchers', value: analytics.paymentMix.voucher },
      ].filter((item) => item.value > 0)
    : [];

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
        <Skeleton className="h-72" />
      </div>
    );
  }

  if (error || !stats) {
    return (
      <Card>
        <EmptyState title="Unable to load dashboard" description={error || 'No dashboard data available.'} />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Today's Revenue" value={formatXaf(stats.todayRevenue)} icon={TrendingUp} trend={trend} accent="green" />
        <StatCard
          title="This Month"
          value={formatXaf(stats.monthRevenue)}
          icon={BarChart3}
          trend={stats.monthChangePercent}
          accent="brand"
        />
        <StatCard title="Active Sessions" value={stats.activeSessions} icon={Users} accent="navy" />
        <StatCard title="Wallet Balance" value={formatXaf(stats.walletBalance)} icon={Wallet} accent="amber" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card bodyClassName="p-4">
          <p className="text-xs font-semibold text-navy/50 uppercase tracking-wide">All-time revenue</p>
          <p className="text-xl font-bold text-navy mt-2">{formatXaf(stats.allTimeRevenue)}</p>
        </Card>
        <Card bodyClassName="p-4">
          <p className="text-xs font-semibold text-navy/50 uppercase tracking-wide">Unique subscribers today</p>
          <p className="text-xl font-bold text-navy mt-2">{stats.uniqueSubscribersToday}</p>
          <p className="text-xs text-navy/45 mt-1">{stats.transactionsToday} total payments</p>
        </Card>
        <Card bodyClassName="p-4">
          <p className="text-xs font-semibold text-navy/50 uppercase tracking-wide">MoMo this month</p>
          <p className="text-xl font-bold text-navy mt-2">{formatXaf(stats.momoRevenueMonth)}</p>
        </Card>
        <Card bodyClassName="p-4">
          <p className="text-xs font-semibold text-navy/50 uppercase tracking-wide">Voucher revenue</p>
          <p className="text-xl font-bold text-navy mt-2">{formatXaf(stats.voucherRevenueMonth)}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2">
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

        <Card>
          <h3 className="font-semibold text-navy mb-1">Payment mix</h3>
          <p className="text-xs text-navy/50 mb-4">Last 30 days by source</p>
          {paymentMix.length === 0 ? (
            <p className="text-sm text-navy/50 text-center py-16">No revenue in this period</p>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie data={paymentMix} dataKey="value" nameKey="name" innerRadius={50} outerRadius={72} paddingAngle={3}>
                    {paymentMix.map((_, i) => (
                      <Cell key={i} fill={PAYMENT_COLORS[i % PAYMENT_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(v) => formatXaf(v)} contentStyle={chartTooltipStyle} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2 mt-2">
                {paymentMix.map((item, i) => (
                  <div key={item.name} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 text-navy/70">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: PAYMENT_COLORS[i] }} />
                      {item.name}
                    </span>
                    <span className="font-semibold text-navy">{formatXaf(item.value)}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <h3 className="font-semibold text-navy mb-5">Revenue by location</h3>
          {!analytics?.revenueByLocation?.length ? (
            <p className="text-sm text-navy/50 text-center py-8">No location revenue in the last 30 days</p>
          ) : (
            <div className="space-y-3">
              {analytics.revenueByLocation.slice(0, 6).map((loc) => {
                const max = analytics.revenueByLocation[0]?.revenue || 1;
                const pct = Math.round((loc.revenue / max) * 100);
                return (
                  <div key={loc.locationId}>
                    <div className="flex justify-between text-sm mb-1.5">
                      <span className="font-medium text-navy">{loc.name}</span>
                      <span className="text-navy/60">{formatXaf(loc.revenue)}</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100 overflow-hidden">
                      <div className="h-full rounded-full bg-brand" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-5">
            <Ticket className="w-4 h-4 text-brand" />
            <h3 className="font-semibold text-navy">Voucher performance</h3>
          </div>
          {analytics?.vouchers ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: 'Unused', value: analytics.vouchers.unused, color: 'text-brand' },
                  { label: 'Redeemed', value: analytics.vouchers.redeemed, color: 'text-emerald-600' },
                  { label: 'Expired', value: analytics.vouchers.expired, color: 'text-amber-600' },
                  { label: 'Redemption rate', value: `${analytics.vouchers.redemptionRate}%`, color: 'text-navy' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-surface-muted p-3">
                    <p className="text-[11px] font-semibold text-navy/45 uppercase">{item.label}</p>
                    <p className={`text-lg font-bold mt-1 ${item.color}`}>{item.value}</p>
                  </div>
                ))}
              </div>
              {(stats.pendingTransactions > 0 || stats.failedTransactionsMonth > 0) && (
                <div className="rounded-xl border border-amber-100 bg-amber-50/60 p-3 text-xs text-amber-800">
                  <p className="font-semibold mb-1">Transaction health (this month)</p>
                  <p>{stats.pendingTransactions} pending · {stats.failedTransactionsMonth} failed</p>
                </div>
              )}
            </div>
          ) : (
            <p className="text-sm text-navy/50">No voucher data yet</p>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-9 h-9 rounded-xl bg-brand/10 flex items-center justify-center">
              <Wifi className="w-4 h-4 text-brand" />
            </div>
            <h3 className="font-semibold text-navy">Router status</h3>
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
          <div className="flex items-center gap-2 mb-5">
            <Smartphone className="w-4 h-4 text-brand" />
            <h3 className="font-semibold text-navy">Top packages today</h3>
          </div>
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
