import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import AuthLayout, { AuthLink } from '../../components/AuthLayout';
import { Button, Input } from '../../components/ui';

export default function ContributorResetPassword() {
  const { t } = useTranslation('auth');
  const { t: tc } = useTranslation('common');
  const [params] = useSearchParams();
  const token = params.get('token') || '';
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [valid, setValid] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      setValid(false);
      return;
    }
    api
      .get(`/api/contributor/auth/reset-password/validate?token=${token}`)
      .then(() => setValid(true))
      .catch(() => setValid(false));
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm) {
      toast.error(tc('errors.passwordsMismatch'));
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post('/api/contributor/auth/reset-password', { token, password });
      toast.success(data.message || t('reset.success'));
      navigate('/contributor/login');
    } catch (err) {
      toast.error(err.response?.data?.error || tc('errors.generic'));
    } finally {
      setLoading(false);
    }
  }

  if (valid === null) {
    return <AuthLayout title={t('reset.title')} subtitle={t('reset.verifying')} />;
  }
  if (!valid) {
    return (
      <AuthLayout title={t('reset.invalidTitle')} subtitle={t('reset.invalidSubtitle')}>
        <p className="text-center text-sm">
          <AuthLink to="/contributor/forgot-password">{t('reset.requestNew')}</AuthLink>
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title={t('reset.title')} subtitle={t('contributor.forgotTitle')}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label={t('reset.newPassword')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
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
      </form>
    </AuthLayout>
  );
}
