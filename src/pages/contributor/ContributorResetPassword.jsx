import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../services/api';
import AuthLayout, { AuthLink } from '../../components/AuthLayout';
import { Button, Input } from '../../components/ui';

export default function ContributorResetPassword() {
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
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.post('/api/contributor/auth/reset-password', { token, password });
      toast.success(data.message);
      navigate('/contributor/login');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Reset failed');
    } finally {
      setLoading(false);
    }
  }

  if (valid === null) {
    return <AuthLayout title="Reset password" subtitle="Checking link…" />;
  }
  if (!valid) {
    return (
      <AuthLayout title="Invalid link" subtitle="This reset link is invalid or expired">
        <p className="text-center text-sm">
          <AuthLink to="/contributor/forgot-password">Request a new link</AuthLink>
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Choose a new password" subtitle="Contributor account">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="New password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={8}
        />
        <Input
          label="Confirm password"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Saving...' : 'Reset password'}
        </Button>
      </form>
    </AuthLayout>
  );
}
