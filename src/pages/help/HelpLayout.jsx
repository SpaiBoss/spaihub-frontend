import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LocaleLink, LocaleNavLink } from '../../components/LocaleLink';
import LanguageToggle from '../../components/LanguageToggle';
import Seo from '../../components/Seo';
import { helpHref } from '../../i18n/paths';
import { useLocale } from '../../i18n/useLocale';
import { usePublicConfig, whatsappUrl } from '../../hooks/usePublicConfig';

export default function HelpLayout() {
  const { t } = useTranslation('help');
  const { t: tc } = useTranslation('common');
  const { lang } = useLocale();
  const { contactWhatsApp } = usePublicConfig();
  const wa = whatsappUrl(contactWhatsApp, lang === 'fr'
    ? 'Bonjour — j’ai lu l’aide SpaiHub et j’ai encore une question.'
    : 'Hi — I read SpaiHub Help and still have a question.');

  const links = [
    { to: helpHref('', lang), label: t('title'), end: true },
    { to: helpHref('owners', lang), label: t('owners') },
    { to: helpHref('contributors', lang), label: t('contributors') },
    { to: helpHref('tutorials', lang), label: t('tutorials') },
    { to: helpHref('pro-tips', lang), label: t('proTips') },
    { to: helpHref('troubleshooting', lang), label: t('troubleshooting') },
    { to: helpHref('glossary', lang), label: t('glossary') },
    { to: helpHref('reference', lang), label: t('reference') },
  ];

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      <Seo title={t('seoTitle')} description={t('seoDescription')} />
      <div className="flex flex-col lg:flex-row gap-10">
        <aside className="lg:w-56 shrink-0">
          <div className="flex items-center justify-between gap-2 mb-4">
            <p className="font-semibold text-navy">{t('title')}</p>
            <LanguageToggle compact className="lg:hidden" />
          </div>
          <nav className="flex lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
            {links.map((l) => (
              <LocaleNavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                    isActive ? 'bg-brand/10 text-navy' : 'text-navy/55 hover:text-navy'
                  }`
                }
              >
                {l.label}
              </LocaleNavLink>
            ))}
          </nav>
          <div className="hidden lg:block mt-6">
            <LanguageToggle />
          </div>
          <div className="mt-8 p-4 rounded-xl border border-gray-200 bg-surface-muted">
            <p className="text-sm font-medium text-navy">{t('stillStuck')}</p>
            <p className="text-xs text-navy/55 mt-1 leading-relaxed">{t('contactFirst')}</p>
            <LocaleLink to="/contact" className="mt-3 inline-block text-sm font-medium text-brand">
              {tc('nav.contact')}
            </LocaleLink>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className="mt-2 block text-sm font-medium text-brand">
                {tc('actions.chatWhatsapp')}
              </a>
            )}
          </div>
        </aside>
        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
