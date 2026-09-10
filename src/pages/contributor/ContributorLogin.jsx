import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../services/api';
import { useContributorAuth } from '../../context/ContributorAuthContext';
import AuthLayout, { AuthLink } from '../../components/AuthLayout';
import { Button, Input } from '../../components/ui';

export default function ContributorLogin() {
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
      const { data } = await api.post('/api/contributor/auth/login', { email, password });
      login(data.token, data.contributor);
      toast.success('Signed in');
      navigate('/contributor');
    } catch (err) {
      const msg = err.response?.data?.error || 'Login failed';
      toast.error(msg);
      setShowResend(err.response?.data?.code === 'EMAIL_UNVERIFIED' || /verify your email/i.test(msg));
    } finally {
      setLoading(false);
    }
  }

  async function handleResend() {
    if (!email.trim()) {
      toast.error('Enter your email above first');
      return;
    }
    setResending(true);
    try {
      const { data } = await api.post('/api/contributor/auth/resend-verification', { email });
      toast.success(data.message);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Could not resend');
    } finally {
      setResending(false);
    }
  }

  return (
    <AuthLayout title="Contributor sign in" subtitle="Track uplink earnings and withdraw on MoMo">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Input
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="text-right">
          <AuthLink to="/contributor/forgot-password">Forgot password?</AuthLink>
        </div>
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
        {showResend && (
          <button
            type="button"
            onClick={handleResend}
            disabled={resending}
            className="w-full text-sm text-brand hover:text-brand/80 font-medium"
          >
            {resending ? 'Sending...' : 'Resend verification email'}
          </button>
        )}
        <p className="text-center text-sm text-navy/60">
          New contributor? <AuthLink to="/contributor/register">Create account</AuthLink>
        </p>
        <p className="text-center text-xs text-navy/40">
          Hotspot operator? <Link to="/login" className="text-brand hover:underline">Owner sign in</Link>
        </p>
      </form>
    </AuthLayout>
  );
}
