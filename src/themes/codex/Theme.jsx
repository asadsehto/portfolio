import { profile, feature, posters, shorts, filmography, crew, picks, openSource } from '../../data/content';
import { articles } from '../../data/articles';
import './codex.css';

/* c. 1400 — an illuminated codex. Two-column folios, red rubrics, drop capitals, marginal glosses.
   Structure: a title page, then numbered folios, each a chapter of the life. */

const Rubric = ({ children }) => <span className="cx-rubric">{children}</span>;
const Folio = ({ n, title, children, note }) => (
  <section className="cx-folio" id={title.toLowerCase().replace(/[^a-z]+/g, '-')}>
    <header className="cx-folio__head">
      <h2>{title}</h2>
      <span className="cx-folio__n">fol. {n}{n % 2 ? 'r' : 'v'}</span>
    </header>
    <div className="cx-folio__body">{children}</div>
    {note && <aside className="cx-gloss">{note}</aside>}
  </section>
);
const Drop = ({ text }) => (
  <p className="cx-drop"><span className="cx-cap" aria-hidden>{text[0]}</span>{text}</p>
);

export default function Codex() {
  return (
    <div className="t-codex">
      <nav className="cx-nav" aria-label="Contents">
        <a href="#top">Incipit</a><a href="#the-work">The Work</a><a href="#the-chronicle">Chronicle</a><a href="#of-letters-sent-abroad">Letters</a><a href="#how-to-reach-the-author">Reach</a>
        <a className="cx-nav__art" href="/articles/">Treatises</a>
      </nav>

      <header className="cx-title" id="top">
        <p className="cx-incipit">Here beginneth the book of</p>
        <h1>Asad Saleem</h1>
        <p className="cx-sub">Engineer of thinking machines · Independent researcher · Of Sukkur, in the year 2026</p>
        <img className="cx-portrait" src="/asad.jpg" alt="Portrait of Asad Saleem" width="460" height="460" />
        <div className="cx-border" aria-hidden />
        <p className="cx-colophon">Scribed at Sukkur IBA University, where the author readeth for a Bachelor of Computer Science in the artificial intelligences, to be completed in the eighth month of 2027.</p>
      </header>

      <Folio n={1} title="Of the Author" note={<><Rubric>Gloss.</Rubric> {profile.logline}</>}>
        <Drop text={`${profile.name} buildeth applications of artificial intelligence and pursueth research into agents, the language models and the seeing of machines. By day he serveth as AI Engineer at Miami TV; by night he writeth code that others may use freely.`} />
        <p>His instruments: {crew.flatMap((c) => c.names).slice(0, 10).join(', ')} and others besides.</p>
      </Folio>

      <Folio n={2} title="The Great Inquiry" note={<><Rubric>Nota bene.</Rubric> {feature.stats[2].label}.</>}>
        <h3 className="cx-h3">{feature.title}</h3>
        <Drop text={feature.synopsis} />
        <p className="cx-q">“{feature.question}”</p>
        <table className="cx-table">
          <tbody>
            {feature.stats.map((s) => <tr key={s.value}><th>{s.value}</th><td>{s.label}</td></tr>)}
          </tbody>
        </table>
        <p className="cx-safeguards"><Rubric>The five safeguards:</Rubric> {feature.safeguards.join('; ')}.</p>
        <p className="cx-links"><a href={feature.article}>Read the treatise</a> · <a href={feature.link} target="_blank" rel="noreferrer">The source, on GitHub</a></p>
      </Folio>

      <Folio n={3} title="The Work" note={<><Rubric>Of smaller works.</Rubric> {shorts.map((s) => <a key={s.title} href={s.link} target="_blank" rel="noreferrer">{s.title}</a>).reduce((a, b) => [a, ', ', b])}.</>}>
        <ol className="cx-works">
          {posters.map((p) => (
            <li key={p.title}>
              <a href={p.link} target="_blank" rel="noreferrer" className="cx-work">
                <img src={p.still} alt="" loading="lazy" width="1200" height="750" />
                <span className="cx-work__t">{p.title}</span>
                <span className="cx-work__g">{p.genre}</span>
                <span className="cx-work__b">{p.blurb}</span>
                <span className="cx-work__tech">{p.tech.join(' · ')}</span>
              </a>
            </li>
          ))}
        </ol>
      </Folio>

      <Folio n={4} title="Of Letters Sent Abroad" note={<><Rubric>Gloss.</Rubric> That is: changes sent to the common works of others, and accepted by their keepers.</>}>
        <ul className="cx-letters">
          {openSource.map((o) => (
            <li key={o.link}>
              <a href={o.link} target="_blank" rel="noreferrer"><b>{o.repo}</b></a> <span className="cx-stars">({o.stars} ★)</span> — {o.what} <Rubric>{o.kind}, {o.status.toLowerCase()}.</Rubric>
            </li>
          ))}
        </ul>
      </Folio>

      <Folio n={5} title="The Chronicle" note={<><Rubric>Of the shield.</Rubric> {crew.map((c) => `${c.dept}: ${c.names.join(', ')}`).join('. ')}.</>}>
        <dl className="cx-chron">
          {filmography.map((f) => (
            <div key={f.org}><dt>{f.dates}</dt><dd><b>{f.role}</b>, {f.org}. {f.note}</dd></div>
          ))}
        </dl>
      </Folio>

      <Folio n={6} title="Treatises & Entertainments" note={<><Rubric>Entertainments.</Rubric> The author delighteth in these plays of light: {picks.slice(0, 8).map((p) => p.title).join(', ')}, and more.</>}>
        <ul className="cx-treatises">
          {articles.map((a) => <li key={a.slug}><a href={`/articles/${a.slug}/`}>{a.title}</a> <span>{a.readMins} min</span></li>)}
        </ul>
      </Folio>

      <Folio n={7} title="How to Reach the Author">
        <Drop text={`Letters may be sent to ${profile.email}. The author is open to AI engineering roles, research collaboration and project enquiries.`} />
        <p className="cx-links">
          <a href={`mailto:${profile.email}`}>Write a letter</a> · <a href={profile.links.github} target="_blank" rel="noreferrer">GitHub</a> · <a href={profile.links.linkedin} target="_blank" rel="noreferrer">LinkedIn</a> · <a href={profile.links.kaggle} target="_blank" rel="noreferrer">Kaggle</a>
        </p>
      </Folio>

      <footer className="cx-explicit">Explicit liber. Finished in the year of our Lord 2026.</footer>
    </div>
  );
}
