import { useEffect } from 'react';
import { ScrollTrigger } from '../lib/gsap';
import { startSmoothScroll, scrollToHash } from '../lib/scroll';

/**
 * App-wide scroll setup: Lenis smooth scrolling, in-page anchors that scroll smoothly and
 * move focus, and a ScrollTrigger refresh once fonts and images settle.
 */
export function useSiteScroll() {
  useEffect(() => {
    const stop = startSmoothScroll();

    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest('a[href^="#"]');
      const hash = a?.getAttribute('href');
      if (!hash || hash.length < 2) return;
      e.preventDefault();
      scrollToHash(hash);
      if (hash !== '#top') history.replaceState(null, '', hash);
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
}
