import { Link } from 'react-router-dom';
import { Wifi, Shield, Zap } from 'lucide-react';
import BrandLogo from './BrandLogo';

const highlights = [
  { icon: Wifi, text: 'Multi-location hotspot management' },
  { icon: Zap, text: 'MoMo & Orange Money payments' },
  { icon: Shield, text: 'Enterprise-grade voucher system' },
];

export default function AuthLayout({ children, title, subtitle }) {
  return (
    <div className="min-h-screen min-h-[100dvh] flex">
      <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] bg-auth-gradient bg-auth-mesh relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-16 -left-16 h-80 w-80 rounded-full bg-brand/25 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 text-white w-full">
          <BrandLogo theme="dark" textClassName="text-3xl" className="justify-start" />

          <div className="max-w-md">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-light/90 mb-4">
              ISP SaaS Platform
            </p>
            <h2 className="text-3xl xl:text-[2.35rem] font-bold leading-[1.15] text-white tracking-tight">
              Professional hotspot management for ISPs
            </h2>
            <p className="text-white/65 mt-5 text-[15px] leading-relaxed">
              Deploy, monetize, and monitor WiFi networks across Cameroon with one unified platform.
            </p>

            <ul className="mt-11 space-y-3.5">
              {highlights.map(({ icon: Icon, text }) => (
                <li
                  key={text}
                  className="flex items-center gap-3.5 rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3 backdrop-blur-sm"
                >
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand/20 text-brand-light">
                    <Icon className="h-4 w-4" strokeWidth={2.25} />
                  </span>
                  <span className="text-sm font-medium text-white/90">{text}</span>
                </li>
              ))}
            </ul>
          </div>

          <p className="text-white/35 text-xs tracking-wide">
            Trusted by hotspot operators across Cameroon
          </p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-surface-muted via-white to-[#eef2f8] px-4 py-10 sm:px-8">
        <div className="w-full max-w-[420px] animate-slide-up">
          <div className="lg:hidden text-center mb-8">
            <BrandLogo className="mb-4" textClassName="text-3xl" />
          </div>

          <div className="text-center lg:text-left mb-7">
            <h1 className="text-[1.65rem] font-bold text-navy tracking-tight">{title}</h1>
            {subtitle && (
              <p className="text-navy/55 mt-2 text-sm leading-relaxed">{subtitle}</p>
            )}
          </div>

          <div className="auth-card">{children}</div>

          <p className="text-center text-[11px] text-navy/35 mt-7 tracking-wide">
            Spai-Hub · Hotspot management for Cameroon
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
      className="text-brand hover:text-brand-dark text-sm font-semibold transition-colors hover:underline underline-offset-2"
    >
      {children}
    </Link>
  );
}
