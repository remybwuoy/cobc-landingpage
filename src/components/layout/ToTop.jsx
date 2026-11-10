import { useEffect, useRef, useState } from 'react';
import { ArrowUpIcon } from '../ui/Icons';
import { scrollToHash } from '../../lib/scroll';
import './ToTop.css';

const R = 25;
const C = 2 * Math.PI * R;

/** Floating back-to-top button. Appears past the hero; its ring fills with scroll progress. */
export default function ToTop() {
  const [shown, setShown] = useState(false);
  const ringRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(C * (1 - p));
      setShown(window.scrollY > window.innerHeight * 0.9);
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <a href="#top" className={`totop${shown ? ' is-on' : ''}`} aria-label="Back to top" tabIndex={shown ? undefined : -1}
      aria-hidden={shown ? undefined : true}>
      <svg className="totop-ring" viewBox="0 0 56 56" aria-hidden="true">
        <circle cx="28" cy="28" r={R} />
        <circle ref={ringRef} cx="28" cy="28" r={R} className="fill" strokeDasharray={C} strokeDashoffset={C} />
      </svg>
      <span className="totop-ar" aria-hidden="true">
        <span><ArrowUpIcon /><ArrowUpIcon /></span>
      </span>
    </a>
  );
}
