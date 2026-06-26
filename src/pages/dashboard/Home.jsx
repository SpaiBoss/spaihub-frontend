import { useEffect, useState, useMemo } from 'react';
import { TrendingUp, Users, Wifi, Wallet, BarChart3, Ticket, Smartphone } from 'lucide-react';
import {
  AreaChart,
  Area,
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
import toast from 'react-hot-toast';
import api from '../../services/api';
import { Card, EmptyState, Skeleton, StatCard, StatusBadge } from '../../components/ui';
import AccountingExportBar from '../../components/AccountingExportBar';
import {
  ChartTooltip,
  ChartGradientDefs,
  CHART_AXIS,
  PAYMENT_COLORS,
  formatXaf,
  formatChartDate,
} from '../../components/charts/ChartPrimitives';

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
          toast.error('Some analytics could not be loaded');
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

  const paymentMix = useMemo(
    () =>
      analytics
        ? [
            { name: 'Mobile Money', value: analytics.paymentMix.momo },
            { name: 'Vouchers', value: analytics.paymentMix.voucher },
          ].filter((item) => item.value > 0)
        : [],
    [analytics]
  );

  const locationChart = useMemo(
    () => (analytics?.revenueByLocation || []).slice(0, 6).map((loc) => ({ name: loc.name, revenue: loc.revenue })),
    [analytics]
  );

  const voucherChart = useMemo(() => {
    if (!analytics?.vouchers) return [];
    return [
      { name: 'Unused', value: analytics.vouchers.unused },
      { name: 'Redeemed', value: analytics.vouchers.redeemed },
      { name: 'Expired', value: analytics.vouchers.expired },
    ].filter((v) => v.value > 0);
  }, [analytics]);

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
      <AccountingExportBar mode="owner" />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title="Today's Revenue" value={formatXaf(stats.todayRevenue)} icon={TrendingUp} trend={trend} accent="green" />
        <StatCard title="This Month" value={formatXaf(stats.monthRevenue)} icon={BarChart3} trend={stats.monthChangePercent} accent="brand" />
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
        <Card className="xl:col-span-2 overflow-hidden">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <h3 className="font-semibold text-navy">Revenue trend</h3>
              <p className="text-xs text-navy/50 mt-1">Daily net earnings — last 30 days</p>
            </div>
            <span className="text-xs font-semibold text-brand bg-brand/10 px-2.5 py-1 rounded-full">Live</span>
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={chart} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <ChartGradientDefs />
              <CartesianGrid strokeDasharray="4 4" stroke="#eef2f6" vertical={false} />
              <XAxis dataKey="date" {...CHART_AXIS} tickFormatter={(d) => d.slice(5)} />
              <YAxis {...CHART_AXIS} width={56} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
              <Tooltip content={<ChartTooltip />} labelFormatter={formatChartDate} />
              <Area
                type="monotone"
                dataKey="amount"
                name="Net earnings"
                stroke="#5463FF"
                strokeWidth={2.5}
                fill="url(#brandArea)"
                dot={false}
                activeDot={{ r: 5, fill: '#5463FF', stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </Card>

        <Card>
          <h3 className="font-semibold text-navy">Payment mix</h3>
          <p className="text-xs text-navy/50 mt-1 mb-4">Last 30 days by source</p>
          {paymentMix.length === 0 ? (
            <p className="text-sm text-navy/50 text-center py-16">No revenue in this period</p>
          ) : (
            <>
              <ResponsiveContainer width="100%" height={190}>
                <PieChart>
                  <Pie
                    data={paymentMix}
                    dataKey="value"
                    nameKey="name"
                    innerRadius={52}
                    outerRadius={78}
                    paddingAngle={4}
                    stroke="none"
                  >
                    {paymentMix.map((_, i) => (
                      <Cell key={i} fill={PAYMENT_COLORS[i % PAYMENT_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<ChartTooltip />} />
                </PieChart>
              </ResponsiveContainer>
              <div className="space-y-2.5 mt-1">
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
          <h3 className="font-semibold text-navy mb-1">Revenue by location</h3>
          <p className="text-xs text-navy/50 mb-5">Top locations — last 30 days</p>
          {locationChart.length === 0 ? (
            <p className="text-sm text-navy/50 text-center py-8">No location revenue in the last 30 days</p>
          ) : (
            <ResponsiveContainer width="100%" height={Math.max(220, locationChart.length * 42)}>
              <BarChart data={locationChart} layout="vertical" margin={{ left: 8, right: 16 }}>
                <ChartGradientDefs />
                <CartesianGrid strokeDasharray="4 4" stroke="#eef2f6" horizontal={false} />
                <XAxis type="number" {...CHART_AXIS} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                <YAxis type="category" dataKey="name" {...CHART_AXIS} width={110} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="revenue" name="Net earnings" fill="url(#brandBar)" radius={[0, 8, 8, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-1">
            <Ticket className="w-4 h-4 text-brand" />
            <h3 className="font-semibold text-navy">Voucher performance</h3>
          </div>
          <p className="text-xs text-navy/50 mb-4">Inventory and redemption</p>
          {analytics?.vouchers ? (
            <div className="space-y-4">
              {voucherChart.length > 0 && (
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie data={voucherChart} dataKey="value" nameKey="name" innerRadius={40} outerRadius={62} paddingAngle={3} stroke="none">
                      <Cell fill="#5463FF" />
                      <Cell fill="#10b981" />
                      <Cell fill="#f59e0b" />
                    </Pie>
                    <Tooltip content={<ChartTooltip formatter={(v) => v} />} />
                  </PieChart>
                </ResponsiveContainer>
              )}
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
            <ResponsiveContainer width="100%" height={Math.max(180, stats.topPackages.length * 48)}>
              <BarChart data={stats.topPackages.map((p) => ({ name: p.name, sales: p.count }))} layout="vertical" margin={{ left: 8, right: 16 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#eef2f6" horizontal={false} />
                <XAxis type="number" {...CHART_AXIS} allowDecimals={false} />
                <YAxis type="category" dataKey="name" {...CHART_AXIS} width={100} />
                <Tooltip content={<ChartTooltip formatter={(v) => `${v} sales`} />} />
                <Bar dataKey="sales" name="Sales" fill="#1A3C5E" radius={[0, 8, 8, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>
    </div>
  );
}
