import { CircleHelp } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { helpHref } from '../i18n/paths';
import { useLocale } from '../i18n/useLocale';
import { LocaleLink } from './LocaleLink';

export default function HelpTip({ slug, className = '' }) {
  const { t } = useTranslation('common');
  const { lang } = useLocale();
  if (!slug) return null;
  return (
    <LocaleLink
      to={helpHref(slug, lang)}
      className={`inline-flex items-center justify-center text-navy/40 hover:text-brand min-h-[28px] min-w-[28px] ${className}`}
      aria-label={t('helpTip')}
      title={t('helpTip')}
    >
      <CircleHelp className="w-4 h-4" strokeWidth={1.75} />
    </LocaleLink>
  );
}
