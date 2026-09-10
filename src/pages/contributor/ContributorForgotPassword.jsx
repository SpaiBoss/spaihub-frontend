import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import AuthLayout, { AuthLink } from '../../components/AuthLayout';
import { Button, Input } from '../../components/ui';

export default function ContributorForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await api.post('/api/contributor/auth/forgot-password', { email });
      toast.success(data.message);
      setDone(true);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Request failed');
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <AuthLayout title="Check your email" subtitle="Reset link sent if the account exists">
        <p className="text-center text-sm text-navy/60">
          <AuthLink to="/contributor/login">Back to sign in</AuthLink>
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Forgot password" subtitle="Contributor account">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Sending...' : 'Send reset link'}
        </Button>
        <p className="text-center text-sm text-navy/60">
          <AuthLink to="/contributor/login">Back to sign in</AuthLink>
        </p>
      </form>
    </AuthLayout>
  );
}
