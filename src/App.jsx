import { useCallback, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { profile, feature, posters, shorts, filmography, crew } from './data/content';
import portrait from './assets/asad.jpg';

const reveal = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.2, 0.7, 0.2, 1] } },
};

const Reveal = ({ children, delay = 0, className, as = 'div' }) => {
  const M = motion[as];
  return (
    <M
      className={className}
      variants={reveal}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-80px' }}
      transition={{ delay }}
    >
      {children}
    </M>
  );
};

/* ---------- Film-leader countdown ---------- */
function Leader({ onDone }) {
  const [n, setN] = useState(3);
  useEffect(() => {
    if (n === 0) {
      onDone();
      return;
    }
    const t = setTimeout(() => setN(n - 1), 650);
    return () => clearTimeout(t);
  }, [n, onDone]);

  return (
    <motion.div
      className="leader"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      onClick={onDone}
      role="presentation"
    >
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

/* ---------- Marquee nav ---------- */
const NAV = [
  ['feature', 'Feature'],
  ['showing', 'Now Showing'],
  ['filmography', 'Filmography'],
  ['crew', 'Cast & Crew'],
  ['tickets', 'Tickets'],
];

function Marquee() {
  const [open, setOpen] = useState(false);
  return (
    <header className="marquee">
      <a href="#top" className="marquee__logo" aria-label="Back to top">
        <span>AS</span>
        <small>Pictures</small>
      </a>
      <button className="marquee__burger" onClick={() => setOpen(!open)} aria-expanded={open} aria-label="Menu">
        {open ? '✕' : '☰'}
      </button>
      <nav className={open ? 'is-open' : ''}>
        {NAV.map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setOpen(false)}>{label}</a>
        ))}
      </nav>
    </header>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.08]);

  return (
    <section className="hero" id="top">
      <div className="hero__beam" aria-hidden />
      <div className="hero__inner">
        <motion.p className="kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          An AS Pictures release · presents
        </motion.p>

        <h1 className="hero__title">
          {['ASAD', 'SALEEM'].map((w, i) => (
            <motion.span
              key={w}
              initial={{ opacity: 0, y: 80, rotateX: -60 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.35 + i * 0.18, duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
            >
              {w}
            </motion.span>
          ))}
        </h1>

        <motion.p
          className="hero__in"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <em>in</em> Machines That Learn to Improve Themselves
        </motion.p>

        <motion.div className="hero__still" style={{ y, scale }}>
          <div className="still">
            <div className="still__sprockets" aria-hidden />
            <img src={portrait} alt="Portrait of Asad Saleem" />
            <div className="still__sprockets still__sprockets--r" aria-hidden />
          </div>
          <span className="still__caption">SC. 01 — TAKE 1 — THE ENGINEER</span>
        </motion.div>

        <motion.div
          className="billing"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <p className="billing__roles">{profile.roles.join('  ·  ')}</p>
          <p className="billing__log">{profile.logline}</p>
          <p className="billing__fine">
            STARRING PYTHON · PYTORCH · OLLAMA · REACT &nbsp; WRITTEN & DIRECTED BY ASAD SALEEM &nbsp;
            {profile.education.toUpperCase()}
          </p>
          <div className="hero__ctas">
            <a className="btn btn--red" href="#showing">Watch the trailer ↓</a>
            <a className="btn" href={`mailto:${profile.email}`}>Book a screening</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Feature presentation ---------- */
function Feature() {
  return (
    <section className="section feature" id="feature">
      <Reveal className="section__head">
        <span className="reel">Reel 01</span>
        <h2>Feature Presentation</h2>
      </Reveal>

      <div className="feature__grid">
        <Reveal className="feature__card">
          <p className="kicker">Research · {feature.year} · Independent</p>
          <h3>{feature.title}</h3>
          <p className="feature__q">“{feature.question}”</p>
          <p className="feature__syn">{feature.synopsis}</p>
          <ul className="feature__guards">
            {feature.safeguards.map((s) => <li key={s}>{s}</li>)}
          </ul>
          <a className="btn btn--red" href={feature.link} target="_blank" rel="noreferrer">
            Read the code & data →
          </a>
        </Reveal>

        <div className="feature__reviews">
          {feature.stats.map((s, i) => (
            <Reveal key={s.value} delay={i * 0.12} className="review">
              <span className="review__stars" aria-hidden>★ ★ ★ ★ ★</span>
              <strong>{s.value}</strong>
              <p>{s.label}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Now showing ---------- */
function Poster({ p, i }) {
  return (
    <Reveal delay={(i % 3) * 0.1} className="poster-wrap">
      <a
        className="poster"
        href={p.link}
        target="_blank"
        rel="noreferrer"
        style={{ '--p1': p.palette[0], '--p2': p.palette[1] }}
      >
        <div className="poster__art" aria-hidden>
          <span className="poster__num">{String(i + 1).padStart(2, '0')}</span>
          <span className="poster__ghost">{p.title}</span>
        </div>
        <div className="poster__body">
          <span className="poster__genre">{p.genre}</span>
          <h3>{p.title}</h3>
          <p className="poster__tag">{p.tagline}</p>
          <p className="poster__blurb">{p.blurb}</p>
          <p className="poster__credits">{p.tech.join(' · ')}</p>
        </div>
      </a>
      {p.live && (
        <a className="poster__live" href={p.live} target="_blank" rel="noreferrer">● Live demo</a>
      )}
    </Reveal>
  );
}

function NowShowing() {
  return (
    <section className="section" id="showing">
      <Reveal className="section__head">
        <span className="reel">Reel 02</span>
        <h2>Now Showing</h2>
        <p className="section__sub">Selected work. Click any poster to enter the theatre.</p>
      </Reveal>
      <div className="posters">
        {posters.map((p, i) => <Poster key={p.title} p={p} i={i} />)}
      </div>

      <Reveal className="shorts">
        <h3 className="shorts__title">Short Films <span>& earlier work</span></h3>
        <ul>
          {shorts.map((s) => (
            <li key={s.title}>
              <a href={s.link} target="_blank" rel="noreferrer">
                <span className="shorts__name">{s.title}</span>
                <span className="shorts__note">{s.note}</span>
                <span className="shorts__lang">{s.lang}</span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

/* ---------- Filmography (film strip) ---------- */
function Filmography() {
  return (
    <section className="section" id="filmography">
      <Reveal className="section__head">
        <span className="reel">Reel 03</span>
        <h2>Filmography</h2>
      </Reveal>
      <div className="strip">
        {filmography.map((f, i) => (
          <Reveal key={f.org} delay={i * 0.1} className="frame">
            <span className="frame__tc">00:0{i}:00:00</span>
            {f.now && <span className="frame__rec">● REC</span>}
            <p className="frame__dates">{f.dates}</p>
            <h3>{f.role}</h3>
            <p className="frame__org">{f.org}</p>
            <p className="frame__note">{f.note}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Cast & crew (rolling credits) ---------- */
function Crew() {
  return (
    <section className="section crew" id="crew">
      <Reveal className="section__head section__head--center">
        <span className="reel">Reel 04</span>
        <h2>Cast & Crew</h2>
      </Reveal>
      <div className="credits">
        {crew.map((c, i) => (
          <Reveal key={c.dept} delay={i * 0.1} className="credits__block">
            <p className="credits__dept">{c.dept}</p>
            <ul>
              {c.names.map((n) => <li key={n}>{n}</li>)}
            </ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Ticket / contact ---------- */
function Tickets() {
  return (
    <section className="section tickets" id="tickets">
      <Reveal className="section__head section__head--center">
        <span className="reel">Final Reel</span>
        <h2>Get Your Tickets</h2>
        <p className="section__sub">Open to AI/ML engineering roles, research collaboration and project enquiries.</p>
      </Reveal>
      <Reveal className="ticket">
        <div className="ticket__main">
          <p className="ticket__admit">Admit One</p>
          <a className="ticket__email" href={`mailto:${profile.email}`}>{profile.email}</a>
          <div className="ticket__row">
            <div><small>Screen</small><span>Your inbox</span></div>
            <div><small>Showtime</small><span>Now</span></div>
            <div><small>Seat</small><span>Front row</span></div>
          </div>
        </div>
        <div className="ticket__stub">
          <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>
          <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
          <a href={profile.links.kaggle} target="_blank" rel="noreferrer">Kaggle</a>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__end">The End</p>
      <p>No small language models were harmed in the making of this portfolio.</p>
      <p className="footer__fine">© {new Date().getFullYear()} Asad Saleem · All rights reserved</p>
    </footer>
  );
}

export default function App() {
  const [intro, setIntro] = useState(() => {
    try {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
      return sessionStorage.getItem('seen-leader') !== '1';
    } catch {
      return false;
    }
  });

  const finishIntro = useCallback(() => {
    try { sessionStorage.setItem('seen-leader', '1'); } catch { /* ignore */ }
    setIntro(false);
  }, []);

  return (
    <>
      <div className="grain" aria-hidden />
      <div className="vignette" aria-hidden />
      <AnimatePresence>{intro && <Leader onDone={finishIntro} />}</AnimatePresence>
      {!intro && (
        <>
          <Marquee />
          <main>
            <Hero />
            <Feature />
            <NowShowing />
            <Filmography />
            <Crew />
            <Tickets />
          </main>
          <Footer />
        </>
      )}
    </>
  );
}
