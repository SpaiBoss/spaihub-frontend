import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
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
  Legend,
  ComposedChart,
} from 'recharts';
import api from '../../services/api';
import { AdminGuard, AdminLayout } from './AdminLogin';
import { Card, Skeleton, EmptyState, Button } from '../../components/ui';
import AccountingExportBar from '../../components/AccountingExportBar';
import {
  ChartTooltip,
  ChartGradientDefs,
  CHART_AXIS,
  formatXaf,
  formatChartDate,
} from '../../components/charts/ChartPrimitives';

export default function AdminDashboard() {
  const { t } = useTranslation('admin');
  const { t: tc } = useTranslation('common');
  const [stats, setStats] = useState(null);
  const [chart, setChart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  function loadStats() {
    setLoading(true);
    setError(null);
    Promise.all([api.get('/api/admin/stats'), api.get('/api/admin/stats/revenue-chart')])
      .then(([statsRes, chartRes]) => {
        setStats(statsRes.data);
        setChart(chartRes.data);
      })
      .catch((err) => {
        setStats(null);
        setChart([]);
        setError(err.response?.data?.error || t('dashboard.loadError'));
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    loadStats();
  }, []);

  const cards = stats
    ? [
        { label: t('dashboard.totalOwners'), value: stats.totalOwners, sub: t('dashboard.activeCount', { count: stats.activeOwners }) },
        { label: t('dashboard.successfulTx'), value: stats.totalTransactions.toLocaleString() },
        { label: t('dashboard.grossRevenue'), value: formatXaf(stats.totalRevenueProcessed) },
        { label: t('dashboard.platformFees'), value: formatXaf(stats.totalPlatformFees) },
        { label: t('dashboard.feesMonth'), value: formatXaf(stats.monthPlatformFees), sub: t('dashboard.vsLastMonth', { sign: stats.monthFeeChangePercent >= 0 ? '+' : '', pct: stats.monthFeeChangePercent }) },
        { label: t('dashboard.todayFees'), value: formatXaf(stats.todayPlatformFees), sub: t('dashboard.todayGross', { amount: formatXaf(stats.todayGrossRevenue) }) },
        { label: t('dashboard.totalWithdrawn'), value: formatXaf(stats.totalWithdrawn) },
        { label: t('dashboard.pendingWithdrawals'), value: `${stats.pendingWithdrawalsCount}`, sub: formatXaf(stats.pendingWithdrawalsTotal) },
        { label: t('dashboard.pendingPayments'), value: stats.pendingTransactions },
        { label: t('dashboard.failedMonth'), value: stats.failedTransactionsMonth },
        { label: t('dashboard.deadLetter'), value: stats.deadLetterCommands24h ?? 0 },
      ]
    : [];

  return (
    <AdminGuard>
      <AdminLayout title={t('dashboard.title')} description={t('dashboard.description')}>
        <div className="space-y-6">
          <AccountingExportBar mode="admin" />

          {error && (
            <EmptyState
              title={t('dashboard.couldNotLoad')}
              description={error}
              action={
                <Button onClick={loadStats}>
                  {tc('actions.retry')}
                </Button>
              }
            />
          )}

          {!error && (
          <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {loading || cards.length === 0
              ? [...Array(8)].map((_, i) => <Skeleton key={i} className="h-28 rounded-lg" />)
              : cards.map((c) => (
                  <Card key={c.label} bodyClassName="p-5 h-full">
                    <p className="text-xs font-semibold text-navy/50 uppercase tracking-wide leading-snug">
                      {c.label}
                    </p>
                    <p className="text-2xl font-bold text-navy mt-2.5 tracking-tight tabular-nums">{c.value}</p>
                    {c.sub && <p className="text-xs text-navy/45 mt-1.5 leading-relaxed">{c.sub}</p>}
                  </Card>
                ))}
          </div>

          <Card className="overflow-hidden">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h3 className="font-semibold text-navy">{t('dashboard.revenueTitle')}</h3>
                <p className="text-xs text-navy/50 mt-1">{t('dashboard.revenueSubtitle')}</p>
              </div>
            </div>
            {chart.length === 0 ? (
              loading ? <Skeleton className="h-80" /> : (
                <p className="text-sm text-navy/50 text-center py-16">{t('dashboard.noRevenue')}</p>
              )
            ) : (
              <ResponsiveContainer width="100%" height={320}>
                <ComposedChart data={chart} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                  <ChartGradientDefs />
                  <CartesianGrid strokeDasharray="4 4" stroke="#eef2f6" vertical={false} />
                  <XAxis dataKey="date" {...CHART_AXIS} tickFormatter={(d) => d.slice(5)} />
                  <YAxis {...CHART_AXIS} width={56} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                  <Tooltip content={<ChartTooltip />} labelFormatter={formatChartDate} />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 12 }} />
                  <Area
                    type="monotone"
                    dataKey="gross"
                    name={t('dashboard.chartGross')}
                    stroke="#0E141B"
                    strokeWidth={2}
                    fill="url(#navyArea)"
                    dot={false}
                  />
                  <Bar dataKey="fees" name={t('dashboard.chartFees')} fill="url(#brandBar)" radius={[6, 6, 0, 0]} barSize={14} />
                </ComposedChart>
              </ResponsiveContainer>
            )}
          </Card>

          {chart.length > 0 && (
            <Card>
              <h3 className="font-semibold text-navy mb-1">{t('dashboard.dailyFees')}</h3>
              <p className="text-xs text-navy/50 mb-5">{t('dashboard.feeTrend')}</p>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chart}>
                  <ChartGradientDefs />
                  <CartesianGrid strokeDasharray="4 4" stroke="#eef2f6" vertical={false} />
                  <XAxis dataKey="date" {...CHART_AXIS} tickFormatter={(d) => d.slice(5)} />
                  <YAxis {...CHART_AXIS} width={56} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                  <Tooltip content={<ChartTooltip />} labelFormatter={formatChartDate} />
                  <Area type="monotone" dataKey="fees" name={t('dashboard.chartFees')} stroke="#0F766E" strokeWidth={2} fill="url(#brandArea)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          )}
          </>
          )}
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
