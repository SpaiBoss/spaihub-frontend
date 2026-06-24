import { useState } from 'react';
import toast from 'react-hot-toast';
import api from '../../services/api';
import AuthLayout, { AuthLink } from '../../components/AuthLayout';
import { Button, Input } from '../../components/ui';

function passwordStrength(pw) {
  if (pw.length < 8) return { label: 'Too short', color: 'text-red-500', width: '25%' };
  if (!/[A-Z]/.test(pw) || !/[0-9]/.test(pw)) return { label: 'Fair', color: 'text-amber-600', width: '50%' };
  if (pw.length >= 12) return { label: 'Strong', color: 'text-emerald-600', width: '100%' };
  return { label: 'Good', color: 'text-brand', width: '75%' };
}

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const strength = passwordStrength(form.password);

  async function handleSubmit(e) {
    e.preventDefault();
    if (form.password !== form.confirm) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await api.post('/api/auth/register', {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      setDone(true);
    } catch (err) {
      const message =
        err.response?.data?.error ||
        (err.message === 'Network Error'
          ? 'Cannot reach the API. Check that the backend is running on port 4000.'
          : err.message);
      toast.error(message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  }

  if (done) {
    return (
      <AuthLayout title="Check your email" subtitle="We sent a verification link to your inbox">
        <p className="text-navy/70 text-center text-sm leading-relaxed">
          Click the link in the email to activate your account, then{' '}
          <AuthLink to="/login">sign in</AuthLink>.
        </p>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Create account" subtitle="Start managing your hotspot network">
      <form onSubmit={handleSubmit} className="space-y-5">
        <Input
          label="Full name"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <Input
          label="Email address"
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <div>
          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
            minLength={8}
          />
          {form.password && (
            <div className="mt-2">
              <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-brand rounded-full transition-all duration-300" style={{ width: strength.width }} />
              </div>
              <p className={`text-xs mt-1.5 font-medium ${strength.color}`}>{strength.label}</p>
            </div>
          )}
        </div>
        <Input
          label="Confirm password"
          type="password"
          value={form.confirm}
          onChange={(e) => setForm({ ...form, confirm: e.target.value })}
          required
        />
        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Creating account...' : 'Create account'}
        </Button>
        <p className="text-center text-sm text-navy/60">
          Already have an account? <AuthLink to="/login">Sign in</AuthLink>
        </p>
      </form>
    </AuthLayout>
  );
}
