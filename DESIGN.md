# DESIGN.md — asadsaleem.tech

One portfolio, ten genres. Every genre renders the same content (`src/data/content.js`, `src/data/articles.js`) in a different *structure*, not a recolour. The **Spy Thriller** is the default. On a first visit a three-second tease (`EraTease`) flips through the other genres and lands on the default; nothing has to be chosen. The visitor can change genre any time (`EraSwitch`, bottom-right) and share one with `?era=<id>`.

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

## The genres

| id | Genre | World (what it is made of) | Type | Palette | Signature move |
|---|---|---|---|---|---|
| `cinema` | Spy Thriller (default) | Cut-paper 60s spy opening titles | Anton, Instrument Serif, IBM Plex Mono, Instrument Sans | `#0b0a08`, cream, red, amber | "Asad Saleem in *Agents of Intelligence*"; the chase video |
| `space` | Space Odyssey | Mission control: telemetry strips, modules, crew manifest, transmissions, a docking port | Michroma (display), Chakra Petch (text) | void `#050914`, phosphor cyan `#4fd1ff`, warning orange `#ff8a3d` | Angled telemetry buttons; status LED; the portrait as a viewport |
| `neon` | Neon Grid | Inside the machine: a perspective grid floor, glowing outline panels, a light-trail timeline | Audiowide (display), Exo 2 (text) | `#06060f`, cyan `#19e6ff` (system), magenta `#ff2e97` (user) | Three slow rings around the portrait; experience as a light trail |
| `western` | Western | A wanted poster on a saloon board; projects as bounty handbills with nails; a telegraph office | Rye (wood type), Libre Baskerville (text) | kraft `#d9c39a`, ink `#2a1a0e`, red `#8c1d14`, wood `#5b3b1f` | Handbills straighten on hover; merged PRs get a double-ruled notice |
| `codex` | Fantasy Epic | An illuminated manuscript: title page, numbered folios, red rubrics, drop capitals, marginal glosses | UnifrakturMaguntia (title), Cinzel (headings), EB Garamond (text) | parchment, ink, rubric red, gold, lapis | Every section is a folio with a gloss in the margin |
| `terminal` | Conspiracy Thriller | A teletype printout on fanfold paper, typed once | Courier Prime | paper, green bar, ink | `whoami` / `ls` / `git log` / `finger` as the structure |
| `groovy` | Seventies Caper | A Sunday colour supplement: cover, contents, columns, pull quotes, classifieds | Shrikhand, Karla | cream, orange, avocado, brown, mustard | The contents page as navigation |
| `arcade` | RPG Adventure | A 16-bit menu: status, quests, guild, journal, party, library, save point | Press Start 2P, VT323 | navy, sky, gold, cream | Real tablist with arrow keys |
| `desktop` | Y2K Techno-Thriller | A desktop OS: icons open draggable windows, taskbar, Start menu | Pixelify Sans, IBM Plex Sans | teal, grey, navy | Windows are the sections |
| `swiss` | Art-house | A festival poster grid, data as tables | Archivo (variable width) | off-white, black, one red | Giant condensed name, one red bar |

Headlines in every genre describe the whole person (engineer + researcher + builder), never one study.

## Shared rules

- **Tokens.** Each era sets `--t-bg --t-ink --t-accent --t-muted --t-line --t-display --t-body` on `html[data-theme]`; the article pages read them, so an article keeps the era's palette and faces with one reading layout.
- **Motion budget.** One authored moment per genre (the codex has none by design; the terminal types once; the tease flips once per session). Switching genres cross-fades through the View Transitions API when available and reduced motion is off.
- **Hover.** Only under `(hover: hover) and (pointer: fine)`; lifts are 2–3 px; images zoom or desaturate-to-colour, never tilt.
- **Targets.** 44 px minimum on every control, including nav links and the era switcher.
- **Contrast.** Measured per genre with axe (WCAG 2.1 AA): all ten genres report 0 violations. Where a brand colour fails on text, a darker text variant is used (`--t-accent-text`), and the bright one is kept for large type and bands.
- **Content.** Nothing invented: every fact comes from the GitHub profile, repositories and PR/issue pages (stars checked 2026-11-14). The RPG stat bars are the only playful numbers and say so on the sheet.
- **Fonts.** Google Fonts, loaded per genre only when that genre (or the switcher) is active; the pre-rendered page ships the cinema fonts in `<head>`.

## Out of scope / known limits

- The desktop era is a single-page desktop; on phones the windows stack instead of floating.
- The arcade's "LV 23" and stat bars are decoration, labelled as such.
- Article pages have one layout across genres (Read mode), restyled by tokens.
