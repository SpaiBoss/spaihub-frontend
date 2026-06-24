import { useEffect, useState } from 'react';
import api from '../../services/api';
import { AdminGuard, AdminLayout } from './AdminLogin';
import { Card, Skeleton } from '../../components/ui';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get('/api/admin/stats').then((res) => setStats(res.data));
  }, []);

  const cards = stats
    ? [
        { label: 'Total Owners', value: stats.totalOwners },
        { label: 'Total Revenue', value: `${stats.totalRevenueProcessed.toLocaleString()} XAF` },
        { label: 'Platform Fees', value: `${stats.totalPlatformFees.toLocaleString()} XAF` },
        { label: 'Total Withdrawn', value: `${stats.totalWithdrawn.toLocaleString()} XAF` },
        {
          label: 'Pending Withdrawals',
          value: `${stats.pendingWithdrawalsCount} (${stats.pendingWithdrawalsTotal.toLocaleString()} XAF)`,
        },
      ]
    : [];

  return (
    <AdminGuard>
      <AdminLayout title="Platform Overview" description="Key metrics across the Spai-Hub network">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.length === 0
            ? [...Array(5)].map((_, i) => <Skeleton key={i} className="h-28" />)
            : cards.map((c) => (
                <Card key={c.label} bodyClassName="p-5">
                  <p className="text-xs font-semibold text-navy/50 uppercase tracking-wide">{c.label}</p>
                  <p className="text-2xl font-bold text-navy mt-2 tracking-tight">{c.value}</p>
                </Card>
              ))}
        </div>
      </AdminLayout>
    </AdminGuard>
  );
}
