import { useTranslation } from 'react-i18next';
import Seo from '../../components/Seo';
import { LocaleLink } from '../../components/LocaleLink';
import { Cable, Gauge, Wallet } from 'lucide-react';
import BrandLogo from '../../components/BrandLogo';
import Reveal from '../../components/marketing/Reveal';
import {
  FinalCta,
  MarketingCtaGroup,
  MarketingHeading,
  MarketingSection,
  WaveEdge,
} from '../../components/marketing/MarketingPrimitives';
import { usePublicConfig, whatsappUrl } from '../../hooks/usePublicConfig';

const STEP_ICONS = [Cable, Gauge, Wallet];

export default function ForContributors() {
  const { t } = useTranslation('marketing');
  const { contactWhatsApp } = usePublicConfig();
  const wa = whatsappUrl(contactWhatsApp, t('waContributor'));
  const steps = [
    { title: t('forContributors.s1t'), body: t('forContributors.s1b'), icon: STEP_ICONS[0] },
    { title: t('forContributors.s2t'), body: t('forContributors.s2b'), icon: STEP_ICONS[1] },
    { title: t('forContributors.s3t'), body: t('forContributors.s3b'), icon: STEP_ICONS[2] },
  ];

  return (
    <>
      <Seo title={t('forContributors.seoTitle')} description={t('forContributors.seoDescription')} />
      <section className="relative min-h-[88dvh] min-h-[88svh] overflow-x-hidden text-white">
        <img
          src="/marketing/contributor-hero.jpg"
          alt={t('forContributors.heroAlt')}
          className="absolute inset-0 h-full w-full object-cover object-[center_35%]"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(105deg, rgba(7,11,16,0.92) 0%, rgba(14,20,27,0.78) 42%, rgba(14,20,27,0.45) 68%, rgba(14,20,27,0.55) 100%), linear-gradient(to top, rgba(7,11,16,0.82) 0%, transparent 42%)',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              'radial-gradient(ellipse 50% 45% at 75% 30%, rgba(15,118,110,0.35), transparent 60%)',
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex min-h-[88dvh] min-h-[88svh] max-w-6xl flex-col justify-end px-4 pb-24 pt-28 sm:justify-center sm:px-6 sm:pb-32 sm:pt-32 lg:px-8">
          <div className="max-w-xl">
            <div className="animate-hero-in" style={{ animationDelay: '40ms' }}>
              <p className="mkt-eyebrow text-brand-light/85 mb-4">{t('forContributors.eyebrow')}</p>
              <BrandLogo theme="dark" textClassName="text-3xl sm:text-5xl" className="mb-5 sm:mb-8" />
            </div>
            <h1
              className="mkt-display animate-hero-in text-[2.1rem] leading-[1.08] text-white sm:text-5xl sm:leading-[1.05] lg:text-[3.4rem]"
              style={{ animationDelay: '140ms' }}
            >
              {t('forContributors.h1a')}
              <br />
              {t('forContributors.h1b')}
              <br />
              <span className="text-brand-light">{t('forContributors.h1c')}</span>
            </h1>
            <p
              className="mt-4 max-w-md animate-hero-in text-[0.95rem] leading-relaxed text-white/70 sm:mt-6 sm:text-lg"
              style={{ animationDelay: '260ms' }}
            >
              {t('forContributors.heroLead')}
            </p>
            <div className="animate-hero-in" style={{ animationDelay: '380ms' }}>
              <MarketingCtaGroup
                className="mt-7 sm:mt-9"
                primaryTo="/contributor/register"
                primaryLabel={t('forContributors.create')}
                secondaryTo="/contributor/login"
                secondaryLabel={t('common:nav.signIn')}
              />
            </div>
          </div>
        </div>
        <WaveEdge fill="#F0F2F5" accent="#148F86" />
      </section>

      <MarketingSection tone="muted" className="py-16 sm:py-20" waveBottomFill="#ffffff">
        <MarketingHeading
          eyebrow={t('forContributors.howEyebrow')}
          title={t('forContributors.howTitle')}
          subtitle={t('forContributors.howSubtitle')}
        />
        <div className="grid gap-10 border-t border-navy/10 pt-10 sm:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.title} delayMs={index * 70}>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs tracking-[0.2em] text-brand">0{index + 1}</p>
                  <span className="mkt-icon-frame border-navy/10">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                </div>
                <h3 className="mkt-display mt-4 text-xl text-navy">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-navy/55 sm:text-base">{step.body}</p>
              </Reveal>
            );
          })}
        </div>
      </MarketingSection>

      <MarketingSection className="py-14 sm:py-16" waveBottomFill="#0E141B" waveAccent="#148F86">
        <MarketingHeading
          title={t('forContributors.notVpnTitle')}
          subtitle={t('forContributors.notVpnSubtitle')}
        />
        <p className="max-w-2xl text-sm leading-relaxed text-navy/50">
          {t('forContributors.ispNote')}{' '}
          <LocaleLink to="/faq" className="font-medium text-brand hover:text-brand-dark">
            {t('forContributors.faqLink')}
          </LocaleLink>
        </p>
      </MarketingSection>

      <FinalCta
        title={t('forContributors.ctaTitle')}
        subtitle={t('forContributors.ctaSubtitle')}
        primaryTo="/contributor/register"
        primaryLabel={t('forContributors.create')}
        secondaryTo="/contributor/login"
        secondaryLabel={t('forContributors.signIn')}
        whatsappHref={wa}
      />
    </>
  );
}
