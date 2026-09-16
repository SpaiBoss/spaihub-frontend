import { useTranslation } from 'react-i18next';
import Seo from '../../components/Seo';
import { LocaleLink } from '../../components/LocaleLink';
import {
  FinalCta,
  MarketingCtaGroupLight,
  MarketingHeading,
  MarketingSection,
} from '../../components/marketing/MarketingPrimitives';
import { usePublicConfig, whatsappUrl } from '../../hooks/usePublicConfig';

export default function Pricing() {
  const { t } = useTranslation('marketing');
  const { platformFeePercent, contactWhatsApp } = usePublicConfig();
  const wa = whatsappUrl(contactWhatsApp, t('waPricing'));
  const examplePrice = 1000;
  const feeXaf = Math.floor(examplePrice * (platformFeePercent / 100));
  const ownerXaf = examplePrice - feeXaf;

  return (
    <>
      <Seo title={t('pricing.seoTitle')} description={t('pricing.seoDescription')} />
      <MarketingSection className="pt-14 sm:pt-20 pb-10">
        <MarketingHeading
          eyebrow={t('pricing.eyebrow')}
          title={t('pricing.title')}
          subtitle={t('pricing.subtitle')}
        />
        <MarketingCtaGroupLight />
      </MarketingSection>

      <MarketingSection tone="muted" className="py-16 sm:py-20">
        <div className="max-w-2xl border-t border-navy/10 pt-10">
          <p className="mkt-eyebrow text-brand">{t('pricing.feeLabel')}</p>
          <p className="mkt-display mt-4 text-6xl sm:text-7xl lg:text-8xl text-navy tracking-tight">
            {platformFeePercent}
            <span className="text-3xl sm:text-4xl text-navy/35 align-super ml-1">%</span>
          </p>
          <p className="mt-6 text-base text-navy/55 leading-relaxed max-w-xl">
            {t('pricing.feeBody')}
          </p>
          <ul className="mt-10 space-y-4 text-sm sm:text-base text-navy/70">
            <li className="flex gap-3">
              <span className="font-mono text-brand text-xs mt-1">01</span>
              {t('pricing.b1')}
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-brand text-xs mt-1">02</span>
              {t('pricing.b2')}
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-brand text-xs mt-1">03</span>
              {t('pricing.b3')}
            </li>
            <li className="flex gap-3">
              <span className="font-mono text-brand text-xs mt-1">04</span>
              {t('pricing.b4')}
            </li>
          </ul>
        </div>
      </MarketingSection>

      <MarketingSection className="py-16 sm:py-20">
        <MarketingHeading
          title={t('pricing.exampleTitle')}
          subtitle={t('pricing.exampleSub')}
        />
        <div className="max-w-lg space-y-4 border-t border-navy/10 pt-8 text-sm sm:text-base">
          <div className="flex justify-between gap-4">
            <span className="text-navy/55">{t('pricing.subscriberPays')}</span>
            <span className="font-mono font-medium text-navy">{examplePrice.toLocaleString()} XAF</span>
          </div>
          <div className="flex justify-between gap-4">
            <span className="text-navy/55">{t('pricing.feeLine', { fee: platformFeePercent })}</span>
            <span className="font-mono font-medium text-navy">{feeXaf.toLocaleString()} XAF</span>
          </div>
          <div className="flex justify-between gap-4 border-t border-navy/10 pt-4">
            <span className="font-semibold text-navy">{t('pricing.youReceive')}</span>
            <span className="font-mono text-lg font-semibold text-brand">{ownerXaf.toLocaleString()} XAF</span>
          </div>
        </div>
        <p className="mt-10 text-sm text-navy/55">
          {t('pricing.whiteLabel')}{' '}
          <LocaleLink to="/contact" className="text-brand font-semibold hover:text-brand-dark">
            {t('pricing.contactLink')}
          </LocaleLink>
          .
        </p>
      </MarketingSection>

      <FinalCta
        title={t('pricing.ctaTitle')}
        subtitle={t('pricing.ctaSubtitle')}
        whatsappHref={wa}
      />
    </>
  );
}
