import { useEffect, useRef, useState } from 'react';
import { useGsap } from '../../hooks/useGsap';
import { gsap, EXPO } from '../../lib/gsap';
import { footerLinks, BRAND, BRAND_SHORT, MAKER, LOGO_SRC } from '../../data/content';
import { HeartIcon } from '../ui/Icons';
import './Footer.css';

const WORD = [...BRAND_SHORT.lead];
const MARK = [...BRAND_SHORT.accent];
const YEAR = new Date().getFullYear();
const localTime = () => 'Local time ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

function LinkCol({ title, links }) {
  return (
    <div className="foot-col">
      <h4>{title}</h4>
      <ul>
        {links.map((l) => <li key={l.label}><a className="ul" href={l.href}>{l.label}</a></li>)}
      </ul>
    </div>
  );
}

/** Dark footer: logo and description, link columns, a ghost wordmark sized to the full width, then copyright, credit and a local clock. */
export default function Footer() {
  const ref = useRef(null);
  const wmRef = useRef(null);
  const [clock, setClock] = useState(localTime);

  useEffect(() => {
    const id = setInterval(() => setClock(localTime()), 30000);
    return () => clearInterval(id);
  }, []);

  // Size the wordmark so its letters span the container exactly.
  useEffect(() => {
    const wm = wmRef.current;
    const fit = () => {
      wm.style.fontSize = '';
      const w = wm.lastElementChild.getBoundingClientRect().right - wm.firstElementChild.getBoundingClientRect().left;
      wm.style.fontSize = (parseFloat(getComputedStyle(wm).fontSize) * wm.clientWidth / w) * 0.995 + 'px';
    };
    let alive = true;
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(() => alive && fit());
    window.addEventListener('resize', fit);
    return () => { alive = false; window.removeEventListener('resize', fit); };
  }, []);

  useGsap(() => {
    gsap.from('.wordmark span', {
      yPercent: 100, opacity: 0, duration: 1.2, ease: EXPO, stagger: 0.035,
      scrollTrigger: { trigger: wmRef.current, start: 'top 95%' },
    });
  }, ref);

  return (
    <footer className="footer" id="footer" ref={ref}>
      <div className="wrap">
        <div className="foot-grid">
          <div className="foot-brand">
            <img src={LOGO_SRC} alt={BRAND} width="445" height="506" loading="lazy" />
            <p className="lede">Connecting care, careers, commerce and community. The healthcare ecosystem app for the people who make care work.</p>
          </div>
          <LinkCol title="Explore" links={footerLinks.explore} />
          <LinkCol title="Start" links={footerLinks.start} />
        </div>
        <div className="wordmark" aria-hidden="true" ref={wmRef}>
          {WORD.map((c, i) => <span key={`w${i}`}>{c}</span>)}
          {MARK.map((c, i) => <span key={`m${i}`} className="c">{c}</span>)}
        </div>
        <div className="foot-bar">
          <span>© {YEAR} {BRAND}. All rights reserved.</span>
          <span className="made">Made with <span className="made-heart" role="img" aria-label="love"><HeartIcon /></span> by {MAKER}</span>
          <span>{clock}</span>
        </div>
      </div>
    </footer>
  );
}
