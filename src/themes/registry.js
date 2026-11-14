// Every genre the site can be viewed in. Each one is a different structure, not a colour swap.
// `fonts` is the Google Fonts css2 query loaded only when that genre is active (or teased).
export const THEMES = [
  {
    id: 'cinema',
    name: 'Spy Thriller',
    line: 'Cut-paper 60s opening titles. The feature presentation.',
    fonts: 'family=Anton&family=Instrument+Serif:ital@0;1&family=IBM+Plex+Mono:wght@400;500&family=Instrument+Sans:wght@400;500;600',
    swatch: ['#0b0a08', '#efe6d2', '#d7261e', '#f2b33d'],
    display: "'Anton', sans-serif",
  },
  {
    id: 'space',
    name: 'Space Odyssey',
    line: 'Mission control: telemetry, a launch sequence, a crew manifest.',
    fonts: 'family=Michroma&family=Chakra+Petch:wght@400;600',
    swatch: ['#050914', '#dfe7ff', '#4fd1ff', '#ff8a3d'],
    display: "'Michroma', sans-serif",
  },
  {
    id: 'neon',
    name: 'Neon Grid',
    line: 'Inside the machine: a lit grid floor, light trails, glowing panels.',
    fonts: 'family=Audiowide&family=Exo+2:wght@400;600;800',
    swatch: ['#06060f', '#e8f6ff', '#19e6ff', '#ff2e97'],
    display: "'Audiowide', sans-serif",
  },
  {
    id: 'western',
    name: 'Western',
    line: 'A wanted poster, a saloon notice board, bounties for every project.',
    fonts: 'family=Rye&family=Libre+Baskerville:ital,wght@0,400;0,700;1,400',
    swatch: ['#d9c39a', '#2a1a0e', '#8c1d14', '#5b3b1f'],
    display: "'Rye', serif",
  },
  {
    id: 'codex',
    name: 'Fantasy Epic',
    line: 'An illuminated chronicle: rubrics, drop caps and marginal notes.',
    fonts: 'family=UnifrakturMaguntia&family=Cinzel:wght@400;700&family=EB+Garamond:ital,wght@0,400;0,600;1,400',
    swatch: ['#efe3c6', '#2b1d12', '#9b2318', '#b8862b'],
    display: "'UnifrakturMaguntia', serif",
  },
  {
    id: 'terminal',
    name: 'Conspiracy Thriller',
    line: 'A paper trail, printed one line at a time. The most basic one.',
    fonts: 'family=Courier+Prime:wght@400;700',
    swatch: ['#f1efe2', '#1d1c18', '#c9d9b8', '#6e6a5a'],
    display: "'Courier Prime', monospace",
  },
  {
    id: 'groovy',
    name: 'Seventies Caper',
    line: 'A Sunday supplement: warm inks, a contents page, pull quotes.',
    fonts: 'family=Shrikhand&family=Karla:wght@400;700',
    swatch: ['#f6e7c1', '#d9641c', '#7a8c2e', '#4a2c17'],
    display: "'Shrikhand', serif",
  },
  {
    id: 'arcade',
    name: 'RPG Adventure',
    line: 'A 16-bit menu: quests, guild, journal, party, save point.',
    fonts: 'family=Press+Start+2P&family=VT323',
    swatch: ['#1b1f5a', '#5fc4f0', '#ffd34d', '#fff6d5'],
    display: "'Press Start 2P', monospace",
  },
  {
    id: 'desktop',
    name: 'Y2K Techno-Thriller',
    line: 'A desktop with windows to open and drag. Start with Start.',
    fonts: 'family=Pixelify+Sans:wght@400;700&family=IBM+Plex+Sans:wght@400;600',
    swatch: ['#008080', '#c0c0c0', '#000080', '#ffffff'],
    display: "'Pixelify Sans', sans-serif",
  },
  {
    id: 'swiss',
    name: 'Art-house',
    line: 'A festival poster grid: one grotesk, one red, nothing decorative.',
    fonts: 'family=Archivo:wdth,wght@62..125,400..900',
    swatch: ['#f4f4f0', '#111111', '#e2231a', '#9a9a94'],
    display: "'Archivo', sans-serif",
  },
];

export const DEFAULT_THEME = 'cinema';
export const themeById = Object.fromEntries(THEMES.map((t) => [t.id, t]));
export const isTheme = (id) => Boolean(themeById[id]);
