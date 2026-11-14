import { useEffect, useState } from 'react';
import { profile, feature, posters, shorts, filmography, crew, picks, openSource } from '../../data/content';
import { articles } from '../../data/articles';
import './terminal.css';

/* 1972 — a teletype printout on fanfold paper. The most basic era: text only, one column,
   typed out line by line. Every "command" is a real link or anchor. */

const lines = [
  '$ whoami',
  'asad saleem - ai engineer, independent researcher',
  'llm agents . computer vision . sukkur iba university (bs cs/ai, aug 2027)',
  'now: ai engineer @ miami tv',
  '',
  '$ ls',
  'research/  projects/  open-source/  cv/  articles/  films/  contact',
  '',
  '$ cat README',
  profile.logline.toLowerCase(),
];

function useTyped(all, speed = 14) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const total = all.join('\n').length;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let raf;
    const t0 = performance.now();
    const tick = (t) => {
      const i = reduce ? total : Math.min(total, Math.floor((t - t0) / speed));
      setN(i);
      if (i < total) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [all, speed]);
  return n;
}

const Cmd = ({ children }) => <p className="tt-cmd"><span className="tt-prompt">$</span> {children}</p>;
const Block = ({ id, cmd, children }) => (
  <section className="tt-block" id={id}>
    <Cmd>{cmd}</Cmd>
    <div className="tt-out">{children}</div>
  </section>
);

export default function Terminal() {
  const typedN = useTyped(lines);
  const text = lines.join('\n');
  const shown = text.slice(0, typedN);
  const done = typedN >= text.length;

  return (
    <div className="t-terminal">
      <div className="tt-paper">
        <div className="tt-holes tt-holes--l" aria-hidden /><div className="tt-holes tt-holes--r" aria-hidden />
        <header className="tt-head">
          <span>TTY 33 · ASADSALEEM.TECH · 110 BAUD</span>
          <nav aria-label="Jump to"><a href="#research">research</a> <a href="#projects">projects</a> <a href="#oss">open-source</a> <a href="#cv">cv</a> <a href="/articles/">articles</a> <a href="#contact">contact</a></nav>
        </header>

        <pre className="tt-typed" aria-label="Session">{shown}{!done && <span className="tt-cursor" aria-hidden>█</span>}</pre>
        <h1 className="tt-sr">Asad Saleem — AI engineer and independent researcher</h1>

        <div className={`tt-rest ${done ? 'is-on' : ''}`} aria-hidden={!done}>
          <Block id="research" cmd="cat research/2026.txt">
            <h2>{feature.title.toUpperCase()}</h2>
            <p>{feature.synopsis}</p>
            <p>Q: {feature.question}</p>
            <table>
              <tbody>{feature.stats.map((s) => <tr key={s.value}><td>{s.value}</td><td>{s.label}</td></tr>)}</tbody>
            </table>
            <p>safeguards: {feature.safeguards.join(', ').toLowerCase()}</p>
            <p>→ <a href={feature.article}>articles/self-improving-harnesses</a> · <a href={feature.link} target="_blank" rel="noreferrer">github:continual-harness-small-models</a></p>
          </Block>

          <Block id="projects" cmd="ls -l projects/">
            <table className="tt-ls">
              <tbody>
                {posters.map((p) => (
                  <tr key={p.title}>
                    <td className="tt-mode">drwxr-xr-x</td>
                    <td className="tt-size">{p.tech.length}</td>
                    <td><a href={p.link} target="_blank" rel="noreferrer">{p.title.toLowerCase().replace(/\s+/g, '-')}/</a></td>
                    <td className="tt-desc">{p.blurb}</td>
                  </tr>
                ))}
                {shorts.map((s) => (
                  <tr key={s.title}>
                    <td className="tt-mode">-rw-r--r--</td>
                    <td className="tt-size">1</td>
                    <td><a href={s.link} target="_blank" rel="noreferrer">{s.title.toLowerCase().replace(/\s+/g, '-')}</a></td>
                    <td className="tt-desc">{s.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Block>

          <Block id="oss" cmd="git log --author=asadsehto --upstream">
            {openSource.map((o) => (
              <p key={o.link} className="tt-commit">
                <span className="tt-hash">{o.date}</span> <a href={o.link} target="_blank" rel="noreferrer">{o.repo}</a> <span className="tt-dim">({o.stars}★)</span><br />
                {'    '}{o.what}<br />
                {'    '}<span className={o.status === 'Merged' ? 'tt-ok' : 'tt-dim'}>[{o.kind.toLowerCase()} · {o.status.toLowerCase()}]</span>
              </p>
            ))}
          </Block>

          <Block id="cv" cmd="cat cv/experience.txt">
            {filmography.map((f) => <p key={f.org}><span className="tt-hash">{f.dates}</span>  {f.role} — {f.org}<br />{'            '}{f.note}</p>)}
            <Cmd>cat cv/tools.txt</Cmd>
            {crew.map((c) => <p key={c.dept}>{c.dept.toLowerCase().padEnd(22, '.')} {c.names.join(', ')}</p>)}
          </Block>

          <Block id="articles" cmd="ls articles/">
            {articles.map((a) => <p key={a.slug}><a href={`/articles/${a.slug}/`}>{a.slug}.txt</a> <span className="tt-dim">({a.readMins} min) — {a.title}</span></p>)}
          </Block>

          <Block id="films" cmd="cat films/favourites.txt | head -26">
            <p className="tt-films">{picks.map((p) => `${p.title} (${p.year})`).join('\n')}</p>
          </Block>

          <Block id="contact" cmd="finger asad">
            <p>Login: asad{'                  '}Name: Asad Saleem<br />Mail: <a href={`mailto:${profile.email}`}>{profile.email}</a><br />Plan: open to ai/ml roles, research collaboration and project enquiries.<br />Links: <a href={profile.links.github} target="_blank" rel="noreferrer">github</a> · <a href={profile.links.linkedin} target="_blank" rel="noreferrer">linkedin</a> · <a href={profile.links.kaggle} target="_blank" rel="noreferrer">kaggle</a></p>
          </Block>
          <p className="tt-cmd"><span className="tt-prompt">$</span> <span className="tt-cursor" aria-hidden>█</span></p>
        </div>
      </div>
    </div>
  );
}
