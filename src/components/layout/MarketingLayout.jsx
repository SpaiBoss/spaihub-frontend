import { useEffect, useState } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import BrandLogo from '../BrandLogo';
import { usePublicConfig, whatsappUrl } from '../../hooks/usePublicConfig';
import { useTranslation } from 'react-i18next';
import { LocaleLink, LocaleNavLink } from '../LocaleLink';
import LanguageToggle from '../LanguageToggle';
import { useLocale } from '../../i18n/useLocale';
import { helpHref } from '../../i18n/paths';

const NAV_KEYS = [
  { to: '/features', key: 'nav.features' },
  { to: '/how-it-works', key: 'nav.howItWorks' },
  { to: '/pricing', key: 'nav.pricing' },
  { to: '/help', key: 'nav.help' },
  { to: '/faq', key: 'nav.faq' },
];

const FOOTER_PRODUCT = [
  { to: '/features', key: 'nav.features' },
  { to: '/how-it-works', key: 'nav.howItWorks' },
  { to: '/pricing', key: 'nav.pricing' },
  { to: '/for/mikrotik', key: 'nav.mikrotik' },
  { to: '/for/mobile-money', key: 'nav.mobileMoney' },
  { to: '/for/vouchers', key: 'nav.vouchers' },
  { to: '/for/contributors', key: 'nav.contributors' },
];

const FOOTER_COMPANY = [
  { to: '/help', key: 'nav.help' },
  { to: '/faq', key: 'nav.faq' },
  { to: '/contact', key: 'nav.contact' },
  { to: '/login', key: 'nav.signIn' },
  { to: '/register', key: 'nav.startFree' },
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
  const { t } = useTranslation();
  const { t: tm } = useTranslation('marketing');
  const { lang } = useLocale();
  const isHome = pathname === '/' || pathname === '/fr';
  const { contactWhatsApp } = usePublicConfig();
  const wa = whatsappUrl(contactWhatsApp, tm('waLearn'));

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

  const toggleClass = darkChrome ? 'text-white' : 'text-navy';

  return (
    <div className="min-h-[100dvh] flex flex-col bg-white text-navy">
      <ScrollToTop />
      <header className={headerClass} aria-hidden={open || undefined}>
        <div className="mx-auto flex h-14 sm:h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          {overlayNav ? (
            <LocaleLink to="/" onClick={() => setOpen(false)} className="sr-only">
              SpaiHub home
            </LocaleLink>
          ) : (
            <LocaleLink to="/" onClick={() => setOpen(false)} className="shrink-0">
              <BrandLogo theme="light" textClassName="text-xl" />
            </LocaleLink>
          )}

          <nav className="hidden md:flex items-center gap-6">
            {NAV_KEYS.map((item) => (
              <LocaleNavLink key={item.to} to={item.to === '/help' ? helpHref('', lang) : item.to} className={navLinkClass}>
                {t(item.key)}
              </LocaleNavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-2">
            <LanguageToggle compact className={toggleClass} />
            <LocaleLink
              to="/login"
              className={`text-sm font-medium px-3 py-2 rounded-lg transition-colors ${
                darkChrome ? 'text-white/70 hover:text-white hover:bg-white/10' : 'btn-ghost'
              }`}
            >
              {t('nav.signIn')}
            </LocaleLink>
            <LocaleLink
              to="/register"
              className={`text-sm font-medium px-4 py-2 rounded-lg transition-colors ${
                darkChrome
                  ? 'bg-white text-navy hover:bg-white/90'
                  : 'btn-primary'
              }`}
            >
              {t('nav.startFree')}
            </LocaleLink>
          </div>

          <button
            type="button"
            className={`md:hidden p-2 ${overlayNav && !open ? 'ml-auto' : ''} ${darkChrome ? 'text-white/80 hover:text-white' : 'text-navy/70 hover:text-navy'}`}
            aria-label={open ? t('nav.closeMenu') : t('nav.openMenu')}
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
          aria-label={t('nav.openMenu')}
        >
          <div className="mx-auto flex h-14 sm:h-16 w-full max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 shrink-0">
            <LocaleLink to="/" onClick={() => setOpen(false)} className="shrink-0">
              <BrandLogo theme={darkChrome ? 'dark' : 'light'} textClassName="text-xl" />
            </LocaleLink>
            <button
              type="button"
              className={`p-2 ${darkChrome ? 'text-white/80 hover:text-white' : 'text-navy/70 hover:text-navy'}`}
              aria-label={t('nav.closeMenu')}
              onClick={() => setOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <nav className="flex-1 overflow-y-auto px-4 sm:px-6 pb-8 pt-2 space-y-1">
            {NAV_KEYS.map((item) => (
              <LocaleNavLink
                key={item.to}
                to={item.to === '/help' ? helpHref('', lang) : item.to}
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
                {t(item.key)}
              </LocaleNavLink>
            ))}
            <div className={`pt-3 ${toggleClass}`}>
              <LanguageToggle />
            </div>
            <div className="flex gap-2 pt-3">
              <LocaleLink
                to="/login"
                className={`flex-1 py-2.5 text-center text-sm font-medium rounded-lg border ${
                  darkChrome ? 'border-white/20 text-white' : 'btn-secondary'
                }`}
                onClick={() => setOpen(false)}
              >
                {t('nav.signIn')}
              </LocaleLink>
              <LocaleLink
                to="/register"
                className={`flex-1 py-2.5 text-center text-sm font-medium rounded-lg ${
                  darkChrome ? 'bg-white text-navy' : 'btn-primary'
                }`}
                onClick={() => setOpen(false)}
              >
                {t('nav.startFree')}
              </LocaleLink>
            </div>
          </nav>
        </div>
      )}

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="border-t border-navy/10 bg-surface-muted">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-1">
              <BrandLogo textClassName="text-lg" />
              <p className="mt-3 text-sm text-navy/50 leading-relaxed max-w-xs">
                {tm('footerTagline')}
              </p>
            </div>
            <div>
              <p className="mkt-eyebrow text-navy/40 mb-3">{t('nav.product')}</p>
              <ul className="space-y-2">
                {FOOTER_PRODUCT.map((item) => (
                  <li key={item.to}>
                    <LocaleLink to={item.to} className="text-sm text-navy/60 hover:text-navy transition-colors duration-200">
                      {t(item.key)}
                    </LocaleLink>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mkt-eyebrow text-navy/40 mb-3">{t('nav.company')}</p>
              <ul className="space-y-2">
                {FOOTER_COMPANY.map((item) => (
                  <li key={item.to}>
                    <LocaleLink to={item.to} className="text-sm text-navy/60 hover:text-navy transition-colors duration-200">
                      {t(item.key)}
                    </LocaleLink>
                  </li>
                ))}
                {wa && (
                  <li>
                    <a
                      href={wa}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-navy/60 hover:text-navy transition-colors duration-200"
                    >
                      {t('nav.whatsapp')}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="mt-10 pt-6 border-t border-navy/10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <p className="font-mono text-[11px] tracking-wide text-navy/40">SpaiHub · {t('cameroon')}</p>
            <a
              href="https://www.spaitrace.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-[11px] tracking-wide text-navy/40 hover:text-navy/70 transition-colors duration-200"
            >
              {t('poweredBy')}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
