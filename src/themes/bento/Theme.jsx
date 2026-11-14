import { profile, feature, posters, shorts, filmography, crew, picks, openSource } from '../../data/content';
import { articles } from '../../data/articles';
import './bento.css';

/* 2026 — the full modern one. A single tiled grid where every tile is a different size because
   its content is a different size; one display face, one cobalt, light ground. The whole page is
   one composition, read top to bottom, no section headers. */

export default function Bento() {
  return (
    <div className="t-bento">
      <header className="bn-top">
        <a href="#top" className="bn-mark">Asad Saleem</a>
        <nav aria-label="Primary"><a href="#research">Research</a><a href="#work">Work</a><a href="#oss">Open source</a><a href="/articles/">Writing</a><a href="#contact" className="bn-cta">Get in touch</a></nav>
      </header>

      <main className="bn-grid" id="top">
        <section className="bn-tile bn-hero">
          <h1>AI engineer who tests whether <em>small models</em> can improve themselves.</h1>
          <p>{profile.logline} Currently at Miami TV; BS Computer Science (AI) at Sukkur IBA University, finishing August 2027.</p>
          <div className="bn-hero__row">
            <a href="#work" className="bn-btn">See the work</a>
            <a href={`mailto:${profile.email}`} className="bn-btn bn-btn--ghost">{profile.email}</a>
          </div>
        </section>

        <figure className="bn-tile bn-photo">
          <img src="/asad.jpg" alt="Portrait of Asad Saleem" width="460" height="460" />
        </figure>

        <section className="bn-tile bn-research" id="research">
          <p className="bn-tile__k">Research, 2026</p>
          <h2>{feature.title}</h2>
          <p className="bn-q">{feature.question}</p>
          <div className="bn-stats">
            {feature.stats.map((s) => <div key={s.value}><b>{s.value}</b><span>{s.label}</span></div>)}
          </div>
          <img src={feature.still} alt="Chart of success rates across conditions" loading="lazy" width="1200" height="750" className="bn-research__img" />
          <div className="bn-links"><a href={feature.article}>Read the write-up</a><a href={feature.link} target="_blank" rel="noreferrer">Code & data</a></div>
        </section>

        <section className="bn-tile bn-oss" id="oss">
          <p className="bn-tile__k">Open source</p>
          <ul>
            {openSource.map((o) => (
              <li key={o.link}>
                <a href={o.link} target="_blank" rel="noreferrer"><b>{o.repo}</b></a>
                <span className={`bn-pill ${o.status === 'Merged' ? 'is-merged' : ''}`}>{o.status}</span>
                <p>{o.what}</p>
                <small>{o.kind} · {o.stars} stars</small>
              </li>
            ))}
          </ul>
        </section>

        {posters.map((p, i) => (
          <a key={p.title} id={i === 0 ? 'work' : undefined} href={p.link} target="_blank" rel="noreferrer" className={`bn-tile bn-work ${i === 0 ? 'bn-work--lead' : ''}`}>
            <img src={p.still} alt="" loading="lazy" width="1200" height="750" />
            <span className="bn-work__t">{p.title}</span>
            <span className="bn-work__b">{i === 0 ? p.blurb : p.tagline}</span>
            <span className="bn-work__tech">{p.tech.slice(0, 3).join(' · ')}{p.live ? ' · live demo' : ''}</span>
          </a>
        ))}

        <section className="bn-tile bn-cv">
          <p className="bn-tile__k">Experience</p>
          <ol>
            {filmography.map((f) => <li key={f.org}><span>{f.dates}</span><b>{f.role}</b><em>{f.org}</em></li>)}
          </ol>
        </section>

        <section className="bn-tile bn-tools">
          <p className="bn-tile__k">Tools</p>
          {crew.map((c) => <p key={c.dept}><b>{c.dept}</b>{c.names.join(', ')}</p>)}
        </section>

        <section className="bn-tile bn-writing">
          <p className="bn-tile__k">Writing</p>
          <ul>{articles.map((a) => <li key={a.slug}><a href={`/articles/${a.slug}/`}>{a.title}</a><small>{a.readMins} min</small></li>)}</ul>
        </section>

        <section className="bn-tile bn-more">
          <p className="bn-tile__k">Earlier projects</p>
          <p>{shorts.map((s, i) => <span key={s.title}>{i ? ', ' : ''}<a href={s.link} target="_blank" rel="noreferrer">{s.title}</a></span>)}</p>
        </section>

        <section className="bn-tile bn-films">
          <p className="bn-tile__k">Off the clock</p>
          <p>Films I keep going back to: {picks.slice(0, 10).map((p) => p.title).join(', ')} and {picks.length - 10} more.</p>
        </section>

        <section className="bn-tile bn-contact" id="contact">
          <h2>Open to AI/ML roles, research collaboration and project enquiries.</h2>
          <div className="bn-hero__row">
            <a href={`mailto:${profile.email}`} className="bn-btn bn-btn--light">Email me</a>
            <a href={profile.links.github} target="_blank" rel="noreferrer" className="bn-btn bn-btn--ghost-light">GitHub</a>
            <a href={profile.links.linkedin} target="_blank" rel="noreferrer" className="bn-btn bn-btn--ghost-light">LinkedIn</a>
            <a href={profile.links.kaggle} target="_blank" rel="noreferrer" className="bn-btn bn-btn--ghost-light">Kaggle</a>
          </div>
        </section>
      </main>
      <footer className="bn-foot"><span>© 2026 Asad Saleem</span><span>Bricolage Grotesque & Manrope</span></footer>
    </div>
  );
}
