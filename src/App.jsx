import { useEffect } from 'react';
import Ambient from './components/layout/Ambient';
import Nav from './components/layout/Nav';
import Dock from './components/layout/Dock';
import Footer from './components/layout/Footer';
import Hero from './components/sections/Hero';
import Story from './components/sections/Story';
import Statement from './components/sections/Statement';
import Platform from './components/sections/Platform';
import Who from './components/sections/Who';
import Stats from './components/sections/Stats';
import Trust from './components/sections/Trust';
import Join from './components/sections/Join';
import { ScrollTrigger } from './lib/gsap';
import { startSmoothScroll, scrollToHash } from './lib/scroll';

export default function App() {
  useEffect(() => {
    const stop = startSmoothScroll();

    // In-page anchors scroll smoothly (through Lenis when it's running) and move focus.
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest('a[href^="#"]');
      const hash = a?.getAttribute('href');
      if (!hash || hash.length < 2) return;
      e.preventDefault();
      scrollToHash(hash);
    };
    document.addEventListener('click', onClick);

    // Fonts and images change layout after mount, so recalculate trigger positions.
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    if (document.readyState === 'complete') refresh();
    else window.addEventListener('load', refresh, { once: true });

    return () => {
      stop();
      document.removeEventListener('click', onClick);
      window.removeEventListener('load', refresh);
    };
  }, []);

  return (
    <>
      <Ambient />
      <Nav />
      <Dock />
      <main id="top">
        <Hero />
        <Story />
        <Statement />
        <Platform />
        <Who />
        <Stats />
        <Trust />
        <Join />
      </main>
      <Footer />
    </>
  );
}
