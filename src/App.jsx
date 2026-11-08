import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Atmosphere, Footer, Leader, Marquee } from './components/Chrome';
import Home from './pages/Home';
import { ArticleList, ArticlePage } from './pages/Articles';
import { matchRoute } from './routes';

export default function App({ url }) {
  const route = matchRoute(url);
  const isHome = route.page === 'home';

  // The countdown only runs in the browser, once per visit, and never for reduced motion.
  const [intro, setIntro] = useState(false);
  useEffect(() => {
    if (!isHome) return;
    let show = false;
    try {
      show =
        !window.matchMedia('(prefers-reduced-motion: reduce)').matches &&
        !window.location.hash &&
        sessionStorage.getItem('seen-leader') !== '1';
    } catch {
      /* storage blocked: skip intro */
    }
    if (!show) return;
    const id = requestAnimationFrame(() => setIntro(true));
    return () => cancelAnimationFrame(id);
  }, [isHome]);

  const finishIntro = useCallback(() => {
    try { sessionStorage.setItem('seen-leader', '1'); } catch { /* ignore */ }
    setIntro(false);
  }, []);

  let page;
  if (route.page === 'article') page = <ArticlePage article={route.article} />;
  else if (route.page === 'articles') page = <ArticleList />;
  else if (route.page === 'notfound')
    page = (
      <section className="section notfound">
        <span className="reel">Error 404</span>
        <h1 className="journal__title">Scene Missing</h1>
        <p className="section__sub">This reel didn’t make the final cut.</p>
        <a className="btn btn--red" href="/">Back to the main feature</a>
      </section>
    );
  else page = <Home />;

  return (
    <>
      <Atmosphere />
      <AnimatePresence>{intro && <Leader onDone={finishIntro} />}</AnimatePresence>
      <a className="skip" href="#main">Skip to content</a>
      <Marquee current={route.page === 'home' ? null : '/articles/'} />
      <main id="main" className={isHome ? '' : 'main--page'}>{page}</main>
      <Footer />
    </>
  );
}
