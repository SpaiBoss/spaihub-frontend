import { Link } from 'react-router-dom';
import {
  FinalCta,
  MarketingCtaGroupLight,
  MarketingHeading,
  MarketingSection,
} from '../../components/marketing/MarketingPrimitives';
import { usePublicConfig, whatsappUrl } from '../../hooks/usePublicConfig';

export default function Pricing() {
  const { platformFeePercent, contactWhatsApp } = usePublicConfig();
  const wa = whatsappUrl(contactWhatsApp, 'Hi — I have a question about Spai-Hub pricing.');
  const examplePrice = 1000;
  const feeXaf = Math.floor(examplePrice * (platformFeePercent / 100));
  const ownerXaf = examplePrice - feeXaf;

  return (
    <>
      <MarketingSection className="pt-14 sm:pt-20 pb-10">
        <MarketingHeading
          eyebrow="Pricing"
          title="Free to start. Transparent fee on MoMo sales."
          subtitle="No monthly tiers. You pay only when subscribers pay you through Campay."
        />
        <MarketingCtaGroupLight />
      </MarketingSection>

      <MarketingSection tone="muted" className="py-16 sm:py-20">
        <div className="max-w-2xl border-t border-navy/10 pt-10">
          <p className="mkt-eyebrow text-brand">Platform fee</p>
          <p className="mkt-display mt-4 text-6xl sm:text-7xl lg:text-8xl text-navy tracking-tight">
            {platformFeePercent}
            <span className="text-3xl sm:text-4xl text-navy/35 align-super ml-1">%</span>
          </p>
          <p className="mt-6 text-base text-navy/55 leading-relaxed max-w-xl">
            Taken from each successful Mobile Money sale. Your wallet receives the rest as owner credit. This
            percentage comes from live platform configuration — if we change it in production, this page updates
            automatically.
          </p>
          <ul className="mt-10 space-y-4 text-sm sm:text-base text-navy/70">
            <li className="flex gap-3">
              <span className="font-mono text-brand text-xs mt-1">01</span>
              Free owner registration and dashboard
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-brand text-xs mt-1">02</span>
              Locations, packages, vouchers, and MikroTik scripts included
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-brand text-xs mt-1">03</span>
              Voucher redemptions do not charge this fee (prepaid stock)
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-brand text-xs mt-1">04</span>
              Withdraw wallet balance to MTN or Orange MoMo
            </li>
          </ul>
        </div>
      </MarketingSection>

      <MarketingSection className="py-16 sm:py-20">
        <MarketingHeading
          title="Example on a 1,000 XAF package"
          subtitle="Numbers use the live platform fee above."
        />
        <div className="max-w-lg space-y-4 border-t border-navy/10 pt-8 text-sm sm:text-base">
          <div className="flex justify-between gap-4">
            <span className="text-navy/55">Subscriber pays</span>
            <span className="font-mono font-medium text-navy">{examplePrice.toLocaleString()} XAF</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-navy/55">Spai-Hub ({platformFeePercent}%)</span>
            <span className="font-mono font-medium text-navy">{feeXaf.toLocaleString()} XAF</span>
          </div>
          <div className="flex justify-between gap-4 border-t border-navy/10 pt-4">
            <span className="font-semibold text-navy">You receive</span>
            <span className="font-mono text-lg font-semibold text-brand">{ownerXaf.toLocaleString()} XAF</span>
          </div>
        </div>
        <p className="mt-10 text-sm text-navy/55">
          Questions about white-label or custom agreements?{' '}
          <Link to="/contact" className="text-brand font-semibold hover:text-brand-dark">
            Contact us
          </Link>
          .
        </p>
      </MarketingSection>

      <FinalCta
        title="Create your free account."
        subtitle="Connect MikroTik when you are ready — pricing stays this simple."
        whatsappHref={wa}
      />
    </>
  );
}
