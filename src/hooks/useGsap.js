import { useLayoutEffect } from 'react';
import { gsap } from '../lib/gsap';
import { reduceMotion } from '../lib/env';

/**
 * Runs GSAP setup inside a gsap.context scoped to `scope`, so selectors stay local
 * and everything (tweens, ScrollTriggers, pins) is reverted on unmount.
 * Skipped entirely under prefers-reduced-motion. `setup` may return an extra cleanup.
 */
export function useGsap(setup, scope) {
  useLayoutEffect(() => {
    if (reduceMotion) return undefined;
    let extra;
    const el = scope && typeof scope === 'object' && 'current' in scope ? scope.current : scope;
    const ctx = gsap.context(() => { extra = setup(); }, el);
    return () => {
      if (typeof extra === 'function') extra();
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
