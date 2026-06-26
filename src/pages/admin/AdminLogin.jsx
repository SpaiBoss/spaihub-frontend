import { useState, useEffect } from 'react';
import { useNavigate, NavLink, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import api from '../../services/api';
import AuthLayout from '../../components/AuthLayout';
import BrandLogo from '../../components/BrandLogo';
import { Button, Input } from '../../components/ui';

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
      toast.success('Welcome, admin');
      navigate('/admin/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <AuthLayout title="Admin sign in" subtitle="Platform administration">
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

function AdminGuard({ children }) {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    window.location.href = '/admin/login';
    return null;
  }
  return children;
}

function AdminLayout({ children, title, description }) {
  const navigate = useNavigate();
  const location = useLocation();

  function logout() {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  }

  const links = [
    { to: '/admin/dashboard', label: 'Overview' },
    { to: '/admin/owners', label: 'Owners' },
    { to: '/admin/transactions', label: 'Transactions' },
    { to: '/admin/withdrawals', label: 'Withdrawals' },
  ];

  return (
    <div className="min-h-screen bg-surface-muted">
      <header className="bg-navy-dark text-white px-6 py-4 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
        <BrandLogo theme="dark" variant="text" textClassName="text-lg" />
          <span className="hidden sm:inline text-white/30 text-sm font-medium">Admin</span>
        </div>
        <button onClick={logout} className="text-sm text-white/60 hover:text-white font-medium transition-colors">
          Sign out
        </button>
      </header>
      <nav className="bg-white border-b border-gray-100 px-6 flex gap-1 overflow-x-auto">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={`py-3.5 px-4 text-sm font-semibold border-b-2 whitespace-nowrap transition-colors ${
              location.pathname === l.to
                ? 'border-brand text-brand'
                : 'border-transparent text-navy/50 hover:text-navy'
            }`}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
      <main className="p-6 max-w-7xl mx-auto animate-fade-in">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-navy">{title}</h2>
          {description && <p className="text-sm text-navy/60 mt-1">{description}</p>}
        </div>
        {children}
      </main>
    </div>
  );
}

export { AdminGuard, AdminLayout };
