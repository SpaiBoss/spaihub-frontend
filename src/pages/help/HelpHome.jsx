import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { LocaleLink } from '../../components/LocaleLink';
import { helpHref } from '../../i18n/paths';
import { useLocale } from '../../i18n/useLocale';
import { listArticles, searchArticles } from '../../help/loadArticles';
import HelpSearch from './HelpSearch';

export default function HelpHome() {
  const { t } = useTranslation('help');
  const { lang } = useLocale();
  const [q, setQ] = useState('');
  const results = useMemo(() => (q.trim() ? searchArticles(q, lang) : listArticles(lang)), [q, lang]);
  const owners = listArticles(lang, { role: 'owner', section: 'tutorials' }).slice(0, 6);
  const contrib = listArticles(lang, { role: 'contributor', section: 'tutorials' }).slice(0, 4);
  const tips = listArticles(lang, { section: 'pro-tips' }).slice(0, 6);

  return (
    <div>
      <h1 className="text-3xl font-semibold text-navy tracking-tight">{t('hubTitle')}</h1>
      <p className="mt-2 text-navy/55 max-w-xl">{t('hubSubtitle')}</p>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={t('searchPlaceholder')}
        className="input-field mt-6 max-w-lg"
      />
      {q.trim() ? (
        <HelpSearch query={q} results={results} lang={lang} emptyLabel={t('noResults')} />
      ) : (
        <div className="mt-10 grid gap-10">
          <Section title={t('owners')} intro={t('ownersIntro')} items={owners} lang={lang} more={helpHref('owners', lang)} moreLabel={t('owners')} />
          <Section title={t('contributors')} intro={t('contributorsIntro')} items={contrib} lang={lang} more={helpHref('contributors', lang)} moreLabel={t('contributors')} />
          <Section title={t('proTips')} items={tips} lang={lang} more={helpHref('pro-tips', lang)} moreLabel={t('proTips')} />
        </div>
      )}
    </div>
  );
}

function Section({ title, intro, items, lang, more, moreLabel }) {
  return (
    <section>
      <h2 className="text-lg font-semibold text-navy">{title}</h2>
      {intro && <p className="text-sm text-navy/50 mt-1">{intro}</p>}
      <ul className="mt-4 space-y-2">
        {items.map((a) => (
          <li key={a.slug}>
            <LocaleLink to={helpHref(a.slug, lang)} className="text-sm font-medium text-brand hover:text-brand-dark">
              {a.title}
            </LocaleLink>
          </li>
        ))}
      </ul>
      {more && (
        <LocaleLink to={more} className="inline-block mt-3 text-xs font-medium text-navy/45 hover:text-navy">
          {moreLabel} →
        </LocaleLink>
      )}
    </section>
  );
}
