import { useTranslation } from 'react-i18next';
import Seo from '../../components/Seo';
import { LocaleLink } from '../../components/LocaleLink';
import {
  Wallet,
  Ticket,
  Router,
  MapPin,
  Smartphone,
  ShieldCheck,
  Radio,
  Terminal,
  Activity,
} from 'lucide-react';
import BrandLogo from '../../components/BrandLogo';
import Reveal from '../../components/marketing/Reveal';
import {
  FaqList,
  FeatureGrid,
  FinalCta,
  MarketingCtaGroup,
  MarketingHeading,
  MarketingSection,
  NightTimeline,
  ProductBoard,
  WaveEdge,
  TestimonialGrid,
} from '../../components/marketing/MarketingPrimitives';
import { usePublicConfig, whatsappUrl } from '../../hooks/usePublicConfig';
import { getMarketingFaq } from './faqData';

const PROBLEM_META = [
  { icon: Wallet, accent: 'from-[#0F766E] via-[#0D9488] to-[#115E59]' },
  { icon: Router, accent: 'from-[#0E7490] via-[#0F766E] to-[#134E4A]' },
  { icon: Activity, accent: 'from-[#B45309] via-[#C2410C] to-[#7C2D12]' },
];

const STEP_ICONS = [Router, Radio, Ticket, Wallet];
const FEATURE_ICONS = [Smartphone, Ticket, Terminal, MapPin, Wallet, ShieldCheck];

function asList(value) {
  return Array.isArray(value) ? value : [];
}

export default function Landing() {
  const { t } = useTranslation('marketing');
  const { platformFeePercent, contactWhatsApp } = usePublicConfig();
  const wa = whatsappUrl(contactWhatsApp, t('waLearn'));
  const faqTeaser = getMarketingFaq(t, platformFeePercent).slice(1, 4);

  const problems = asList(t('landing.problems', { returnObjects: true })).map((item, index) => ({
    ...item,
    ...PROBLEM_META[index],
  }));
  const nights = asList(t('landing.nights', { returnObjects: true }));
  const steps = asList(t('landing.steps', { returnObjects: true })).map((step, index) => ({
    ...step,
    icon: STEP_ICONS[index],
  }));
  const features = asList(t('landing.features', { returnObjects: true })).map((item, index) => ({
    ...item,
    icon: FEATURE_ICONS[index],
  }));
  const testimonials = asList(t('landing.testimonials', { returnObjects: true }));

  return (
    <>
      <Seo title={t('landing.seoTitle')} description={t('landing.seoDescription')} />
      <section className="relative min-h-[100dvh] min-h-[100svh] overflow-hidden text-white">
        <img
          src="/marketing/landing-hero.jpg"
          alt={t('landing.heroAlt')}
          className="absolute inset-0 h-full w-full scale-[1.02] object-cover object-[78%_45%] sm:object-[82%_40%]"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(90deg, rgba(7,11,16,0.97) 0%, rgba(7,11,16,0.94) 28%, rgba(14,20,27,0.72) 48%, rgba(14,20,27,0.28) 68%, rgba(14,20,27,0.2) 100%)',
          }}
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(7,11,16,0.7) 0%, transparent 42%), radial-gradient(ellipse 45% 40% at 85% 55%, rgba(15,118,110,0.22), transparent 70%)',
          }}
          aria-hidden
        />

        <div className="relative z-10 mx-auto flex min-h-[100dvh] min-h-[100svh] max-w-6xl flex-col justify-end px-4 pb-28 pt-28 sm:justify-center sm:px-6 sm:pb-36 sm:pt-32 lg:px-8">
          <div className="max-w-[22rem] sm:max-w-md lg:max-w-lg">
            <div className="animate-hero-in" style={{ animationDelay: '40ms' }}>
              <p className="mkt-eyebrow text-brand-light/90 mb-5">{t('landing.heroEyebrow')}</p>
              <BrandLogo
                theme="dark"
                textClassName="text-[2.35rem] sm:text-5xl lg:text-6xl tracking-tight"
                className="mb-7 sm:mb-9"
              />
            </div>
            <h1
              className="mkt-display animate-hero-in text-[1.85rem] leading-[1.12] sm:text-[2.75rem] sm:leading-[1.08] lg:text-[3.35rem] text-white"
              style={{ animationDelay: '140ms' }}
            >
              {t('landing.h1Line1')}
              <br />
              {t('landing.h1Line2')}
              <br />
              <span className="text-brand-light">{t('landing.h1Line3')}</span>
            </h1>
            <p
              className="mt-5 animate-hero-in text-sm sm:text-base text-white/65 leading-relaxed max-w-sm"
              style={{ animationDelay: '260ms' }}
            >
              {t('landing.heroLead')}
            </p>
            <div className="animate-hero-in" style={{ animationDelay: '380ms' }}>
              <MarketingCtaGroup className="mt-8 sm:mt-10" />
            </div>
          </div>
        </div>
        <WaveEdge fill="#0E141B" accent="#148F86" />
      </section>

      {/* Continuous dark band: problem → night ops */}
      <section className="relative overflow-x-hidden bg-navy text-white">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 40% at 8% 8%, rgba(15,118,110,0.38), transparent 55%), radial-gradient(ellipse 45% 35% at 100% 55%, rgba(245,158,11,0.12), transparent 50%), linear-gradient(180deg, #070B10 0%, #0E141B 42%, #0A1214 100%)',
          }}
          aria-hidden
        />

        <div className="relative px-4 pt-20 sm:px-6 sm:pt-28 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <MarketingHeading
              light
              eyebrow={t('landing.problemEyebrow')}
              title={t('landing.problemTitle')}
              subtitle={t('landing.problemSubtitle')}
            />
          </div>
        </div>

        <div className="relative mt-2 sm:mt-4">
          <div className="grid sm:grid-cols-3">
            {problems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.t} delayMs={index * 70}>
                  <div
                    className={`relative min-h-[17rem] overflow-hidden bg-gradient-to-br ${item.accent} px-6 py-8 sm:min-h-[19rem] sm:px-8 sm:py-10 ${
                      index > 0 ? 'border-t border-white/10 sm:border-t-0 sm:border-l' : ''
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <p className="font-mono text-[11px] tracking-[0.22em] text-white/70">{item.n}</p>
                      <Icon className="h-5 w-5 text-white/85" strokeWidth={1.75} />
                    </div>
                    <h3 className="mkt-display mt-10 text-2xl text-white sm:text-[1.7rem] leading-tight">
                      {item.t}
                    </h3>
                    <p className="mt-3 max-w-[17rem] text-sm leading-relaxed text-white/75 sm:text-[0.95rem]">
                      {item.d}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        <div className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8 pb-32 sm:pb-40">
          <div className="mx-auto max-w-6xl">
            <MarketingHeading
              light
              eyebrow={t('landing.sleepEyebrow')}
              title={t('landing.sleepTitle')}
              subtitle={t('landing.sleepSubtitle')}
            />
            <NightTimeline events={nights} />
          </div>
          <WaveEdge fill="#F0F2F5" accent="#148F86" />
        </div>
      </section>

      <MarketingSection tone="muted" className="py-20 sm:py-28" waveBottomFill="#ffffff">
        <MarketingHeading
          eyebrow={t('landing.productEyebrow')}
          title={t('landing.productTitle')}
          subtitle={t('landing.productSubtitle')}
        />
        <ProductBoard
          panels={[
            {
              title: t('landing.board.portal'),
              lines: [
                { label: t('landing.board.status'), value: t('landing.board.connected') },
                { label: t('landing.board.remaining'), value: '1h 42m' },
                { label: t('landing.board.login'), value: t('landing.board.pinReady') },
              ],
            },
            {
              title: t('landing.board.vouchers'),
              lines: [
                { label: t('landing.board.batch'), value: 'SPAI-….pdf' },
                { label: t('landing.board.unused'), value: '48' },
                { label: t('landing.board.layout'), value: '6-up' },
              ],
            },
            {
              title: t('landing.board.wallet'),
              lines: [
                { label: t('landing.board.balance'), value: '84,200 XAF' },
                { label: t('landing.board.fee'), value: `${platformFeePercent}%` },
                { label: t('landing.board.withdraw'), value: t('landing.board.momo') },
              ],
            },
          ]}
        />
      </MarketingSection>

      <MarketingSection className="py-20 sm:py-28" waveBottomFill="#F0F2F5">
        <div className="mb-12 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <MarketingHeading
            className="mb-0"
            eyebrow={t('landing.howEyebrow')}
            title={t('landing.howTitle')}
            subtitle={t('landing.howSubtitle')}
          />
          <LocaleLink
            to="/how-it-works"
            className="shrink-0 text-sm font-semibold text-brand transition-colors duration-200 hover:text-brand-dark"
          >
            {t('landing.fullWalkthrough')}
          </LocaleLink>
        </div>
        <ol className="grid gap-10 border-t border-navy/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Reveal key={step.n} as="li" delayMs={index * 60}>
                <div className="flex items-start justify-between gap-3">
                  <p className="mkt-display text-4xl leading-none text-navy/[0.08] sm:text-5xl">{step.n}</p>
                  <span className="mkt-icon-frame mt-1 border-navy/10">
                    <Icon className="h-4 w-4" strokeWidth={1.75} />
                  </span>
                </div>
                <h3 className="mkt-display mt-4 text-lg text-navy">{step.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/55">{step.d}</p>
              </Reveal>
            );
          })}
        </ol>
      </MarketingSection>

      <MarketingSection tone="muted" className="py-20 sm:py-28" waveBottomFill="#ffffff">
        <MarketingHeading
          eyebrow={t('landing.capabilitiesEyebrow')}
          title={t('landing.capabilitiesTitle')}
          subtitle={t('landing.capabilitiesSubtitle')}
        />
        <FeatureGrid items={features} />
      </MarketingSection>

      <MarketingSection className="py-16 sm:py-20">
        <MarketingHeading
          eyebrow={t('landing.contributorsEyebrow')}
          title={t('landing.contributorsTitle')}
          subtitle={t('landing.contributorsSubtitle')}
        />
        <LocaleLink
          to="/for/contributors"
          className="font-mono text-xs font-medium tracking-wide text-brand transition-colors hover:text-brand-dark"
        >
          {t('landing.contributeLink')}
        </LocaleLink>
      </MarketingSection>

      <MarketingSection className="border-t border-navy/[0.06] py-20 sm:py-28" waveBottomFill="#F0F2F5">
        <MarketingHeading
          eyebrow={t('landing.fieldEyebrow')}
          title={t('landing.fieldTitle')}
          subtitle={t('landing.fieldSubtitle')}
        />
        <TestimonialGrid items={testimonials} />
      </MarketingSection>

      <MarketingSection tone="muted" className="py-20 sm:py-28" waveBottomFill="#0E141B" waveAccent="#148F86">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <MarketingHeading className="mb-0" eyebrow={t('common:nav.faq')} title={t('landing.faqTitle')} />
          <LocaleLink
            to="/faq"
            className="text-sm font-semibold text-brand transition-colors duration-200 hover:text-brand-dark"
          >
            {t('landing.allFaqs')}
          </LocaleLink>
        </div>
        <FaqList items={faqTeaser} />
      </MarketingSection>

      <FinalCta
        title={t('landing.finalCtaTitle')}
        subtitle={t('landing.finalCtaSubtitle', { fee: platformFeePercent })}
        whatsappHref={wa}
      />
    </>
  );
}
