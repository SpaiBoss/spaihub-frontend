import { Link } from 'react-router-dom';
import { useId } from 'react';
import Reveal from './Reveal';

/**
 * Full-bleed sculptural 3D ribbon curl between color bands.
 * Sit at the bottom of a section; `fill` must match the NEXT background.
 */
export function WaveEdge({
  fill = '#ffffff',
  accent = '#0F766E',
  flip = false,
  className = '',
}) {
  const uid = useId().replace(/:/g, '');
  const fillKey = String(fill).replace('#', '').toLowerCase();
  const darkNext = ['0e141b', '070b10', '0a0f14', '12202a'].includes(fillKey);

  // Soft bowl that reveals the next section
  const bowl =
    'M0,78 C160,48 320,108 500,72 C680,36 860,110 1040,68 C1200,36 1340,88 1440,58 L1440,140 L0,140 Z';
  // Parallel ribbon centerline (tube sits on this)
  const ribbon =
    'M0,62 C160,32 320,92 500,56 C680,20 860,94 1040,52 C1200,20 1340,72 1440,42';

  return (
    <div
      className={`pointer-events-none absolute inset-x-0 z-20 leading-[0] ${
        flip ? 'top-0 rotate-180' : 'bottom-0'
      } ${className}`}
      aria-hidden
    >
      <svg
        className="mkt-wave-edge block h-20 w-full sm:h-28 md:h-32"
        viewBox="0 0 1440 140"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id={`${uid}-tube`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#99F6E4" stopOpacity={darkNext ? 0.95 : 0.9} />
            <stop offset="35%" stopColor={accent} stopOpacity="1" />
            <stop offset="70%" stopColor="#0F766E" stopOpacity="1" />
            <stop offset="100%" stopColor="#042F2E" stopOpacity="0.95" />
          </linearGradient>
          <linearGradient id={`${uid}-run`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#5EEAD4" stopOpacity="0.15" />
            <stop offset="40%" stopColor="#CCFBF1" stopOpacity={darkNext ? 0.85 : 0.55} />
            <stop offset="100%" stopColor="#5EEAD4" stopOpacity="0.12" />
          </linearGradient>
          <filter id={`${uid}-soft`} x="-2%" y="-50%" width="104%" height="200%">
            <feDropShadow dx="0" dy="4" stdDeviation="5" floodColor="#070B10" floodOpacity="0.45" />
          </filter>
          <filter id={`${uid}-glow`} x="-2%" y="-60%" width="104%" height="220%">
            <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#5EEAD4" floodOpacity={darkNext ? 0.45 : 0.25} />
          </filter>
        </defs>

        {/* Next-section color bowl */}
        <path d={bowl} fill={fill} />

        {/* Soft shadow under the tube */}
        <path
          d={ribbon}
          fill="none"
          stroke="#070B10"
          strokeWidth={darkNext ? 18 : 16}
          strokeLinecap="round"
          opacity={darkNext ? 0.55 : 0.22}
          vectorEffect="non-scaling-stroke"
        />

        {/* 3D tube body */}
        <path
          d={ribbon}
          fill="none"
          stroke={`url(#${uid}-tube)`}
          strokeWidth={darkNext ? 14 : 12}
          strokeLinecap="round"
          filter={`url(#${uid}-soft)`}
          vectorEffect="non-scaling-stroke"
        />

        {/* Specular run along the crest */}
        <path
          d={ribbon}
          fill="none"
          stroke={`url(#${uid}-run)`}
          strokeWidth={darkNext ? 4 : 3.25}
          strokeLinecap="round"
          filter={`url(#${uid}-glow)`}
          className="mkt-wave-sheen"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}

export function MarketingSection({
  children,
  className = '',
  id,
  tone = 'light',
  waveBottomFill,
  waveAccent = '#0F766E',
}) {
  const toneClass =
    tone === 'dark'
      ? 'bg-navy text-white'
      : tone === 'muted'
        ? 'bg-surface-muted'
        : 'bg-white';

  return (
    <section
      id={id}
      className={`relative overflow-x-hidden px-4 sm:px-6 lg:px-8 ${toneClass} ${
        waveBottomFill ? 'pb-32 sm:pb-36' : ''
      } ${className}`}
    >
      <div className="relative mx-auto w-full max-w-6xl">{children}</div>
      {waveBottomFill ? <WaveEdge fill={waveBottomFill} accent={waveAccent} /> : null}
    </section>
  );
}

export function MarketingHeading({ eyebrow, title, subtitle, align = 'left', light = false, className = '' }) {
  const alignClass = align === 'center' ? 'text-center mx-auto' : '';
  const titleColor = light ? 'text-white' : 'text-navy';
  const subColor = light ? 'text-white/60' : 'text-navy/55';
  const eyeColor = light ? 'text-brand-light' : 'text-brand';
  const hasMarginOverride = /\bmb-/.test(className);
  const marginClass = hasMarginOverride ? '' : 'mb-10 sm:mb-14';

  return (
    <Reveal className={`max-w-3xl ${marginClass} ${alignClass} ${className}`}>
      {eyebrow && <p className={`mkt-eyebrow mb-4 ${eyeColor}`}>{eyebrow}</p>}
      <h2 className={`mkt-display text-3xl sm:text-4xl lg:text-[2.75rem] ${titleColor}`}>{title}</h2>
      {subtitle && <p className={`mt-4 text-base sm:text-lg leading-relaxed max-w-2xl ${subColor}`}>{subtitle}</p>}
    </Reveal>
  );
}

export function MarketingCtaGroup({
  primaryTo = '/register',
  primaryLabel = 'Start free',
  secondaryTo = '/login',
  secondaryLabel = 'Sign in',
  className = '',
}) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <Link
        to={primaryTo}
        className="inline-flex items-center justify-center rounded-lg bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-dark hover:translate-y-[-1px]"
      >
        {primaryLabel}
      </Link>
      <Link
        to={secondaryTo}
        className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-transparent px-6 py-3.5 text-sm font-semibold text-white/90 transition-all duration-200 hover:border-white/40 hover:bg-white/[0.06]"
      >
        {secondaryLabel}
      </Link>
    </div>
  );
}

export function MarketingCtaGroupLight({
  primaryTo = '/register',
  primaryLabel = 'Start free',
  secondaryTo = '/login',
  secondaryLabel = 'Sign in',
  className = '',
}) {
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`}>
      <Link
        to={primaryTo}
        className="inline-flex items-center justify-center rounded-lg bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-all duration-200 hover:bg-brand-dark hover:translate-y-[-1px]"
      >
        {primaryLabel}
      </Link>
      <Link
        to={secondaryTo}
        className="inline-flex items-center justify-center rounded-lg border border-navy/15 bg-transparent px-6 py-3.5 text-sm font-semibold text-navy transition-all duration-200 hover:border-navy/30 hover:bg-navy/[0.03]"
      >
        {secondaryLabel}
      </Link>
    </div>
  );
}

/** Full-bleed signal field — WiFi / router atmosphere for the hero plane. */
export function HeroSignalField() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 100% 80% at 70% 0%, rgba(15,118,110,0.55), transparent 55%), radial-gradient(ellipse 70% 55% at 0% 100%, rgba(20,143,134,0.22), transparent 48%), linear-gradient(168deg, #070B10 0%, #0E141B 45%, #102018 100%)',
        }}
      />
      <div
        className="absolute -inset-[12%] opacity-[0.14] animate-drift motion-reduce:animate-none"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.11) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.11) 1px, transparent 1px)',
          backgroundSize: '52px 52px',
        }}
      />
      <svg
        className="absolute left-1/2 top-[8%] h-[95%] w-[160%] -translate-x-[42%] text-brand sm:left-auto sm:right-[-12%] sm:top-[-4%] sm:h-[120%] sm:w-[85%] sm:translate-x-0"
        viewBox="0 0 800 800"
        fill="none"
      >
        <circle cx="520" cy="300" r="56" className="animate-pulse-soft motion-reduce:animate-none" fill="currentColor" opacity="0.45" />
        {[100, 175, 260, 360, 470, 590].map((r, i) => (
          <circle
            key={r}
            cx="520"
            cy="300"
            r={r}
            stroke="currentColor"
            strokeWidth={i < 2 ? 1.75 : 1.15}
            opacity={0.7 - i * 0.09}
            className="origin-[520px_300px] animate-signal-ring motion-reduce:animate-none"
            style={{ animationDelay: `${i * 0.55}s` }}
          />
        ))}
        <path
          d="M520 300 L140 580 M520 300 L300 680 M520 300 L60 420 M520 300 L700 620"
          stroke="currentColor"
          strokeWidth="1.1"
          opacity="0.35"
        />
        <circle cx="140" cy="580" r="6" fill="currentColor" opacity="0.85" />
        <circle cx="300" cy="680" r="5" fill="currentColor" opacity="0.7" />
        <circle cx="60" cy="420" r="5" fill="currentColor" opacity="0.65" />
        <circle cx="700" cy="620" r="4" fill="currentColor" opacity="0.55" />
      </svg>
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#070B10] via-[#070B10]/70 to-transparent" />
    </div>
  );
}

export function NightTimeline({ events }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-16">
      <Reveal className="relative hidden lg:block">
        <p className="mkt-eyebrow text-brand-light/80">Douala · local</p>
        <p className="mkt-display mt-4 text-[4.5rem] leading-none text-white/90 tabular-nums">
          02<span className="text-brand-light animate-pulse-soft motion-reduce:animate-none">:</span>15
        </p>
        <p className="mt-4 max-w-xs text-sm text-white/45 leading-relaxed">
          Heartbeat green. Commands polling. Wallet waiting for morning.
        </p>
        <div className="mt-10 h-px w-24 bg-gradient-to-r from-brand to-transparent" />
      </Reveal>

      <ol className="relative border-l border-white/12 ml-1 sm:ml-2">
        {events.map((event, index) => (
          <Reveal
            as="li"
            key={`${event.time}-${event.title}`}
            delayMs={80 + index * 70}
            className="relative pl-8 sm:pl-10 pb-9 last:pb-0"
          >
            <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand ring-[6px] ring-navy" />
            <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
              <p className="font-mono text-xs text-brand-light/90">{event.time}</p>
              {event.tag && (
                <span className="font-mono text-[10px] tracking-[0.16em] uppercase text-white/35">{event.tag}</span>
              )}
            </div>
            <p className="mt-1.5 text-base sm:text-lg font-semibold text-white tracking-tight">{event.title}</p>
            {event.detail && <p className="mt-1.5 text-sm text-white/50 leading-relaxed max-w-xl">{event.detail}</p>}
          </Reveal>
        ))}
      </ol>
    </div>
  );
}

export function FeatureGrid({ items }) {
  return (
    <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => {
        const Icon = item.icon;
        return (
          <Reveal key={item.title} delayMs={index * 60} className="border-t border-navy/10 pt-6 group">
            <div className="flex items-center justify-between gap-3">
              <p className="font-mono text-[11px] text-brand/80 tracking-widest">
                {String(index + 1).padStart(2, '0')}
              </p>
              {Icon ? (
                <span className="mkt-icon-frame border-navy/10 text-brand group-hover:border-brand/30 group-hover:text-brand-dark">
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                </span>
              ) : null}
            </div>
            <h3 className="mkt-display mt-3 text-xl text-navy">{item.title}</h3>
            <p className="mt-3 text-sm text-navy/55 leading-relaxed">{item.body}</p>
          </Reveal>
        );
      })}
    </div>
  );
}

/** Product strip — not a card grid; one continuous ops board. */
export function ProductBoard({ panels }) {
  return (
    <Reveal className="overflow-hidden rounded-lg border border-navy/10 bg-navy text-white">
      <div className="grid lg:grid-cols-3 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
        {panels.map((panel) => (
          <div key={panel.title} className="p-6 sm:p-8">
            <p className="mkt-eyebrow text-brand-light/80">{panel.title}</p>
            <dl className="mt-6 space-y-4">
              {panel.lines.map((line) => (
                <div key={line.label} className="flex items-baseline justify-between gap-4">
                  <dt className="text-sm text-white/40">{line.label}</dt>
                  <dd className="font-mono text-sm sm:text-base text-white/90">{line.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        ))}
      </div>
    </Reveal>
  );
}

export function ProductMock({ title, lines, tone = 'dark' }) {
  const shell =
    tone === 'light'
      ? 'border-t border-navy/10 pt-5'
      : 'border-t border-white/15 pt-5';
  const label = tone === 'light' ? 'text-navy/40' : 'text-white/40';
  const key = tone === 'light' ? 'text-navy/50' : 'text-white/50';
  const val = tone === 'light' ? 'text-navy font-mono' : 'font-mono text-white/90';

  return (
    <div className={shell}>
      <p className={`mkt-eyebrow mb-4 ${label}`}>{title}</p>
      <div className="space-y-3">
        {lines.map((line) => (
          <div key={line.label} className="flex items-center justify-between gap-4 text-sm">
            <span className={key}>{line.label}</span>
            <span className={val}>{line.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TestimonialGrid({ items }) {
  return (
    <div className="grid gap-10 md:grid-cols-3">
      {items.map((item, index) => (
        <Reveal key={item.name} delayMs={index * 70} as="blockquote" className="border-t border-navy/10 pt-6">
          <p className="text-base text-navy/75 leading-relaxed tracking-tight">&ldquo;{item.quote}&rdquo;</p>
          <footer className="mt-6">
            <p className="text-sm font-semibold text-navy">{item.name}</p>
            <p className="font-mono text-[11px] text-navy/40 mt-1 tracking-wide">{item.role}</p>
          </footer>
        </Reveal>
      ))}
    </div>
  );
}

export function FaqList({ items }) {
  return (
    <Reveal className="divide-y divide-navy/10 border-t border-b border-navy/10">
      {items.map((item) => (
        <details key={item.q} className="group py-6">
          <summary className="cursor-pointer list-none flex items-start justify-between gap-4 text-left text-base sm:text-lg font-semibold text-navy tracking-tight transition-colors hover:text-brand [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <span
              className="text-brand/70 group-open:rotate-45 transition-transform duration-200 text-xl leading-none shrink-0 mt-0.5"
              aria-hidden
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-sm sm:text-base text-navy/55 leading-relaxed pr-8 max-w-2xl">{item.a}</p>
        </details>
      ))}
    </Reveal>
  );
}

export function FinalCta({
  title,
  subtitle,
  whatsappHref,
  primaryTo = '/register',
  primaryLabel = 'Start free',
  secondaryTo = '/login',
  secondaryLabel = 'Sign in',
}) {
  return (
    <section className="relative overflow-hidden bg-navy px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 20% 40%, rgba(15,118,110,0.35), transparent 55%), linear-gradient(135deg, #0A0F14, #0E141B 60%, #12202A)',
        }}
        aria-hidden
      />
      <div className="relative mx-auto max-w-6xl">
        <Reveal className="max-w-2xl">
          <p className="mkt-eyebrow text-brand-light/80 mb-5">Deploy</p>
          <h2 className="mkt-display text-3xl sm:text-4xl lg:text-5xl text-white">{title}</h2>
          <p className="mt-5 text-base sm:text-lg text-white/55 leading-relaxed">{subtitle}</p>
          <MarketingCtaGroup
            className="mt-10"
            primaryTo={primaryTo}
            primaryLabel={primaryLabel}
            secondaryTo={secondaryTo}
            secondaryLabel={secondaryLabel}
          />
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex text-sm font-semibold text-brand-light hover:text-white transition-colors duration-200"
            >
              Chat on WhatsApp →
            </a>
          )}
        </Reveal>
      </div>
    </section>
  );
}
