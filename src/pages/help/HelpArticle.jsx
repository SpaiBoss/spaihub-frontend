import { useParams } from 'react-router-dom';
import { marked } from 'marked';
import { useTranslation } from 'react-i18next';
import Seo from '../../components/Seo';
import { LocaleLink } from '../../components/LocaleLink';
import { helpHref } from '../../i18n/paths';
import { useLocale } from '../../i18n/useLocale';
import { getArticle, relatedArticles } from '../../help/loadArticles';

marked.setOptions({ gfm: true, breaks: true });

export default function HelpArticle() {
  const { slug } = useParams();
  const { t } = useTranslation('help');
  const { lang } = useLocale();
  const article = getArticle(slug, lang);

  if (!article) {
    return (
      <div>
        <h1 className="text-2xl font-semibold text-navy">{t('noResults')}</h1>
        <LocaleLink to={helpHref('', lang)} className="mt-4 inline-block text-brand text-sm font-medium">
          {t('title')}
        </LocaleLink>
      </div>
    );
  }

  const html = marked.parse(article.body || '');
  const related = relatedArticles(article, lang);

  return (
    <article>
      <Seo
        title={`${article.title} | SpaiHub Help`}
        description={article.description}
        path={helpHref(article.slug, lang)}
      />
      {article.section === 'troubleshooting' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: article.title,
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: article.description || article.title,
                  },
                },
              ],
            }),
          }}
        />
      )}
      <p className="text-xs font-medium text-brand tracking-wide uppercase">
        {(article.role || []).join(' · ')} · {article.section}
      </p>
      <h1 className="text-3xl font-semibold text-navy tracking-tight mt-2">{article.title}</h1>
      {article.description && <p className="mt-3 text-navy/55 max-w-2xl">{article.description}</p>}
      <p className="mt-2 text-xs text-navy/40">
        {t('updated')} {article.updatedAt} · {t('minutes', { n: article.minutes })}
      </p>
      <div
        className="help-prose mt-8 max-w-2xl text-sm text-navy/75 leading-relaxed [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-navy [&_h2]:mt-8 [&_h2]:mb-2 [&_h3]:font-semibold [&_h3]:text-navy [&_h3]:mt-6 [&_p]:mt-3 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:mt-3 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:mt-3 [&_li]:mt-1 [&_code]:font-mono [&_code]:text-xs [&_code]:bg-surface-muted [&_code]:px-1 [&_strong]:text-navy"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {related.length > 0 && (
        <div className="mt-12 border-t border-gray-100 pt-6">
          <h2 className="font-semibold text-navy">{t('related')}</h2>
          <ul className="mt-3 space-y-2">
            {related.map((r) => (
              <li key={r.slug}>
                <LocaleLink to={helpHref(r.slug, lang)} className="text-sm font-medium text-brand">
                  {r.title}
                </LocaleLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
