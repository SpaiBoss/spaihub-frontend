import { useTranslation } from 'react-i18next';
import Seo from '../../components/Seo';
import {
  FinalCta,
  MarketingHeading,
  MarketingSection,
} from '../../components/marketing/MarketingPrimitives';
import { usePublicConfig, whatsappUrl } from '../../hooks/usePublicConfig';

export default function ForMobileMoney() {
  const { t } = useTranslation('marketing');
  const { platformFeePercent, contactWhatsApp } = usePublicConfig();
  const wa = whatsappUrl(contactWhatsApp, t('waMoMo'));
  const items = t('forMoMo.items', { returnObjects: true });
  const cards = Array.isArray(items) ? items : [];

  return (
    <>
      <Seo title={t('forMoMo.seoTitle')} description={t('forMoMo.seoDescription')} />
      <MarketingSection className="pt-14 sm:pt-20 pb-10">
        <MarketingHeading
          eyebrow={t('forMoMo.eyebrow')}
          title={t('forMoMo.title')}
          subtitle={t('forMoMo.subtitle', { fee: platformFeePercent })}
        />
      </MarketingSection>

      <MarketingSection tone="muted" className="py-14 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-3 border-t border-gray-200 pt-8">
          {cards.map((item) => (
            <div key={item.t}>
              <h3 className="text-base font-semibold text-navy">{item.t}</h3>
              <p className="mt-2 text-sm text-navy/55 leading-relaxed">{item.d}</p>
            </div>
          ))}
        </div>
      </MarketingSection>

      <MarketingSection className="py-14 sm:py-16">
        <MarketingHeading
          title={t('forMoMo.cameroonTitle')}
          subtitle={t('forMoMo.cameroonSubtitle')}
        />
      </MarketingSection>

      <FinalCta
        title={t('forMoMo.ctaTitle')}
        subtitle={t('forMoMo.ctaSubtitle')}
        whatsappHref={wa}
      />
    </>
  );
}
