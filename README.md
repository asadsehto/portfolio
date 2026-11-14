# Asad Saleem — Portfolio

**Personal portfolio for AI engineering and research, built with React, Vite and Framer Motion.**

The same content can be read in eight different eras — an illuminated codex (c. 1400), International Style (1960), a 60s spy title sequence (1964), a teletype printout (1972), a Sunday magazine (1974), a 16-bit character sheet (1994), a desktop OS (1998) and a modern bento grid (2026). First-time visitors pick one; the choice is remembered, can be changed from the "Era" button, and can be shared with `?era=<id>`. Design decisions and the skills that govern them are in [`DESIGN.md`](DESIGN.md).

The default era is designed like a night at the cinema: a film-leader countdown, a marquee menu, research as the
"Feature Presentation", projects as movie posters ("Now Showing"), experience as a film strip
("Filmography"), skills as end credits ("Cast & Crew"), favourite films on a cinema letter board ("Director's Picks"), and contact as an "Admit One" ticket.

[Visit portfolio](https://asadsaleem.tech/) · [GitHub profile](https://github.com/asadsehto) · [LinkedIn](https://www.linkedin.com/in/asadsaleemsahto/) · [Kaggle](https://www.kaggle.com/asadsahto)

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

- `src/pages/Home.jsx` — the cinema era's home page.
- `src/themes/` — the other seven eras (`<id>/Theme.jsx` + `<id>.css`), the registry and the theme hook.
- `src/components/EraPicker.jsx` — the first-visit picker and the floating switcher.
- `.claude/skills/` — design skills loaded by Claude Code in this repo (see `DESIGN.md`).
- `src/pages/Articles.jsx` — the articles list and article pages.
- `src/data/content.js` — profile, research, projects, open-source contributions, experience, skills and favourite films.
- `src/data/articles.js` — articles (edit or add one here and it gets its own page, SEO tags and sitemap entry).
- `src/seo.js` — page titles, descriptions, social-preview tags and structured data.
- `scripts/prerender.mjs` — renders every page to static HTML at build time, plus `404.html` and `sitemap.xml`.
- `public/stills/` — project thumbnails; `public/og.jpg` — social share image.
- `netlify.toml` — Netlify build settings.

## Adding an article

Add an object to `src/data/articles.js` with a `slug`, `title`, `dek`, `date`, `tag`, `still`, `keywords`, `source` and `body`, then run `npm run build`.

## Contact

[asadsaleemsahto@gmail.com](mailto:asadsaleemsahto@gmail.com)
