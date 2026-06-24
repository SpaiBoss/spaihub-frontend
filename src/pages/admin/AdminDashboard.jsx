import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import api from '../../services/api';
import { AdminGuard, AdminLayout } from './AdminLogin';
import { Card, Skeleton } from '../../components/ui';

function formatXaf(amount) {
  return `${Number(amount).toLocaleString()} XAF`;
}

const tooltipStyle = {
  borderRadius: '12px',
  border: '1px solid #e5e7eb',
  boxShadow: '0 4px 12px rgb(26 60 94 / 0.08)',
  fontSize: '13px',
};

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
        {
          label: 'Pending withdrawals',
          value: `${stats.pendingWithdrawalsCount}`,
          sub: formatXaf(stats.pendingWithdrawalsTotal),
        },
        { label: 'Pending payments', value: stats.pendingTransactions },
        { label: 'Failed payments (month)', value: stats.failedTransactionsMonth },
      ]
    : [];

  return (
    <AdminGuard>
      <AdminLayout title="Platform overview" description="Revenue, fees, and network health across Spai-Hub">
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
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

        <Card>
          <h3 className="font-semibold text-navy mb-1">Platform revenue — last 30 days</h3>
          <p className="text-xs text-navy/50 mb-5">Gross customer payments vs platform fees collected</p>
          {chart.length === 0 ? (
            <Skeleton className="h-72" />
          ) : (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chart}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eef2f6" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} tickFormatter={(d) => d.slice(5)} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v) => formatXaf(v)} contentStyle={tooltipStyle} />
                <Legend />
                <Bar dataKey="gross" name="Gross revenue" fill="#1A3C5E" radius={[4, 4, 0, 0]} maxBarSize={24} />
                <Bar dataKey="fees" name="Platform fees" fill="#5463FF" radius={[4, 4, 0, 0]} maxBarSize={24} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </Card>
      </AdminLayout>
    </AdminGuard>
  );
}
