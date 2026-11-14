# DESIGN.md — asadsaleem.tech

One portfolio, eight visual worlds. Every era renders the same content (`src/data/content.js`, `src/data/articles.js`) in a different *structure*, not a recolour. The visitor picks an era on first visit (`EraLobby`), can change it any time (`EraSwitch`, bottom-right), and can share one with `?era=<id>`.

Skills that govern this file and every era (installed in `.claude/skills/`, loaded by Claude Code in this repo):

| Skill | What it decides here |
|---|---|
| `frontend-design` (Anthropic) | A design brief per era before code; no "AI defaults" (eyebrow labels, 01/02/03 markers without a sequence, gradient text, one-word colour accents in headlines, generic card kits). |
| `ui-ux-pro-max` | Style, palette and font-pairing grounding (`styles.csv` queries), 4.5:1 contrast, 44px targets, mobile-first breakpoints, reduced motion. |
| `taste-skill` (design-taste-frontend) | Equal content edges, every visual draws at 1440/1024/768/390, real content only, hover micro-interactions that answer the pointer, no scroll-triggered fade-ins. |
| `impeccable` | Mode: **Experience** (a portfolio: the artifact leads, the interface recedes). Craft floor: contrast, depth, spacing, type measure, one authored motion moment, themed browser surfaces (selection, focus). |
| `web-design-guidelines` + `react-best-practices` (Vercel) | Keyboard focus visible, `aria-current`, real buttons for actions, no layout thrash, no effects that set state synchronously. |
| `emil-design-eng` + `animate` (Emil Kowalski) | Easing `cubic-bezier(0.23,1,0.32,1)` for enter/exit, `ease` for hover; UI motion ≤ 300 ms; press feedback `scale(0.97)`; `@media (hover:hover) and (pointer:fine)` on hover motion; `prefers-reduced-motion` ships with every animation; keyboard-triggered actions do not animate. |

Two of the skills ship executable tooling (`impeccable`'s launcher binary, `taste-skill`'s gate scripts). This build follows their written references directly; the binaries were not run in this environment.

## The eras

| id | Era | World (what it is made of) | Type | Palette | Signature move |
|---|---|---|---|---|---|
| `codex` | c. 1400 | An illuminated manuscript: title page, numbered folios, red rubrics, drop capitals, marginal glosses | UnifrakturMaguntia (title only), Cinzel (headings), EB Garamond (text) | parchment `#efe3c6`, ink `#2b1d12`, rubric `#9b2318`, gold `#b8862b`, lapis `#1f3f7a` | Each section is a folio with a gloss in the margin; "letters sent abroad" = open source |
| `swiss` | 1960 | International Typographic Style: a 12-column poster grid, data as tables and indices | Archivo (variable width: 75 for display, 100 for text) | `#f4f4f0`, `#111`, one red `#e2231a` (text red `#b81b11`) | Giant condensed name, a single red bar, work as a numbered table |
| `cinema` | 1964 | Cut-paper 60s spy title sequence (the original site) | Anton, Instrument Serif, IBM Plex Mono, Instrument Sans | `#0b0a08`, cream, red, amber | Film-leader countdown; the chase video |
| `terminal` | 1972 | A teletype printout on fanfold paper: text only, typed once | Courier Prime | paper `#f1efe2`, green bar `#d6e3c4`, ink `#1d1c18` | `whoami` / `ls` / `cat` / `git log` / `finger` as the whole structure |
| `groovy` | 1974 | A Sunday colour supplement: cover, contents page, columns, pull quotes, classifieds | Shrikhand (display), Karla (text) | cream `#f6e7c1`, orange `#d9641c` (text `#a3440c`), avocado `#7a8c2e` (text `#5a6a1c`), brown `#4a2c17`, mustard `#e8b73a` | The contents page as navigation; open source as "letters" with a stamp |
| `arcade` | 1994 | A 16-bit RPG menu: status, quests, guild, journal, party, library, save point | Press Start 2P (labels), VT323 (text) | `#1b1f5a`, sky `#5fc4f0`, gold `#ffd34d`, cream `#fff6d5` | Real tablist with arrow keys; stat bars are labelled self-assessed |
| `desktop` | 1998 | A desktop OS: icons open draggable windows, taskbar, Start menu | Pixelify Sans (title bars), IBM Plex Sans (UI) | teal `#008080`, grey `#c0c0c0`, navy `#000080` | Windows are the sections; `Open Source.log` is a terminal window |
| `bento` | 2026 | One tiled grid; tile size follows content size; no section headers | Bricolage Grotesque (display), Manrope (text) | `#f7f6f2`, ink `#14151a`, cobalt `#1f4fd8`, soft `#e7ebf7` | Dark hero tile + portrait tile; contact is a full-width cobalt tile |

## Shared rules

- **Tokens.** Each era sets `--t-bg --t-ink --t-accent --t-muted --t-line --t-display --t-body` on `html[data-theme]`; the article pages read them, so an article keeps the era's palette and faces with one reading layout.
- **Motion budget.** One authored moment per era (the codex has none by design; the terminal types once; the lobby's highlight walks until the pointer moves). Switching eras cross-fades through the View Transitions API when available and reduced motion is off.
- **Hover.** Only under `(hover: hover) and (pointer: fine)`; lifts are 2–3 px; images zoom or desaturate-to-colour, never tilt.
- **Targets.** 44 px minimum on every control, including nav links and the era switcher.
- **Contrast.** Measured per era with axe (WCAG 2.1 AA): all eight eras and the lobby report 0 violations. Where a brand colour fails on text, a darker text variant is used (`--t-accent-text`), and the bright one is kept for large type and bands.
- **Content.** Nothing invented: every fact comes from the GitHub profile, repositories and PR/issue pages (stars checked 2026-11-14). The RPG stat bars are the only playful numbers and say so on the sheet.
- **Fonts.** Google Fonts, loaded per era only when that era (or the picker) is active; the pre-rendered page ships the cinema fonts in `<head>`.

## Out of scope / known limits

- The desktop era is a single-page desktop; on phones the windows stack instead of floating.
- The arcade's "LV 23" and stat bars are decoration, labelled as such.
- Article pages have one layout across eras (Read mode), restyled by tokens.
