import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import AuthLayout, { AuthLink } from '../../components/AuthLayout';
import { Button, Input, EmptyState } from '../../components/ui';

export default function ResetPassword() {
  const { t } = useTranslation('auth');
  const { t: tc } = useTranslation('common');
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get('token');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokenState, setTokenState] = useState(token ? 'checking' : 'invalid');

  function passwordStrength(pw) {
    if (pw.length < 8) return { label: t('password.tooShort'), color: 'text-red-500', width: '25%' };
    if (!/[A-Z]/.test(pw) || !/[0-9]/.test(pw)) return { label: t('password.fair'), color: 'text-amber-600', width: '50%' };
    if (pw.length >= 12) return { label: t('password.strong'), color: 'text-emerald-600', width: '100%' };
    return { label: t('password.good'), color: 'text-brand', width: '75%' };
  }

  const strength = passwordStrength(password);

  useEffect(() => {
    if (!token) {
      setTokenState('invalid');
      return;
    }

    api
      .get(`/api/auth/reset-password/validate?token=${encodeURIComponent(token)}`)
      .then(() => setTokenState('valid'))
      .catch((err) => {
        setTokenState('invalid');
        toast.error(err.response?.data?.error || t('reset.invalidSubtitle'));
      });
  }, [token, t]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm) {
      toast.error(tc('errors.passwordsMismatch'));
      return;
    }
    if (password.length < 8) {
      toast.error(tc('errors.passwordTooShort'));
      return;
    }
    setLoading(true);
    try {
      await api.post('/api/auth/reset-password', { token, password });
      toast.success(t('reset.success'));
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.error || tc('errors.generic'));
    } finally {
      setLoading(false);
    }
  }

  if (tokenState === 'checking') {
    return (
      <AuthLayout title={t('reset.title')} subtitle={t('reset.verifying')}>
        <p className="text-center text-sm text-navy/60">{t('reset.wait')}</p>
      </AuthLayout>
    );
  }

  if (tokenState === 'invalid') {
    return (
      <AuthLayout title={t('reset.invalidTitle')} subtitle={t('reset.invalidSubtitle')}>
        <EmptyState
          title={t('reset.invalidTitle')}
          description={t('reset.invalidBody')}
          action={<AuthLink to="/forgot-password">{t('reset.requestNew')}</AuthLink>}
        />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title={t('reset.title')} subtitle={t('reset.subtitle')}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label={t('reset.newPassword')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
        {password && (
          <div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className={`h-full ${strength.color.replace('text-', 'bg-')} transition-all`} style={{ width: strength.width }} />
            </div>
            <p className={`text-xs mt-1 ${strength.color}`}>{strength.label}</p>
          </div>
        )}
        <Input
          label={t('reset.confirm')}
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? t('reset.resetting') : t('reset.submit')}
        </Button>
        <p className="text-center text-sm">
          <AuthLink to="/login">{t('forgot.back')}</AuthLink>
        </p>
      </form>
    </AuthLayout>
  );
}
