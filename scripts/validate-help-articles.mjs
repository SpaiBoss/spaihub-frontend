import { readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '../src/help/articles');

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

function parseFrontmatter(raw) {
  const text = String(raw || '').replace(/^\uFEFF/, '');
  if (!text.startsWith('---')) return { data: {}, content: text };
  const end = text.indexOf('\n---', 3);
  if (end === -1) return { data: {}, content: text };
  const yaml = text.slice(4, end);
  const content = text.slice(end + 4).replace(/^\s*\r?\n/, '');
  const data = {};
  yaml.split(/\r?\n/).forEach((line) => {
    const kv = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!kv) return;
    const key = kv[1];
    const val = kv[2].trim();
    if (val.startsWith('[') && val.endsWith(']')) {
      data[key] = parseInlineArray(val);
      return;
    }
    data[key] = unquote(val);
  });
  return { data, content };
}

const langs = ['en', 'fr'];
const byLang = {};
for (const lang of langs) {
  const files = readdirSync(join(root, lang)).filter((f) => f.endsWith('.md'));
  byLang[lang] = files.map((f) => {
    const { data, content } = parseFrontmatter(readFileSync(join(root, lang, f), 'utf8'));
    const words = content.trim().split(/\s+/).filter(Boolean).length;
    return { file: f, ...data, words };
  });
}

const enSlugs = new Set(byLang.en.map((a) => a.slug));
const frSlugs = new Set(byLang.fr.map((a) => a.slug));
const ids = Object.fromEntries(byLang.en.map((a) => [a.id, a.slug]));
const broken = [];
for (const a of [...byLang.en, ...byLang.fr]) {
  for (const r of a.related || []) {
    if (!ids[r]) broken.push(`${a.file} (${a.id}) -> ${r}`);
  }
}

const report = {
  en: byLang.en.length,
  fr: byLang.fr.length,
  missingFr: [...enSlugs].filter((s) => !frSlugs.has(s)),
  extraFr: [...frSlugs].filter((s) => !enSlugs.has(s)),
  missingId: byLang.en.filter((a) => !a.id).map((a) => a.file),
  brokenRelated: broken,
  shortEn: byLang.en.filter((a) => a.words < 350).map((a) => `${a.file} ${a.words}`),
  enMin: Math.min(...byLang.en.map((a) => a.words)),
  enMax: Math.max(...byLang.en.map((a) => a.words)),
  enAvg: Math.round(byLang.en.reduce((s, a) => s + a.words, 0) / byLang.en.length),
  frMin: Math.min(...byLang.fr.map((a) => a.words)),
  frAvg: Math.round(byLang.fr.reduce((s, a) => s + a.words, 0) / byLang.fr.length),
};

console.log(JSON.stringify(report, null, 2));
if (report.en !== 63 || report.fr !== 63 || report.brokenRelated.length || report.missingFr.length) {
  process.exitCode = 1;
}
