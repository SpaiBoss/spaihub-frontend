import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import AuthLayout, { AuthLink } from '../../components/AuthLayout';
import { Button, Input } from '../../components/ui';

export default function ForgotPassword() {
  const { t } = useTranslation('auth');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/api/auth/forgot-password', { email });
      setSent(true);
    } catch (err) {
      toast.error(err.response?.data?.error || t('forgot.failed'));
    } finally {
      setLoading(false);
    }
  }

  if (sent) {
    return (
      <AuthLayout title={t('forgot.sentTitle')} subtitle={t('forgot.sentSubtitle')}>
        <p className="text-navy/70 text-center text-sm leading-relaxed">{t('forgot.sentBody')}</p>
        <p className="text-center mt-5">
          <AuthLink to="/login">{t('forgot.back')}</AuthLink>
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title={t('forgot.title')} subtitle={t('forgot.subtitle')}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label={t('login.email')}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? t('forgot.sending') : t('forgot.submit')}
        </Button>
        <p className="text-center text-sm">
          <AuthLink to="/login">{t('forgot.back')}</AuthLink>
        </p>
      </form>
    </AuthLayout>
  );
}
