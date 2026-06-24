import { useEffect, useState } from 'react';
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
import { Card, Skeleton } from '../../components/ui';
import AccountingExportBar from '../../components/AccountingExportBar';
import {
  ChartTooltip,
  ChartGradientDefs,
  CHART_AXIS,
  formatXaf,
  formatChartDate,
} from '../../components/charts/ChartPrimitives';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [chart, setChart] = useState([]);

  useEffect(() => {
    Promise.all([api.get('/api/admin/stats'), api.get('/api/admin/stats/revenue-chart')])
      .then(([statsRes, chartRes]) => {
        setStats(statsRes.data);
        setChart(chartRes.data);
      })
      .catch(() => {});
  }, []);

  const cards = stats
    ? [
        { label: 'Total owners', value: stats.totalOwners, sub: `${stats.activeOwners} active` },
        { label: 'Successful transactions', value: stats.totalTransactions.toLocaleString() },
        { label: 'Gross revenue processed', value: formatXaf(stats.totalRevenueProcessed) },
        { label: 'Platform fees earned', value: formatXaf(stats.totalPlatformFees) },
        { label: 'Fees this month', value: formatXaf(stats.monthPlatformFees), sub: `${stats.monthFeeChangePercent >= 0 ? '+' : ''}${stats.monthFeeChangePercent}% vs last month` },
        { label: 'Today platform fees', value: formatXaf(stats.todayPlatformFees), sub: `${formatXaf(stats.todayGrossRevenue)} gross` },
        { label: 'Total withdrawn', value: formatXaf(stats.totalWithdrawn) },
        { label: 'Pending withdrawals', value: `${stats.pendingWithdrawalsCount}`, sub: formatXaf(stats.pendingWithdrawalsTotal) },
        { label: 'Pending payments', value: stats.pendingTransactions },
        { label: 'Failed payments (month)', value: stats.failedTransactionsMonth },
      ]
    : [];

  return (
    <AdminGuard>
      <AdminLayout title="Platform overview" description="Revenue, fees, and network health across Spai-Hub">
        <div className="space-y-6">
          <AccountingExportBar mode="admin" />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
            {cards.length === 0
              ? [...Array(6)].map((_, i) => <Skeleton key={i} className="h-28" />)
              : cards.map((c) => (
                  <Card key={c.label} bodyClassName="p-5">
                    <p className="text-xs font-semibold text-navy/50 uppercase tracking-wide">{c.label}</p>
                    <p className="text-2xl font-bold text-navy mt-2 tracking-tight">{c.value}</p>
                    {c.sub && <p className="text-xs text-navy/45 mt-1.5">{c.sub}</p>}
                  </Card>
                ))}
          </div>

          <Card className="overflow-hidden">
            <div className="flex items-start justify-between gap-4 mb-5">
              <div>
                <h3 className="font-semibold text-navy">Platform revenue</h3>
                <p className="text-xs text-navy/50 mt-1">Gross payments vs platform fees — last 30 days</p>
              </div>
            </div>
            {chart.length === 0 ? (
              <Skeleton className="h-80" />
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
                    name="Gross revenue"
                    stroke="#1A3C5E"
                    strokeWidth={2}
                    fill="url(#navyArea)"
                    dot={false}
                  />
                  <Bar dataKey="fees" name="Platform fees" fill="url(#brandBar)" radius={[6, 6, 0, 0]} barSize={14} />
                </ComposedChart>
              </ResponsiveContainer>
            )}
          </Card>

          {chart.length > 0 && (
            <Card>
              <h3 className="font-semibold text-navy mb-1">Daily platform fees</h3>
              <p className="text-xs text-navy/50 mb-5">Fee collection trend</p>
              <ResponsiveContainer width="100%" height={220}>
                <AreaChart data={chart}>
                  <ChartGradientDefs />
                  <CartesianGrid strokeDasharray="4 4" stroke="#eef2f6" vertical={false} />
                  <XAxis dataKey="date" {...CHART_AXIS} tickFormatter={(d) => d.slice(5)} />
                  <YAxis {...CHART_AXIS} width={56} tickFormatter={(v) => `${Math.round(v / 1000)}k`} />
                  <Tooltip content={<ChartTooltip />} labelFormatter={formatChartDate} />
                  <Area type="monotone" dataKey="fees" name="Platform fees" stroke="#5463FF" strokeWidth={2.5} fill="url(#brandArea)" dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </Card>
          )}
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
