import { Link } from 'react-router-dom';
import {
  Smartphone,
  Ticket,
  Package,
  Activity,
  Terminal,
  Palette,
  Wallet,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
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
        icon: Smartphone,
      },
      {
        title: 'Voucher batches',
        body: 'Generate codes with PINs, export PDF layouts, revoke unused or redeemed stock when needed.',
        icon: Ticket,
      },
      {
        title: 'Time and data packages',
        body: 'Browse periods or download caps, upload speed for owners, family shared-device limits.',
        icon: Package,
      },
    ],
  },
  {
    title: 'Run the network',
    items: [
      {
        title: 'MikroTik heartbeat',
        body: 'Know when a location is online, degraded, or offline from the owner dashboard.',
        icon: Activity,
      },
      {
        title: 'Command grants and kicks',
        body: 'Access is provisioned and expired sessions are kicked through router schedulers.',
        icon: Terminal,
      },
      {
        title: 'Portal branding',
        body: 'Logo, accent color, and welcome text so the captive page matches your site name.',
        icon: Palette,
      },
    ],
  },
  {
    title: 'Get paid cleanly',
    items: [
      {
        title: 'Owner wallet',
        body: 'MoMo sales credit your balance after the platform fee. Withdraw to MoMo when you need cash.',
        icon: Wallet,
      },
      {
        title: 'Payment recovery',
        body: 'Pending payments survive reloads; cancel checks Campay first so orphan SUCCESS does not leak.',
        icon: RefreshCw,
      },
      {
        title: 'Admin reconcile',
        body: 'Platform tools to verify Campay status on stuck payments and withdrawals.',
        icon: ShieldCheck,
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
          <Link
            to="/for/mobile-money"
            className="font-mono text-xs tracking-wide text-brand font-medium hover:text-brand-dark transition-colors"
          >
            Mobile Money →
          </Link>
          <Link
            to="/for/vouchers"
            className="font-mono text-xs tracking-wide text-brand font-medium hover:text-brand-dark transition-colors"
          >
            Vouchers →
          </Link>
          <Link
            to="/for/mikrotik"
            className="font-mono text-xs tracking-wide text-brand font-medium hover:text-brand-dark transition-colors"
          >
            MikroTik →
          </Link>
          <Link
            to="/for/contributors"
            className="font-mono text-xs tracking-wide text-brand font-medium hover:text-brand-dark transition-colors"
          >
            Contributors →
          </Link>
        </div>
      </MarketingSection>

      {GROUPS.map((group) => (
        <MarketingSection key={group.title} className="pb-16 sm:pb-20">
          <FeatureGrid items={group.items} />
        </MarketingSection>
      ))}

      <FinalCta
        title="See it on your own Hex."
        subtitle="Create a free account, connect your MikroTik, and start selling."
        whatsappHref={wa}
      />
    </>
  );
}
