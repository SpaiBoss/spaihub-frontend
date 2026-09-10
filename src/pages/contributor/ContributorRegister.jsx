import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import AuthLayout, { AuthLink } from '../../components/AuthLayout';
import { Button, Input } from '../../components/ui';

export default function ContributorRegister() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await api.post('/api/contributor/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      setDone(true);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <AuthLayout title="Check your email" subtitle="Verify, then wait for SpaiHub approval">
        <p className="text-navy/70 text-center text-sm leading-relaxed">
          Click the link in your email, then an admin will activate your contributor account. After that,{' '}
          <AuthLink to="/contributor/login">sign in</AuthLink>.
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Create contributor account" subtitle="Sell spare uplink to a nearby SpaiHub hotspot">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Full name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <Input
          label="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <Input
          label="Password"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
          minLength={8}
        />
        <Input
          label="Confirm password"
          type="password"
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          required
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Creating...' : 'Create account'}
        </Button>
        <p className="text-center text-sm text-navy/60">
          Already registered? <AuthLink to="/contributor/login">Sign in</AuthLink>
        </p>
      </form>
    </AuthLayout>
  );
}
