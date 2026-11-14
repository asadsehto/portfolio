import { useRef, useState } from 'react';
import { profile, feature, posters, shorts, filmography, crew, picks, openSource } from '../../data/content';
import { articles } from '../../data/articles';
import './desktop.css';

/* 1998 — a desktop operating system. Icons open windows; windows drag, stack, minimise and close.
   The Start menu lists everything. Nothing is a metaphor for show: every window is a real section. */

const APPS = {
  about: { title: 'About Asad.txt', icon: 'txt' },
  research: { title: 'Research 2026.pdf', icon: 'pdf' },
  projects: { title: 'Projects', icon: 'folder' },
  oss: { title: 'Open Source.log', icon: 'log' },
  cv: { title: 'Resume.doc', icon: 'doc' },
  articles: { title: 'Articles', icon: 'folder' },
  films: { title: 'Films.m3u', icon: 'media' },
  contact: { title: 'Mail', icon: 'mail' },
};
const ORDER = Object.keys(APPS);

function Icon({ kind }) {
  return <span className={`dk-ico dk-ico--${kind}`} aria-hidden><i /></span>;
}

function Body({ id }) {
  switch (id) {
    case 'about': return (
      <div className="dk-text">
        <div className="dk-about"><img src="/asad.jpg" alt="Portrait of Asad Saleem" width="460" height="460" /><div><b>Asad Saleem</b><br />AI Engineer · Independent Researcher<br />LLM agents & computer vision<br /><br />{profile.logline}<br /><br />Now: AI Engineer at Miami TV.<br />BS Computer Science (AI), Sukkur IBA University, expected August 2027.</div></div>
      </div>);
    case 'research': return (
      <div className="dk-doc">
        <h3>{feature.title}</h3>
        <p><i>{feature.question}</i></p>
        <p>{feature.synopsis}</p>
        <table className="dk-table"><tbody>{feature.stats.map((s) => <tr key={s.value}><th>{s.value}</th><td>{s.label}</td></tr>)}</tbody></table>
        <p>Safeguards: {feature.safeguards.join(', ')}.</p>
        <p><a className="dk-btn" href={feature.article}>Open article</a> <a className="dk-btn" href={feature.link} target="_blank" rel="noreferrer">View code & data</a></p>
      </div>);
    case 'projects': return (
      <div className="dk-files">
        {posters.map((p) => (
          <a key={p.title} className="dk-file" href={p.link} target="_blank" rel="noreferrer" title={p.blurb}>
            <img src={p.still} alt="" loading="lazy" width="1200" height="750" />
            <span>{p.title}</span><small>{p.tagline}</small>
          </a>
        ))}
        <div className="dk-files__more">Older: {shorts.map((s, i) => <span key={s.title}>{i ? ', ' : ''}<a href={s.link} target="_blank" rel="noreferrer">{s.title}</a></span>)}</div>
      </div>);
    case 'oss': return (
      <pre className="dk-log">{openSource.map((o) => `[${o.date}] ${o.repo} (${o.stars} stars)\n  ${o.kind.toUpperCase()} ${o.status.toUpperCase()}: ${o.what}\n  ${o.link}\n\n`).join('')}</pre>);
    case 'cv': return (
      <div className="dk-doc">
        <h3>Experience</h3>
        {filmography.map((f) => <p key={f.org}><b>{f.role}</b>, {f.org} ({f.dates})<br />{f.note}</p>)}
        <h3>Tools</h3>
        {crew.map((c) => <p key={c.dept}><b>{c.dept}:</b> {c.names.join(', ')}</p>)}
      </div>);
    case 'articles': return (
      <ul className="dk-list">{articles.map((a) => <li key={a.slug}><Icon kind="txt" /><a href={`/articles/${a.slug}/`}>{a.title}</a><small>{a.readMins} min</small></li>)}</ul>);
    case 'films': return (
      <ol className="dk-playlist">{picks.map((p) => <li key={p.title}><span>{p.title}</span><small>{p.year} · {p.by}</small></li>)}</ol>);
    case 'contact': return (
      <div className="dk-mail">
        <div className="dk-mail__row"><span>To:</span><b>{profile.email}</b></div>
        <div className="dk-mail__row"><span>Subject:</span><b>Let’s work together</b></div>
        <p>Open to AI/ML engineering roles, research collaboration and project enquiries.</p>
        <p><a className="dk-btn dk-btn--primary" href={`mailto:${profile.email}`}>Send</a> <a className="dk-btn" href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a> <a className="dk-btn" href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> <a className="dk-btn" href={profile.links.kaggle} target="_blank" rel="noreferrer">Kaggle</a></p>
      </div>);
    default: return null;
  }
}

export default function Desktop() {
  const [wins, setWins] = useState(() => [{ id: 'about', x: 60, y: 40, min: false }, { id: 'projects', x: 380, y: 120, min: false }]);
  const [top, setTop] = useState('projects');
  const [start, setStart] = useState(false);
  const drag = useRef(null);

  const open = (id) => {
    setWins((w) => (w.some((x) => x.id === id) ? w.map((x) => (x.id === id ? { ...x, min: false } : x)) : [...w, { id, x: 80 + w.length * 28, y: 60 + w.length * 24, min: false }]));
    setTop(id); setStart(false);
  };
  const close = (id) => setWins((w) => w.filter((x) => x.id !== id));
  const minimise = (id) => setWins((w) => w.map((x) => (x.id === id ? { ...x, min: true } : x)));
  const onDown = (e, id) => {
    if (e.button !== 0) return;
    const w = wins.find((x) => x.id === id);
    drag.current = { id, dx: e.clientX - w.x, dy: e.clientY - w.y };
    setTop(id);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onMove = (e) => {
    if (!drag.current) return;
    const { id, dx, dy } = drag.current;
    setWins((w) => w.map((x) => (x.id === id ? { ...x, x: Math.max(0, e.clientX - dx), y: Math.max(0, e.clientY - dy) } : x)));
  };
  const onUp = () => { drag.current = null; };

  return (
    <div className="t-desktop" onClick={() => start && setStart(false)}>
      <div className="dk-desk">
        <div className="dk-icons">
          {ORDER.map((id) => (
            <button key={id} className="dk-desk-icon" onDoubleClick={() => open(id)} onClick={() => open(id)} aria-label={`Open ${APPS[id].title}`}>
              <Icon kind={APPS[id].icon} /><span>{APPS[id].title}</span>
            </button>
          ))}
        </div>

        {wins.filter((w) => !w.min).map((w, i) => (
          <section
            key={w.id}
            className={`dk-win ${top === w.id ? 'is-top' : ''}`}
            style={{ transform: `translate(${w.x}px, ${w.y}px)`, zIndex: top === w.id ? 20 : 10 + i }}
            aria-labelledby={`dk-t-${w.id}`}
            onPointerDown={() => setTop(w.id)}
          >
            <header className="dk-win__bar" onPointerDown={(e) => onDown(e, w.id)} onPointerMove={onMove} onPointerUp={onUp}>
              <Icon kind={APPS[w.id].icon} />
              <h2 id={`dk-t-${w.id}`}>{APPS[w.id].title}</h2>
              <span className="dk-win__ctl">
                <button onClick={() => minimise(w.id)} aria-label="Minimise">_</button>
                <button onClick={() => close(w.id)} aria-label="Close">✕</button>
              </span>
            </header>
            <div className="dk-win__body"><Body id={w.id} /></div>
          </section>
        ))}
      </div>

      <footer className="dk-taskbar">
        <button className={`dk-start ${start ? 'is-on' : ''}`} onClick={(e) => { e.stopPropagation(); setStart(!start); }} aria-expanded={start} aria-haspopup="menu">
          <span className="dk-start__logo" aria-hidden /> Start
        </button>
        <div className="dk-tasks">
          {wins.map((w) => (
            <button key={w.id} className={`dk-task ${top === w.id && !w.min ? 'is-on' : ''}`} onClick={() => { setWins((ws) => ws.map((x) => (x.id === w.id ? { ...x, min: false } : x))); setTop(w.id); }}>
              <Icon kind={APPS[w.id].icon} />{APPS[w.id].title}
            </button>
          ))}
        </div>
        <span className="dk-clock">asadsaleem.tech</span>
        {start && (
          <nav className="dk-menu" role="menu" aria-label="Start menu" onClick={(e) => e.stopPropagation()}>
            <span className="dk-menu__band">Asad Saleem 98</span>
            <ul>
              {ORDER.map((id) => <li key={id}><button role="menuitem" onClick={() => open(id)}><Icon kind={APPS[id].icon} />{APPS[id].title}</button></li>)}
              <li className="dk-menu__sep" aria-hidden />
              <li><a role="menuitem" href="/articles/"><Icon kind="folder" />All articles…</a></li>
            </ul>
          </nav>
        )}
      </footer>
    </div>
  );
}
