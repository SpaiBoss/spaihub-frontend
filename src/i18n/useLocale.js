import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate } from 'react-router-dom';
import api from '../services/api';
import {
  isPublicLocalizedPath,
  localizeHref,
  normalizeLang,
  STORAGE_KEY,
  withLangPrefix,
  stripLangPrefix,
} from '../i18n/paths';

export function currentLang(i18nLang) {
  return normalizeLang(i18nLang);
}

export async function persistPreferredLocale(lang) {
  const locale = normalizeLang(lang);
  try {
    localStorage.setItem(STORAGE_KEY, locale);
  } catch {
    /* ignore */
  }
  try {
    if (localStorage.getItem('token')) {
      await api.patch('/api/owner/me', { preferredLocale: locale });
      return;
    }
    if (localStorage.getItem('contributorToken')) {
      await api.patch('/api/contributor/me', { preferredLocale: locale });
    }
  } catch {
    /* locale persistence is best-effort */
  }
}

export function useLocale() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const lang = currentLang(i18n.language);

  const setLang = useCallback(
    async (next) => {
      const locale = normalizeLang(next);
      await i18n.changeLanguage(locale);
      document.documentElement.lang = locale;
      await persistPreferredLocale(locale);
      if (isPublicLocalizedPath(location.pathname)) {
        const nextPath = withLangPrefix(stripLangPrefix(location.pathname), locale);
        if (nextPath !== location.pathname) {
          navigate(`${nextPath}${location.search}${location.hash}`, { replace: true });
        }
      }
    },
    [i18n, location.hash, location.pathname, location.search, navigate]
  );

  const href = useCallback((to) => localizeHref(to, lang), [lang]);

  return { lang, setLang, href };
}
