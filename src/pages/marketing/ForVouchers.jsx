import { useTranslation } from 'react-i18next';
import Seo from '../../components/Seo';
import {
  FinalCta,
  MarketingHeading,
  MarketingSection,
} from '../../components/marketing/MarketingPrimitives';
import { usePublicConfig, whatsappUrl } from '../../hooks/usePublicConfig';

export default function ForVouchers() {
  const { t } = useTranslation('marketing');
  const { contactWhatsApp } = usePublicConfig();
  const wa = whatsappUrl(contactWhatsApp, t('waVouchers'));
  const items = t('forVouchers.items', { returnObjects: true });
  const cards = Array.isArray(items) ? items : [];

  return (
    <>
      <Seo title={t('forVouchers.seoTitle')} description={t('forVouchers.seoDescription')} />
      <MarketingSection className="pt-14 sm:pt-20 pb-10">
        <MarketingHeading
          eyebrow={t('forVouchers.eyebrow')}
          title={t('forVouchers.title')}
          subtitle={t('forVouchers.subtitle')}
        />
      </MarketingSection>

      <MarketingSection tone="muted" className="py-14 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 border-t border-gray-200 pt-8">
          {cards.map((item) => (
            <div key={item.t}>
              <h3 className="text-base font-semibold text-navy">{item.t}</h3>
              <p className="mt-2 text-sm text-navy/55 leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </MarketingSection>

      <FinalCta
        title={t('forVouchers.ctaTitle')}
        subtitle={t('forVouchers.ctaSubtitle')}
        whatsappHref={wa}
      />
    </>
  );
}
