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

const PRIMARY_LINKS = [
  { to: '/admin/dashboard', label: 'Overview' },
  { to: '/admin/owners', label: 'Owners' },
  { to: '/admin/locations', label: 'Locations' },
  { to: '/admin/transactions', label: 'Transactions' },
  { to: '/admin/withdrawals', label: 'Withdrawals' },
];

const CONTRIBUTOR_LINKS = [
  { to: '/admin/contributors', label: 'People' },
  { to: '/admin/contributor-links', label: 'Links' },
  { to: '/admin/contributor-withdrawals', label: 'Payouts' },
];

function NavTabs({ links }) {
  const location = useLocation();
  return (
    <div className="flex gap-0">
      {links.map((l) => (
        <NavLink
          key={l.to}
          to={l.to}
          className={`py-3 px-3.5 sm:px-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
            location.pathname === l.to
              ? 'border-brand text-navy'
              : 'border-transparent text-navy/50 hover:text-navy'
          }`}
        >
          {l.label}
        </NavLink>
      ))}
    </div>
  );
}

export function AdminLayout({ children, title, description }) {
  const navigate = useNavigate();
  const location = useLocation();
  const onContributorSection = location.pathname.startsWith('/admin/contributor');

  function logout() {
    localStorage.removeItem('adminToken');
    navigate('/admin/login');
  }

  return (
    <div className="min-h-screen bg-surface-muted">
      <header className="bg-navy text-white px-5 py-3.5 flex items-center justify-between border-b border-navy-dark">
        <div className="flex items-center gap-3 min-w-0">
          <BrandLogo theme="dark" textClassName="text-lg" />
          <span className="hidden sm:inline text-white/35 text-xs font-medium tracking-wide uppercase shrink-0">
            Admin
          </span>
        </div>
        <button
          type="button"
          onClick={logout}
          className="text-sm text-white/60 hover:text-white font-medium transition-colors shrink-0"
        >
          Sign out
        </button>
      </header>

      <nav className="bg-white border-b border-gray-200">
        <div className="px-3 sm:px-5 flex items-stretch gap-4 overflow-x-auto">
          <NavTabs links={PRIMARY_LINKS} />
          <div className="hidden sm:block w-px self-stretch bg-gray-200 my-2 shrink-0" aria-hidden />
          <div className="flex items-center gap-1 shrink-0">
            <span
              className={`hidden md:inline text-[10px] uppercase tracking-[0.16em] font-semibold px-2 ${
                onContributorSection ? 'text-brand' : 'text-navy/35'
              }`}
            >
              Contributors
            </span>
            <NavTabs links={CONTRIBUTOR_LINKS} />
          </div>
        </div>
      </nav>

      <main className="p-5 sm:p-6 lg:p-8 max-w-7xl mx-auto animate-fade-in">
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-semibold text-navy tracking-tight">{title}</h2>
          {description && <p className="text-sm text-navy/55 mt-1.5 max-w-2xl leading-relaxed">{description}</p>}
        </div>
        {children}
      </main>
    </div>
  );
}
