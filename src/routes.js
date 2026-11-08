import { articleBySlug } from './data/articles';

export function matchRoute(url = '/') {
  const path = url.split(/[?#]/)[0].replace(/\/+$/, '') || '/';
  if (path === '/') return { page: 'home' };
  if (path === '/articles') return { page: 'articles' };
  const m = path.match(/^\/articles\/([^/]+)$/);
  if (m && articleBySlug[m[1]]) return { page: 'article', article: articleBySlug[m[1]] };
  return { page: 'notfound' };
}
