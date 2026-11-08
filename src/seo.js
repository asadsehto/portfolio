// Per-page SEO data, used at build time by scripts/prerender.mjs.
import { articles } from './data/articles.js';
import { profile } from './data/content.js';

export const SITE = 'https://asadsaleem.tech';

const person = {
  '@type': 'Person',
  '@id': `${SITE}/#person`,
  name: profile.name,
  url: `${SITE}/`,
  image: `${SITE}/asad.jpg`,
  jobTitle: 'AI Engineer',
  description: 'AI engineer and independent researcher working on LLM agents and computer vision.',
  worksFor: { '@type': 'Organization', name: 'Miami TV' },
  alumniOf: { '@type': 'CollegeOrUniversity', name: 'Sukkur IBA University' },
  email: `mailto:${profile.email}`,
  knowsAbout: ['Artificial intelligence', 'LLM agents', 'Computer vision', 'Machine learning', 'Retrieval-augmented generation', 'Python', 'React'],
  sameAs: Object.values(profile.links),
};

const crumbs = (items) => ({
  '@type': 'BreadcrumbList',
  itemListElement: items.map(([name, url], i) => ({ '@type': 'ListItem', position: i + 1, name, item: `${SITE}${url}` })),
});

export function pages() {
  const list = [
    {
      url: '/',
      title: 'Asad Saleem — AI Engineer & Researcher | LLM Agents, Computer Vision',
      description:
        'Asad Saleem is an AI engineer and independent researcher working on LLM agents and computer vision. Research on self-improving harnesses for small local models, plus ProfDesk, LecAssist, Quantum-RAG and more.',
      image: '/og.jpg',
      ogType: 'website',
      jsonld: [
        { '@context': 'https://schema.org', '@type': 'WebSite', '@id': `${SITE}/#website`, url: `${SITE}/`, name: 'Asad Saleem', author: { '@id': `${SITE}/#person` } },
        { '@context': 'https://schema.org', '@type': 'ProfilePage', url: `${SITE}/`, mainEntity: person },
      ],
    },
    {
      url: '/articles/',
      title: 'Articles — Asad Saleem',
      description: 'Articles by Asad Saleem on LLM agents, small language models, retrieval and the AI tools he builds.',
      image: '/og.jpg',
      ogType: 'website',
      jsonld: [
        {
          '@context': 'https://schema.org',
          '@type': 'Blog',
          url: `${SITE}/articles/`,
          name: 'Asad Saleem — Articles',
          author: person,
          blogPost: articles.map((a) => ({ '@type': 'BlogPosting', headline: a.title, url: `${SITE}/articles/${a.slug}/`, datePublished: a.date })),
        },
        { '@context': 'https://schema.org', ...crumbs([['Home', '/'], ['Articles', '/articles/']]) },
      ],
    },
    ...articles.map((a) => ({
      url: `/articles/${a.slug}/`,
      title: `${a.title} — Asad Saleem`,
      description: a.dek,
      image: a.still,
      ogType: 'article',
      published: a.date,
      keywords: a.keywords,
      jsonld: [
        {
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: a.title,
          description: a.dek,
          image: `${SITE}${a.still}`,
          datePublished: a.date,
          dateModified: a.date,
          author: person,
          publisher: { '@id': `${SITE}/#person` },
          mainEntityOfPage: `${SITE}/articles/${a.slug}/`,
          keywords: a.keywords.join(', '),
          isBasedOn: a.source,
        },
        { '@context': 'https://schema.org', ...crumbs([['Home', '/'], ['Articles', '/articles/'], [a.title, `/articles/${a.slug}/`]]) },
      ],
    })),
  ];
  return list;
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function headTags(p) {
  const url = `${SITE}${p.url}`;
  const img = `${SITE}${p.image}`;
  const tags = [
    `<title>${esc(p.title)}</title>`,
    `<meta name="description" content="${esc(p.description)}" />`,
    `<link rel="canonical" href="${url}" />`,
    `<meta property="og:type" content="${p.ogType}" />`,
    `<meta property="og:site_name" content="Asad Saleem" />`,
    `<meta property="og:locale" content="en_US" />`,
    `<meta property="og:url" content="${url}" />`,
    `<meta property="og:title" content="${esc(p.title)}" />`,
    `<meta property="og:description" content="${esc(p.description)}" />`,
    `<meta property="og:image" content="${img}" />`,
    `<meta property="og:image:secure_url" content="${img}" />`,
    `<meta property="og:image:type" content="image/jpeg" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="${p.image === '/og.jpg' ? 630 : 750}" />`,
    `<meta property="og:image:alt" content="${esc(p.title)}" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(p.title)}" />`,
    `<meta name="twitter:description" content="${esc(p.description)}" />`,
    `<meta name="twitter:image" content="${img}" />`,
  ];
  if (p.ogType === 'profile') {
    tags.push('<meta property="profile:first_name" content="Asad" />', '<meta property="profile:last_name" content="Saleem" />');
  }
  if (p.ogType === 'article') {
    tags.push(
      `<meta property="article:published_time" content="${p.published}" />`,
      `<meta property="article:author" content="${SITE}/" />`,
      ...p.keywords.map((k) => `<meta property="article:tag" content="${esc(k)}" />`),
    );
  }
  if (p.keywords) tags.push(`<meta name="keywords" content="${esc(p.keywords.join(', '))}" />`);
  for (const j of p.jsonld) tags.push(`<script type="application/ld+json">${JSON.stringify(j).replace(/</g, '\\u003c')}</script>`);
  return tags.join('\n    ');
}
