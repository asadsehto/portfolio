import { articles } from '../data/articles';
import { Reveal } from '../components/Chrome';

const fmt = (d) =>
  new Date(`${d}T00:00:00Z`).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' });

export function ArticleList() {
  const [lead, ...rest] = articles;
  return (
    <section className="section journal">
      <nav className="crumbs" aria-label="Breadcrumb">
        <a href="/">Home</a> <span aria-hidden>/</span> <span aria-current="page">Articles</span>
      </nav>
      <header className="section__head">
        <span className="reel">The Press Room</span>
        <h1 className="journal__title">Articles</h1>
        <p className="section__sub">Notes on research, agents and the things I build — written up from the work itself.</p>
      </header>

      <article className="lead">
        <a href={`/articles/${lead.slug}/`} className="lead__link">
          <img src={lead.still} alt="" width="1200" height="750" />
          <div className="lead__body">
            <span className="clip__tag">{lead.tag} · {fmt(lead.date)} · {lead.readMins} min read</span>
            <h2>{lead.title}</h2>
            <p>{lead.dek}</p>
            <span className="lead__more">Read the article →</span>
          </div>
        </a>
      </article>

      <div className="press__grid">
        {rest.map((a, i) => (
          <Reveal key={a.slug} delay={i * 0.08} as="article" className="clip">
            <a href={`/articles/${a.slug}/`} className="clip__link">
              <img src={a.still} alt="" loading="lazy" width="1200" height="750" />
              <div className="clip__body">
                <span className="clip__tag">{a.tag} · {fmt(a.date)} · {a.readMins} min read</span>
                <h2 className="clip__h">{a.title}</h2>
                <p>{a.dek}</p>
              </div>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Block({ b }) {
  if (b.h) return <h2>{b.h}</h2>;
  if (b.ul) return <ul>{b.ul.map((li) => <li key={li}>{li}</li>)}</ul>;
  if (b.code) return <pre><code>{b.code}</code></pre>;
  if (b.quote) return <blockquote>{b.quote}</blockquote>;
  if (b.img)
    return (
      <figure>
        <img src={b.img} alt={b.alt} loading="lazy" width="1200" height="750" />
        {b.caption && <figcaption>{b.caption}</figcaption>}
      </figure>
    );
  return <p>{b.p}</p>;
}

export function ArticlePage({ article }) {
  const i = articles.indexOf(article);
  const next = articles[(i + 1) % articles.length];
  return (
    <article className="post">
      <header className="post__head">
        <nav className="crumbs" aria-label="Breadcrumb">
          <a href="/">Home</a> <span aria-hidden>/</span> <a href="/articles/">Articles</a> <span aria-hidden>/</span>{' '}
          <span aria-current="page">{article.tag}</span>
        </nav>
        <span className="clip__tag">{article.tag} · {article.readMins} min read</span>
        <h1>{article.title}</h1>
        <p className="post__dek">{article.dek}</p>
        <div className="byline">
          <img src="/asad.jpg" alt="" width="48" height="48" />
          <div>
            <a href="/" rel="author">Asad Saleem</a>
            <time dateTime={article.date}>{fmt(article.date)}</time>
          </div>
        </div>
      </header>

      <div className="post__body">
        {article.body.map((b, k) => <Block key={k} b={b} />)}
        <p className="post__source">
          Adapted from the project write-up.{' '}
          <a href={article.source} target="_blank" rel="noreferrer">See the code and full details on GitHub ↗</a>
        </p>
      </div>

      <footer className="post__next">
        <span className="reel">Up next</span>
        <a href={`/articles/${next.slug}/`}>
          <strong>{next.title}</strong>
          <span>{next.dek}</span>
        </a>
      </footer>
    </article>
  );
}
