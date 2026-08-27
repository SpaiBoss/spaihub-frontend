import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../services/api';
import AuthLayout from '../../components/AuthLayout';
import { Button, Input } from '../../components/ui';

export { AdminGuard, AdminLayout } from '../../components/layout/AdminLayout';

export default function AdminLogin() {
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
      toast.success('Signed in');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Admin sign in" subtitle="Platform operations">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Admin email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>
    </AuthLayout>
  );
}
