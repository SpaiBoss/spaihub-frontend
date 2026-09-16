import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import AuthLayout, { AuthLink } from '../../components/AuthLayout';
import { Button, Input } from '../../components/ui';

export default function ContributorForgotPassword() {
  const { t } = useTranslation('auth');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/api/contributor/auth/forgot-password', { email });
      toast.success(data.message || t('forgot.sentTitle'));
      setDone(true);
    } catch (err) {
      toast.error(err.response?.data?.error || t('forgot.failed'));
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <AuthLayout title={t('forgot.sentTitle')} subtitle={t('forgot.sentSubtitle')}>
        <p className="text-center text-sm text-navy/60">
          <AuthLink to="/contributor/login">{t('forgot.back')}</AuthLink>
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title={t('contributor.forgotTitle')} subtitle={t('forgot.subtitle')}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input label={t('login.email')} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? t('forgot.sending') : t('forgot.submit')}
        </Button>
        <p className="text-center text-sm text-navy/60">
          <AuthLink to="/contributor/login">{t('forgot.back')}</AuthLink>
        </p>
      </form>
    </AuthLayout>
  );
}
