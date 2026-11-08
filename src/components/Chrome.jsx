import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { profile } from '../data/content';

const reveal = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.7, 0.2, 1] } },
};

export function Reveal({ children, delay = 0, className, as = 'div', ...rest }) {
  const M = motion[as];
  return (
    <M
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ delay }}
      {...rest}
    >
      {children}
    </M>
  );
}

/* Film-leader countdown, shown once per visit on the home page. */
export function Leader({ onDone }) {
  const [n, setN] = useState(3);
  useEffect(() => {
    if (n === 0) {
      onDone();
      return;
    }
    const t = setTimeout(() => setN(n - 1), 600);
    return () => clearTimeout(t);
  }, [n, onDone]);

  return (
    <motion.div className="leader" exit={{ opacity: 0 }} transition={{ duration: 0.45 }} onClick={onDone} role="presentation">
      <div className="leader__ring">
        <div key={n} className="leader__sweep" />
        <span className="leader__cross leader__cross--h" />
        <span className="leader__cross leader__cross--v" />
        <span className="leader__num">{n || ''}</span>
      </div>
      <button className="leader__skip" onClick={onDone}>Skip intro ↵</button>
    </motion.div>
  );
}

const NAV = [
  ['/#feature', 'Feature'],
  ['/#showing', 'Now Showing'],
  ['/#filmography', 'Filmography'],
  ['/#picks', 'Picks'],
  ['/articles/', 'Press'],
  ['/#tickets', 'Tickets'],
];

export function Marquee({ current }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="marquee">
      <a href="/" className="marquee__logo" aria-label="Asad Saleem — home">
        <span>AS</span>
        <small>Pictures</small>
      </a>
      <button className="marquee__burger" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="site-nav" aria-label="Menu">
        {open ? '✕' : '☰'}
      </button>
      <nav id="site-nav" className={open ? 'is-open' : ''} aria-label="Main">
        {NAV.map(([href, label]) => (
          <a
            key={href}
            href={href}
            onClick={() => setOpen(false)}
            aria-current={current && href.startsWith(current) ? 'page' : undefined}
          >
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__end">The End</p>
      <p>No small language models were harmed in the making of this portfolio.</p>
      <p className="footer__links">
        <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
        <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
        <a href={profile.links.kaggle} target="_blank" rel="noreferrer">Kaggle</a>
        <a href="/articles/">Articles</a>
      </p>
      <p className="footer__fine">© 2026 Asad Saleem · All rights reserved</p>
    </footer>
  );
}

export function Atmosphere() {
  return (
    <>
      <div className="grain" aria-hidden />
      <div className="vignette" aria-hidden />
    </>
  );
}
