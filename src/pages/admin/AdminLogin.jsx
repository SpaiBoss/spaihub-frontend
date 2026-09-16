import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import api from '../../services/api';
import AuthLayout from '../../components/AuthLayout';
import { Button, Input } from '../../components/ui';

export { AdminGuard, AdminLayout } from '../../components/layout/AdminLayout';

export default function AdminLogin() {
  const { t } = useTranslation('auth');
  const { t: tc } = useTranslation('common');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('adminToken')) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [navigate]);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/api/auth/admin/login', { email, password });
      localStorage.setItem('adminToken', data.token);
      toast.success(t('login.success'));
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || tc('errors.loginFailed'));
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title={t('adminLogin.title')} subtitle={t('adminLogin.subtitle')}>
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label={t('adminLogin.email')}
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label={t('adminLogin.password')}
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? t('login.submitting') : t('login.submit')}
        </Button>
      </form>
    </AuthLayout>
  );
}
