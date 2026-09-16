import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  isPublicLocalizedPath,
  pathHasLangPrefix,
  STORAGE_KEY,
  withLangPrefix,
  normalizeLang,
} from './paths';

export default function LocaleSync() {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.lang = i18n.language?.startsWith('fr') ? 'fr' : 'en';
  }, [i18n.language]);

  useEffect(() => {
    if (!isPublicLocalizedPath(pathname)) return;
    const fromUrl = pathHasLangPrefix(pathname) ? 'fr' : 'en';

    let stored = null;
    try {
      stored = localStorage.getItem(STORAGE_KEY);
    } catch {
      /* ignore */
    }

    const browserFr =
      typeof navigator !== 'undefined' && normalizeLang(navigator.language) === 'fr';
    if (!stored && fromUrl === 'en' && browserFr) {
      const nextPath = withLangPrefix(pathname, 'fr');
      try {
        localStorage.setItem(STORAGE_KEY, 'fr');
      } catch {
        /* ignore */
      }
      void i18n.changeLanguage('fr');
      if (nextPath !== pathname) {
        navigate(`${nextPath}${search}${hash}`, { replace: true });
      }
      return;
    }

    if (!i18n.language?.startsWith(fromUrl)) {
      void i18n.changeLanguage(fromUrl);
      try {
        localStorage.setItem(STORAGE_KEY, fromUrl);
      } catch {
        /* ignore */
      }
    }
  }, [pathname, search, hash, i18n, navigate]);

  return null;
}
