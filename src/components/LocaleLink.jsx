import { Link, NavLink } from 'react-router-dom';
import { useLocale } from '../i18n/useLocale';

export function LocaleLink({ to, children, ...props }) {
  const { href } = useLocale();
  return (
    <Link to={href(to)} {...props}>
      {children}
    </Link>
  );
}

export function LocaleNavLink({ to, children, ...props }) {
  const { href } = useLocale();
  return (
    <NavLink to={href(to)} {...props}>
      {children}
    </NavLink>
  );
}
