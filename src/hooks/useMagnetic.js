import { useEffect } from 'react';
import { gsap } from '../lib/gsap';
import { pointerFx } from '../lib/env';

/** Button follows the pointer with an elastic pull; its label moves half as far. */
export function useMagnetic(ref, enabled = true) {
  useEffect(() => {
    const btn = ref.current;
    if (!enabled || !pointerFx || !btn) return undefined;
    const lab = btn.querySelector('.roll');
    const q = (el, p) => gsap.quickTo(el, p, { duration: 0.7, ease: 'elastic.out(1,0.4)' });
    const bx = q(btn, 'x'), by = q(btn, 'y'), lx = q(lab, 'x'), ly = q(lab, 'y');
    let r = null;
    const enter = () => { r = btn.getBoundingClientRect(); };
    const move = (e) => {
      if (!r) return;
      const dx = e.clientX - r.left - r.width / 2, dy = e.clientY - r.top - r.height / 2;
      bx(dx * 0.3); by(dy * 0.3); lx(dx * 0.15); ly(dy * 0.15);
    };
    const leave = () => { bx(0); by(0); lx(0); ly(0); };
    btn.addEventListener('pointerenter', enter);
    btn.addEventListener('pointermove', move);
    btn.addEventListener('pointerleave', leave);
    return () => {
      btn.removeEventListener('pointerenter', enter);
      btn.removeEventListener('pointermove', move);
      btn.removeEventListener('pointerleave', leave);
      gsap.killTweensOf([btn, lab]);
      gsap.set([btn, lab], { clearProps: 'transform' });
    };
  }, [ref, enabled]);
}
