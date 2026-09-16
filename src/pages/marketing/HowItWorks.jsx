import { useTranslation } from 'react-i18next';
import Seo from '../../components/Seo';
import { LocaleLink } from '../../components/LocaleLink';
import { Router, Package, Smartphone, Wallet, Radio } from 'lucide-react';
import Reveal from '../../components/marketing/Reveal';
import {
  FinalCta,
  MarketingHeading,
  MarketingSection,
} from '../../components/marketing/MarketingPrimitives';
import { usePublicConfig, whatsappUrl } from '../../hooks/usePublicConfig';

const STEP_ICONS = [Radio, Router, Package, Smartphone, Wallet];

export default function HowItWorks() {
  const { t } = useTranslation('marketing');
  const { platformFeePercent, contactWhatsApp } = usePublicConfig();
  const wa = whatsappUrl(contactWhatsApp, t('waSetup'));
  const raw = t('how.steps', { returnObjects: true });
  const steps = (Array.isArray(raw) ? raw : []).map((_, i) => ({
    n: t(`how.steps.${i}.n`),
    title: t(`how.steps.${i}.title`),
    body: t(`how.steps.${i}.body`, { fee: platformFeePercent }),
    icon: STEP_ICONS[i],
  }));

  return (
    <>
      <Seo title={t('how.seoTitle')} description={t('how.seoDescription')} />
      <MarketingSection className="pt-14 sm:pt-20 pb-6">
        <MarketingHeading
          eyebrow={t('how.eyebrow')}
          title={t('how.title')}
          subtitle={t('how.subtitle', { fee: platformFeePercent })}
        />
      </MarketingSection>

      <MarketingSection className="pb-16 sm:pb-20">
        <ol className="space-y-0 border-l border-navy/15 ml-3 sm:ml-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.n} as="li" delayMs={index * 70} className="relative pl-8 sm:pl-10 pb-10 last:pb-0">
                <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-brand ring-4 ring-white" />
                <div className="flex items-center justify-between gap-3 max-w-xl">
                  <p className="font-mono text-xs font-semibold text-brand tracking-widest">{step.n}</p>
                  <span className="mkt-icon-frame border-navy/10">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                </div>
                <h3 className="mkt-display mt-2 text-lg text-navy">{step.title}</h3>
                <p className="mt-2 text-sm text-navy/55 leading-relaxed max-w-xl">{step.body}</p>
              </Reveal>
            );
          })}
        </ol>
        <p className="mt-8 text-sm text-navy/50 max-w-2xl">
          <LocaleLink to="/help/tutorials" className="text-brand font-medium hover:text-brand-dark">
            {t('how.helpLink')}
          </LocaleLink>
        </p>
      </MarketingSection>

      <MarketingSection tone="muted" className="py-14 sm:py-16">
        <MarketingHeading
          title={t('how.scriptsTitle')}
          subtitle={t('how.scriptsBody')}
        />
        <p className="mt-6 text-sm text-navy/50 max-w-2xl">
          {t('how.contributorBefore')}{' '}
          <LocaleLink to="/for/contributors" className="text-brand font-medium hover:text-brand-dark">
            {t('how.contributorLink')}
          </LocaleLink>{' '}
          {t('how.contributorAfter')}
        </p>
      </MarketingSection>

      <FinalCta
        title={t('how.ctaTitle')}
        subtitle={t('how.ctaSubtitle')}
        whatsappHref={wa}
      />
    </>
  );
}
