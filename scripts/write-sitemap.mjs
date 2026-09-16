import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const site = (process.env.VITE_PUBLIC_SITE_URL || 'https://spaihub.net').replace(/\/$/, '');
const today = new Date().toISOString().slice(0, 10);

const marketing = [
  '/',
  '/features',
  '/how-it-works',
  '/pricing',
  '/faq',
  '/contact',
  '/for/mikrotik',
  '/for/mobile-money',
  '/for/vouchers',
  '/for/contributors',
  '/help',
  '/help/owners',
  '/help/contributors',
  '/help/tutorials',
  '/help/pro-tips',
  '/help/troubleshooting',
  '/help/glossary',
  '/help/reference',
];

const articles = fs
  .readdirSync(path.join(root, 'src/help/articles/en'))
  .filter((f) => f.endsWith('.md'))
  .map((f) => `/help/${f.replace(/\.md$/, '')}`);

const paths = [...marketing, ...articles];

function loc(pathname, lang) {
  if (lang === 'fr') return pathname === '/' ? `${site}/fr` : `${site}/fr${pathname}`;
  return `${site}${pathname === '/' ? '' : pathname}`;
}

const urls = paths.map((p) => `  <url>
    <loc>${loc(p, 'en')}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${loc(p, 'en')}"/>
    <xhtml:link rel="alternate" hreflang="fr" href="${loc(p, 'fr')}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc(p, 'en')}"/>
    <lastmod>${today}</lastmod>
  </url>
  <url>
    <loc>${loc(p, 'fr')}</loc>
    <xhtml:link rel="alternate" hreflang="en" href="${loc(p, 'en')}"/>
    <xhtml:link rel="alternate" hreflang="fr" href="${loc(p, 'fr')}"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="${loc(p, 'en')}"/>
    <lastmod>${today}</lastmod>
  </url>`).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls}
</urlset>
`;

fs.writeFileSync(path.join(root, 'public/sitemap.xml'), xml);
console.log(`Wrote sitemap with ${paths.length * 2} URLs`);
