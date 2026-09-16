import { useTranslation } from 'react-i18next';
import Seo from '../../components/Seo';
import { LocaleLink } from '../../components/LocaleLink';
import {
  FaqList,
  FinalCta,
  MarketingHeading,
  MarketingSection,
} from '../../components/marketing/MarketingPrimitives';
import { usePublicConfig, whatsappUrl } from '../../hooks/usePublicConfig';
import { getMarketingFaq } from './faqData';

export default function Faq() {
  const { t } = useTranslation('marketing');
  const { platformFeePercent, contactWhatsApp } = usePublicConfig();
  const wa = whatsappUrl(contactWhatsApp, t('waFaq'));
  const items = getMarketingFaq(t, platformFeePercent);

  return (
    <>
      <Seo title={t('faq.seoTitle')} description={t('faq.seoDescription')} />
      <MarketingSection className="pt-14 sm:pt-20 pb-10">
        <MarketingHeading
          eyebrow={t('faq.eyebrow')}
          title={t('faq.title')}
          subtitle={t('faq.subtitle')}
        />
        <FaqList items={items} />
      </MarketingSection>

      <FinalCta
        title={t('faq.ctaTitle')}
        subtitle={
          <>
            {t('faq.ctaSubtitle')}{' '}
            <LocaleLink to="/help" className="font-semibold text-brand-light hover:text-white">
              {t('faq.helpLink')}
            </LocaleLink>
          </>
        }
        whatsappHref={wa}
      />
    </>
  );
}
