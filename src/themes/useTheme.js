import { useCallback, useEffect, useState } from 'react';
import { DEFAULT_THEME, THEMES, isTheme, themeById } from './registry';

const KEY = 'era';
const loaded = new Set();

export function loadFonts(id) {
  const t = themeById[id];
  if (!t || loaded.has(id) || typeof document === 'undefined') return;
  loaded.add(id);
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = `https://fonts.googleapis.com/css2?${t.fonts}&display=swap`;
  document.head.appendChild(link);
}
export const loadAllFonts = () => THEMES.forEach((t) => loadFonts(t.id));

function readStored() {
  try {
    const q = new URLSearchParams(window.location.search).get('era');
    if (q && isTheme(q)) return { id: q, fromUrl: true };
    const s = localStorage.getItem(KEY);
    if (s && isTheme(s)) return { id: s, fromUrl: false };
  } catch { /* storage blocked */ }
  return null;
}

/**
 * Theme state. The server and the first client render always use the default era, so the
 * pre-rendered HTML hydrates cleanly; the stored choice is applied right after.
 */
export function useTheme() {
  const [theme, setThemeState] = useState(DEFAULT_THEME);
  const [chosen, setChosen] = useState(true); // false = first visit, show the picker
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = readStored();
    const id = stored ? stored.id : DEFAULT_THEME;
    loadFonts(id);
    document.documentElement.dataset.theme = id;
    const raf = requestAnimationFrame(() => {
      setThemeState(id);
      setChosen(Boolean(stored));
      setReady(true);
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const setTheme = useCallback((id) => {
    if (!isTheme(id)) return;
    loadFonts(id);
    try { localStorage.setItem(KEY, id); } catch { /* ignore */ }
    const apply = () => {
      document.documentElement.dataset.theme = id;
      setThemeState(id);
      setChosen(true);
    };
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    // A cross-fade between two whole page structures: the one place a transition earns its keep.
    if (!reduce && document.startViewTransition) document.startViewTransition(apply);
    else apply();
  }, []);

  return { theme, setTheme, chosen, ready, setChosen };
}
