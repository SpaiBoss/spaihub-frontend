import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { publicSiteUrl, stripLangPrefix, withLangPrefix } from '../i18n/paths';
import { currentLang } from '../i18n/useLocale';

function upsertMeta(name, content) {
  if (!content) return;
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute('name', name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href, extra = {}) {
  const selector = extra.hreflang
    ? `link[rel="${rel}"][hreflang="${extra.hreflang}"]`
    : `link[rel="${rel}"]:not([hreflang])`;
  let el = document.querySelector(selector);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
  Object.entries(extra).forEach(([k, v]) => el.setAttribute(k, v));
}

export default function Seo({ title, description, path }) {
  const { i18n, t } = useTranslation('common');
  const lang = currentLang(i18n.language);
  const site = publicSiteUrl();
  const clean = stripLangPrefix(path || (typeof window !== 'undefined' ? window.location.pathname : '/'));
  const pageTitle = title || t('seo.defaultTitle');
  const pageDesc = description || t('seo.defaultDescription');

  useEffect(() => {
    document.title = pageTitle;
    document.documentElement.lang = lang;
    upsertMeta('description', pageDesc);
    upsertMeta('og:title', pageTitle);
    upsertMeta('og:description', pageDesc);
    const canonical = `${site}${withLangPrefix(clean, lang)}`;
    upsertLink('canonical', canonical);
    upsertLink('alternate', `${site}${withLangPrefix(clean, 'en')}`, { hreflang: 'en' });
    upsertLink('alternate', `${site}${withLangPrefix(clean, 'fr')}`, { hreflang: 'fr' });
    upsertLink('alternate', `${site}${withLangPrefix(clean, 'en')}`, { hreflang: 'x-default' });
  }, [pageTitle, pageDesc, lang, site, clean]);

  return null;
}
