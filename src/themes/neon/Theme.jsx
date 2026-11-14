import { profile, feature, posters, shorts, filmography, crew, picks, openSource } from '../../data/content';
import { articles } from '../../data/articles';
import './neon.css';

/* Neon Grid — inside the machine. A perspective grid floor, light trails that draw the timeline,
   glowing outline panels, cyan for the system and magenta for the user. No chrome bevels,
   no scanlines: the glow is the material. */

const Sector = ({ id, n, title, children, className = '' }) => (
  <section className={`nx-sector ${className}`} id={id} aria-labelledby={`${id}-h`}>
    <h2 id={`${id}-h`}><span aria-hidden>{n}</span>{title}</h2>
    {children}
  </section>
);

export default function Neon() {
  return (
    <div className="t-neon">
      <div className="nx-floor" aria-hidden />
      <header className="nx-top">
        <a href="#top" className="nx-logo">ASAD<b>.SYS</b></a>
        <nav aria-label="Sectors"><a href="#programs">Programs</a><a href="#core">Core</a><a href="#uplink">Uplink</a><a href="#trail">Trail</a><a href="/articles/">Logs</a><a href="#port">I/O</a></nav>
      </header>

      <section className="nx-hero" id="top">
        <div className="nx-hero__ring" aria-hidden><i /><i /><i /></div>
        <img className="nx-hero__img" src="/asad.jpg" alt="Portrait of Asad Saleem" width="460" height="460" />
        <h1><span>Asad</span><span>Saleem</span></h1>
        <p className="nx-hero__role">AI engineer · independent researcher</p>
        <p className="nx-hero__p">Agents, retrieval and vision systems built end to end, and experiments run on them with the data released. AI Engineer at Miami TV; BS CS (AI) at Sukkur IBA, August 2027.</p>
        <div className="nx-row"><a className="nx-btn" href="#programs">Load programs</a><a className="nx-btn nx-btn--m" href={`mailto:${profile.email}`}>Open a channel</a></div>
      </section>

      <Sector id="programs" n="01" title="Programs">
        <div className="nx-grid">
          {posters.map((p) => (
            <a key={p.title} href={p.link} target="_blank" rel="noreferrer" className="nx-card">
              <img src={p.still} alt="" loading="lazy" width="1200" height="750" />
              <span className="nx-card__t">{p.title}</span>
              <span className="nx-card__tag">{p.tagline}</span>
              <span className="nx-card__b">{p.blurb}</span>
              <span className="nx-card__sys">{p.tech.join(' / ')}{p.live ? ' / live' : ''}</span>
            </a>
          ))}
        </div>
        <p className="nx-dim">Archived programs: {shorts.map((s, i) => <span key={s.title}>{i ? ' · ' : ''}<a href={s.link} target="_blank" rel="noreferrer">{s.title}</a></span>)}</p>
      </Sector>

      <Sector id="core" n="02" title="Core experiment" className="nx-sector--split">
        <div>
          <h3>{feature.title}</h3>
          <p className="nx-q">{feature.question}</p>
          <p>{feature.synopsis}</p>
          <p className="nx-dim">Safeguards: {feature.safeguards.join(' / ')}</p>
          <div className="nx-row"><a className="nx-btn" href={feature.article}>Read the log</a><a className="nx-btn nx-btn--m" href={feature.link} target="_blank" rel="noreferrer">Source & data</a></div>
        </div>
        <div className="nx-meters">
          {feature.stats.map((s) => <div key={s.value} className="nx-meter"><b>{s.value}</b><span>{s.label}</span></div>)}
        </div>
      </Sector>

      <Sector id="uplink" n="03" title="Uplink · open source">
        <ul className="nx-uplink">
          {openSource.map((o) => (
            <li key={o.link} className={o.status === 'Merged' ? 'is-merged' : ''}>
              <span className="nx-uplink__led" aria-hidden />
              <a href={o.link} target="_blank" rel="noreferrer">{o.repo}</a>
              <span className="nx-uplink__st">{o.kind} · {o.status}</span>
              <p>{o.what}</p>
              <span className="nx-dim">{o.stars} ★ · {o.date}</span>
            </li>
          ))}
        </ul>
      </Sector>

      <Sector id="trail" n="04" title="Light trail · experience">
        <ol className="nx-trail">
          {filmography.map((f) => <li key={f.org}><span className="nx-trail__t">{f.dates}</span><b>{f.role}</b><em>{f.org}</em><p>{f.note}</p></li>)}
        </ol>
        <div className="nx-stack">
          {crew.map((c) => <p key={c.dept}><b>{c.dept}</b>{c.names.join(' / ')}</p>)}
        </div>
      </Sector>

      <Sector id="logs" n="05" title="Logs">
        <ul className="nx-logs">{articles.map((a) => <li key={a.slug}><a href={`/articles/${a.slug}/`}>{a.title}</a><span>{a.readMins} min</span></li>)}</ul>
        <p className="nx-dim">Off-grid viewing: {picks.map((p) => p.title).join(' · ')}</p>
      </Sector>

      <section className="nx-port" id="port">
        <h2>I/O port</h2>
        <p>Open to AI/ML roles, research collaboration and project enquiries.</p>
        <div className="nx-row"><a className="nx-btn" href={`mailto:${profile.email}`}>{profile.email}</a><a className="nx-btn nx-btn--m" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a><a className="nx-btn nx-btn--m" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a className="nx-btn nx-btn--m" href={profile.links.kaggle} target="_blank" rel="noreferrer">Kaggle</a></div>
      </section>
      <footer className="nx-foot">end of line · 2026</footer>
    </div>
  );
}
