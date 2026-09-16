import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button } from '../components/ui';
import { LocaleLink } from '../components/LocaleLink';

export default function NotFound() {
  const { t } = useTranslation('common');
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-muted px-4">
      <div className="text-center max-w-md">
        <p className="text-5xl font-semibold text-navy font-mono tracking-tight">404</p>
        <h1 className="text-lg font-semibold text-navy mt-4">{t('errors.notFound')}</h1>
        <p className="text-navy/55 mt-2 text-sm">{t('errors.notFoundBody')}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-8">
          <LocaleLink to="/">
            <Button>{t('errors.goHome')}</Button>
          </LocaleLink>
          <Link to="/login">
            <Button variant="secondary">{t('errors.ownerLogin')}</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
