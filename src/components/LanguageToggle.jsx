import { useTranslation } from 'react-i18next';
import { useLocale } from '../i18n/useLocale';

export default function LanguageToggle({ compact = false, className = '' }) {
  const { t } = useTranslation('common');
  const { lang, setLang } = useLocale();

  const btn = (code, label) => (
    <button
      type="button"
      onClick={() => setLang(code)}
      className={`min-h-[36px] min-w-[36px] px-2 rounded-md text-xs font-semibold tracking-wide transition-colors ${
        lang === code
          ? 'bg-brand text-white'
          : 'text-current opacity-60 hover:opacity-100'
      }`}
      aria-pressed={lang === code}
      aria-label={label}
    >
      {label}
    </button>
  );

  return (
    <div
      className={`inline-flex items-center gap-0.5 rounded-lg border border-current/15 p-0.5 ${className}`}
      role="group"
      aria-label={t('language.switchTo')}
    >
      {btn('en', compact ? 'EN' : t('language.en'))}
      {btn('fr', compact ? 'FR' : t('language.fr'))}
    </div>
  );
}
