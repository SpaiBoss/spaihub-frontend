export const STORAGE_KEY = 'spaihub_lang';

export function normalizeLang(value) {
  if (!value) return 'en';
  return String(value).toLowerCase().startsWith('fr') ? 'fr' : 'en';
}

export function stripLangPrefix(pathname = '/') {
  if (pathname === '/fr' || pathname === '/fr/') return '/';
  if (pathname.startsWith('/fr/')) {
    const rest = pathname.slice(3);
    return rest.startsWith('/') ? rest : `/${rest}`;
  }
  return pathname || '/';
}

export function pathHasLangPrefix(pathname = '') {
  return pathname === '/fr' || pathname.startsWith('/fr/');
}

export function withLangPrefix(pathname = '/', lang = 'en') {
  const clean = stripLangPrefix(pathname);
  if (normalizeLang(lang) !== 'fr') return clean;
  if (clean === '/') return '/fr';
  return `/fr${clean}`;
}

const PUBLIC_PREFIXES = [
  '/',
  '/features',
  '/how-it-works',
  '/pricing',
  '/faq',
  '/contact',
  '/help',
  '/for',
];

export function isPublicLocalizedPath(pathname = '/') {
  const p = stripLangPrefix(pathname);
  return PUBLIC_PREFIXES.some((prefix) => {
    if (prefix === '/') return p === '/';
    return p === prefix || p.startsWith(`${prefix}/`);
  });
}

export function localizeHref(to, lang = 'en') {
  if (!to || typeof to !== 'string') return to;
  if (to.startsWith('http') || to.startsWith('mailto:') || to.startsWith('tel:') || to.startsWith('#')) {
    return to;
  }
  const [pathPart, hash] = to.split('#');
  const [path, search] = pathPart.split('?');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const localized = isPublicLocalizedPath(normalized)
    ? withLangPrefix(normalized, lang)
    : stripLangPrefix(normalized);
  return `${localized}${search ? `?${search}` : ''}${hash ? `#${hash}` : ''}`;
}

export function helpHref(slug, lang = 'en') {
  const base = normalizeLang(lang) === 'fr' ? '/fr/help' : '/help';
  if (!slug) return base;
  return `${base}/${String(slug).replace(/^\//, '')}`;
}

export function publicSiteUrl() {
  const fromEnv = String(import.meta.env.VITE_PUBLIC_SITE_URL || '').replace(/\/$/, '');
  if (fromEnv) return fromEnv;
  if (typeof window !== 'undefined' && window.location?.origin) return window.location.origin;
  return 'https://spaihub.net';
}
