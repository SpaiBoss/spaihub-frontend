import { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  MapPin,
  Receipt,
  Wallet,
  Settings,
  LogOut,
  Menu,
  Ticket,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import BrandLogo from '../BrandLogo';

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/dashboard/locations', label: 'Locations', icon: MapPin },
  { to: '/dashboard/vouchers', label: 'Vouchers', icon: Ticket },
  { to: '/dashboard/transactions', label: 'Transactions', icon: Receipt },
  { to: '/dashboard/wallet', label: 'Wallet', icon: Wallet },
  { to: '/dashboard/settings', label: 'Settings', icon: Settings },
];

const pageMeta = {
  '/dashboard': {
    title: 'Dashboard',
    description: 'Revenue, sessions, and network health.',
  },
  '/dashboard/locations': {
    title: 'Locations',
    description: 'Hotspots, routers, and packages.',
  },
  '/dashboard/vouchers': {
    title: 'Vouchers',
    description: 'Prepaid access codes.',
  },
  '/dashboard/transactions': {
    title: 'Transactions',
    description: 'Payment history across locations.',
  },
  '/dashboard/wallet': {
    title: 'Wallet',
    description: 'Balance and withdrawals.',
  },
  '/dashboard/settings': {
    title: 'Settings',
    description: 'Account and portal branding.',
  },
};

function UserAvatar({ name }) {
  const initial = (name || 'O').charAt(0).toUpperCase();
  return (
    <div className="w-8 h-8 rounded-lg bg-white/10 text-white/90 font-medium text-sm flex items-center justify-center shrink-0">
      {initial}
    </div>
  );
}

export default function DashboardLayout() {
  const { currentOwner, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const meta = pageMeta[location.pathname] || pageMeta['/dashboard'];

  function handleLogout() {
    logout();
    navigate('/login');
  }

  const sidebar = (
    <div className="flex flex-col h-full w-full bg-navy">
      <div className="px-5 py-6 border-b border-white/10">
        <BrandLogo theme="dark" textClassName="text-xl" />
        <p className="text-white/40 text-xs mt-2.5 font-medium tracking-wide">
          Operations
        </p>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-0.5">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `group flex items-center gap-3 pl-3 pr-3 py-2.5 text-sm transition-colors duration-150 border-l-2 ${
                isActive
                  ? 'border-brand text-white bg-white/[0.06] font-medium'
                  : 'border-transparent text-white/60 hover:text-white hover:bg-white/[0.04]'
              }`
            }
          >
            <Icon className="w-[17px] h-[17px] shrink-0 opacity-80" strokeWidth={1.75} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="p-3 m-3 border border-white/10 rounded-lg">
        <div className="flex items-center gap-3">
          <UserAvatar name={currentOwner?.name} />
          <div className="min-w-0 flex-1">
            <p className="text-white text-sm font-medium truncate">{currentOwner?.name || 'Owner'}</p>
            <p className="text-white/45 text-xs truncate">{currentOwner?.email}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full mt-3 py-2 rounded-lg text-white/65 hover:text-white hover:bg-white/[0.06] text-sm font-medium transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-surface-muted">
      <aside className="hidden lg:flex w-60 flex-shrink-0 sticky top-0 h-screen z-20 border-r border-navy-dark">
        {sidebar}
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex animate-fade-in">
          <div className="absolute inset-0 bg-navy-dark/60" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-72 h-full animate-slide-up">{sidebar}</aside>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-5 py-3.5 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3 min-w-0">
            <button
              type="button"
              className="lg:hidden p-2 -ml-2 rounded-lg hover:bg-navy/[0.04] transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-navy" />
            </button>
            <div className="min-w-0">
              <h1 className="text-base font-semibold text-navy truncate">{meta.title}</h1>
              <p className="text-xs text-navy/50 hidden sm:block truncate">{meta.description}</p>
            </div>
          </div>
        </header>

        <main className="flex-1 p-5 sm:p-6 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
