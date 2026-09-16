import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import AuthLayout, { AuthLink } from '../../components/AuthLayout';
import { Button, Input } from '../../components/ui';
import { useLocale } from '../../i18n/useLocale';

export default function ContributorRegister() {
  const { t } = useTranslation('auth');
  const { t: tc } = useTranslation('common');
  const { lang } = useLocale();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error(tc('errors.passwordsMismatch'));
      return;
    }
    setLoading(true);
    try {
      await api.post('/api/contributor/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        preferredLocale: lang,
      });
      setDone(true);
    } catch (err) {
      toast.error(err.response?.data?.error || tc('errors.registrationFailed'));
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <AuthLayout title={t('register.checkTitle')} subtitle={t('contributor.checkSubtitle')}>
        <p className="text-navy/70 text-center text-sm leading-relaxed">
          {t('contributor.checkBody')}{' '}
          <AuthLink to="/contributor/login">{t('register.signIn')}</AuthLink>.
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title={t('contributor.registerTitle')} subtitle={t('contributor.registerSubtitle')}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label={t('register.name')}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <Input
          label={t('register.email')}
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <Input
          label={t('register.password')}
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          minLength={8}
        />
        <Input
          label={t('register.confirm')}
          type="password"
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          required
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? t('register.submitting') : t('register.submit')}
        </Button>
        <p className="text-center text-sm text-navy/60">
          {t('contributor.already')} <AuthLink to="/contributor/login">{t('register.signIn')}</AuthLink>
        </p>
      </form>
    </AuthLayout>
  );
}
