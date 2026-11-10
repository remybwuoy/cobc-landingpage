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

/** Scrolls to an in-page anchor ("#app", "#top", …) and moves focus there. */
export function scrollToHash(hash) {
  const top = hash === '#top';
  const el = top ? document.body : document.querySelector(hash);
  if (!el) return;
  if (lenis) lenis.scrollTo(top ? 0 : el, { duration: 1.4 });
  else el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  const focusEl = top ? document.getElementById('h1') : el;
  if (!focusEl) return;
  focusEl.setAttribute('tabindex', '-1');
  focusEl.focus({ preventScroll: true });
}
