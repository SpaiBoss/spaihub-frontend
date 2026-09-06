import {
  FinalCta,
  MarketingHeading,
  MarketingSection,
} from '../../components/marketing/MarketingPrimitives';
import { usePublicConfig, whatsappUrl } from '../../hooks/usePublicConfig';

export default function ForVouchers() {
  const { contactWhatsApp } = usePublicConfig();
  const wa = whatsappUrl(contactWhatsApp, 'Hi — I want to use Spai-Hub vouchers.');

  return (
    <>
      <MarketingSection className="pt-14 sm:pt-20 pb-10">
        <MarketingHeading
          eyebrow="Vouchers"
          title="Print codes. Sell cash. Redeem on the portal."
          subtitle="Batch generate vouchers with PINs, export PDF sheets for cafés and events, revoke when stock must stop working."
        />
      </MarketingSection>

      <MarketingSection tone="muted" className="py-14 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 border-t border-gray-200 pt-8">
          {[
            {
              t: 'Code + PIN',
              d: 'Each voucher is a hotspot username with a six-digit PIN. Redeem on the captive portal.',
            },
            {
              t: 'PDF layouts',
              d: 'Multiple tickets per page for printing. Paginate large batches without drowning the browser.',
            },
            {
              t: 'Shared devices',
              d: 'Packages can allow more than one phone. Disconnect one device or end the session for all.',
            },
            {
              t: 'Revoke safely',
              d: 'Unused or redeemed vouchers can be revoked; active sessions are kicked when you pull the plug.',
            },
            {
              t: 'Location scoped',
              d: 'A voucher only works at the location it was created for — no roaming codes across sites.',
            },
            {
              t: 'No MoMo fee on redeem',
              d: 'You already took cash offline. Redeem does not charge the platform MoMo percentage.',
            },
          ].map((item) => (
            <div key={item.t}>
              <h3 className="text-base font-semibold text-navy">{item.t}</h3>
              <p className="mt-2 text-sm text-navy/55 leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </MarketingSection>

      <FinalCta
        title="Print your first batch."
        subtitle="Create a location package, generate vouchers, and export PDF from the dashboard."
        whatsappHref={wa}
      />
    </>
  );
}
