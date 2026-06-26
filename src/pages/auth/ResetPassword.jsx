import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../services/api';
import AuthLayout, { AuthLink } from '../../components/AuthLayout';
import { Button, Input, EmptyState } from '../../components/ui';

function passwordStrength(pw) {
  if (pw.length < 8) return { label: 'Too short', color: 'text-red-500', width: '25%' };
  if (!/[A-Z]/.test(pw) || !/[0-9]/.test(pw)) return { label: 'Fair', color: 'text-amber-600', width: '50%' };
  if (pw.length >= 12) return { label: 'Strong', color: 'text-emerald-600', width: '100%' };
  return { label: 'Good', color: 'text-brand', width: '75%' };
}

export default function ResetPassword() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const token = params.get('token');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [tokenState, setTokenState] = useState(token ? 'checking' : 'invalid');

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
        toast.error(err.response?.data?.error || 'Invalid or expired reset link');
      });
  }, [token]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirm) {
      toast.error('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    setLoading(true);
    try {
      await api.post('/api/auth/reset-password', { token, password });
      toast.success('Password reset successful');
      navigate('/login');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Reset failed');
    } finally {
      setLoading(false);
    }
  }

  if (tokenState === 'checking') {
    return (
      <AuthLayout title="Set new password" subtitle="Verifying your reset link">
        <p className="text-center text-sm text-navy/60">Please wait...</p>
      </AuthLayout>
    );
  }

  if (tokenState === 'invalid') {
    return (
      <AuthLayout title="Reset link invalid" subtitle="This password reset link is missing or has expired">
        <EmptyState
          title="Link not valid"
          description="Request a new password reset email and use the latest link within one hour."
          action={<AuthLink to="/forgot-password">Request new link</AuthLink>}
        />
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Set new password" subtitle="Choose a strong password for your account">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="New password"
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
          label="Confirm password"
          type="password"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Resetting...' : 'Reset password'}
        </Button>
        <p className="text-center text-sm">
          <AuthLink to="/login">Back to sign in</AuthLink>
        </p>
      </form>
    </AuthLayout>
  );
}
