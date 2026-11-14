import Codex from './codex/Theme';
import Swiss from './swiss/Theme';
import Terminal from './terminal/Theme';
import Groovy from './groovy/Theme';
import Arcade from './arcade/Theme';
import Desktop from './desktop/Theme';
import Space from './space/Theme';
import Neon from './neon/Theme';
import Western from './western/Theme';

export { THEMES, DEFAULT_THEME, themeById, isTheme } from './registry';
export { useTheme } from './useTheme';

// 'cinema' is the original site (src/pages/Home.jsx) and is rendered by App directly.
export const THEME_PAGES = { space: Space, neon: Neon, western: Western, codex: Codex, swiss: Swiss, terminal: Terminal, groovy: Groovy, arcade: Arcade, desktop: Desktop };
