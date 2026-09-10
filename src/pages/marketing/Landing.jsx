import { Link } from 'react-router-dom';
import {
  Wallet,
  Ticket,
  Router,
  MapPin,
  Smartphone,
  ShieldCheck,
  Radio,
  Terminal,
  Activity,
} from 'lucide-react';
import BrandLogo from '../../components/BrandLogo';
import Reveal from '../../components/marketing/Reveal';
import {
  FaqList,
  FeatureGrid,
  FinalCta,
  MarketingCtaGroup,
  MarketingHeading,
  MarketingSection,
  NightTimeline,
  ProductBoard,
  SectionDivider,
  TestimonialGrid,
} from '../../components/marketing/MarketingPrimitives';
import { usePublicConfig, whatsappUrl } from '../../hooks/usePublicConfig';

const NIGHT_EVENTS = [
  {
    time: '00:47',
    title: 'Voucher sold in Douala',
    detail: 'Campay MoMo approved. PIN delivered on the portal instantly.',
    tag: 'Mobile Money',
  },
  {
    time: '00:48',
    title: 'Hotspot user granted on MikroTik',
    detail: 'SpaiHub queued GRANT_ACCESS. The Hex polled and imported within seconds.',
    tag: 'MikroTik',
  },
  {
    time: '02:15',
    title: 'Router heartbeat — still online',
    detail: 'Your location stayed green while you slept. A silent router would have shown offline.',
    tag: 'Monitoring',
  },
  {
    time: '05:02',
    title: 'Family plan session still active',
    detail: 'Shared devices stayed online under the same access code.',
    tag: 'Sessions',
  },
  {
    time: '06:30',
    title: 'Wallet credited',
    detail: 'Owner share landed in the SpaiHub wallet, ready to withdraw to MoMo.',
    tag: 'Wallet',
  },
  {
    time: '07:00',
    title: 'You check the dashboard',
    detail: 'Sales, sessions, and router health — already totalled.',
    tag: 'Reports',
  },
];

const FEATURES = [
  {
    title: 'MoMo payments',
    body: 'Subscribers pay with MTN or Orange via Campay. Approve on the phone, get WiFi credentials instantly.',
    icon: Smartphone,
  },
  {
    title: 'Vouchers & PDFs',
    body: 'Print batches with PIN codes for cafés, hostels, and events. Revoke when you need to.',
    icon: Ticket,
  },
  {
    title: 'MikroTik commands',
    body: 'Heartbeat, grant, and kick run through schedulers on the router you already own.',
    icon: Terminal,
  },
  {
    title: 'Locations & packages',
    body: 'One location, one router. Time or data packages, family shared devices, your branding.',
    icon: MapPin,
  },
  {
    title: 'Wallet withdrawals',
    body: 'Earn from every MoMo sale. Withdraw to your Mobile Money number when you need cash.',
    icon: Wallet,
  },
  {
    title: 'Reliable sessions',
    body: 'Expiry kicks, payment recovery, and admin reconcile — so money and access stay aligned.',
    icon: ShieldCheck,
  },
];

const TESTIMONIALS = [
  {
    quote:
      'We stopped printing random vouchers in Excel. MoMo pays, the Hex gets the user, and the wallet updates.',
    name: 'Illustrative owner',
    role: 'Compound hotspot · Douala',
  },
  {
    quote:
      'Script two was the missing piece. Once commands polled, vouchers actually put people online.',
    name: 'Illustrative operator',
    role: 'Café WiFi · Yaoundé',
  },
  {
    quote:
      'Family packages sell themselves. One code, a few phones, one payout at the end of the week.',
    name: 'Illustrative host',
    role: 'Student hostel · Bamenda',
  },
];

const FAQ_TEASER = [
  {
    q: 'Do I need new hardware?',
    a: 'No. SpaiHub is built for MikroTik routers you already run. Paste the hotspot and connection scripts from the dashboard.',
  },
  {
    q: 'How do subscribers pay?',
    a: 'Through Campay on the captive portal — MTN MoMo or Orange Money. Vouchers work when cash still rules.',
  },
  {
    q: 'When do I get paid?',
    a: 'Each successful MoMo sale credits your SpaiHub wallet (minus the platform fee). Withdraw to MoMo from the dashboard.',
  },
];

const PROBLEMS = [
  {
    n: '01',
    t: 'Cash-only sales',
    d: 'No Campay flow means you miss night sales and walk-in MoMo.',
    icon: Wallet,
  },
  {
    n: '02',
    t: 'Router out of sync',
    d: 'Access codes that never hit MikroTik leave people “paid” but offline.',
    icon: Router,
  },
  {
    n: '03',
    t: 'Unclear payouts',
    d: 'Without a wallet and fee line, you cannot tell what you actually earned.',
    icon: Activity,
  },
];

const STEPS = [
  { n: '01', t: 'Connect MikroTik', d: 'Hotspot setup once, then the SpaiHub connection script.', icon: Router },
  { n: '02', t: 'Set packages', d: 'Time or data plans, family device limits, portal branding.', icon: Radio },
  { n: '03', t: 'Sell access', d: 'MoMo on the portal or printed vouchers with PINs.', icon: Ticket },
  { n: '04', t: 'Withdraw', d: 'Wallet balance to MTN or Orange when you need cash.', icon: Wallet },
];

export default function Landing() {
  const { platformFeePercent, contactWhatsApp } = usePublicConfig();
  const wa = whatsappUrl(contactWhatsApp, 'Hi — I want to learn about Spai-Hub for my hotspot.');

  return (
    <>
      <section className="relative min-h-[100dvh] min-h-[100svh] overflow-hidden text-white">
        <img
          src="/marketing/landing-hero.jpg"
          alt="WiFi vouchers, Mobile Money payment, and hotspot router on a shop counter"
          className="absolute inset-0 h-full w-full scale-[1.02] object-cover object-[78%_45%] sm:object-[82%_40%]"
        />
        {/* Hard left reading column so copy never fights the product photo */}
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(7,11,16,0.97) 0%, rgba(7,11,16,0.94) 28%, rgba(14,20,27,0.72) 48%, rgba(14,20,27,0.28) 68%, rgba(14,20,27,0.2) 100%)',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(7,11,16,0.55) 0%, transparent 38%), radial-gradient(ellipse 45% 40% at 85% 55%, rgba(15,118,110,0.22), transparent 70%)',
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex min-h-[100dvh] min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:justify-center sm:px-6 sm:pb-28 sm:pt-32 lg:px-8">
          <div className="max-w-[22rem] sm:max-w-md lg:max-w-lg">
            <div className="animate-hero-in" style={{ animationDelay: '40ms' }}>
              <p className="mkt-eyebrow text-brand-light/90 mb-5">Hotspot billing · Cameroon</p>
              <BrandLogo
                theme="dark"
                textClassName="text-[2.35rem] sm:text-5xl lg:text-6xl tracking-tight"
                className="mb-7 sm:mb-9"
              />
            </div>
            <h1
              className="mkt-display animate-hero-in text-[1.85rem] leading-[1.12] sm:text-[2.75rem] sm:leading-[1.08] lg:text-[3.35rem] text-white"
              style={{ animationDelay: '140ms' }}
            >
              Sell WiFi.
              <br />
              Get paid on MoMo.
              <br />
              <span className="text-brand-light">Then sleep.</span>
            </h1>
            <p
              className="mt-5 animate-hero-in text-sm sm:text-base text-white/65 leading-relaxed max-w-sm"
              style={{ animationDelay: '260ms' }}
            >
              Campay on the portal. Printed vouchers for walk-ins. Wallet out to MoMo — on the MikroTik you already run.
            </p>
            <div className="animate-hero-in" style={{ animationDelay: '380ms' }}>
              <MarketingCtaGroup className="mt-8 sm:mt-10" />
            </div>
          </div>
        </div>
      </section>

      <MarketingSection className="py-20 sm:py-28" dividerLabel="Signal">
        <MarketingHeading
          eyebrow="The problem"
          title="Manual vouchers and chasing MoMo are not a business."
          subtitle="Spreadsheet codes, offline routers, and unpaid sessions leak revenue. Spai-Hub replaces that stack for hotspot owners who sell internet by the hour or by the megabyte."
        />
        <div className="grid gap-12 sm:grid-cols-3 border-t border-navy/10 pt-10">
          {PROBLEMS.map((item, index) => {
            const Icon = item.icon;
            return (
              <Reveal key={item.t} delayMs={index * 70}>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs text-brand tracking-[0.2em]">{item.n}</p>
                  <span className="mkt-icon-frame border-navy/10">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                </div>
                <h3 className="mkt-display mt-4 text-xl sm:text-2xl text-navy">{item.t}</h3>
                <p className="mt-3 text-sm sm:text-base text-navy/55 leading-relaxed">{item.d}</p>
              </Reveal>
            );
          })}
        </div>
      </MarketingSection>

      <section className="relative overflow-hidden bg-navy px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div
          className="pointer-events-none absolute inset-0 opacity-80"
          style={{
            background:
              'radial-gradient(ellipse 60% 50% at 85% 10%, rgba(15,118,110,0.28), transparent 50%)',
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-6xl">
          <SectionDivider label="Ops" light className="mb-10 sm:mb-14" />
          <MarketingHeading
            light
            eyebrow="While you sleep"
            title="Your network worked the night shift."
            subtitle="Billing, grants, heartbeats, and wallet credits keep moving. This is a quiet Tuesday in Douala."
          />
          <NightTimeline events={NIGHT_EVENTS} />
        </div>
      </section>

      <MarketingSection tone="muted" className="py-20 sm:py-28" dividerLabel="Stack">
        <MarketingHeading
          eyebrow="Product"
          title="Built for how Cameroon hotspots actually sell."
          subtitle="Portal pay, printed vouchers, and MoMo withdrawals — not a generic ISP console."
        />
        <ProductBoard
          panels={[
            {
              title: 'Portal',
              lines: [
                { label: 'Status', value: 'Connected' },
                { label: 'Remaining', value: '1h 42m' },
                { label: 'Login', value: 'PIN ready' },
              ],
            },
            {
              title: 'Vouchers',
              lines: [
                { label: 'Batch', value: 'SPAI-….pdf' },
                { label: 'Unused', value: '48' },
                { label: 'Layout', value: '6-up' },
              ],
            },
            {
              title: 'Wallet',
              lines: [
                { label: 'Balance', value: '84,200 XAF' },
                { label: 'Fee', value: `${platformFeePercent}%` },
                { label: 'Withdraw', value: 'MoMo' },
              ],
            },
          ]}
        />
      </MarketingSection>

      <MarketingSection className="py-20 sm:py-28" dividerLabel="Protocol">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <MarketingHeading
            className="mb-0"
            eyebrow="How it works"
            title="From Hex to payout in four steps."
            subtitle="Add a location, paste two scripts, sell packages or vouchers, withdraw when you want."
          />
          <Link
            to="/how-it-works"
            className="text-sm font-semibold text-brand hover:text-brand-dark shrink-0 transition-colors duration-200"
          >
            Full walkthrough →
          </Link>
        </div>
        <ol className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4 border-t border-navy/10 pt-10">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.n} as="li" delayMs={index * 60}>
                <div className="flex items-start justify-between gap-3">
                  <p className="mkt-display text-4xl sm:text-5xl text-navy/[0.08] leading-none">{step.n}</p>
                  <span className="mkt-icon-frame border-navy/10 mt-1">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                </div>
                <h3 className="mkt-display mt-4 text-lg text-navy">{step.t}</h3>
                <p className="mt-2 text-sm text-navy/55 leading-relaxed">{step.d}</p>
              </Reveal>
            );
          })}
        </ol>
      </MarketingSection>

      <MarketingSection tone="muted" className="py-20 sm:py-28" dividerLabel="Capabilities">
        <MarketingHeading
          eyebrow="Capabilities"
          title="Everything that keeps a hotspot business running."
          subtitle="Payments, vouchers, MikroTik control, and payouts — without bolting on three other tools."
        />
        <FeatureGrid items={FEATURES} />
      </MarketingSection>

      <MarketingSection className="py-16 sm:py-20" dividerLabel="Uplink">
        <MarketingHeading
          eyebrow="Contributors"
          title="Grow capacity without another node."
          subtitle="Neighbors with spare Starlink or fiber can sell unused uplink into an existing SpaiHub hotspot. Local physical link — SpaiHub meters and pays."
        />
        <Link
          to="/for/contributors"
          className="font-mono text-xs tracking-wide text-brand font-medium hover:text-brand-dark transition-colors"
        >
          Contribute spare bandwidth →
        </Link>
      </MarketingSection>

      <MarketingSection className="py-20 sm:py-28" dividerLabel="Field notes">
        <MarketingHeading
          eyebrow="From the field"
          title="Operators who stopped improvising."
          subtitle="Composite stories based on how Spai-Hub is meant to be used — not paid endorsements."
        />
        <TestimonialGrid items={TESTIMONIALS} />
      </MarketingSection>

      <MarketingSection tone="muted" className="py-20 sm:py-28" dividerLabel="FAQ">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <MarketingHeading className="mb-0" eyebrow="FAQ" title="Short answers before you deploy." />
          <Link
            to="/faq"
            className="text-sm font-semibold text-brand hover:text-brand-dark transition-colors duration-200"
          >
            All FAQs →
          </Link>
        </div>
        <FaqList items={FAQ_TEASER} />
      </MarketingSection>

      <FinalCta
        title="Stand up billing on the routers you already own."
        subtitle={`Accounts are free. SpaiHub takes ${platformFeePercent}% of each MoMo sale.`}
        whatsappHref={wa}
      />
    </>
  );
}
