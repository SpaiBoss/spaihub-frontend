import MiniSearch from 'minisearch';

const enRaw = import.meta.glob('./articles/en/*.md', { query: '?raw', eager: true, import: 'default' });
const frRaw = import.meta.glob('./articles/fr/*.md', { query: '?raw', eager: true, import: 'default' });

function unquote(value) {
  const s = String(value ?? '').trim();
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}

function parseInlineArray(raw) {
  const inner = raw.slice(1, -1).trim();
  if (!inner) return [];
  const out = [];
  let cur = '';
  let quote = null;
  for (let i = 0; i < inner.length; i += 1) {
    const ch = inner[i];
    if (quote) {
      if (ch === quote) quote = null;
      else cur += ch;
      continue;
    }
    if (ch === '"' || ch === "'") {
      quote = ch;
      continue;
    }
    if (ch === ',') {
      out.push(unquote(cur));
      cur = '';
      continue;
    }
    cur += ch;
  }
  if (cur.trim() || quote === null) {
    const item = unquote(cur);
    if (item) out.push(item);
  }
  return out;
}

function parseScalar(raw) {
  const s = unquote(raw);
  if (s === '') return '';
  if (/^-?\d+$/.test(s)) return Number(s);
  return s;
}

/** Minimal YAML frontmatter (flat keys, quoted strings, inline arrays). */
export function parseFrontmatter(raw) {
  const text = String(raw || '').replace(/^\uFEFF/, '');
  if (!text.startsWith('---')) return { data: {}, content: text };
  const end = text.indexOf('\n---', 3);
  if (end === -1) return { data: {}, content: text };
  const yaml = text.slice(4, end);
  const content = text.slice(end + 4).replace(/^\s*\r?\n/, '');
  const data = {};
  let currentListKey = null;
  yaml.split(/\r?\n/).forEach((line) => {
    const listItem = line.match(/^\s*-\s+(.*)$/);
    if (listItem && currentListKey) {
      if (!Array.isArray(data[currentListKey])) data[currentListKey] = [];
      data[currentListKey].push(unquote(listItem[1]));
      return;
    }
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) return;
    currentListKey = null;
    const key = kv[1];
    const val = kv[2].trim();
    if (val === '' || val === '|' || val === '>') {
      data[key] = [];
      currentListKey = key;
      return;
    }
    if (val.startsWith('[') && val.endsWith(']')) {
      data[key] = parseInlineArray(val);
      return;
    }
    data[key] = parseScalar(val);
  });
  return { data, content };
}

function parseFiles(files, lang) {
  return Object.values(files).map((raw) => {
    const { data, content } = parseFrontmatter(typeof raw === 'string' ? raw : String(raw || ''));
    return {
      id: data.id,
      slug: data.slug,
      title: data.title,
      description: data.description || '',
      role: data.role || [],
      section: data.section || 'tutorials',
      intents: data.intents || [],
      buttons: data.buttons || [],
      do_not_say: data.do_not_say || [],
      related: data.related || [],
      updatedAt: data.updatedAt || '',
      minutes: Number.parseInt(String(data.minutes ?? ''), 10) || 5,
      body: content.trim(),
      lang,
    };
  }).filter((a) => a.id && a.slug);
}

const ALL = [
  ...parseFiles(enRaw, 'en'),
  ...parseFiles(frRaw, 'fr'),
];

const indexes = {};

function getIndex(lang) {
  if (indexes[lang]) return indexes[lang];
  const mini = new MiniSearch({
    fields: ['title', 'description', 'body', 'buttons', 'intents'],
    storeFields: ['slug', 'title', 'description', 'section', 'role'],
    searchOptions: { boost: { title: 4, buttons: 3, intents: 2 }, prefix: true, fuzzy: 0.2 },
  });
  mini.addAll(
    ALL.filter((a) => a.lang === lang).map((a) => ({
      ...a,
      buttons: (a.buttons || []).join(' '),
      intents: (a.intents || []).join(' '),
    }))
  );
  indexes[lang] = mini;
  return mini;
}

export function listArticles(lang = 'en', { role, section } = {}) {
  return ALL.filter((a) => {
    if (a.lang !== lang) return false;
    if (role && !(a.role || []).includes(role)) return false;
    if (section && a.section !== section) return false;
    return true;
  }).sort((a, b) => a.title.localeCompare(b.title));
}

export function getArticle(slug, lang = 'en') {
  return ALL.find((a) => a.slug === slug && a.lang === lang)
    || ALL.find((a) => a.slug === slug && a.lang === 'en')
    || null;
}

export function getArticleById(id, lang = 'en') {
  return ALL.find((a) => a.id === id && a.lang === lang)
    || ALL.find((a) => a.id === id && a.lang === 'en')
    || null;
}

export function searchArticles(query, lang = 'en') {
  const q = String(query || '').trim();
  if (!q) return listArticles(lang);
  try {
    return getIndex(lang).search(q).map((hit) => getArticle(hit.slug, lang)).filter(Boolean);
  } catch {
    return [];
  }
}

export function relatedArticles(article, lang = 'en') {
  if (!article) return [];
  return (article.related || [])
    .map((id) => getArticleById(id, lang))
    .filter(Boolean);
}

export function allSlugs() {
  return [...new Set(ALL.map((a) => a.slug))];
}
