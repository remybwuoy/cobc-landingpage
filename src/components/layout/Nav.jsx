import { useEffect } from 'react';
import Button from '../ui/Button';
import ThemeToggle from '../ui/ThemeToggle';
import { AUTH_URL, AUTH_LABEL, BRAND, LOGO_SRC } from '../../data/content';
import './Nav.css';

/**
 * Fixed top bar: logo, theme toggle and Login / Sign up. The main menu (Menu.jsx) sits
 * in this bar over the hero and moves to the bottom of the screen after it.
 * Puts state classes on <html> that the CSS reads: `scrolled` (past 30px),
 * `compact` (past 160px: the wordmark collapses) and `on-dark` (a dark section sits under the bar).
 */
export default function Nav({ homeHref = '#top' }) {
  useEffect(() => {
    const root = document.documentElement;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      root.classList.toggle('scrolled', y > 30);
      root.classList.toggle('compact', y > 160);
      ticking = false;
    };
    const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    const dark = new Set();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? dark.add(e.target) : dark.delete(e.target)));
      root.classList.toggle('on-dark', dark.size > 0);
    }, { rootMargin: '0px 0px -92% 0px' });
    ['trust', 'footer'].forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el); });

    return () => {
      window.removeEventListener('scroll', onScroll);
      io.disconnect();
      root.classList.remove('scrolled', 'compact', 'on-dark');
    };
  }, []);

  return (
    <header className="nav" id="nav">
      <div className="wrap nav-inner">
        <a href={homeHref} className="logo" aria-label={`${BRAND} home`}>
          <img src={LOGO_SRC} alt="" width="445" height="506" />
          <span className="wm">CareOnboard<b>Connect</b></span>
        </a>
        <div className="nav-right">
          <ThemeToggle />
          <Button href={AUTH_URL} label={AUTH_LABEL} small magnetic className="nav-auth" />
        </div>
      </div>
    </header>
  );
}
