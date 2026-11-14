import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Atmosphere, Footer, Leader, Marquee } from './components/Chrome';
import { EraSwitch, EraTease } from './components/EraPicker';
import Home from './pages/Home';
import { ArticleList, ArticlePage } from './pages/Articles';
import { matchRoute } from './routes';
import { THEME_PAGES, useTheme } from './themes';

const TEASED = 'teased';

export default function App({ url }) {
  const route = matchRoute(url);
  const isHome = route.page === 'home';
  const { theme, setTheme, chosen, ready } = useTheme();
  const cinema = theme === 'cinema';

  // First visit on the home page: a short flip through the other genres, then the spy thriller.
  // Returning visitors, shared ?era= links and reduced motion skip it.
  const [tease, setTease] = useState(false);
  const [intro, setIntro] = useState(false);
  const [attention, setAttention] = useState(false);
  useEffect(() => {
    if (!isHome || !ready) return;
    let run = false;
    try {
      run = !chosen && !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !window.location.hash && sessionStorage.getItem(TEASED) !== '1';
    } catch { /* storage blocked */ }
    if (!run) return;
    const id = requestAnimationFrame(() => setTease(true));
    return () => cancelAnimationFrame(id);
  }, [isHome, ready, chosen]);

  const finishTease = useCallback(() => {
    try { sessionStorage.setItem(TEASED, '1'); sessionStorage.setItem('seen-leader', '1'); } catch { /* ignore */ }
    setTease(false);
    setAttention(true);
    setTimeout(() => setAttention(false), 4000);
  }, []);

  // The film-leader countdown: cinema only, when there was no tease this session.
  useEffect(() => {
    if (!isHome || !ready || !cinema || tease) return;
    let show = false;
    try {
      show = !window.matchMedia('(prefers-reduced-motion: reduce)').matches && !window.location.hash && sessionStorage.getItem('seen-leader') !== '1' && sessionStorage.getItem(TEASED) === '1';
    } catch { /* storage blocked */ }
    if (!show) return;
    const id = requestAnimationFrame(() => setIntro(true));
    return () => cancelAnimationFrame(id);
  }, [isHome, ready, cinema, tease]);
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

  // Any other genre on the home page brings its own header, structure and footer.
  if (isHome && !cinema) {
    const Era = THEME_PAGES[theme];
    return (
      <>
        <a className="skip" href="#main">Skip to content</a>
        <main id="main"><Era /></main>
        <EraSwitch theme={theme} setTheme={setTheme} attention={attention} />
      </>
    );
  }

  return (
    <>
      {cinema && <Atmosphere />}
      {tease && <EraTease onDone={finishTease} />}
      <AnimatePresence>{intro && <Leader onDone={finishIntro} />}</AnimatePresence>
      <a className="skip" href="#main">Skip to content</a>
      <Marquee current={route.page === 'home' ? null : '/articles/'} />
      <main id="main" className={isHome ? '' : 'main--page'}>{page}</main>
      <Footer />
      <EraSwitch theme={theme} setTheme={setTheme} attention={attention} />
    </>
  );
}
