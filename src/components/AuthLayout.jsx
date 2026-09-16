import { Link } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import LanguageToggle from './LanguageToggle';
import { useTranslation } from 'react-i18next';
import { LocaleLink } from './LocaleLink';

export default function AuthLayout({ children, title, subtitle }) {
  const { t } = useTranslation('auth');
  const { t: tc } = useTranslation('common');

  return (
    <div className="min-h-screen min-h-[100dvh] flex">
      <div className="hidden lg:flex lg:w-[42%] xl:w-[40%] bg-navy relative">
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 text-white w-full">
          <LocaleLink to="/" className="inline-flex w-fit">
            <BrandLogo theme="dark" textClassName="text-2xl" className="justify-start" />
          </LocaleLink>

          <div className="max-w-sm">
            <h2 className="text-2xl xl:text-[1.75rem] font-semibold leading-snug text-white tracking-tight">
              {t('layout.headline')}
            </h2>
            <p className="text-white/55 mt-4 text-sm leading-relaxed">
              {t('layout.sub')}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3">
            <p className="text-white/30 text-xs tracking-wide">SpaiHub</p>
            <LanguageToggle compact className="text-white" />
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-surface-muted px-4 py-10 sm:px-8">
        <div className="w-full max-w-[400px] animate-slide-up">
          <div className="lg:hidden text-center mb-8">
            <LocaleLink to="/" className="inline-flex justify-center">
              <BrandLogo className="mb-4 justify-center" textClassName="text-2xl" />
            </LocaleLink>
            <div className="flex justify-center">
              <LanguageToggle compact />
            </div>
          </div>

          <div className="text-center lg:text-left mb-7">
            <h1 className="text-[1.5rem] font-semibold text-navy tracking-tight">{title}</h1>
            {subtitle && (
              <p className="text-navy/55 mt-2 text-sm leading-relaxed">{subtitle}</p>
            )}
          </div>

          <div className="auth-card">{children}</div>

          <p className="text-center text-[11px] text-navy/35 mt-7 tracking-wide">
            {t('layout.footer')}
          </p>
        </div>
      </div>
    </div>
  );
}

export function AuthLink({ to, children }) {
  return (
    <Link
      to={to}
      className="text-brand hover:text-brand-dark text-sm font-medium transition-colors"
    >
      {children}
    </Link>
  );
}
