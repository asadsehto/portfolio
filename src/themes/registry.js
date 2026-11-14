// Every era the site can be viewed in. Each one is a different structure, not a colour swap.
// `fonts` is the Google Fonts css2 query loaded only when that era is active (or in the picker).
export const THEMES = [
  {
    id: 'codex',
    name: 'Illuminated Codex',
    year: 'c. 1400',
    line: 'A hand-lettered manuscript: rubrics, drop caps and marginal notes.',
    fonts: 'family=UnifrakturMaguntia&family=Cinzel:wght@400;700&family=EB+Garamond:ital,wght@0,400;0,600;1,400',
    swatch: ['#efe3c6', '#2b1d12', '#9b2318', '#b8862b'],
    display: "'UnifrakturMaguntia', serif",
  },
  {
    id: 'swiss',
    name: 'International Style',
    year: '1960',
    line: 'A poster grid: one grotesk, one red, nothing decorative.',
    fonts: 'family=Archivo:wdth,wght@62..125,400..900',
    swatch: ['#f4f4f0', '#111111', '#e2231a', '#9a9a94'],
    display: "'Archivo', sans-serif",
  },
  {
    id: 'cinema',
    name: 'Spy Title Sequence',
    year: '1964',
    line: 'Cut-paper opening titles. The feature presentation.',
    fonts: 'family=Anton&family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&family=Instrument+Sans:wght@400;500;600',
    swatch: ['#0b0a08', '#efe6d2', '#d7261e', '#f2b33d'],
    display: "'Anton', sans-serif",
  },
  {
    id: 'terminal',
    name: 'Teletype Printout',
    year: '1972',
    line: 'The most basic one: a paper session, typed one line at a time.',
    fonts: 'family=Courier+Prime:wght@400;700',
    swatch: ['#f1efe2', '#1d1c18', '#c9d9b8', '#6e6a5a'],
    display: "'Courier Prime', monospace",
  },
  {
    id: 'groovy',
    name: 'Sunday Magazine',
    year: '1974',
    line: 'Warm inks, rounded display type, a table of contents.',
    fonts: 'family=Shrikhand&family=Karla:wght@400;700',
    swatch: ['#f6e7c1', '#d9641c', '#7a8c2e', '#4a2c17'],
    display: "'Shrikhand', serif",
  },
  {
    id: 'arcade',
    name: 'Character Sheet',
    year: '1994',
    line: 'A 16-bit RPG menu: quests, party, inventory and stats.',
    fonts: 'family=Press+Start+2P&family=VT323',
    swatch: ['#1b1f5a', '#5fc4f0', '#ffd34d', '#fff6d5'],
    display: "'Press Start 2P', monospace",
  },
  {
    id: 'desktop',
    name: 'Desktop OS',
    year: '1998',
    line: 'Windows you can open, drag and close. Start with the Start menu.',
    fonts: 'family=Pixelify+Sans:wght@400;700&family=IBM+Plex+Sans:wght@400;600',
    swatch: ['#008080', '#c0c0c0', '#000080', '#ffffff'],
    display: "'Pixelify Sans', sans-serif",
  },
  {
    id: 'bento',
    name: 'Bento',
    year: '2026',
    line: 'The full modern one: a tiled grid, big type, one cobalt.',
    fonts: 'family=Bricolage+Grotesque:opsz,wght@12..96,400..800&family=Manrope:wght@400;600;800',
    swatch: ['#f7f6f2', '#14151a', '#1f4fd8', '#e7ebf7'],
    display: "'Bricolage Grotesque', sans-serif",
  },
];

export const DEFAULT_THEME = 'cinema';
export const themeById = Object.fromEntries(THEMES.map((t) => [t.id, t]));
export const isTheme = (id) => Boolean(themeById[id]);
