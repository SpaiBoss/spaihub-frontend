import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import { Skeleton, StatusBadge, EmptyState } from '../../components/ui';

export default function ContributorHome() {
  const { t } = useTranslation('contributor');
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get('/api/contributor/dashboard')
      .then((res) => setData(res.data))
      .catch((err) => setError(err.response?.data?.error || t('home.failedLoad')))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Skeleton className="h-48 rounded-xl" />;
  if (error || !data) {
    return <EmptyState title={t('home.loadError')} description={error} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-navy">{t('home.welcome', { name: data.name })}</h1>
        <p className="text-sm text-navy/50 mt-1">{t('home.subtitle')}</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <p className="text-xs text-navy/50 uppercase tracking-wide">{t('home.balance')}</p>
          <p className="text-2xl font-bold text-navy mt-1">{data.walletBalance.toLocaleString()} XAF</p>
          <Link to="/contributor/wallet" className="text-sm text-brand font-medium mt-2 inline-block">
            {t('home.withdraw')}
          </Link>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <p className="text-xs text-navy/50 uppercase tracking-wide">{t('home.today')}</p>
          <p className="text-2xl font-bold text-navy mt-1">{data.today.gb.toFixed(2)} GB</p>
          <p className="text-sm text-navy/50 mt-1">{data.today.amountXaf.toLocaleString()} XAF</p>
        </div>
        <div className="bg-white rounded-xl border border-gray-100 p-5 shadow-sm">
          <p className="text-xs text-navy/50 uppercase tracking-wide">{t('home.month')}</p>
          <p className="text-2xl font-bold text-navy mt-1">{data.month.gb.toFixed(2)} GB</p>
          <p className="text-sm text-navy/50 mt-1">{data.month.amountXaf.toLocaleString()} XAF</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm">
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="font-semibold text-navy">{t('home.yourLinks')}</h2>
          <span className="text-xs text-navy/45">{t('home.active', { count: data.activeLinkCount })}</span>
        </div>
        {data.links.length === 0 ? (
          <div className="p-6">
            <EmptyState
              title={t('home.emptyTitle')}
              description={t('home.emptyBody')}
            />
          </div>
        ) : (
          <ul className="divide-y divide-gray-50">
            {data.links.map((link) => (
              <li key={link.id} className="p-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="font-medium text-navy">{link.location?.name || t('links.location')}</p>
                  <p className="text-xs text-navy/50 font-mono mt-0.5">
                    {t('links.capRateLine', { iface: link.interfaceName, cap: link.capMbps, rate: link.rateXafPerGb })}
                  </p>
                </div>
                <StatusBadge status={link.status} />
              </li>
            ))}
          </ul>
        )}
        <div className="p-4 border-t">
          <Link to="/contributor/links" className="text-sm font-medium text-brand hover:text-brand/80">
            {t('home.viewAll')}
          </Link>
        </div>
      </div>
    </div>
  );
}
