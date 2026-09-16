import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { LocaleLink } from '../../components/LocaleLink';
import Seo from '../../components/Seo';
import { helpHref, stripLangPrefix } from '../../i18n/paths';
import { useLocale } from '../../i18n/useLocale';
import { listArticles } from '../../help/loadArticles';

const SECTION_MAP = {
  owners: { role: 'owner' },
  contributors: { role: 'contributor' },
  tutorials: { section: 'tutorials' },
  'pro-tips': { section: 'pro-tips' },
  troubleshooting: { section: 'troubleshooting' },
  glossary: { section: 'glossary' },
  reference: { section: 'reference' },
};

export default function HelpSection() {
  const { pathname } = useLocation();
  const { t } = useTranslation('help');
  const { lang } = useLocale();
  const key = stripLangPrefix(pathname).replace(/^\/help\/?/, '') || 'tutorials';
  const filter = SECTION_MAP[key] || { section: key };
  const items = listArticles(lang, filter);
  const titleKey = {
    owners: 'owners',
    contributors: 'contributors',
    tutorials: 'tutorials',
    'pro-tips': 'proTips',
    troubleshooting: 'troubleshooting',
    glossary: 'glossary',
    reference: 'reference',
  }[key] || 'title';

  return (
    <div>
      <Seo title={`${t(titleKey)} | SpaiHub Help`} description={t('hubSubtitle')} />
      <h1 className="text-3xl font-semibold text-navy tracking-tight">{t(titleKey)}</h1>
      {key === 'owners' && <p className="mt-2 text-navy/55">{t('ownersIntro')}</p>}
      {key === 'contributors' && <p className="mt-2 text-navy/55">{t('contributorsIntro')}</p>}
      <ul className="mt-8 space-y-3">
        {items.length === 0 && <p className="text-sm text-navy/50">{t('emptySection')}</p>}
        {items.map((a) => (
          <li key={a.slug}>
            <LocaleLink to={helpHref(a.slug, lang)} className="block p-4 rounded-xl border border-gray-100 hover:border-brand/30">
              <p className="font-medium text-navy">{a.title}</p>
              <p className="text-sm text-navy/50 mt-1">{a.description}</p>
            </LocaleLink>
          </li>
        ))}
      </ul>
    </div>
  );
}
