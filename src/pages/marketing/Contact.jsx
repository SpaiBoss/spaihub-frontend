import { useTranslation } from 'react-i18next';
import Seo from '../../components/Seo';
import { LocaleLink } from '../../components/LocaleLink';
import {
  MarketingCtaGroupLight,
  MarketingHeading,
  MarketingSection,
} from '../../components/marketing/MarketingPrimitives';
import { usePublicConfig, whatsappUrl } from '../../hooks/usePublicConfig';

export default function Contact() {
  const { t } = useTranslation('marketing');
  const { contactWhatsApp } = usePublicConfig();
  const wa = whatsappUrl(contactWhatsApp, t('waContact'));

  return (
    <>
      <Seo title={t('contact.seoTitle')} description={t('contact.seoDescription')} />
      <MarketingSection className="pt-14 sm:pt-20 pb-16 sm:pb-20">
        <MarketingHeading
          eyebrow={t('contact.eyebrow')}
          title={t('contact.title')}
          subtitle={t('contact.subtitle')}
        />
        <LocaleLink
          to="/help"
          className="mb-8 inline-block font-mono text-xs tracking-wide text-brand font-medium hover:text-brand-dark transition-colors"
        >
          {t('contact.helpLink')}
        </LocaleLink>

        {wa ? (
          <div className="max-w-md space-y-4">
            <a
              href={wa}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-lg bg-brand px-6 py-3.5 text-sm font-medium text-white transition-colors hover:bg-brand-dark"
            >
              {t('contact.openWa')}
            </a>
            <p className="text-sm text-navy/50">
              {t('contact.preferEmail')}{' '}
              <a
                href="https://www.spaitrace.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand font-medium hover:text-brand-dark"
              >
                www.spaitrace.com
              </a>
            </p>
          </div>
        ) : (
          <div className="max-w-md space-y-4">
            <p className="text-sm text-navy/60 leading-relaxed">
              {t('contact.noWaBefore')}{' '}
              <a
                href="https://www.spaitrace.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand font-medium hover:text-brand-dark"
              >
                www.spaitrace.com
              </a>{' '}
              {t('contact.noWaAfter')}
            </p>
            <MarketingCtaGroupLight />
          </div>
        )}
      </MarketingSection>
    </>
  );
}
