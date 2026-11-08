# Asad Saleem — Portfolio

**Personal portfolio for AI engineering and research, built with React, Vite and Framer Motion.**

The site is designed like a night at the cinema: a film-leader countdown, a marquee menu, research as the
"Feature Presentation", projects as movie posters ("Now Showing"), experience as a film strip
("Filmography"), skills as end credits ("Cast & Crew"), favourite films on a cinema letter board ("Director's Picks"), and contact as an "Admit One" ticket.

[Visit portfolio](https://asadsahto.netlify.app/) · [GitHub profile](https://github.com/asadsehto) · [LinkedIn](https://www.linkedin.com/in/asadsaleemsahto/) · [Kaggle](https://www.kaggle.com/asadsahto)

## Development

```bash
git clone https://github.com/asadsehto/portfolio.git
cd portfolio
npm ci
npm run dev
```

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite development server |
| `npm run build` | Build the site for deployment |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |

## Repository map

- `src/pages/Home.jsx` — home page sections (hero, research, projects, filmography, picks, press, contact).
- `src/pages/Articles.jsx` — the articles list and article pages.
- `src/data/content.js` — profile, research, projects, experience, skills and favourite films.
- `src/data/articles.js` — articles (edit or add one here and it gets its own page, SEO tags and sitemap entry).
- `src/seo.js` — page titles, descriptions, social-preview tags and structured data.
- `scripts/prerender.mjs` — renders every page to static HTML at build time, plus `404.html` and `sitemap.xml`.
- `public/stills/` — project thumbnails; `public/og.jpg` — social share image.
- `netlify.toml` — Netlify build settings.

## Adding an article

Add an object to `src/data/articles.js` with a `slug`, `title`, `dek`, `date`, `tag`, `still`, `keywords`, `source` and `body`, then run `npm run build`.

## Contact

[asadsaleemsahto@gmail.com](mailto:asadsaleemsahto@gmail.com)
