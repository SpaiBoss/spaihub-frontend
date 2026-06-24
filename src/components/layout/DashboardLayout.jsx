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
  ChevronRight,
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
    description: 'Overview of revenue, sessions, and network health.',
  },
  '/dashboard/locations': {
    title: 'Locations',
    description: 'Manage hotspots, routers, and internet packages.',
  },
  '/dashboard/vouchers': {
    title: 'Vouchers',
    description: 'Generate and track prepaid access codes.',
  },
  '/dashboard/transactions': {
    title: 'Transactions',
    description: 'Payment history across all your locations.',
  },
  '/dashboard/wallet': {
    title: 'Wallet',
    description: 'Balance, earnings, and withdrawal requests.',
  },
  '/dashboard/settings': {
    title: 'Settings',
    description: 'Account details and preferences.',
  },
};

function UserAvatar({ name }) {
  const initial = (name || 'O').charAt(0).toUpperCase();
  return (
    <div className="w-9 h-9 rounded-xl bg-brand/20 text-brand font-bold text-sm flex items-center justify-center shrink-0">
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
    <div className="flex flex-col h-full w-full bg-sidebar-gradient">
      <div className="p-6 pb-8">
        <BrandLogo theme="dark" textClassName="text-2xl" />
        <p className="text-white/40 text-xs mt-3 font-medium tracking-wide uppercase">
          Hotspot management
        </p>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-white/15 text-white shadow-sm backdrop-blur-sm'
                  : 'text-white/65 hover:text-white hover:bg-white/8'
              }`
            }
          >
            <Icon className="w-[18px] h-[18px] shrink-0" />
            {label}
            <ChevronRight className="w-3.5 h-3.5 ml-auto opacity-0 group-hover:opacity-40 transition-opacity" />
          </NavLink>
        ))}
      </nav>

      <div className="p-4 m-3 rounded-2xl bg-white/8 border border-white/10 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <UserAvatar name={currentOwner?.name} />
          <div className="min-w-0 flex-1">
            <p className="text-white text-sm font-semibold truncate">{currentOwner?.name || 'Owner'}</p>
            <p className="text-white/50 text-xs truncate">{currentOwner?.email}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 w-full mt-3 py-2 rounded-xl text-white/70 hover:text-white hover:bg-white/10 text-sm font-medium transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Sign out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-surface-muted">
      <aside className="hidden lg:flex w-64 flex-shrink-0 sticky top-0 h-screen shadow-sidebar z-20">
        {sidebar}
      </aside>

      {mobileOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex animate-fade-in">
          <div className="absolute inset-0 bg-navy-dark/70 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="relative w-72 h-full animate-slide-up shadow-sidebar">{sidebar}</aside>
        </div>
      )}

      <div className="flex-1 min-w-0 flex flex-col">
        <header className="bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center gap-3 min-w-0">
            <button
              className="lg:hidden p-2 -ml-2 rounded-xl hover:bg-gray-100 transition-colors"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5 text-navy" />
            </button>
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-navy truncate">{meta.title}</h1>
              <p className="text-xs text-navy/50 hidden sm:block truncate">{meta.description}</p>
            </div>
          </div>
        </header>

        <main className="flex-1 p-6 animate-fade-in">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
