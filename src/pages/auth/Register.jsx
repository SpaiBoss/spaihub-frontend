import { useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import AuthLayout, { AuthLink } from '../../components/AuthLayout';
import { Button, Input } from '../../components/ui';
import { useLocale } from '../../i18n/useLocale';

export default function Register() {
  const { t } = useTranslation('auth');
  const { t: tc } = useTranslation('common');
  const { lang } = useLocale();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function passwordStrength(pw) {
    if (pw.length < 8) return { label: t('password.tooShort'), color: 'text-red-500', width: '25%' };
    if (!/[A-Z]/.test(pw) || !/[0-9]/.test(pw)) return { label: t('password.fair'), color: 'text-amber-600', width: '50%' };
    if (pw.length >= 12) return { label: t('password.strong'), color: 'text-emerald-600', width: '100%' };
    return { label: t('password.good'), color: 'text-brand', width: '75%' };
  }

  const strength = passwordStrength(form.password);

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error(tc('errors.passwordsMismatch'));
      return;
    }
    setLoading(true);
    try {
      await api.post('/api/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
        preferredLocale: lang,
      });
      setDone(true);
    } catch (err) {
      const message =
        err.response?.data?.error ||
        (err.message === 'Network Error' ? tc('errors.network') : err.message);
      toast.error(message || tc('errors.registrationFailed'));
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <AuthLayout title={t('register.checkTitle')} subtitle={t('register.checkSubtitle')}>
        <p className="text-navy/70 text-center text-sm leading-relaxed">
          {t('register.checkBody')}{' '}
          <AuthLink to="/login">{t('register.signIn')}</AuthLink>.
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title={t('register.title')} subtitle={t('register.subtitle')}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input label={t('register.name')} type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <Input label={t('register.email')} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <div>
          <Input label={t('register.password')} type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required minLength={8} />
          {form.password && (
            <div className="mt-2">
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand rounded-full transition-all duration-300" style={{ width: strength.width }} />
              </div>
              <p className={`text-xs mt-1.5 font-medium ${strength.color}`}>{strength.label}</p>
            </div>
          )}
        </div>
        <Input label={t('register.confirm')} type="password" value={form.confirm} onChange={(e) => setForm({ ...form, confirm: e.target.value })} required />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? t('register.submitting') : t('register.submit')}
        </Button>
        <p className="text-center text-sm text-navy/60">
          {t('register.hasAccount')} <AuthLink to="/login">{t('register.signIn')}</AuthLink>
        </p>
      </form>
    </AuthLayout>
  );
}
