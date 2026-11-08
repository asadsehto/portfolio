import { useRef, useState } from 'react';
import { motion as Motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { profile, feature, posters, shorts, filmography, crew, picks } from '../data/content';
import { articles } from '../data/articles';
import { Reveal } from '../components/Chrome';

/* ---------- Hero ---------- */
function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 100]);

  return (
    <section className="hero" id="top">
      <div className="hero__beam" aria-hidden />
      <div className="hero__inner">
        <Motion.p className="kicker" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          An AS Pictures release · presents
        </Motion.p>

        <h1 className="hero__title">
          <span className="sr-only">Asad Saleem — AI Engineer and Researcher</span>
          {['ASAD', 'SALEEM'].map((w, i) => (
            <Motion.span
              key={w}
              aria-hidden
              initial={{ opacity: 0, y: 80, rotateX: -60 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ delay: 0.35 + i * 0.18, duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}
            >
              {w}
            </Motion.span>
          ))}
        </h1>

        <Motion.p className="hero__in" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
          <em>in</em> Machines That Learn to Improve Themselves
        </Motion.p>

        <Motion.div className="hero__still" style={{ y }}>
          <div className="still">
            <div className="still__sprockets" aria-hidden />
            <img src="/asad.jpg" alt="Portrait of Asad Saleem" width="460" height="460" fetchPriority="high" />
            <div className="still__sprockets still__sprockets--r" aria-hidden />
          </div>
          <span className="still__caption">SC. 01 — TAKE 1 — THE ENGINEER</span>
        </Motion.div>

        <Motion.div className="billing" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }}>
          <p className="billing__roles">{profile.roles.join('  ·  ')}</p>
          <p className="billing__log">{profile.logline}</p>
          <p className="billing__fine">
            STARRING PYTHON · PYTORCH · OLLAMA · REACT &nbsp; WRITTEN & DIRECTED BY ASAD SALEEM &nbsp;
            {profile.education.toUpperCase()}
          </p>
          <div className="hero__ctas">
            <a className="btn btn--red" href="#showing">Watch the trailer ↓</a>
            <a className="btn" href="/articles/">Read the press</a>
          </div>
        </Motion.div>
      </div>
    </section>
  );
}

/* ---------- Feature presentation ---------- */
function Feature() {
  return (
    <section className="section feature" id="feature">
      <Reveal className="section__head section__head--row">
        <div>
          <span className="reel">Reel 01</span>
          <h2>Feature Presentation</h2>
        </div>
      </Reveal>

      <div className="feature__grid">
        <Reveal className="screen">
          <img src={feature.still} alt="Chart of success rates across experimental conditions" loading="lazy" width="1200" height="750" />
        </Reveal>
        <Reveal className="feature__card" delay={0.1}>
          <p className="kicker">Research · {feature.year} · Independent</p>
          <h3>{feature.title}</h3>
          <p className="feature__q">“{feature.question}”</p>
          <p className="feature__syn">{feature.synopsis}</p>
          <div className="feature__stats">
            {feature.stats.map((s) => (
              <div key={s.value} className="review">
                <strong>{s.value}</strong>
                <p>{s.label}</p>
              </div>
            ))}
          </div>
          <div className="hero__ctas">
            <a className="btn btn--red" href={feature.article}>Read the story</a>
            <a className="btn" href={feature.link} target="_blank" rel="noreferrer">Code & data ↗</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------- Now showing: horizontal rail of project stills ---------- */
function NowShowing() {
  const rail = useRef(null);
  const scroll = (dir) => {
    const el = rail.current;
    if (!el) return;
    const card = el.querySelector('.show');
    el.scrollBy({ left: dir * (card ? card.offsetWidth + 24 : 400), behavior: 'smooth' });
  };

  return (
    <section className="section showing" id="showing">
      <Reveal className="section__head section__head--row">
        <div>
          <span className="reel">Reel 02</span>
          <h2>Now Showing</h2>
        </div>
        <div className="rail__ctrl">
          <button onClick={() => scroll(-1)} aria-label="Previous project">←</button>
          <button onClick={() => scroll(1)} aria-label="Next project">→</button>
        </div>
      </Reveal>

      <div className="rail" ref={rail} role="list" aria-label="Selected projects">
        {posters.map((p, i) => (
          <article className="show" role="listitem" key={p.title} style={{ '--p1': p.palette[0], '--p2': p.palette[1] }}>
            <a className="show__still" href={p.link} target="_blank" rel="noreferrer" aria-label={`${p.title} on GitHub`}>
              <img src={p.still} alt={`${p.title} — ${p.tagline}`} loading="lazy" width="1200" height="750" />
              <span className="show__num">{String(i + 1).padStart(2, '0')}</span>
              <span className="show__play" aria-hidden>▶</span>
            </a>
            <div className="show__body">
              <span className="show__genre">{p.genre}</span>
              <h3>{p.title}</h3>
              <p className="show__tag">{p.tagline}</p>
              <p className="show__blurb">{p.blurb}</p>
              <p className="show__credits">{p.tech.join(' · ')}</p>
              <div className="show__links">
                <a href={p.link} target="_blank" rel="noreferrer">{p.link.includes('github.com') ? 'Source ↗' : 'Visit ↗'}</a>
                {p.live && <a href={p.live} target="_blank" rel="noreferrer" className="show__live">● Live demo</a>}
              </div>
            </div>
          </article>
        ))}
      </div>

      <Reveal className="shorts">
        <h3 className="shorts__title">Short Films <span>& earlier work</span></h3>
        <ul>
          {shorts.map((s) => (
            <li key={s.title}>
              <a href={s.link} target="_blank" rel="noreferrer">
                <span className="shorts__name">{s.title}</span>
                <span className="shorts__lang">{s.lang}</span>
                <span className="shorts__note">{s.note}</span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

/* ---------- Filmography + crew ---------- */
function Filmography() {
  return (
    <section className="section" id="filmography">
      <Reveal className="section__head">
        <span className="reel">Reel 03</span>
        <h2>Filmography</h2>
      </Reveal>
      <div className="strip">
        {filmography.map((f, i) => (
          <Reveal key={f.org} delay={i * 0.08} className="frame">
            <span className="frame__tc">00:0{i}:00:00</span>
            {f.now && <span className="frame__rec">● REC</span>}
            <p className="frame__dates">{f.dates}</p>
            <h3>{f.role}</h3>
            <p className="frame__org">{f.org}</p>
            <p className="frame__note">{f.note}</p>
          </Reveal>
        ))}
      </div>

      <div className="credits" id="crew">
        <p className="credits__heading">Cast &amp; Crew</p>
        {crew.map((c) => (
          <Reveal key={c.dept} className="credits__block">
            <p className="credits__dept">{c.dept}</p>
            <ul>{c.names.map((n) => <li key={n}>{n}</li>)}</ul>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------- Director's picks: tonight's screening + ticket marquee ---------- */
function Picks() {
  const [idx, setIdx] = useState(3); // Interstellar
  const film = picks[idx];
  const shuffle = () => {
    let next = idx;
    while (next === idx) next = Math.floor(Math.random() * picks.length);
    setIdx(next);
  };
  const half = Math.ceil(picks.length / 2);
  const rows = [picks.slice(0, half), picks.slice(half)];

  return (
    <section className="section picks" id="picks">
      <div className="picks__top">
        <Reveal className="section__head">
          <span className="reel">Intermission</span>
          <h2>Director’s Picks</h2>
          <p className="section__sub">The films I keep going back to — westerns, sci-fi, Nolan, Ritchie and everything in between.</p>
        </Reveal>

        <Reveal className="tonight" delay={0.1}>
          <p className="tonight__label">Tonight’s screening</p>
          <AnimatePresence mode="wait">
            <Motion.div
              key={film.title}
              initial={{ opacity: 0, rotateX: -80 }}
              animate={{ opacity: 1, rotateX: 0 }}
              exit={{ opacity: 0, rotateX: 80 }}
              transition={{ duration: 0.35 }}
              className="tonight__film"
              aria-live="polite"
            >
              <span className="tonight__genre">{film.genre}</span>
              <strong>{film.title}</strong>
              <span className="tonight__meta">{film.year} · {film.by}</span>
            </Motion.div>
          </AnimatePresence>
          <button className="btn btn--red" onClick={shuffle}>🎲 Shuffle</button>
        </Reveal>
      </div>

      <div className="tickets-rail" aria-label="Favourite films">
        {rows.map((row, r) => (
          <div className={`tickets-rail__row ${r ? 'is-rev' : ''}`} key={r} tabIndex={0} role="region" aria-label={`Favourite films, row ${r + 1}`}>
            <ul className="tickets-rail__track">
              {[...row, ...row].map((f, i) => (
                <li key={`${f.title}-${i}`} className="stub" aria-hidden={i >= row.length ? true : undefined}>
                  <span className="stub__genre">{f.genre}</span>
                  <span className="stub__title">{f.title}</span>
                  <span className="stub__meta">{f.year} · {f.by}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Press room (articles) ---------- */
function Press() {
  return (
    <section className="section press" id="press">
      <Reveal className="section__head section__head--row">
        <div>
          <span className="reel">Reel 04</span>
          <h2>Press Room</h2>
        </div>
        <a className="btn" href="/articles/">All articles →</a>
      </Reveal>
      <div className="press__grid">
        {articles.slice(0, 3).map((a, i) => (
          <Reveal key={a.slug} delay={i * 0.08} as="article" className="clip">
            <a href={`/articles/${a.slug}/`} className="clip__link">
              <img src={a.still} alt="" loading="lazy" width="1200" height="750" />
              <div className="clip__body">
                <span className="clip__tag">{a.tag} · {a.readMins} min read</span>
                <h3>{a.title}</h3>
                <p>{a.dek}</p>
              </div>
            </a>
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

export default function Home() {
  return (
    <>
      <Hero />
      <Feature />
      <NowShowing />
      <Filmography />
      <Picks />
      <Press />
      <Tickets />
    </>
  );
}
