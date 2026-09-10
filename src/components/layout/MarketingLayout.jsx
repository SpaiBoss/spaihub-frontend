import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import BrandLogo from '../BrandLogo';
import { usePublicConfig, whatsappUrl } from '../../hooks/usePublicConfig';

const NAV = [
  { to: '/features', label: 'Features' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/faq', label: 'FAQ' },
];

const FOOTER_PRODUCT = [
  { to: '/features', label: 'Features' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/for/mikrotik', label: 'MikroTik' },
  { to: '/for/mobile-money', label: 'Mobile Money' },
  { to: '/for/vouchers', label: 'Vouchers' },
];

const FOOTER_COMPANY = [
  { to: '/faq', label: 'FAQ' },
  { to: '/contact', label: 'Contact' },
  { to: '/login', label: 'Sign in' },
  { to: '/register', label: 'Start free' },
];

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function MarketingLayout() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const { contactWhatsApp } = usePublicConfig();
  const wa = whatsappUrl(contactWhatsApp, 'Hi — I want to learn about Spai-Hub for my hotspot.');

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isHome) {
      setScrolled(false);
      return undefined;
    }
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  // Keep dark overlay chrome while the mobile menu is open at the top of home
  // so the header does not flash to white over the navy drawer.
  const overlayNav = isHome && !scrolled;
  const darkChrome = overlayNav;

  const navLinkClass = ({ isActive }) =>
    `text-sm font-medium transition-colors ${
      darkChrome
        ? isActive
          ? 'text-white'
          : 'text-white/65 hover:text-white'
        : isActive
          ? 'text-navy'
          : 'text-navy/55 hover:text-navy'
    }`;

  let headerClass = 'sticky top-0 z-40 border-b border-gray-200/80 bg-white/90 backdrop-blur-md';
  if (isHome) {
    if (overlayNav) {
      headerClass = open
        ? 'absolute inset-x-0 top-0 z-40 border-b border-white/10 bg-navy'
        : 'absolute inset-x-0 top-0 z-40 border-b border-transparent bg-transparent';
    } else {
      headerClass = 'fixed inset-x-0 top-0 z-40 border-b border-gray-200/80 bg-white/90 backdrop-blur-md';
    }
  }

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white text-navy">
      <ScrollToTop />
      <header className={headerClass} aria-hidden={open || undefined}>
        <div className="mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {/* Hero carries the brand on unscrolled home; scrolled/other pages show the nav wordmark. */}
          {overlayNav ? (
            <Link to="/" onClick={() => setOpen(false)} className="sr-only">
              Spai-Hub home
            </Link>
          ) : (
            <Link to="/" onClick={() => setOpen(false)} className="shrink-0">
              <BrandLogo theme="light" textClassName="text-xl" />
            </Link>
          )}

          <nav className="hidden md:flex items-center gap-6">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} className={navLinkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <Link
              to="/login"
              className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                darkChrome ? 'text-white/70 hover:text-white hover:bg-white/10' : 'btn-ghost'
              }`}
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                darkChrome
                  ? 'bg-white text-navy hover:bg-white/90'
                  : 'btn-primary'
              }`}
            >
              Start free
            </Link>
          </div>

          <button
            type="button"
            className={`md:hidden p-2 ${overlayNav && !open ? 'ml-auto' : ''} ${darkChrome ? 'text-white/80 hover:text-white' : 'text-navy/70 hover:text-navy'}`}
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {open && (
        <div
          className={`md:hidden fixed inset-0 z-50 flex flex-col ${
            darkChrome ? 'bg-navy text-white' : 'bg-white text-navy'
          }`}
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="mx-auto flex h-14 sm:h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 shrink-0">
            <Link to="/" onClick={() => setOpen(false)} className="shrink-0">
              <BrandLogo theme={darkChrome ? 'dark' : 'light'} textClassName="text-xl" />
            </Link>
            <button
              type="button"
              className={`p-2 ${darkChrome ? 'text-white/80 hover:text-white' : 'text-navy/70 hover:text-navy'}`}
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 sm:px-6 pb-8 pt-2 space-y-1">
            {NAV.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `block py-2.5 text-sm font-medium ${
                    darkChrome
                      ? isActive
                        ? 'text-white'
                        : 'text-white/65'
                      : isActive
                        ? 'text-navy'
                        : 'text-navy/60'
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
            <div className="flex gap-2 pt-3">
              <Link
                to="/login"
                className={`flex-1 py-2.5 text-center text-sm font-medium rounded-lg border ${
                  darkChrome ? 'border-white/20 text-white' : 'btn-secondary'
                }`}
                onClick={() => setOpen(false)}
              >
                Sign in
              </Link>
              <Link
                to="/register"
                className={`flex-1 py-2.5 text-center text-sm font-medium rounded-lg ${
                  darkChrome ? 'bg-white text-navy' : 'btn-primary'
                }`}
                onClick={() => setOpen(false)}
              >
                Start free
              </Link>
            </div>
          </nav>
        </div>
      )}

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-gray-200 bg-surface-muted">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <BrandLogo textClassName="text-lg" />
              <p className="mt-3 text-sm text-navy/50 leading-relaxed max-w-xs">
                Sell WiFi with Mobile Money. MikroTik-ready. Built for Cameroon hotspot owners.
              </p>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wide text-navy/40 uppercase mb-3">Product</p>
              <ul className="space-y-2">
                {FOOTER_PRODUCT.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="text-sm text-navy/60 hover:text-navy transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wide text-navy/40 uppercase mb-3">Company</p>
              <ul className="space-y-2">
                {FOOTER_COMPANY.map((item) => (
                  <li key={item.to}>
                    <Link to={item.to} className="text-sm text-navy/60 hover:text-navy transition-colors">
                      {item.label}
                    </Link>
                  </li>
                ))}
                {wa && (
                  <li>
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-navy/60 hover:text-navy transition-colors"
                    >
                      WhatsApp
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="text-xs text-navy/40">Spai-Hub · Cameroon</p>
            <a
              href="https://www.spaitrace.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-navy/40 hover:text-navy/70 transition-colors"
            >
              Powered by www.spaitrace.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
