import { useEffect, useRef, useState } from 'react';
import { THEMES } from '../themes/registry';
import { loadAllFonts } from '../themes/useTheme';

/* One card per genre. The preview is drawn in CSS from the genre's own palette and display face. */
function EraCard({ t, active, onPick, big }) {
  return (
    <button
      className={`era ${active ? 'is-active' : ''} ${big ? 'era--big' : ''}`}
      style={{ '--e0': t.swatch[0], '--e1': t.swatch[1], '--e2': t.swatch[2], '--e3': t.swatch[3], '--ef': t.display }}
      onClick={() => onPick(t.id)}
      aria-pressed={active}
    >
      <span className={`era__art era__art--${t.id}`} aria-hidden>
        <i /><i /><i /><i />
        <b>{t.id === 'terminal' ? '> asad_' : t.id === 'desktop' ? 'Asad.exe' : t.id === 'space' ? 'ASD-01' : 'Asad'}</b>
      </span>
      <span className="era__meta">
        <span className="era__name">{t.name}</span>
        <span className="era__line">{t.line}</span>
      </span>
    </button>
  );
}

/* First visit: a three-second channel flip through every genre, landing on the default.
   Nothing to choose; it only shows the others exist. Click anywhere to skip. */
export function EraTease({ onDone }) {
  const others = THEMES.filter((t) => t.id !== 'cinema');
  const [i, setI] = useState(0);
  const done = useRef(false);
  useEffect(() => {
    loadAllFonts();
    const step = 260;
    const id = setInterval(() => setI((n) => n + 1), step);
    const end = setTimeout(() => { if (!done.current) { done.current = true; onDone(); } }, step * others.length + 700);
    return () => { clearInterval(id); clearTimeout(end); };
  }, [onDone, others.length]);
  const t = i < others.length ? others[i] : THEMES[0];
  const landing = i >= others.length;
  return (
    <div className="tease" role="presentation" onClick={() => { if (!done.current) { done.current = true; onDone(); } }}>
      <div className={`tease__card ${landing ? 'is-landing' : ''}`} key={t.id} style={{ '--e0': t.swatch[0], '--e1': t.swatch[1], '--e2': t.swatch[2], '--e3': t.swatch[3], '--ef': t.display }}>
        <span className={`era__art era__art--${t.id}`} aria-hidden><i /><i /><i /><i /><b>{t.id === 'terminal' ? '> asad_' : t.id === 'desktop' ? 'Asad.exe' : t.id === 'space' ? 'ASD-01' : 'Asad'}</b></span>
        <span className="tease__name">{landing ? 'Now showing' : t.name}</span>
      </div>
      <p className="tease__hint">{landing ? 'Spy Thriller' : `${THEMES.length} genres · change any time from the Era button`}</p>
    </div>
  );
}

/* Always-available switcher: a small button that opens the genre grid as a sheet. */
export function EraSwitch({ theme, setTheme, attention }) {
  const [open, setOpen] = useState(false);
  const current = THEMES.find((t) => t.id === theme);
  useEffect(() => {
    if (!open) return;
    loadAllFonts();
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);
  return (
    <>
      <button className={`era-fab ${attention ? 'is-attention' : ''}`} onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open}>
        <span className="era-fab__dot" aria-hidden />
        <span className="era-fab__label">Genre</span>
        <span className="era-fab__cur">{current?.name}</span>
      </button>
      {open && (
        <div className="sheet" role="dialog" aria-modal="true" aria-label="Change genre" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div className="sheet__panel">
            <div className="sheet__head">
              <h2>Same portfolio, {THEMES.length} genres</h2>
              <button className="sheet__close" onClick={() => setOpen(false)} aria-label="Close">✕</button>
            </div>
            <div className="lobby__grid lobby__grid--sheet">
              {THEMES.map((t) => <EraCard key={t.id} t={t} active={t.id === theme} onPick={(id) => { setTheme(id); setOpen(false); }} />)}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
