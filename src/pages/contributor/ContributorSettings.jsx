import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import { useContributorAuth } from '../../context/ContributorAuthContext';
import { Button, Input, Skeleton, Card } from '../../components/ui';

export default function ContributorSettings() {
  const { t } = useTranslation('contributor');
  const { t: tc } = useTranslation('common');
  const { contributor, refreshProfile } = useContributorAuth();
  const [name, setName] = useState('');
  const [momoPhone, setMomoPhone] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (contributor) {
      setName(contributor.name || '');
      setMomoPhone(contributor.momoPhone || '');
    }
  }, [contributor]);

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    try {
      await api.patch('/api/contributor/me', { name, momoPhone });
      await refreshProfile();
      toast.success(t('settings.saved'));
    } catch (err) {
      toast.error(err.response?.data?.error || tc('errors.saveFailed'));
    } finally {
      setSaving(false);
    }
  }

  if (!contributor) return <Skeleton className="h-40 rounded-xl" />;

  return (
    <div className="space-y-4 max-w-lg">
      <div>
        <h1 className="text-xl font-semibold text-navy">{t('settings.title')}</h1>
        <p className="text-sm text-navy/50 mt-1">{t('settings.subtitle')}</p>
      </div>
      <Card className="p-6">
        <form onSubmit={handleSave} className="space-y-4">
          <p className="text-sm text-navy/55">
            {t('settings.email')}: <span className="font-medium text-navy">{contributor.email}</span>
          </p>
          <Input label={t('settings.name')} value={name} onChange={(e) => setName(e.target.value)} required />
          <Input
            label={t('settings.momo')}
            value={momoPhone}
            onChange={(e) => setMomoPhone(e.target.value.replace(/\D/g, '').slice(0, 9))}
            placeholder={t('settings.phonePh')}
          />
          <Button type="submit" disabled={saving}>
            {saving ? tc('actions.saving') : tc('actions.save')}
          </Button>
        </form>
      </Card>
    </div>
  );
}
