import { Link } from 'react-router-dom';
import { Cable, Gauge, Wallet } from 'lucide-react';
import BrandLogo from '../../components/BrandLogo';
import Reveal from '../../components/marketing/Reveal';
import {
  FinalCta,
  MarketingCtaGroup,
  MarketingHeading,
  MarketingSection,
} from '../../components/marketing/MarketingPrimitives';
import { usePublicConfig, whatsappUrl } from '../../hooks/usePublicConfig';

const STEPS = [
  {
    title: 'Your side stays simple',
    body: 'A cheap dumb switch on your LAN. One port for your devices, one port for the line to the hotspot — cable if close, outdoor wireless bridge if you have line of sight.',
    icon: Cable,
  },
  {
    title: 'SpaiHub installs the rest',
    body: 'A technician lands your link on a dedicated port of the hotspot MikroTik, sets the rate cap you agreed, and monitors usage. You do not touch RouterOS.',
    icon: Gauge,
  },
  {
    title: 'Earn by the gigabyte',
    body: 'We meter what we actually pull under your cap. Your dashboard shows throughput, cap vs use, and cumulative GB — then withdraw to MoMo when you want.',
    icon: Wallet,
  },
];

export default function ForContributors() {
  const { contactWhatsApp } = usePublicConfig();
  const wa = whatsappUrl(contactWhatsApp, 'Hi — I want to contribute spare uplink near a SpaiHub hotspot.');

  return (
    <>
      <section className="relative min-h-[88dvh] min-h-[88svh] overflow-hidden text-white">
        <img
          src="/marketing/contributor-hero.jpg"
          alt="Network engineer configuring routers, switches, and cables for a SpaiHub uplink"
          className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(7,11,16,0.92) 0%, rgba(14,20,27,0.78) 42%, rgba(14,20,27,0.45) 68%, rgba(14,20,27,0.55) 100%), linear-gradient(to top, rgba(7,11,16,0.75) 0%, transparent 42%)',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(ellipse 50% 45% at 75% 30%, rgba(15,118,110,0.35), transparent 60%)',
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex min-h-[88dvh] min-h-[88svh] max-w-6xl flex-col justify-end px-4 pb-14 pt-28 sm:justify-center sm:px-6 sm:pb-24 sm:pt-32 lg:px-8">
          <div className="max-w-xl">
            <div className="animate-hero-in" style={{ animationDelay: '40ms' }}>
              <p className="mkt-eyebrow text-brand-light/85 mb-4">Contributors · Cameroon</p>
              <BrandLogo theme="dark" textClassName="text-3xl sm:text-5xl" className="mb-5 sm:mb-8" />
            </div>
            <h1
              className="mkt-display animate-hero-in text-[2.1rem] leading-[1.08] sm:text-5xl sm:leading-[1.05] lg:text-[3.4rem] text-white"
              style={{ animationDelay: '140ms' }}
            >
              Spare bandwidth.
              <br />
              Local link.
              <br />
              <span className="text-brand-light">Credit on MoMo.</span>
            </h1>
            <p
              className="mt-4 sm:mt-6 animate-hero-in text-[0.95rem] sm:text-lg text-white/70 leading-relaxed max-w-md"
              style={{ animationDelay: '260ms' }}
            >
              Sell unused Starlink, fiber, or any home connection to a nearby SpaiHub hotspot — without running the hotspot yourself.
            </p>
            <div className="animate-hero-in" style={{ animationDelay: '380ms' }}>
              <MarketingCtaGroup
                className="mt-7 sm:mt-9"
                primaryTo="/contributor/register"
                primaryLabel="Create contributor account"
                secondaryTo="/contributor/login"
                secondaryLabel="Sign in"
              />
            </div>
          </div>
        </div>
      </section>

      <MarketingSection tone="muted" className="py-16 sm:py-20" dividerLabel="Physical">
        <MarketingHeading
          eyebrow="How it works"
          title="Plug a switch. We handle the rest."
          subtitle="Same neighborhood internet you already pay for — a second port becomes the line SpaiHub meters and pays for."
        />
        <div className="grid gap-10 sm:grid-cols-3 border-t border-navy/10 pt-10">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delayMs={index * 70}>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs text-brand tracking-[0.2em]">0{index + 1}</p>
                  <span className="mkt-icon-frame border-navy/10">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                </div>
                <h3 className="mkt-display mt-4 text-xl text-navy">{step.title}</h3>
                <p className="mt-3 text-sm sm:text-base text-navy/55 leading-relaxed">{step.body}</p>
              </Reveal>
            );
          })}
        </div>
      </MarketingSection>

      <MarketingSection className="py-14 sm:py-16" dividerLabel="Trust">
        <MarketingHeading
          title="Not a VPN tunnel. Not cloud relay."
          subtitle="Contribution is a local physical link into the hotspot router. That keeps latency low and avoids shipping user traffic through the cloud. Capacity is bonus layer for the site — not a promise to end users."
        />
        <p className="text-sm text-navy/50 max-w-2xl leading-relaxed">
          Check your ISP terms before joining. Consumer plans (including Starlink) may restrict resale. SpaiHub
          treats contributor uplinks as opportunistic capacity.{' '}
          <Link to="/faq" className="text-brand font-medium hover:text-brand-dark">
            Read the FAQ →
          </Link>
        </p>
      </MarketingSection>

      <FinalCta
        title="Ready to contribute?"
        subtitle="Create a contributor account. SpaiHub will match you to a nearby site and handle the physical link."
        primaryTo="/contributor/register"
        primaryLabel="Create contributor account"
        secondaryTo="/contributor/login"
        secondaryLabel="Contributor sign in"
        whatsappHref={wa}
      />
    </>
  );
}
