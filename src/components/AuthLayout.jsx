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
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-[45%] xl:w-[42%] bg-brand-gradient relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 -left-10 w-72 h-72 rounded-full bg-white blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-brand blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-between p-12 xl:p-16 text-white w-full">
          <BrandLogo theme="dark" textClassName="text-3xl" />
          <div>
            <h2 className="text-3xl xl:text-4xl font-bold leading-tight">
              Professional hotspot management for ISPs
            </h2>
            <p className="text-white/70 mt-4 text-lg leading-relaxed max-w-md">
              Deploy, monetize, and monitor WiFi networks across Cameroon with one unified platform.
            </p>
            <ul className="mt-10 space-y-4">
              {highlights.map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-3 text-white/85">
                  <span className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                    <Icon className="w-4 h-4" />
                  </span>
                  <span className="text-sm font-medium">{text}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="text-white/40 text-sm">Trusted by hotspot operators across Cameroon</p>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center bg-surface-muted px-4 py-10 sm:px-8">
        <div className="w-full max-w-md animate-slide-up">
          <div className="lg:hidden text-center mb-8">
            <BrandLogo className="mb-4" textClassName="text-3xl" />
          </div>
          <div className="text-center lg:text-left mb-8">
            <h1 className="text-2xl font-bold text-navy">{title}</h1>
            {subtitle && <p className="text-navy/60 mt-1.5 text-sm">{subtitle}</p>}
          </div>
          <div className="card card-body shadow-card-hover">{children}</div>
          <p className="text-center text-xs text-navy/40 mt-6">
          Spai-Hub · Hotspot management for Cameroon
        </p>
        </div>
      </div>
    </div>
  );
}

export function AuthLink({ to, children }) {
  return (
    <Link to={to} className="text-brand hover:text-brand-dark text-sm font-semibold transition-colors">
      {children}
    </Link>
  );
}
