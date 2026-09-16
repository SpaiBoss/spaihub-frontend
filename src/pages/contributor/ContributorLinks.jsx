import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import { Skeleton, StatusBadge, EmptyState } from '../../components/ui';

export default function ContributorLinks() {
  const { t } = useTranslation('contributor');
  const [links, setLinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api
      .get('/api/contributor/links')
      .then((res) => setLinks(res.data.links || []))
      .catch((err) => setError(err.response?.data?.error || t('links.failedLoad')))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Skeleton className="h-40 rounded-xl" />;
  if (error) return <EmptyState title={t('links.loadError')} description={error} />;

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-xl font-semibold text-navy">{t('links.title')}</h1>
        <p className="text-sm text-navy/50 mt-1">{t('links.subtitle')}</p>
      </div>
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left text-gray-500 border-b bg-gray-50">
              <th className="p-3">{t('links.location')}</th>
              <th className="p-3">{t('links.interface')}</th>
              <th className="p-3">{t('links.cap')}</th>
              <th className="p-3">{t('links.rate')}</th>
              <th className="p-3">{t('links.lastMeter')}</th>
              <th className="p-3">{t('links.status')}</th>
            </tr>
          </thead>
          <tbody>
            {links.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-400">
                  {t('links.empty')}
                </td>
              </tr>
            ) : (
              links.map((l) => (
                <tr key={l.id} className="border-b border-gray-50">
                  <td className="p-3">{l.location?.name || '—'}</td>
                  <td className="p-3 font-mono text-xs">{l.interfaceName}</td>
                  <td className="p-3">{t('links.capMbps', { cap: l.capMbps })}</td>
                  <td className="p-3">{t('links.rateGb', { rate: l.rateXafPerGb })}</td>
                  <td className="p-3 text-xs text-navy/55">
                    {l.lastMeterAt
                      ? t('links.meterLine', {
                          bytes: Number(l.lastMeterBytes || 0).toLocaleString(),
                          date: new Date(l.lastMeterAt).toLocaleString(),
                        })
                      : '—'}
                  </td>
                  <td className="p-3">
                    <StatusBadge status={l.status} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
