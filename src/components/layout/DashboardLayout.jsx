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

const bottomNavItems = [
  { to: '/dashboard', label: 'Home', icon: LayoutDashboard, end: true },
  { to: '/dashboard/locations', label: 'Sites', icon: MapPin },
  { to: '/dashboard/vouchers', label: 'Codes', icon: Ticket },
  { to: '/dashboard/wallet', label: 'Cash', icon: Wallet },
  { to: '/dashboard/transactions', label: 'Sales', icon: Receipt },
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
              `group flex items-center gap-3 pl-3 pr-3 py-3 text-sm transition-colors duration-150 border-l-2 min-h-[44px] ${
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
          className="flex items-center justify-center gap-2 w-full mt-3 min-h-[44px] py-2 rounded-lg text-white/65 hover:text-white hover:bg-white/[0.06] text-sm font-medium transition-colors"
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
          <aside className="relative w-[min(18rem,86vw)] h-full animate-slide-up">{sidebar}</aside>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="bg-white border-b border-gray-200 px-4 sm:px-5 py-3 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              type="button"
              className="lg:hidden p-2.5 -ml-1.5 rounded-lg hover:bg-navy/[0.04] transition-colors min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
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
          <NavLink
            to="/dashboard/settings"
            className="lg:hidden p-2.5 rounded-lg text-navy/55 hover:text-navy hover:bg-navy/[0.04] min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
            aria-label="Settings"
          >
            <Settings className="w-5 h-5" />
          </NavLink>
        </header>

        <main className="flex-1 p-4 sm:p-6 animate-fade-in pb-[calc(4.5rem+env(safe-area-inset-bottom))] lg:pb-6">
          <Outlet />
        </main>

        <nav
          className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white/95 backdrop-blur border-t border-gray-200"
          style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
          aria-label="Primary"
        >
          <div className="grid grid-cols-5 h-14 max-w-lg mx-auto">
            {bottomNavItems.map(({ to, label, icon: Icon, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  `flex flex-col items-center justify-center gap-0.5 text-[10px] font-medium transition-colors ${
                    isActive ? 'text-brand' : 'text-navy/45'
                  }`
                }
              >
                <Icon className="w-5 h-5" strokeWidth={1.75} />
                {label}
              </NavLink>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
}
