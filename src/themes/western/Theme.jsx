import { profile, feature, posters, shorts, filmography, crew, picks, openSource } from '../../data/content';
import { articles } from '../../data/articles';
import './western.css';

/* Western — a wanted poster nailed to a saloon board. The poster is the hero; every project is a
   bounty handbill; experience is the trail ridden; open source is the notices pinned by other
   outfits; contact is the telegraph office. Kraft paper, wood type, one red ink. */

const Handbill = ({ title, kicker, children, className = '', tilt = 0 }) => (
  <article className={`ws-bill ${className}`} style={{ '--tilt': `${tilt}deg` }}>
    <span className="ws-nail" aria-hidden />
    {kicker && <p className="ws-bill__k">{kicker}</p>}
    {title && <h2 className="ws-bill__t">{title}</h2>}
    {children}
  </article>
);

export default function Western() {
  return (
    <div className="t-western">
      <header className="ws-top">
        <a href="#top" className="ws-brand">The Sukkur Gazette</a>
        <nav aria-label="Sections"><a href="#bounties">Bounties</a><a href="#study">The Study</a><a href="#notices">Notices</a><a href="#trail">The Trail</a><a href="/articles/">Dispatches</a><a href="#telegraph">Telegraph</a></nav>
      </header>

      <section className="ws-hero" id="top">
        <div className="ws-poster">
          <p className="ws-poster__top">Wanted</p>
          <img src="/asad.jpg" alt="Portrait of Asad Saleem" width="460" height="460" />
          <h1>Asad Saleem</h1>
          <p className="ws-poster__for">for building thinking machines, running honest experiments and sending fixes to other folks’ code</p>
          <p className="ws-poster__reward">Reward: one AI engineer &amp; researcher</p>
          <p className="ws-poster__small">Last seen at Miami TV (AI Engineer) and Sukkur IBA University (BS CS in AI, due August 2027). Known associates: Python, PyTorch, Ollama, React.</p>
          <div className="ws-row"><a className="ws-btn" href="#bounties">See the bounties</a><a className="ws-btn ws-btn--ghost" href={`mailto:${profile.email}`}>Wire the sheriff</a></div>
        </div>
      </section>

      <section className="ws-board" id="bounties" aria-labelledby="bounties-h">
        <h2 className="ws-board__h" id="bounties-h">Bounties posted</h2>
        <div className="ws-bills">
          {posters.map((p, i) => (
            <Handbill key={p.title} kicker={p.genre} title={p.title} tilt={[-1.2, 0.8, -0.6, 1.1, -0.9, 0.7][i % 6]}>
              <img className="ws-bill__img" src={p.still} alt="" loading="lazy" width="1200" height="750" />
              <p className="ws-bill__tag">“{p.tagline}”</p>
              <p>{p.blurb}</p>
              <p className="ws-bill__small">Armed with {p.tech.join(', ')}.</p>
              <p className="ws-row"><a className="ws-btn" href={p.link} target="_blank" rel="noreferrer">Claim</a>{p.live && <a className="ws-btn ws-btn--ghost" href={p.live} target="_blank" rel="noreferrer">See it live</a>}</p>
            </Handbill>
          ))}
        </div>
        <p className="ws-older">Smaller bounties: {shorts.map((s, i) => <span key={s.title}>{i ? ', ' : ''}<a href={s.link} target="_blank" rel="noreferrer">{s.title}</a></span>)}.</p>
      </section>

      <section className="ws-study" id="study">
        <Handbill kicker="A study, 2026" title={feature.title} className="ws-bill--wide" tilt={0.4}>
          <p className="ws-bill__tag">“{feature.question}”</p>
          <p>{feature.synopsis}</p>
          <dl className="ws-tally">{feature.stats.map((s) => <div key={s.value}><dt>{s.value}</dt><dd>{s.label}</dd></div>)}</dl>
          <p className="ws-bill__small">Five safeguards tried: {feature.safeguards.join(', ')}.</p>
          <p className="ws-row"><a className="ws-btn" href={feature.article}>Read the account</a><a className="ws-btn ws-btn--ghost" href={feature.link} target="_blank" rel="noreferrer">Code &amp; data</a></p>
        </Handbill>
      </section>

      <section className="ws-board" id="notices" aria-labelledby="notices-h">
        <h2 className="ws-board__h" id="notices-h">Notices from other outfits</h2>
        <div className="ws-bills ws-bills--3">
          {openSource.map((o, i) => (
            <Handbill key={o.link} kicker={`${o.kind} · ${o.status}`} title={o.repo} className={`ws-bill--notice ${o.status === 'Merged' ? 'is-merged' : ''}`} tilt={[0.9, -0.7, 0.5][i]}>
              <p>{o.what}</p>
              <p className="ws-bill__small">{o.stars} stars · {o.date} · <a href={o.link} target="_blank" rel="noreferrer">read the notice</a></p>
            </Handbill>
          ))}
        </div>
      </section>

      <section className="ws-trail" id="trail">
        <h2 className="ws-board__h">The trail ridden</h2>
        <ol>{filmography.map((f) => <li key={f.org}><span>{f.dates}</span><b>{f.role}</b>, {f.org}. <em>{f.note}</em></li>)}</ol>
        <div className="ws-kit">{crew.map((c) => <p key={c.dept}><b>{c.dept}.</b> {c.names.join(', ')}.</p>)}</div>
      </section>

      <section className="ws-board" id="dispatches" aria-labelledby="dispatches-h">
        <h2 className="ws-board__h" id="dispatches-h">Dispatches &amp; picture shows</h2>
        <div className="ws-two">
          <ul className="ws-list">{articles.map((a) => <li key={a.slug}><a href={`/articles/${a.slug}/`}>{a.title}</a><span>{a.readMins} min</span></li>)}</ul>
          <p className="ws-shows">Now playing at the picture house: {picks.map((p) => p.title).join(' · ')}.</p>
        </div>
      </section>

      <section className="ws-telegraph" id="telegraph">
        <h2>Telegraph office</h2>
        <p>STOP · OPEN TO AI/ML ROLES, RESEARCH COLLABORATION AND PROJECT ENQUIRIES · STOP</p>
        <div className="ws-row"><a className="ws-btn" href={`mailto:${profile.email}`}>{profile.email}</a><a className="ws-btn ws-btn--ghost" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a><a className="ws-btn ws-btn--ghost" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a><a className="ws-btn ws-btn--ghost" href={profile.links.kaggle} target="_blank" rel="noreferrer">Kaggle</a></div>
      </section>
      <footer className="ws-foot">Printed at Sukkur · 2026 · no horses were harmed</footer>
    </div>
  );
}
