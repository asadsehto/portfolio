import { useState } from 'react';
import { profile, feature, posters, shorts, filmography, crew, picks, openSource } from '../../data/content';
import { articles } from '../../data/articles';
import './arcade.css';

/* 1994 — a 16-bit RPG menu. A status window for the character, a quest log for projects,
   party members for the skills, inventory for the tools, and a save point to get in touch.
   The tabs are a real menu: arrow keys move between them. */

const TABS = ['Status', 'Quests', 'Guild', 'Journal', 'Party', 'Library', 'Save'];
const LV = 23; // years, a joke the sheet makes once

const Win = ({ title, children, className = '' }) => (
  <section className={`ar-win ${className}`}>
    {title && <h2 className="ar-win__title">{title}</h2>}
    <div className="ar-win__body">{children}</div>
  </section>
);
const Bar = ({ label, v, max = 100 }) => (
  <div className="ar-bar"><span>{label}</span><i aria-hidden><b style={{ width: `${(v / max) * 100}%` }} /></i><em>{v}/{max}</em></div>
);

export default function Arcade() {
  const [tab, setTab] = useState(0);
  const onKey = (e) => {
    if (!['ArrowRight', 'ArrowLeft', 'Home', 'End'].includes(e.key)) return;
    e.preventDefault();
    const n = e.key === 'Home' ? 0 : e.key === 'End' ? TABS.length - 1 : (tab + (e.key === 'ArrowRight' ? 1 : -1) + TABS.length) % TABS.length;
    setTab(n); document.getElementById(`ar-tab-${n}`)?.focus();
  };

  return (
    <div className="t-arcade">
      <header className="ar-top">
        <span className="ar-top__name">ASAD SALEEM</span>
        <span className="ar-top__lv">LV {LV} · AI ENGINEER</span>
        <span className="ar-top__gold">★ {openSource.reduce((a, o) => a + parseFloat(o.stars), 0).toFixed(1)}k upstream</span>
      </header>

      <div className="ar-tabs"><div className="ar-tabs__list" role="tablist" aria-label="Menu" onKeyDown={onKey}>
        {TABS.map((t, i) => (
          <button key={t} id={`ar-tab-${i}`} role="tab" aria-selected={tab === i} aria-controls="ar-panel" tabIndex={tab === i ? 0 : -1} className="ar-tab" onClick={() => setTab(i)}>
            <span className="ar-tab__cur" aria-hidden>▶</span>{t}
          </button>
        ))}
      </div>
      <a className="ar-tab ar-tab--link" href="/articles/">Articles ↗</a>
      </div>

      <div id="ar-panel" role="tabpanel" aria-labelledby={`ar-tab-${tab}`} className="ar-panel">
        {tab === 0 && (
          <div className="ar-grid ar-grid--status">
            <Win title="Character">
              <div className="ar-char">
                <img src="/asad.jpg" alt="Portrait of Asad Saleem" width="460" height="460" />
                <div>
                  <p className="ar-big">Asad Saleem</p>
                  <p>Class: AI Engineer / Researcher</p>
                  <p>Guild: Miami TV</p>
                  <p>Home: Sukkur IBA University (BS CS/AI, Aug 2027)</p>
                  <p className="ar-dim">{profile.logline}</p>
                </div>
              </div>
            </Win>
            <Win title="Stats">
              <Bar label="Agents" v={92} /><Bar label="Retrieval" v={86} /><Bar label="Vision" v={74} /><Bar label="Research" v={88} /><Bar label="Frontend" v={70} />
              <p className="ar-dim ar-note">Bars are self-assessed, not benchmarks.</p>
            </Win>
            <Win title="Current quest" className="ar-win--wide">
              <p className="ar-big">{feature.title}</p>
              <p>{feature.synopsis}</p>
              <ul className="ar-loot">
                {feature.stats.map((s) => <li key={s.value}><b>{s.value}</b> {s.label}</li>)}
              </ul>
              <p>Safeguards unlocked: {feature.safeguards.join(' · ')}</p>
              <p><a href={feature.article} className="ar-btn">Read the log</a> <a href={feature.link} target="_blank" rel="noreferrer" className="ar-btn ar-btn--alt">Open the chest (code)</a></p>
            </Win>
          </div>
        )}

        {tab === 1 && (
          <div className="ar-grid ar-grid--quests">
            {posters.map((p, i) => (
              <Win key={p.title} title={`Quest ${i + 1}: ${p.title}`}>
                <img className="ar-shot" src={p.still} alt="" loading="lazy" width="1200" height="750" />
                <p className="ar-tag">“{p.tagline}”</p>
                <p>{p.blurb}</p>
                <p className="ar-dim">Requires: {p.tech.join(', ')}</p>
                <p><a className="ar-btn" href={p.link} target="_blank" rel="noreferrer">Accept</a> {p.live && <a className="ar-btn ar-btn--alt" href={p.live} target="_blank" rel="noreferrer">Play demo</a>}</p>
              </Win>
            ))}
            <Win title="Side quests" className="ar-win--wide">
              <ul className="ar-side">{shorts.map((s) => <li key={s.title}><a href={s.link} target="_blank" rel="noreferrer">{s.title}</a> <span className="ar-dim">— {s.note}</span></li>)}</ul>
            </Win>
          </div>
        )}

        {tab === 2 && (
          <Win title="Guild contributions (open source)">
            <table className="ar-table">
              <thead><tr><th>Realm</th><th>Deed</th><th>Reward</th><th>Result</th></tr></thead>
              <tbody>
                {openSource.map((o) => (
                  <tr key={o.link}>
                    <td><a href={o.link} target="_blank" rel="noreferrer">{o.repo}</a></td>
                    <td>{o.what}</td>
                    <td>★ {o.stars}</td>
                    <td className={o.status === 'Merged' ? 'ar-ok' : ''}>{o.kind} · {o.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Win>
        )}

        {tab === 3 && (
          <Win title="Journal (experience)">
            <ol className="ar-journal">
              {filmography.map((f) => <li key={f.org}><span className="ar-date">{f.dates}</span><b>{f.role}</b> at {f.org}<br /><span className="ar-dim">{f.note}</span></li>)}
            </ol>
          </Win>
        )}

        {tab === 4 && (
          <div className="ar-grid ar-grid--party">
            {crew.map((c) => (
              <Win key={c.dept} title={c.dept}>
                <ul className="ar-party">{c.names.map((n) => <li key={n}><span aria-hidden>◆</span>{n}</li>)}</ul>
              </Win>
            ))}
          </div>
        )}

        {tab === 5 && (
          <div className="ar-grid ar-grid--lib">
            <Win title="Scrolls (articles)">
              <ul className="ar-side">{articles.map((a) => <li key={a.slug}><a href={`/articles/${a.slug}/`}>{a.title}</a> <span className="ar-dim">({a.readMins} min)</span></li>)}</ul>
            </Win>
            <Win title="Favourite films">
              <ul className="ar-films">{picks.map((p) => <li key={p.title}>{p.title} <span className="ar-dim">{p.year}</span></li>)}</ul>
            </Win>
          </div>
        )}

        {tab === 6 && (
          <Win title="Save point">
            <p className="ar-big">Would you like to get in touch?</p>
            <p>Open to AI/ML engineering roles, research collaboration and project enquiries.</p>
            <p><a className="ar-btn" href={`mailto:${profile.email}`}>▶ Yes, send a message</a></p>
            <p><a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a> · <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> · <a href={profile.links.kaggle} target="_blank" rel="noreferrer">Kaggle</a></p>
            <p className="ar-dim">{profile.email}</p>
          </Win>
        )}
      </div>
      <footer className="ar-foot">← → to change tab · Press Start 2P / VT323 · 2026</footer>
    </div>
  );
}
