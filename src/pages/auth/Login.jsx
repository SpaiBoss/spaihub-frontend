import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import AuthLayout, { AuthLink } from '../../components/AuthLayout.jsx';
import { Button, Input } from '../../components/ui';
import { useLocale } from '../../i18n/useLocale';

export default function Login() {
  const { t } = useTranslation('auth');
  const { t: te } = useTranslation('common');
  const { lang } = useLocale();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/dashboard', { replace: true });
  }, [isAuthenticated, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/api/auth/login', { email, password, preferredLocale: lang });
      login(data.token, data.owner);
      toast.success(t('login.success'));
      navigate('/dashboard');
    } catch (err) {
      const msg = err.response?.data?.error || te('errors.loginFailed');
      toast.error(msg);
      setShowResend(/not active|verify your email|non actif|e-mail/i.test(msg));
    } finally {
      setLoading(false);
    }
  }

  async function handleResendVerification() {
    if (!email.trim()) {
      toast.error(t('login.enterEmailFirst'));
      return;
    }
    setResending(true);
    try {
      const { data } = await api.post('/api/auth/resend-verification', { email });
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.error || te('errors.generic'));
    } finally {
      setResending(false);
    }
  }

  return (
    <AuthLayout title={t('login.title')} subtitle={t('login.subtitle')}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label={t('login.email')}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email"
        />
        <div>
          <Input
            label={t('login.password')}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="current-password"
          />
          <div className="text-right mt-2">
            <AuthLink to="/forgot-password">{t('login.forgot')}</AuthLink>
          </div>
        </div>
        <Button type="submit" disabled={loading} className="w-full py-3" size="lg">
          {loading ? t('login.submitting') : t('login.submit')}
        </Button>
        {showResend && (
          <button
            type="button"
            onClick={handleResendVerification}
            disabled={resending}
            className="w-full text-sm text-brand hover:text-brand/80 font-medium"
          >
            {resending ? t('login.resending') : t('login.resend')}
          </button>
        )}
        <p className="text-center text-sm text-navy/60">
          {t('login.noAccount')} <AuthLink to="/register">{t('login.createOne')}</AuthLink>
        </p>
      </form>
    </AuthLayout>
  );
}
