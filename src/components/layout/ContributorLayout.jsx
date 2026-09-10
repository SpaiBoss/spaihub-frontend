import { Navigate, Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useContributorAuth } from '../../context/ContributorAuthContext';
import BrandLogo from '../BrandLogo';
import { Skeleton } from '../ui';

export function ContributorProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useContributorAuth();
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-surface-muted">
        <Skeleton className="h-10 w-48" />
      </div>
    );
  }
  if (!isAuthenticated) return <Navigate to="/contributor/login" replace />;
  return children;
}

export default function ContributorLayout() {
  const { contributor, logout } = useContributorAuth();
  const navigate = useNavigate();

  const links = [
    { to: '/contributor', end: true, label: 'Home' },
    { to: '/contributor/links', label: 'Links' },
    { to: '/contributor/wallet', label: 'Wallet' },
    { to: '/contributor/settings', label: 'Settings' },
  ];

  function handleLogout() {
    logout();
    navigate('/contributor/login');
  }

  return (
    <div className="min-h-screen bg-surface-muted">
      <header className="bg-navy text-white px-5 py-3.5 flex items-center justify-between border-b border-navy-dark">
        <div className="flex items-center gap-3">
          <BrandLogo theme="dark" textClassName="text-lg" />
          <span className="hidden sm:inline text-white/35 text-xs font-medium tracking-wide uppercase">
            Contributor
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden sm:inline text-sm text-white/60">{contributor?.name}</span>
          <button
            type="button"
            onClick={handleLogout}
            className="text-sm text-white/60 hover:text-white font-medium transition-colors"
          >
            Sign out
          </button>
        </div>
      </header>
      <nav className="bg-white border-b border-gray-200 px-5 flex gap-0 overflow-x-auto">
        {links.map((l) => (
          <NavLink
            key={l.to}
            to={l.to}
            end={l.end}
            className={({ isActive }) =>
              `py-3 px-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                isActive ? 'border-brand text-navy' : 'border-transparent text-navy/50 hover:text-navy'
              }`
            }
          >
            {l.label}
          </NavLink>
        ))}
      </nav>
      <main className="p-5 sm:p-6 max-w-5xl mx-auto animate-fade-in">
        <Outlet />
      </main>
    </div>
  );
}
