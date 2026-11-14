import { profile, feature, posters, shorts, filmography, crew, picks, openSource } from '../../data/content';
import { articles } from '../../data/articles';
import './space.css';

/* Space Odyssey — mission control. The page is a flight: a countdown header, telemetry strips,
   projects as mission modules on an orbit, the crew manifest, a transmission log, and a
   docking port to get in touch. Dark void, phosphor cyan, one warning orange. */

const Panel = ({ id, code, title, children, wide }) => (
  <section className={`sp-panel ${wide ? 'sp-panel--wide' : ''}`} id={id} aria-labelledby={`${id}-h`}>
    <header className="sp-panel__head"><span className="sp-code">{code}</span><h2 id={`${id}-h`}>{title}</h2></header>
    <div className="sp-panel__body">{children}</div>
  </section>
);

export default function Space() {
  return (
    <div className="t-space">
      <div className="sp-stars" aria-hidden />
      <header className="sp-top">
        <a href="#top" className="sp-callsign">ASD-01 · ASAD SALEEM</a>
        <nav aria-label="Flight plan"><a href="#modules">Modules</a><a href="#research">Science</a><a href="#transmissions">Transmissions</a><a href="#crew">Crew</a><a href="/articles/">Logbook</a><a href="#dock">Dock</a></nav>
        <span className="sp-status"><i aria-hidden />ALL SYSTEMS NOMINAL</span>
      </header>

      <section className="sp-hero" id="top">
        <div className="sp-hero__text">
          <p className="sp-hero__k">Mission commander</p>
          <h1>Asad Saleem</h1>
          <p className="sp-hero__role">AI engineer and independent researcher. Builds agents, retrieval systems and vision pipelines; runs experiments and publishes the data.</p>
          <dl className="sp-tele">
            <div><dt>Station</dt><dd>Miami TV · AI Engineer</dd></div>
            <div><dt>Academy</dt><dd>Sukkur IBA · BS CS (AI) · Aug 2027</dd></div>
            <div><dt>Payload</dt><dd>{posters.length} modules · {openSource.length} upstream patches · {articles.length} logs</dd></div>
          </dl>
          <div className="sp-hero__row"><a className="sp-btn" href="#modules">Open the modules</a><a className="sp-btn sp-btn--ghost" href={`mailto:${profile.email}`}>Hail the commander</a></div>
        </div>
        <figure className="sp-port">
          <img src="/asad.jpg" alt="Portrait of Asad Saleem" width="460" height="460" />
          <figcaption>Viewport 01 · Earth orbit</figcaption>
        </figure>
      </section>

      <Panel id="modules" code="MOD" title="Mission modules" wide>
        <ol className="sp-orbit">
          {posters.map((p, i) => (
            <li key={p.title} style={{ '--i': i }}>
              <a href={p.link} target="_blank" rel="noreferrer" className="sp-module">
                <img src={p.still} alt="" loading="lazy" width="1200" height="750" />
                <span className="sp-module__id">M-{String(i + 1).padStart(2, '0')}</span>
                <span className="sp-module__t">{p.title}</span>
                <span className="sp-module__tag">{p.tagline}</span>
                <span className="sp-module__b">{p.blurb}</span>
                <span className="sp-module__sys">{p.tech.join(' · ')}{p.live ? ' · LIVE' : ''}</span>
              </a>
            </li>
          ))}
        </ol>
        <p className="sp-small">Earlier flights: {shorts.map((s, i) => <span key={s.title}>{i ? ' · ' : ''}<a href={s.link} target="_blank" rel="noreferrer">{s.title}</a></span>)}</p>
      </Panel>

      <Panel id="research" code="SCI" title="Science package">
        <h3 className="sp-h3">{feature.title}</h3>
        <p className="sp-q">{feature.question}</p>
        <p>{feature.synopsis}</p>
        <div className="sp-readouts">
          {feature.stats.map((s) => <div key={s.value}><b>{s.value}</b><span>{s.label}</span></div>)}
        </div>
        <p className="sp-small">Safeguards: {feature.safeguards.join(' · ')}</p>
        <p><a className="sp-btn" href={feature.article}>Read the report</a> <a className="sp-btn sp-btn--ghost" href={feature.link} target="_blank" rel="noreferrer">Code & data</a></p>
      </Panel>

      <Panel id="transmissions" code="TX" title="Transmissions upstream">
        <ul className="sp-tx">
          {openSource.map((o) => (
            <li key={o.link}>
              <span className="sp-tx__time">{o.date}</span>
              <a href={o.link} target="_blank" rel="noreferrer">{o.repo}</a>
              <span className={`sp-tx__ack ${o.status === 'Merged' ? 'is-ack' : ''}`}>{o.status === 'Merged' ? 'ACK · MERGED' : `${o.kind.toUpperCase()} · OPEN`}</span>
              <p>{o.what}</p>
              <span className="sp-small">{o.stars} ★</span>
            </li>
          ))}
        </ul>
      </Panel>

      <Panel id="crew" code="CRW" title="Crew manifest & flight log">
        <div className="sp-crew">
          {crew.map((c) => <div key={c.dept}><h3>{c.dept}</h3><p>{c.names.join(', ')}</p></div>)}
        </div>
        <ol className="sp-log">
          {filmography.map((f) => <li key={f.org}><span>{f.dates}</span><b>{f.role}</b> — {f.org}<br /><em>{f.note}</em></li>)}
        </ol>
      </Panel>

      <Panel id="logbook" code="LOG" title="Logbook">
        <ul className="sp-list">{articles.map((a) => <li key={a.slug}><a href={`/articles/${a.slug}/`}>{a.title}</a><span>{a.readMins} min</span></li>)}</ul>
        <p className="sp-small sp-films">In-flight entertainment: {picks.map((p) => p.title).join(' · ')}</p>
      </Panel>

      <section className="sp-dock" id="dock">
        <h2>Docking port</h2>
        <p>Open to AI/ML engineering roles, research collaboration and project enquiries.</p>
        <div className="sp-hero__row"><a className="sp-btn" href={`mailto:${profile.email}`}>{profile.email}</a><a className="sp-btn sp-btn--ghost" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a><a className="sp-btn sp-btn--ghost" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a className="sp-btn sp-btn--ghost" href={profile.links.kaggle} target="_blank" rel="noreferrer">Kaggle</a></div>
      </section>
      <footer className="sp-foot">ASD-01 · end of transmission · 2026</footer>
    </div>
  );
}
