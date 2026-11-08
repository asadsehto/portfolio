// Writes a static, fully rendered HTML file for every page so search engines and
// link previews (LinkedIn, WhatsApp, X) see real content and per-page meta tags.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const { render } = await import(pathToFileURL(path.join(root, 'dist-server', 'entry-server.js')).href);
const { pages, headTags, SITE } = await import(pathToFileURL(path.join(root, 'dist-server', 'entry-server.js')).href);

const template = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
if (!template.includes('<!--seo-->') || !template.includes('<!--app-->')) {
  throw new Error('index.html is missing the <!--seo--> or <!--app--> placeholder');
}

const build = (page, url) =>
  template.replace('<!--seo-->', headTags(page)).replace('<!--app-->', render(url));

const all = pages();
for (const p of all) {
  const file = path.join(dist, p.url, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, build(p, p.url));
  console.log('prerendered', p.url);
}

// 404 page (Netlify serves dist/404.html for unknown paths)
fs.writeFileSync(
  path.join(dist, '404.html'),
  build({ ...all[0], url: '/404', title: 'Page not found — Asad Saleem', description: 'This page does not exist.', jsonld: [] }, '/404')
    .replace('<link rel="canonical" href="https://asadsahto.netlify.app/404" />', '<meta name="robots" content="noindex" />'),
);

// Sitemap
const today = new Date().toISOString().slice(0, 10);
const urls = all
  .map((p) => `  <url>\n    <loc>${SITE}${p.url}</loc>\n    <lastmod>${p.published || today}</lastmod>\n  </url>`)
  .join('\n');
fs.writeFileSync(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
console.log('sitemap with', all.length, 'urls');

fs.rmSync(path.join(root, 'dist-server'), { recursive: true, force: true });
