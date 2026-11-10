import { useEffect, useLayoutEffect, useRef } from 'react';
import Ambient from './components/layout/Ambient';
import Nav from './components/layout/Nav';
import ToTop from './components/layout/ToTop';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import LegalPage from './pages/LegalPage';
import { useSiteScroll } from './hooks/useSiteScroll';
import { useRoute, startLinkRouting } from './lib/router';
import { jumpToTop, scrollToHash } from './lib/scroll';
import { ScrollTrigger } from './lib/gsap';
import { BRAND } from './data/content';
import { legalPages } from './data/legal';

const HOME_TITLE = document.title;
const HOME_DESC = document.querySelector('meta[name="description"]')?.content ?? '';

/** Browser tab title and meta description for each route. */
function setMeta(route) {
  const legal = legalPages[route];
  document.title = legal ? `${legal.title} — ${BRAND}` : HOME_TITLE;
  document.querySelector('meta[name="description"]')?.setAttribute('content', legal ? legal.intro : HOME_DESC);
}

/** Header, page, footer and back-to-top for one route. Keyed by route, so each page mounts fresh. */
function Page({ route }) {
  const home = route === 'home';
  return (
    <>
      <Ambient />
      <Nav homeHref={home ? '#top' : './'} />
      {home ? <HomePage /> : <LegalPage page={route} />}
      <Footer onHome={home} current={home ? undefined : route} />
      <ToTop />
    </>
  );
}

export default function App() {
  const route = useRoute();
  const first = useRef(true);
  useSiteScroll();
  useEffect(() => startLinkRouting(), []);

  // A new route starts at the top, unless the URL names a section (e.g. ./#faq, privacy#cookies).
  useLayoutEffect(() => {
    setMeta(route);
    const isFirst = first.current;
    first.current = false;
    if (!isFirst) jumpToTop();
    ScrollTrigger.refresh();
    if (location.hash.length < 2) return undefined;
    // Wait for fonts and a short settle so the target's position is final.
    let alive = true;
    const settle = new Promise((r) => setTimeout(r, isFirst ? 350 : 150));
    Promise.all([settle, document.fonts?.ready]).then(() => {
      if (!alive) return;
      ScrollTrigger.refresh();
      scrollToHash(location.hash);
    });
    return () => { alive = false; };
  }, [route]);

  return <Page key={route} route={route} />;
}
