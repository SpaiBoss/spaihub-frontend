import { Link } from 'react-router-dom';

export function MarketingSection({ children, className = '', id, tone = 'light' }) {
  const toneClass =
    tone === 'dark'
      ? 'bg-navy text-white'
      : tone === 'muted'
        ? 'bg-surface-muted'
        : 'bg-white';

  return (
    <section id={id} className={`relative px-4 sm:px-6 lg:px-8 ${toneClass} ${className}`}>
      <div className="relative mx-auto w-full max-w-6xl">{children}</div>
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
    <div className={`max-w-3xl ${marginClass} ${alignClass} ${className}`}>
      {eyebrow && <p className={`mkt-eyebrow mb-4 ${eyeColor}`}>{eyebrow}</p>}
      <h2 className={`mkt-display text-3xl sm:text-4xl lg:text-[2.75rem] ${titleColor}`}>{title}</h2>
      {subtitle && <p className={`mt-4 text-base sm:text-lg leading-relaxed max-w-2xl ${subColor}`}>{subtitle}</p>}
    </div>
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
        className="inline-flex items-center justify-center rounded-lg bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        {primaryLabel}
      </Link>
      <Link
        to={secondaryTo}
        className="inline-flex items-center justify-center rounded-lg border border-white/20 bg-transparent px-6 py-3.5 text-sm font-semibold text-white/90 transition-colors hover:border-white/40 hover:bg-white/[0.06]"
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
        className="inline-flex items-center justify-center rounded-lg bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-brand-dark"
      >
        {primaryLabel}
      </Link>
      <Link
        to={secondaryTo}
        className="inline-flex items-center justify-center rounded-lg border border-navy/15 bg-transparent px-6 py-3.5 text-sm font-semibold text-navy transition-colors hover:border-navy/30 hover:bg-navy/[0.03]"
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
        className="absolute -inset-[12%] opacity-[0.14] animate-drift"
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
        <circle cx="520" cy="300" r="56" className="animate-pulse-soft" fill="currentColor" opacity="0.45" />
        {[100, 175, 260, 360, 470, 590].map((r, i) => (
          <circle
            key={r}
            cx="520"
            cy="300"
            r={r}
            stroke="currentColor"
            strokeWidth={i < 2 ? 1.75 : 1.15}
            opacity={0.7 - i * 0.09}
            className="origin-[520px_300px] animate-signal-ring"
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
      <div className="relative hidden lg:block">
        <p className="mkt-eyebrow text-brand-light/80">Douala · local</p>
        <p className="mkt-display mt-4 text-[4.5rem] leading-none text-white/90 tabular-nums">
          02<span className="text-brand-light animate-pulse-soft">:</span>15
        </p>
        <p className="mt-4 max-w-xs text-sm text-white/45 leading-relaxed">
          Heartbeat green. Commands polling. Wallet waiting for morning.
        </p>
        <div className="mt-10 h-px w-24 bg-gradient-to-r from-brand to-transparent" />
      </div>

      <ol className="relative border-l border-white/12 ml-1 sm:ml-2">
        {events.map((event, index) => (
          <li
            key={`${event.time}-${event.title}`}
            className="relative pl-8 sm:pl-10 pb-9 last:pb-0 animate-slide-up opacity-0 [animation-fill-mode:forwards]"
            style={{ animationDelay: `${120 + index * 90}ms` }}
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
          </li>
        ))}
      </ol>
    </div>
  );
}

export function FeatureGrid({ items }) {
  return (
    <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, index) => (
        <div key={item.title} className="border-t border-navy/10 pt-6">
          <p className="font-mono text-[11px] text-brand/80 tracking-widest">
            {String(index + 1).padStart(2, '0')}
          </p>
          <h3 className="mkt-display mt-3 text-xl text-navy">{item.title}</h3>
          <p className="mt-3 text-sm text-navy/55 leading-relaxed">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

/** Product strip — not a card grid; one continuous ops board. */
export function ProductBoard({ panels }) {
  return (
    <div className="overflow-hidden rounded-lg border border-navy/10 bg-navy text-white">
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
    </div>
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
      {items.map((item) => (
        <blockquote key={item.name} className="border-t border-navy/10 pt-6">
          <p className="text-base text-navy/75 leading-relaxed tracking-tight">&ldquo;{item.quote}&rdquo;</p>
          <footer className="mt-6">
            <p className="text-sm font-semibold text-navy">{item.name}</p>
            <p className="font-mono text-[11px] text-navy/40 mt-1 tracking-wide">{item.role}</p>
          </footer>
        </blockquote>
      ))}
    </div>
  );
}

export function FaqList({ items }) {
  return (
    <div className="divide-y divide-navy/10 border-t border-b border-navy/10">
      {items.map((item) => (
        <details key={item.q} className="group py-6">
          <summary className="cursor-pointer list-none flex items-start justify-between gap-4 text-left text-base sm:text-lg font-semibold text-navy tracking-tight [&::-webkit-details-marker]:hidden">
            <span>{item.q}</span>
            <span
              className="text-brand/70 group-open:rotate-45 transition-transform text-xl leading-none shrink-0 mt-0.5"
              aria-hidden
            >
              +
            </span>
          </summary>
          <p className="mt-3 text-sm sm:text-base text-navy/55 leading-relaxed pr-8 max-w-2xl">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function FinalCta({ title, subtitle, whatsappHref }) {
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
        <div className="max-w-2xl">
          <h2 className="mkt-display text-3xl sm:text-4xl lg:text-5xl text-white">{title}</h2>
          <p className="mt-5 text-base sm:text-lg text-white/55 leading-relaxed">{subtitle}</p>
          <MarketingCtaGroup className="mt-10" />
          {whatsappHref && (
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex text-sm font-semibold text-brand-light hover:text-white transition-colors"
            >
              Chat on WhatsApp →
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
