import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import { useContributorAuth } from '../../context/ContributorAuthContext';
import AuthLayout, { AuthLink } from '../../components/AuthLayout';
import { Button, Input } from '../../components/ui';
import { useLocale } from '../../i18n/useLocale';

export default function ContributorLogin() {
  const { t } = useTranslation('auth');
  const { t: tc } = useTranslation('common');
  const { lang } = useLocale();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [resending, setResending] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const { login, isAuthenticated } = useContributorAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/contributor', { replace: true });
  }, [isAuthenticated, navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/api/contributor/auth/login', {
        email,
        password,
        preferredLocale: lang,
      });
      login(data.token, data.contributor);
      toast.success(t('login.success'));
      navigate('/contributor');
    } catch (err) {
      const msg = err.response?.data?.error || tc('errors.loginFailed');
      toast.error(msg);
      setShowResend(err.response?.data?.code === 'EMAIL_UNVERIFIED' || /verify your email|e-mail/i.test(msg));
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (!email.trim()) {
      toast.error(t('login.enterEmailFirst'));
      return;
    }
    setResending(true);
    try {
      const { data } = await api.post('/api/contributor/auth/resend-verification', { email });
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.error || tc('errors.generic'));
    } finally {
      setResending(false);
    }
  }

  return (
    <AuthLayout title={t('contributor.loginTitle')} subtitle={t('contributor.loginSubtitle')}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input label={t('login.email')} type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input
          label={t('login.password')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="text-right">
          <AuthLink to="/contributor/forgot-password">{t('login.forgot')}</AuthLink>
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? t('login.submitting') : t('login.submit')}
        </Button>
        {showResend && (
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="w-full text-sm text-brand hover:text-brand/80 font-medium"
          >
            {resending ? t('login.resending') : t('login.resend')}
          </button>
        )}
        <p className="text-center text-sm text-navy/60">
          {t('contributor.newAccount')} <AuthLink to="/contributor/register">{t('register.submit')}</AuthLink>
        </p>
        <p className="text-center text-xs text-navy/40">
          {t('contributor.ownerHint')} <Link to="/login" className="text-brand hover:underline">{t('contributor.ownerSignIn')}</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
