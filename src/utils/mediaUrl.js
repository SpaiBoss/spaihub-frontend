/**
 * Turn API-relative upload paths into a URL the browser can load.
 */
export function resolveMediaUrl(url) {
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  if (url.startsWith('/')) {
    const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
    return apiBase ? `${apiBase}${url}` : url;
  }
  if (url.startsWith('logos/')) {
    const apiBase = (import.meta.env.VITE_API_URL || '').replace(/\/$/, '');
    return apiBase ? `${apiBase}/media/${url}` : `/media/${url}`;
  }
  return url;
}
