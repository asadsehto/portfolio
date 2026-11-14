import { useEffect, useRef, useState } from 'react';
import { THEMES } from '../themes/registry';
import { loadAllFonts } from '../themes/useTheme';

/* One card per era. The preview is drawn in CSS from the era's own palette and display face,
   so the picker teases every look without rendering eight pages. */
function EraCard({ t, active, onPick, autoFocus }) {
  return (
    <button
      className={`era ${active ? 'is-active' : ''}`}
      style={{ '--e0': t.swatch[0], '--e1': t.swatch[1], '--e2': t.swatch[2], '--e3': t.swatch[3], '--ef': t.display }}
      onClick={() => onPick(t.id)}
      aria-pressed={active}
      autoFocus={autoFocus}
    >
      <span className={`era__art era__art--${t.id}`} aria-hidden>
        <i /><i /><i /><i />
        <b>{t.id === 'terminal' ? '> asad_' : t.id === 'desktop' ? 'Asad.exe' : 'Asad'}</b>
      </span>
      <span className="era__meta">
        <span className="era__year">{t.year}</span>
        <span className="era__name">{t.name}</span>
        <span className="era__line">{t.line}</span>
      </span>
    </button>
  );
}

/* First-visit screen: the whole site is behind it; pick an era to open it. */
export function EraLobby({ onPick }) {
  const [hi, setHi] = useState(2); // the highlight walks the eras until the visitor moves
  const stop = useRef(false);
  useEffect(() => {
    loadAllFonts();
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const id = setInterval(() => { if (!stop.current) setHi((h) => (h + 1) % THEMES.length); }, 1300);
    return () => clearInterval(id);
  }, []);
  const surprise = () => onPick(THEMES[Math.floor(Math.random() * THEMES.length)].id);

  return (
    <div className="lobby" role="dialog" aria-modal="true" aria-labelledby="lobby-h" onPointerMove={() => { stop.current = true; }} onKeyDown={() => { stop.current = true; }}>
      <div className="lobby__inner">
        <header className="lobby__head">
          <h1 id="lobby-h">Same portfolio. Eight eras.</h1>
          <p>Asad Saleem, AI engineer and researcher. Pick how you want to read it; you can switch any time.</p>
        </header>
        <div className="lobby__grid">
          {THEMES.map((t, i) => <EraCard key={t.id} t={t} active={hi === i} onPick={onPick} autoFocus={i === 2} />)}
        </div>
        <div className="lobby__foot">
          <button className="lobby__btn" onClick={surprise}>Surprise me</button>
          <button className="lobby__btn lobby__btn--ghost" onClick={() => onPick('cinema')}>Just show me the site</button>
        </div>
      </div>
    </div>
  );
}

/* Always-available switcher: a small button that opens the same grid as a sheet. */
export function EraSwitch({ theme, setTheme }) {
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
      <button className="era-fab" onClick={() => setOpen(true)} aria-haspopup="dialog" aria-expanded={open}>
        <span className="era-fab__dot" aria-hidden />
        <span className="era-fab__label">Era</span>
        <span className="era-fab__cur">{current?.year}</span>
      </button>
      {open && (
        <div className="sheet" role="dialog" aria-modal="true" aria-label="Change era" onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
          <div className="sheet__panel">
            <div className="sheet__head">
              <h2>Change era</h2>
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
