import BrandLogo from './BrandLogo';
import { resolveMediaUrl } from '../utils/mediaUrl';

export default function PortalBrand({ branding, theme = 'dark', textClassName = 'text-3xl', className = '' }) {
  const name = branding?.brandName;
  const logoUrl = resolveMediaUrl(branding?.logoUrl);

  if (logoUrl) {
    return (
      <div className={`flex flex-col items-center justify-center gap-2 ${className}`}>
        <img
          src={logoUrl}
          alt={name || 'Hotspot logo'}
          className="max-h-14 max-w-[220px] object-contain"
          referrerPolicy="no-referrer"
        />
        {name && (
          <p className={`font-semibold ${theme === 'dark' ? 'text-white/90' : 'text-navy'} text-sm`}>
            {name}
          </p>
        )}
      </div>
    );
  }

  if (name) {
    return (
      <h1
        className={`font-bold tracking-tight leading-tight text-center ${textClassName} ${
          theme === 'dark' ? 'text-white' : 'text-navy'
        } ${className}`}
      >
        {name}
      </h1>
    );
  }

  return <BrandLogo theme={theme} className={className} textClassName={textClassName} />;
}

export function PortalCredit() {
  return (
    <p className="text-center text-xs mt-6 text-navy/35">
      Powered by{' '}
      <a
        href="https://spaitrace.com"
        target="_blank"
        rel="noreferrer"
        className="font-semibold text-brand hover:underline"
      >
        spaitrace.com
      </a>
    </p>
  );
}
