import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Atmosphere, Footer, Leader, Marquee } from './components/Chrome';
import { EraLobby, EraSwitch } from './components/EraPicker';
import Home from './pages/Home';
import { ArticleList, ArticlePage } from './pages/Articles';
import { matchRoute } from './routes';
import { THEME_PAGES, useTheme } from './themes';

export default function App({ url }) {
  const route = matchRoute(url);
  const isHome = route.page === 'home';
  const { theme, setTheme, chosen, ready, setChosen } = useTheme();
  const cinema = theme === 'cinema';
  const showLobby = ready && isHome && !chosen;

  // The film-leader countdown belongs to the cinema era only, once per visit.
  const [intro, setIntro] = useState(false);
  useEffect(() => {
    if (!isHome || !ready || !chosen || !cinema) return;
    let show = false;
    try {
      show = !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !window.location.hash && sessionStorage.getItem('seen-leader') !== '1';
    } catch { /* storage blocked */ }
    if (!show) return;
    const id = requestAnimationFrame(() => setIntro(true));
    return () => cancelAnimationFrame(id);
  }, [isHome, ready, chosen, cinema]);
  const finishIntro = useCallback(() => {
    try { sessionStorage.setItem('seen-leader', '1'); } catch { /* ignore */ }
    setIntro(false);
  }, []);

  const pick = useCallback((id) => { setTheme(id); setChosen(true); }, [setTheme, setChosen]);

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

  // A non-cinema era on the home page brings its own header, structure and footer.
  if (isHome && !cinema) {
    const Era = THEME_PAGES[theme];
    return (
      <>
        <a className="skip" href="#main">Skip to content</a>
        <main id="main"><Era /></main>
        {showLobby && <EraLobby onPick={pick} />}
        <EraSwitch theme={theme} setTheme={setTheme} />
      </>
    );
  }

  return (
    <>
      {cinema && <Atmosphere />}
      <AnimatePresence>{intro && <Leader onDone={finishIntro} />}</AnimatePresence>
      <a className="skip" href="#main">Skip to content</a>
      <Marquee current={route.page === 'home' ? null : '/articles/'} />
      <main id="main" className={isHome ? '' : 'main--page'}>{page}</main>
      <Footer />
      {showLobby && <EraLobby onPick={pick} />}
      <EraSwitch theme={theme} setTheme={setTheme} />
    </>
  );
}
