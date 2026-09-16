import { useTranslation } from 'react-i18next';
import Seo from '../../components/Seo';
import { LocaleLink } from '../../components/LocaleLink';
import {
  FinalCta,
  MarketingHeading,
  MarketingSection,
} from '../../components/marketing/MarketingPrimitives';
import { usePublicConfig, whatsappUrl } from '../../hooks/usePublicConfig';

export default function ForMikrotik() {
  const { t } = useTranslation('marketing');
  const { contactWhatsApp } = usePublicConfig();
  const wa = whatsappUrl(contactWhatsApp, t('waMikrotik'));

  return (
    <>
      <Seo title={t('forMikrotik.seoTitle')} description={t('forMikrotik.seoDescription')} />
      <MarketingSection className="pt-14 sm:pt-20 pb-10">
        <MarketingHeading
          eyebrow={t('forMikrotik.eyebrow')}
          title={t('forMikrotik.title')}
          subtitle={t('forMikrotik.subtitle')}
        />
        <LocaleLink to="/how-it-works" className="font-mono text-xs tracking-wide text-brand font-medium hover:text-brand-dark transition-colors">
          {t('forMikrotik.setupLink')}
        </LocaleLink>
      </MarketingSection>

      <MarketingSection tone="muted" className="py-14 sm:py-16">
        <div className="grid gap-10 sm:grid-cols-2">
          <div>
            <h3 className="mkt-display text-base text-navy">{t('forMikrotik.s1')}</h3>
            <p className="mt-2 text-sm text-navy/55 leading-relaxed">
              {t('forMikrotik.s1b')}
            </p>
          </div>
          <div>
            <h3 className="mkt-display text-base text-navy">{t('forMikrotik.s2')}</h3>
            <p className="mt-2 text-sm text-navy/55 leading-relaxed">
              {t('forMikrotik.s2b')}
            </p>
          </div>
        </div>
      </MarketingSection>

      <MarketingSection className="py-14 sm:py-16">
        <MarketingHeading
          title={t('forMikrotik.onlineTitle')}
          subtitle={t('forMikrotik.onlineSub')}
        />
      </MarketingSection>

      <FinalCta
        title={t('forMikrotik.ctaTitle')}
        subtitle={t('forMikrotik.ctaSub')}
        whatsappHref={wa}
      />
    </>
  );
}
