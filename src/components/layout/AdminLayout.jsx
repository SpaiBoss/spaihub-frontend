import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import BrandLogo from '../BrandLogo';

export function AdminGuard({ children }) {
  const token = localStorage.getItem('adminToken');
  if (!token) {
    window.location.href = '/admin/login';
    return null;
  }
  return children;
}

export function AdminLayout({ children, title, description }) {
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
      <header className="bg-navy text-white px-5 py-3.5 flex items-center justify-between border-b border-navy-dark">
        <div className="flex items-center gap-3">
          <BrandLogo theme="dark" textClassName="text-lg" />
          <span className="hidden sm:inline text-white/35 text-xs font-medium tracking-wide uppercase">
            Admin
          </span>
        </div>
        <button
          type="button"
          onClick={logout}
          className="text-sm text-white/60 hover:text-white font-medium transition-colors"
        >
          Sign out
        </button>
      </header>
      <nav className="bg-white border-b border-gray-200 px-5 flex gap-0 overflow-x-auto">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            className={`py-3 px-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
              location.pathname === l.to
                ? 'border-brand text-navy'
                : 'border-transparent text-navy/50 hover:text-navy'
            }`}
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
      <main className="p-5 sm:p-6 max-w-7xl mx-auto animate-fade-in">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-navy">{title}</h2>
          {description && <p className="text-sm text-navy/55 mt-1">{description}</p>}
        </div>
        {children}
      </main>
    </div>
  );
}
