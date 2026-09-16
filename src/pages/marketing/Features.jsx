import { useTranslation } from 'react-i18next';
import Seo from '../../components/Seo';
import { LocaleLink } from '../../components/LocaleLink';
import {
  Smartphone,
  Ticket,
  Package,
  Activity,
  Terminal,
  Palette,
  Wallet,
  RefreshCw,
  ShieldCheck,
} from 'lucide-react';
import {
  FeatureGrid,
  FinalCta,
  MarketingHeading,
  MarketingSection,
} from '../../components/marketing/MarketingPrimitives';
import { usePublicConfig, whatsappUrl } from '../../hooks/usePublicConfig';

const SELL_ICONS = [Smartphone, Ticket, Package];
const RUN_ICONS = [Activity, Terminal, Palette];
const PAID_ICONS = [Wallet, RefreshCw, ShieldCheck];

function mapItems(t, key, icons, fee) {
  const raw = t(key, { returnObjects: true });
  if (!Array.isArray(raw)) return [];
  return raw.map((_, i) => ({
    title: t(`${key}.${i}.title`),
    body: t(`${key}.${i}.body`, { fee }),
    icon: icons[i],
  }));
}

export default function Features() {
  const { t } = useTranslation('marketing');
  const { platformFeePercent, contactWhatsApp } = usePublicConfig();
  const wa = whatsappUrl(contactWhatsApp, t('waLearn'));
  const fee = platformFeePercent;

  const groups = [
    { title: t('featuresPage.sell'), items: mapItems(t, 'featuresPage.sellItems', SELL_ICONS, fee) },
    { title: t('featuresPage.run'), items: mapItems(t, 'featuresPage.runItems', RUN_ICONS, fee) },
    { title: t('featuresPage.paid'), items: mapItems(t, 'featuresPage.paidItems', PAID_ICONS, fee) },
  ];

  return (
    <>
      <Seo title={t('featuresPage.seoTitle')} description={t('featuresPage.seoDescription')} />
      <MarketingSection className="pt-14 sm:pt-20 pb-10">
        <MarketingHeading
          eyebrow={t('featuresPage.eyebrow')}
          title={t('featuresPage.title')}
          subtitle={t('featuresPage.subtitle')}
        />
        <div className="flex flex-wrap gap-3 text-sm">
          <LocaleLink
            to="/for/mobile-money"
            className="font-mono text-xs tracking-wide text-brand font-medium hover:text-brand-dark transition-colors"
          >
            {t('common:nav.mobileMoney')} →
          </LocaleLink>
          <LocaleLink
            to="/for/vouchers"
            className="font-mono text-xs tracking-wide text-brand font-medium hover:text-brand-dark transition-colors"
          >
            {t('common:nav.vouchers')} →
          </LocaleLink>
          <LocaleLink
            to="/for/mikrotik"
            className="font-mono text-xs tracking-wide text-brand font-medium hover:text-brand-dark transition-colors"
          >
            {t('common:nav.mikrotik')} →
          </LocaleLink>
          <LocaleLink
            to="/for/contributors"
            className="font-mono text-xs tracking-wide text-brand font-medium hover:text-brand-dark transition-colors"
          >
            {t('common:nav.contributors')} →
          </LocaleLink>
        </div>
      </MarketingSection>

      {groups.map((group) => (
        <MarketingSection key={group.title} className="pb-16 sm:pb-20">
          <FeatureGrid items={group.items} />
        </MarketingSection>
      ))}

      <FinalCta
        title={t('featuresPage.ctaTitle')}
        subtitle={t('featuresPage.ctaSubtitle')}
        whatsappHref={wa}
      />
    </>
  );
}
