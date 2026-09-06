import { Link } from 'react-router-dom';
import {
  FeatureGrid,
  FinalCta,
  MarketingHeading,
  MarketingSection,
} from '../../components/marketing/MarketingPrimitives';
import { usePublicConfig, whatsappUrl } from '../../hooks/usePublicConfig';

const GROUPS = [
  {
    title: 'Sell access',
    items: [
      {
        title: 'Campay Mobile Money',
        body: 'MTN and Orange collect on the captive portal. Username and PIN appear when Campay confirms.',
      },
      {
        title: 'Voucher batches',
        body: 'Generate codes with PINs, export PDF layouts, revoke unused or redeemed stock when needed.',
      },
      {
        title: 'Time and data packages',
        body: 'Browse periods or download caps, upload speed for owners, family shared-device limits.',
      },
    ],
  },
  {
    title: 'Run the network',
    items: [
      {
        title: 'MikroTik heartbeat',
        body: 'Know when a location is online, degraded, or offline from the owner dashboard.',
      },
      {
        title: 'Command grants and kicks',
        body: 'Access is provisioned and expired sessions are kicked through router schedulers.',
      },
      {
        title: 'Portal branding',
        body: 'Logo, accent color, and welcome text so the captive page matches your site name.',
      },
    ],
  },
  {
    title: 'Get paid cleanly',
    items: [
      {
        title: 'Owner wallet',
        body: 'MoMo sales credit your balance after the platform fee. Withdraw to MoMo when you need cash.',
      },
      {
        title: 'Payment recovery',
        body: 'Pending payments survive reloads; cancel checks Campay first so orphan SUCCESS does not leak.',
      },
      {
        title: 'Admin reconcile',
        body: 'Platform tools to verify Campay status on stuck payments and withdrawals.',
      },
    ],
  },
];

export default function Features() {
  const { contactWhatsApp } = usePublicConfig();
  const wa = whatsappUrl(contactWhatsApp, 'Hi — I have a question about Spai-Hub features.');

  return (
    <>
      <MarketingSection className="pt-14 sm:pt-20 pb-10">
        <MarketingHeading
          eyebrow="Features"
          title="Everything you need to sell hotspot internet."
          subtitle="Payments, vouchers, MikroTik control, and payouts — without bolting on three other tools."
        />
        <div className="flex flex-wrap gap-3 text-sm">
          <Link to="/for/mobile-money" className="text-brand font-medium hover:text-brand-dark">
            Mobile Money →
          </Link>
          <Link to="/for/vouchers" className="text-brand font-medium hover:text-brand-dark">
            Vouchers →
          </Link>
          <Link to="/for/mikrotik" className="text-brand font-medium hover:text-brand-dark">
            MikroTik →
          </Link>
        </div>
      </MarketingSection>

      {GROUPS.map((group, i) => (
        <MarketingSection key={group.title} tone={i % 2 === 0 ? 'muted' : 'white'} className="py-14 sm:py-16">
          <MarketingHeading title={group.title} />
          <FeatureGrid items={group.items} />
        </MarketingSection>
      ))}

      <FinalCta
        title="See it on your own MikroTik."
        subtitle="Start free, paste the connection scripts, and sell your first package."
        whatsappHref={wa}
      />
    </>
  );
}
