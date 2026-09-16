import { useEffect, useState, useMemo } from 'react';
import { TrendingUp, Users, Wallet, BarChart3, Ticket, AlertTriangle } from 'lucide-react';
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
import { useTranslation } from 'react-i18next';
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
  const { t } = useTranslation('owner');
  const [stats, setStats] = useState(null);
  const [analytics, setAnalytics] = useState(null);
  const [chart, setChart] = useState([]);
  const [routers, setRouters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRouterScriptBanner, setShowRouterScriptBanner] = useState(
    () => !localStorage.getItem('spaihub_router_script_v2_dismissed')
  );

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
          toast.error(t('home.analyticsWarn'));
        }
      })
      .catch(() => setError(t('home.loadFailed')))
      .finally(() => setLoading(false));
  }, [t]);

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
            { name: t('home.momo'), value: analytics.paymentMix.momo },
            { name: t('home.vouchers'), value: analytics.paymentMix.voucher },
          ].filter((item) => item.value > 0)
        : [],
    [analytics, t]
  );

  const locationChart = useMemo(
    () => (analytics?.revenueByLocation || []).slice(0, 6).map((loc) => ({ name: loc.name, revenue: loc.revenue })),
    [analytics]
  );

  const voucherChart = useMemo(() => {
    if (!analytics?.vouchers) return [];
    return [
      { name: t('home.unused'), value: analytics.vouchers.unused },
      { name: t('home.redeemed'), value: analytics.vouchers.redeemed },
      { name: t('home.expired'), value: analytics.vouchers.expired },
    ].filter((v) => v.value > 0);
  }, [analytics, t]);

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
        <EmptyState title={t('home.loadError')} description={error || t('home.noData')} />
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <AccountingExportBar mode="owner" />

      {showRouterScriptBanner && routers.length > 0 && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex gap-3 items-start">
          <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-semibold text-amber-900">{t('home.scriptBannerTitle')}</p>
            <p className="text-sm text-amber-800 mt-1">
              {t('home.scriptBanner')}
            </p>
            <button
              type="button"
              onClick={() => {
                localStorage.setItem('spaihub_router_script_v2_dismissed', '1');
                setShowRouterScriptBanner(false);
              }}
              className="mt-3 text-sm font-medium text-amber-900 underline"
            >
              {t('home.dismiss')}
            </button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard title={t('home.todayRevenue')} value={formatXaf(stats.todayRevenue)} icon={TrendingUp} trend={trend} trendLabel={t('home.vsYesterday')} accent="green" />
        <StatCard title={t('home.thisMonth')} value={formatXaf(stats.monthRevenue)} icon={BarChart3} trend={stats.monthChangePercent} trendLabel={t('home.vsLastMonth')} accent="brand" />
        <StatCard title={t('home.activeSessions')} value={stats.activeSessions} icon={Users} accent="navy" />
        <StatCard title={t('home.walletBalance')} value={formatXaf(stats.walletBalance)} icon={Wallet} accent="amber" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card bodyClassName="p-3.5 sm:p-4">
          <p className="text-[11px] sm:text-xs font-semibold text-navy/50 uppercase tracking-wide">{t('home.allTime')}</p>
          <p className="text-lg sm:text-xl font-bold text-navy mt-2">{formatXaf(stats.allTimeRevenue)}</p>
        </Card>
        <Card bodyClassName="p-3.5 sm:p-4">
          <p className="text-[11px] sm:text-xs font-semibold text-navy/50 uppercase tracking-wide">{t('home.subscribersToday')}</p>
          <p className="text-lg sm:text-xl font-bold text-navy mt-2">{stats.uniqueSubscribersToday}</p>
          <p className="text-xs text-navy/45 mt-1">{t('home.paymentsToday', { count: stats.transactionsToday })}</p>
        </Card>
        <Card bodyClassName="p-3.5 sm:p-4">
          <p className="text-[11px] sm:text-xs font-semibold text-navy/50 uppercase tracking-wide">{t('home.momoMonth')}</p>
          <p className="text-lg sm:text-xl font-bold text-navy mt-2">{formatXaf(stats.momoRevenueMonth)}</p>
        </Card>
        <Card bodyClassName="p-3.5 sm:p-4">
          <p className="text-[11px] sm:text-xs font-semibold text-navy/50 uppercase tracking-wide">{t('home.voucherMonth')}</p>
          <p className="text-lg sm:text-xl font-bold text-navy mt-2">{formatXaf(stats.voucherRevenueMonth)}</p>
        </Card>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="xl:col-span-2 overflow-hidden">
          <div className="flex items-start justify-between gap-4 mb-5">
            <div>
              <h3 className="font-semibold text-navy">{t('home.revenueTrend')}</h3>
              <p className="text-xs text-navy/50 mt-1">{t('home.revenueTrendHint')}</p>
            </div>
            <span className="text-xs font-medium text-brand border border-brand/25 px-2 py-0.5 rounded">{t('home.live')}</span>
          </div>
          <div className="h-[220px] sm:h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chart} margin={{ top: 8, right: 4, left: -8, bottom: 0 }}>
              <ChartGradientDefs />
              <CartesianGrid strokeDasharray="4 4" stroke="#eef2f6" vertical={false} />
              <XAxis dataKey="date" {...CHART_AXIS} tickFormatter={(d) => d.slice(5)} interval="preserveStartEnd" />
              <YAxis {...CHART_AXIS} width={40} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
              <Tooltip content={<ChartTooltip />} labelFormatter={formatChartDate} />
              <Area
                type="monotone"
                dataKey="amount"
                name={t('home.netEarnings')}
                stroke="#0F766E"
                strokeWidth={2}
                fill="url(#brandArea)"
                dot={false}
                activeDot={{ r: 4, fill: '#0F766E', stroke: '#fff', strokeWidth: 2 }}
              />
            </AreaChart>
          </ResponsiveContainer>
          </div>
        </Card>

        <Card>
          <h3 className="font-semibold text-navy">{t('home.paymentMix')}</h3>
          <p className="text-xs text-navy/50 mt-1 mb-4">{t('home.paymentMixHint')}</p>
          {paymentMix.length === 0 ? (
            <p className="text-sm text-navy/50 text-center py-16">{t('home.noRevenue')}</p>
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
          <h3 className="font-semibold text-navy mb-1">{t('home.revenueByLocation')}</h3>
          <p className="text-xs text-navy/50 mb-5">{t('home.revenueByLocationHint')}</p>
          {locationChart.length === 0 ? (
            <p className="text-sm text-navy/50 text-center py-8">{t('home.noLocationRevenue')}</p>
          ) : (
            <ResponsiveContainer width="100%" height={Math.max(220, locationChart.length * 42)}>
              <BarChart data={locationChart} layout="vertical" margin={{ left: 8, right: 16 }}>
                <ChartGradientDefs />
                <CartesianGrid strokeDasharray="4 4" stroke="#eef2f6" horizontal={false} />
                <XAxis type="number" {...CHART_AXIS} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                <YAxis type="category" dataKey="name" {...CHART_AXIS} width={110} />
                <Tooltip content={<ChartTooltip />} />
                <Bar dataKey="revenue" name={t('home.netEarnings')} fill="url(#brandBar)" radius={[0, 8, 8, 0]} barSize={18} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>

        <Card>
          <div className="flex items-center gap-2 mb-1">
            <Ticket className="w-4 h-4 text-brand" />
            <h3 className="font-semibold text-navy">{t('home.voucherPerf')}</h3>
          </div>
          <p className="text-xs text-navy/50 mb-4">{t('home.voucherPerfHint')}</p>
          {analytics?.vouchers ? (
            <div className="space-y-4">
              {voucherChart.length > 0 && (
                <ResponsiveContainer width="100%" height={150}>
                  <PieChart>
                    <Pie data={voucherChart} dataKey="value" nameKey="name" innerRadius={40} outerRadius={62} paddingAngle={3} stroke="none">
                      <Cell fill="#0F766E" />
                      <Cell fill="#1F7A4C" />
                      <Cell fill="#d97706" />
                    </Pie>
                    <Tooltip content={<ChartTooltip formatter={(v) => v} />} />
                  </PieChart>
                </ResponsiveContainer>
              )}
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: t('home.unused'), value: analytics.vouchers.unused, color: 'text-brand' },
                  { label: t('home.redeemed'), value: analytics.vouchers.redeemed, color: 'text-emerald-600' },
                  { label: t('home.expired'), value: analytics.vouchers.expired, color: 'text-amber-600' },
                  { label: t('home.redemptionRate'), value: `${analytics.vouchers.redemptionRate}%`, color: 'text-navy' },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-surface-muted p-3">
                    <p className="text-[11px] font-semibold text-navy/45 uppercase">{item.label}</p>
                    <p className={`text-lg font-bold mt-1 ${item.color}`}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-sm text-navy/50">{t('home.noVoucherData')}</p>
          )}
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <div className="mb-5">
            <h3 className="font-semibold text-navy">{t('home.routerStatus')}</h3>
            <p className="text-xs text-navy/50 mt-1">{t('home.byLocation')}</p>
          </div>
          {routers.length === 0 ? (
            <p className="text-sm text-navy/50 text-center py-6">{t('home.noRouters')}</p>
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
                      {r.lastSeenAt ? new Date(r.lastSeenAt).toLocaleString() : t('home.neverSeen')}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>

        <Card>
          <div className="mb-5">
            <h3 className="font-semibold text-navy">{t('home.topPackages')}</h3>
          </div>
          {stats.topPackages.length === 0 ? (
            <p className="text-sm text-navy/50 text-center py-6">{t('home.noSales')}</p>
          ) : (
            <ResponsiveContainer width="100%" height={Math.max(180, stats.topPackages.length * 48)}>
              <BarChart data={stats.topPackages.map((p) => ({ name: p.name, sales: p.count }))} layout="vertical" margin={{ left: 8, right: 16 }}>
                <CartesianGrid strokeDasharray="4 4" stroke="#eef2f6" horizontal={false} />
                <XAxis type="number" {...CHART_AXIS} allowDecimals={false} />
                <YAxis type="category" dataKey="name" {...CHART_AXIS} width={100} />
                <Tooltip content={<ChartTooltip formatter={(v) => t('home.salesCount', { count: v })} />} />
                <Bar dataKey="sales" name={t('home.sales')} fill="#0E141B" radius={[0, 4, 4, 0]} barSize={16} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>
      </div>
    </div>
  );
}
