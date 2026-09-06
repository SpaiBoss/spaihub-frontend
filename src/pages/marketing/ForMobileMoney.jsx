import {
  FinalCta,
  MarketingHeading,
  MarketingSection,
} from '../../components/marketing/MarketingPrimitives';
import { usePublicConfig, whatsappUrl } from '../../hooks/usePublicConfig';

export default function ForMobileMoney() {
  const { platformFeePercent, contactWhatsApp } = usePublicConfig();
  const wa = whatsappUrl(contactWhatsApp, 'Hi — I have a question about MoMo on Spai-Hub.');

  return (
    <>
      <MarketingSection className="pt-14 sm:pt-20 pb-10">
        <MarketingHeading
          eyebrow="Mobile Money"
          title="Campay collects. SpaiHub opens WiFi."
          subtitle={`Subscribers enter a Cameroon MTN or Orange number, approve MoMo, and receive hotspot credentials. Platform fee on successful sales: ${platformFeePercent}%.`}
        />
      </MarketingSection>

      <MarketingSection tone="muted" className="py-14 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-3 border-t border-gray-200 pt-8">
          {[
            {
              t: 'Pay on the portal',
              d: 'Package + phone → Campay prompt. Username is the phone; PIN is generated for MikroTik.',
            },
            {
              t: 'Survive reloads',
              d: 'Pending payments resume after refresh. Cancel checks Campay first so late SUCCESS still grants access.',
            },
            {
              t: 'Wallet credit',
              d: 'Owner share lands in SpaiHub. Withdraw to MoMo when you need cash out.',
            },
          ].map((item) => (
            <div key={item.t}>
              <h3 className="text-base font-semibold text-navy">{item.t}</h3>
              <p className="mt-2 text-sm text-navy/55 leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection className="py-14 sm:py-16">
        <MarketingHeading
          title="Designed for Cameroon numbers."
          subtitle="Local validation for MTN and Orange prefixes. Campay handles the money movement; SpaiHub keeps session and wallet state aligned."
        />
      </MarketingSection>

      <FinalCta
        title="Sell your next package on MoMo."
        subtitle="Start free and connect Campay through your SpaiHub deployment."
        whatsappHref={wa}
      />
    </>
  );
}
