import { profile, feature, posters, shorts, filmography, crew, picks, openSource } from '../../data/content';
import { articles } from '../../data/articles';
import './groovy.css';

/* 1974 — a Sunday colour supplement. A cover, a contents page, then features set in columns
   with pull quotes and rounded display type. Warm inks only: orange, avocado, brown, mustard. */

const PAGES = [
  ['Cover story', 'The man who chases small machines', '#cover-story'],
  ['Feature', 'Six things he built', '#feature'],
  ['Dispatches', 'Letters to other people’s code', '#dispatches'],
  ['Résumé', 'Where he has worked', '#resume'],
  ['Columns', 'Articles from the author', '#columns'],
  ['Listings', 'What’s on at the pictures', '#listings'],
  ['Classifieds', 'Available for hire', '#classifieds'],
];

export default function Groovy() {
  return (
    <div className="t-groovy">
      <header className="gv-cover" id="top">
        <div className="gv-masthead">
          <span className="gv-issue">Sunday supplement · No. 26 · November 2026</span>
          <span className="gv-price">Free</span>
        </div>
        <h1 className="gv-title">Asad<br />Saleem</h1>
        <div className="gv-cover__strip" aria-hidden><i /><i /><i /><i /><i /></div>
        <div className="gv-cover__grid">
          <img src="/asad.jpg" alt="Portrait of Asad Saleem" width="460" height="460" className="gv-cover__img" />
          <div className="gv-cover__blurbs">
            <p className="gv-blurb gv-blurb--big">Inside: can a tiny AI model teach itself? We ran the numbers.</p>
            <p className="gv-blurb">Plus: ProfDesk, LecAssist and four more projects · A pull request into a 19,000-star library · The films he can’t stop rewatching</p>
          </div>
        </div>
      </header>

      <nav className="gv-contents" aria-label="Contents">
        <h2>In this issue</h2>
        <ol>
          {PAGES.map(([sec, t, href], i) => (
            <li key={href}><a href={href}><span className="gv-contents__n">{String(i + 2).padStart(2, '0')}</span><span className="gv-contents__sec">{sec}</span><span className="gv-contents__t">{t}</span></a></li>
          ))}
          <li><a href="/articles/"><span className="gv-contents__n">··</span><span className="gv-contents__sec">Online</span><span className="gv-contents__t">All articles</span></a></li>
        </ol>
      </nav>

      <article className="gv-story" id="cover-story">
        <p className="gv-kick">Cover story</p>
        <h2 className="gv-h2">The man who chases small machines</h2>
        <p className="gv-standfirst">{feature.question}</p>
        <div className="gv-cols">
          <p><span className="gv-dropcap">A</span>sad Saleem is an AI engineer and independent researcher working on LLM agents and computer vision. {profile.logline} He is finishing a BS in Computer Science (AI) at Sukkur IBA University in August 2027, and works as an AI Engineer at Miami TV.</p>
          <p>His 2026 study, <em>{feature.title}</em>, asks whether a model small enough to run on a laptop can rewrite its own prompt, memory and tools and get better. {feature.synopsis}</p>
          <blockquote className="gv-pull">“Self-editing as-is made both models worse. Five safeguards together brought the small one back.”</blockquote>
          <p>The short answer was no, not on its own. {feature.stats[0].label.charAt(0).toUpperCase() + feature.stats[0].label.slice(1)} ({feature.stats[0].value}). With all five safeguards, the picture changed: {feature.stats[1].label} ({feature.stats[1].value}). Everything is released: {feature.stats[2].label}.</p>
          <p className="gv-more"><a href={feature.article}>Read the full story →</a> <a href={feature.link} target="_blank" rel="noreferrer">Code and data</a></p>
        </div>
      </article>

      <section className="gv-feature" id="feature">
        <p className="gv-kick">Feature</p>
        <h2 className="gv-h2">Six things he built</h2>
        <div className="gv-tiles">
          {posters.map((p, i) => (
            <a key={p.title} href={p.link} target="_blank" rel="noreferrer" className={`gv-tile gv-tile--${i % 3}`}>
              <img src={p.still} alt="" loading="lazy" width="1200" height="750" />
              <span className="gv-tile__t">{p.title}</span>
              <span className="gv-tile__tag">{p.tagline}</span>
              <span className="gv-tile__b">{p.blurb}</span>
              {p.live && <span className="gv-tile__live">Try it live</span>}
            </a>
          ))}
        </div>
        <p className="gv-also">Also by the author: {shorts.map((s, i) => <span key={s.title}>{i ? ' · ' : ''}<a href={s.link} target="_blank" rel="noreferrer">{s.title}</a></span>)}</p>
      </section>

      <section className="gv-dispatch" id="dispatches">
        <p className="gv-kick">Dispatches</p>
        <h2 className="gv-h2">Letters to other people’s code</h2>
        <div className="gv-letters">
          {openSource.map((o) => (
            <div className="gv-letter" key={o.link}>
              <span className="gv-letter__stamp">{o.status}</span>
              <a href={o.link} target="_blank" rel="noreferrer" className="gv-letter__to">To: {o.repo}</a>
              <span className="gv-letter__stars">{o.stars} stars</span>
              <p>{o.what}</p>
              <span className="gv-letter__meta">{o.kind} · {o.date}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="gv-resume" id="resume">
        <p className="gv-kick">Résumé</p>
        <h2 className="gv-h2">Where he has worked</h2>
        <div className="gv-cols gv-cols--2">
          {filmography.map((f) => <p key={f.org}><b>{f.role}</b>, {f.org} <span className="gv-dates">({f.dates})</span>. {f.note}</p>)}
        </div>
        <div className="gv-tools">
          {crew.map((c) => <p key={c.dept}><b>{c.dept}:</b> {c.names.join(', ')}</p>)}
        </div>
      </section>

      <section className="gv-columns" id="columns">
        <p className="gv-kick">Columns</p>
        <h2 className="gv-h2">Articles from the author</h2>
        <ul>
          {articles.map((a) => <li key={a.slug}><a href={`/articles/${a.slug}/`}><b>{a.title}</b><span>{a.dek}</span></a></li>)}
        </ul>
      </section>

      <section className="gv-listings" id="listings">
        <p className="gv-kick">Listings</p>
        <h2 className="gv-h2">What’s on at the pictures</h2>
        <p className="gv-listings__p">{picks.map((p) => <span key={p.title}><b>{p.title}</b> ({p.year}, {p.by}) </span>)}</p>
      </section>

      <section className="gv-classified" id="classifieds">
        <p className="gv-kick">Classifieds</p>
        <div className="gv-ad">
          <h2>AI ENGINEER / RESEARCHER, available.</h2>
          <p>Agents, retrieval, computer vision, Python and React. Open to roles, research collaboration and project enquiries. Write to <a href={`mailto:${profile.email}`}>{profile.email}</a>, or find him on <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a>, <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> and <a href={profile.links.kaggle} target="_blank" rel="noreferrer">Kaggle</a>.</p>
        </div>
      </section>

      <footer className="gv-foot">Printed on recycled pixels. © 2026 Asad Saleem.</footer>
    </div>
  );
}
