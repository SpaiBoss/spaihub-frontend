import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { STORAGE_KEY } from './paths.js';

import enCommon from './locales/en/common.json';
import enAuth from './locales/en/auth.json';
import enMarketing from './locales/en/marketing.json';
import enOwner from './locales/en/owner.json';
import enContributor from './locales/en/contributor.json';
import enAdmin from './locales/en/admin.json';
import enPortal from './locales/en/portal.json';
import enHelp from './locales/en/help.json';

import frCommon from './locales/fr/common.json';
import frAuth from './locales/fr/auth.json';
import frMarketing from './locales/fr/marketing.json';
import frOwner from './locales/fr/owner.json';
import frContributor from './locales/fr/contributor.json';
import frAdmin from './locales/fr/admin.json';
import frPortal from './locales/fr/portal.json';
import frHelp from './locales/fr/help.json';

void i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        common: enCommon,
        auth: enAuth,
        marketing: enMarketing,
        owner: enOwner,
        contributor: enContributor,
        admin: enAdmin,
        portal: enPortal,
        help: enHelp,
      },
      fr: {
        common: frCommon,
        auth: frAuth,
        marketing: frMarketing,
        owner: frOwner,
        contributor: frContributor,
        admin: frAdmin,
        portal: frPortal,
        help: frHelp,
      },
    },
    fallbackLng: 'en',
    supportedLngs: ['en', 'fr'],
    defaultNS: 'common',
    ns: ['common', 'auth', 'marketing', 'owner', 'contributor', 'admin', 'portal', 'help'],
    interpolation: { escapeValue: false },
    nonExplicitSupportedLngs: true,
    load: 'languageOnly',
    detection: {
      order: ['localStorage', 'navigator'],
      lookupLocalStorage: STORAGE_KEY,
      caches: ['localStorage'],
      convertDetectedLanguage: (lng) =>
        String(lng || '').toLowerCase().startsWith('fr') ? 'fr' : 'en',
    },
  });

export default i18n;
