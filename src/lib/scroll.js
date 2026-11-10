import Lenis from 'lenis';
import { gsap, ScrollTrigger } from './gsap';
import { reduceMotion } from './env';

let lenis = null;

/** Starts Lenis smooth scrolling, driven by the GSAP ticker. Returns a cleanup function. */
export function startSmoothScroll() {
  if (reduceMotion) return () => {};
  lenis = new Lenis({ lerp: 0.1 });
  lenis.on('scroll', ScrollTrigger.update);
  const tick = (t) => lenis?.raf(t * 1000);
  gsap.ticker.add(tick);
  gsap.ticker.lagSmoothing(0);
  return () => {
    gsap.ticker.remove(tick);
    gsap.ticker.lagSmoothing(500, 33);
    lenis?.destroy();
    lenis = null;
  };
}

/** Jumps to the top at once (used when the route changes). */
export function jumpToTop() {
  lenis?.resize(); // the new page's height, not the previous one's
  if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
  else window.scrollTo(0, 0);
}

/** Scrolls to an in-page anchor ("#app", "#top", …) and moves focus there. */
export function scrollToHash(hash) {
  const top = hash === '#top';
  let el = null;
  try { el = top ? document.body : document.querySelector(hash); } catch { return; } // not a valid selector
  if (!el) return;
  // Honour CSS scroll-margin-top (used to clear the fixed header) under Lenis as well.
  const offset = top ? 0 : -(parseFloat(getComputedStyle(el).scrollMarginTop) || 0);
  lenis?.resize(); // pick up height changes (e.g. a longer page after a route change)
  if (lenis) lenis.scrollTo(top ? 0 : el, { duration: 1.4, offset });
  else el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  const focusEl = top ? document.getElementById('h1') : el;
  if (!focusEl) return;
  focusEl.setAttribute('tabindex', '-1');
  focusEl.focus({ preventScroll: true });
}
