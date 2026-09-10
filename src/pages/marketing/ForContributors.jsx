import { Link } from 'react-router-dom';
import {
  FinalCta,
  MarketingHeading,
  MarketingSection,
} from '../../components/marketing/MarketingPrimitives';
import { usePublicConfig, whatsappUrl } from '../../hooks/usePublicConfig';

export default function ForContributors() {
  const { contactWhatsApp } = usePublicConfig();
  const wa = whatsappUrl(contactWhatsApp, 'Hi — I want to contribute spare uplink near a SpaiHub hotspot.');

  return (
    <>
      <MarketingSection className="pt-14 sm:pt-20 pb-10" dividerLabel="Uplink">
        <MarketingHeading
          eyebrow="Contributors"
          title="Spare bandwidth. Local link. Credit on MoMo."
          subtitle="If you have unused capacity on Starlink, Camtel fiber, or any connection near a SpaiHub hotspot, you can sell the excess — without running a hotspot business yourself."
        />
        <Link
          to="/contributor/register"
          className="font-mono text-xs tracking-wide text-brand font-medium hover:text-brand-dark transition-colors"
        >
          Create contributor account →
        </Link>
      </MarketingSection>

      <MarketingSection tone="muted" className="py-14 sm:py-16" dividerLabel="Physical">
        <div className="grid gap-10 sm:grid-cols-3">
          <div>
            <h3 className="mkt-display text-base text-navy">Your side stays simple</h3>
            <p className="mt-2 text-sm text-navy/55 leading-relaxed">
              A cheap dumb switch on your LAN. One port for your devices, one port for the line to the hotspot —
              cable if close, outdoor wireless bridge if you have line of sight.
            </p>
          </div>
          <div>
            <h3 className="mkt-display text-base text-navy">SpaiHub installs the rest</h3>
            <p className="mt-2 text-sm text-navy/55 leading-relaxed">
              A technician lands your link on a dedicated port of the hotspot MikroTik, sets the rate cap you
              agreed, and monitors usage. You do not touch RouterOS.
            </p>
          </div>
          <div>
            <h3 className="mkt-display text-base text-navy">Earn by the gigabyte</h3>
            <p className="mt-2 text-sm text-navy/55 leading-relaxed">
              We meter what we actually pull under your cap. Your dashboard shows throughput, cap vs use, and
              cumulative GB — then withdraw to MoMo when you want.
            </p>
          </div>
        </div>
      </MarketingSection>

      <MarketingSection className="py-14 sm:py-16" dividerLabel="Trust">
        <MarketingHeading
          title="Not a VPN tunnel. Not cloud relay."
          subtitle="Contribution is a local physical link into the hotspot router. That keeps latency low and avoids shipping user traffic through the cloud. Capacity is bonus layer for the site — not a promise to end users."
        />
        <p className="text-sm text-navy/50 max-w-2xl leading-relaxed">
          Check your ISP terms before joining. Consumer plans (including Starlink) may restrict resale. SpaiHub
          treats contributor uplinks as opportunistic capacity.
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
