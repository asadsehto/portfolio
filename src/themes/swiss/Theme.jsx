import { profile, feature, posters, shorts, filmography, crew, picks, openSource } from '../../data/content';
import { articles } from '../../data/articles';
import './swiss.css';

/* 1960 — International Typographic Style. A 12-column grid, one grotesk at many widths,
   one red. Information is set as tables and indices; nothing is decorated. */

const Row = ({ id, label, children, wide }) => (
  <section className={`sw-row ${wide ? 'sw-row--wide' : ''}`} id={id}>
    <h2 className="sw-row__label">{label}</h2>
    <div className="sw-row__body">{children}</div>
  </section>
);

export default function Swiss() {
  return (
    <div className="t-swiss">
      <header className="sw-head">
        <a href="#top" className="sw-mark">A.S.</a>
        <nav className="sw-nav" aria-label="Sections">
          <a href="#work">Work</a><a href="#research">Research</a><a href="#oss">Open source</a><a href="#cv">CV</a><a href="/articles/">Writing</a><a href="#contact">Contact</a>
        </nav>
      </header>

      <section className="sw-hero" id="top">
        <h1>Asad<br />Saleem</h1>
        <div className="sw-hero__col">
          <p className="sw-hero__role">AI engineer and independent researcher. LLM agents, computer vision.</p>
          <p className="sw-hero__p">{profile.logline} Currently AI Engineer at Miami TV; BS Computer Science (AI) at Sukkur IBA University, finishing August 2027.</p>
          <p className="sw-hero__links"><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
        </div>
        <img className="sw-hero__img" src="/asad.jpg" alt="Portrait of Asad Saleem" width="460" height="460" />
        <span className="sw-hero__red" aria-hidden />
      </section>

      <Row id="research" label="Research 2026">
        <h3 className="sw-h3">{feature.title}</h3>
        <p className="sw-p">{feature.synopsis}</p>
        <div className="sw-stats">
          {feature.stats.map((s) => <div key={s.value}><b>{s.value}</b><span>{s.label}</span></div>)}
        </div>
        <p className="sw-p sw-p--small">Safeguards tested: {feature.safeguards.join(', ')}.</p>
        <p className="sw-links"><a href={feature.article}>Article</a><a href={feature.link} target="_blank" rel="noreferrer">Code and data</a></p>
      </Row>

      <Row id="work" label="Selected work" wide>
        <table className="sw-table">
          <thead><tr><th>No.</th><th>Project</th><th>Field</th><th>Stack</th><th>Link</th></tr></thead>
          <tbody>
            {posters.map((p, i) => (
              <tr key={p.title}>
                <td className="sw-num">{i + 1}</td>
                <td><a href={p.link} target="_blank" rel="noreferrer" className="sw-table__t">{p.title}</a><span className="sw-table__b">{p.blurb}</span></td>
                <td>{p.genre}</td>
                <td>{p.tech.join(', ')}</td>
                <td>{p.live ? <a href={p.live} target="_blank" rel="noreferrer">Live</a> : <a href={p.link} target="_blank" rel="noreferrer">Source</a>}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="sw-stills">
          {posters.map((p) => <a key={p.title} href={p.link} target="_blank" rel="noreferrer"><img src={p.still} alt={`${p.title} still`} loading="lazy" width="1200" height="750" /></a>)}
        </div>
        <p className="sw-p sw-p--small">Earlier: {shorts.map((s, i) => <span key={s.title}>{i ? ', ' : ''}<a href={s.link} target="_blank" rel="noreferrer">{s.title}</a></span>)}.</p>
      </Row>

      <Row id="oss" label="Open source">
        <table className="sw-table sw-table--tight">
          <thead><tr><th>Repository</th><th>Stars</th><th>Change</th><th>Status</th></tr></thead>
          <tbody>
            {openSource.map((o) => (
              <tr key={o.link}>
                <td><a href={o.link} target="_blank" rel="noreferrer">{o.repo}</a></td>
                <td>{o.stars}</td>
                <td>{o.what}</td>
                <td><span className={`sw-status ${o.status === 'Merged' ? 'is-merged' : ''}`}>{o.kind}, {o.status.toLowerCase()}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </Row>

      <Row id="cv" label="Curriculum vitae">
        <dl className="sw-cv">
          {filmography.map((f) => <div key={f.org}><dt>{f.dates}</dt><dd><b>{f.role}</b>, {f.org}<br /><span>{f.note}</span></dd></div>)}
        </dl>
        <div className="sw-skills">
          {crew.map((c) => <p key={c.dept}><b>{c.dept}</b> {c.names.join(' / ')}</p>)}
        </div>
      </Row>

      <Row id="writing" label="Writing">
        <ol className="sw-list">
          {articles.map((a) => <li key={a.slug}><a href={`/articles/${a.slug}/`}>{a.title}</a><span>{a.readMins} min</span></li>)}
        </ol>
      </Row>

      <Row id="films" label="Films, for the record">
        <p className="sw-p sw-p--films">{picks.map((p) => `${p.title} (${p.year})`).join(' · ')}</p>
      </Row>

      <Row id="contact" label="Contact">
        <p className="sw-contact"><a href={`mailto:${profile.email}`}>{profile.email}</a></p>
        <p className="sw-links"><a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a><a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a href={profile.links.kaggle} target="_blank" rel="noreferrer">Kaggle</a></p>
      </Row>

      <footer className="sw-foot"><span>Asad Saleem</span><span>Set in Archivo. 12 columns. 2026.</span></footer>
    </div>
  );
}
