import {
  FaqList,
  FinalCta,
  MarketingHeading,
  MarketingSection,
} from '../../components/marketing/MarketingPrimitives';
import { usePublicConfig, whatsappUrl } from '../../hooks/usePublicConfig';
import { MARKETING_FAQ } from './faqData';

export default function Faq() {
  const { platformFeePercent, contactWhatsApp } = usePublicConfig();
  const wa = whatsappUrl(contactWhatsApp, 'Hi — I have a Spai-Hub question.');

  const items = MARKETING_FAQ.map((item) =>
    item.q === 'Is there a subscription fee?'
      ? {
          ...item,
          a: `Creating an account is free. SpaiHub currently takes ${platformFeePercent}% of each successful MoMo sale (shown live from platform configuration).`,
        }
      : item
  );

  return (
    <>
      <MarketingSection className="pt-14 sm:pt-20 pb-10">
        <MarketingHeading
          eyebrow="FAQ"
          title="Everything owners usually ask."
          subtitle="Hardware, MoMo, fees, and what to do when a router goes quiet."
        />
        <FaqList items={items} />
      </MarketingSection>

      <FinalCta
        title="Still stuck?"
        subtitle="Message us on WhatsApp or start a free account and explore the dashboard."
        whatsappHref={wa}
      />
    </>
  );
}
