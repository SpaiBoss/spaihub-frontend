import { LocaleLink } from '../../components/LocaleLink';
import { helpHref } from '../../i18n/paths';

export default function HelpSearch({ query, results, lang, emptyLabel }) {
  if (!query?.trim()) return null;
  if (!results?.length) {
    return <p className="text-sm text-navy/50 mt-8">{emptyLabel}</p>;
  }
  return (
    <ul className="mt-8 space-y-3">
      {results.map((a) => (
        <li key={a.slug}>
          <LocaleLink to={helpHref(a.slug, lang)} className="block p-4 rounded-xl border border-gray-100 hover:border-brand/30">
            <p className="font-medium text-navy">{a.title}</p>
            <p className="text-sm text-navy/50 mt-1">{a.description}</p>
          </LocaleLink>
        </li>
      ))}
    </ul>
  );
}
