import { useEffect } from 'react';
import Button from '../ui/Button';
import { SearchIcon } from '../ui/Icons';
import './Nav.css';

const logoSrc = `${import.meta.env.BASE_URL}logo-mark.png`;

/**
 * Fixed top bar. Puts state classes on <html> that the CSS reads:
 * `scrolled` (past 30px), `compact` (past 160px: the wordmark collapses) and
 * `on-dark` (a dark section sits under the bar).
 */
export default function Nav() {
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
        <a href="#top" className="logo" aria-label="CareConnect home">
          <img src={logoSrc} alt="" />
          <span className="wm">Care<b>Connect</b></span>
        </a>
        <div className="nav-right">
          <a href="#app" className="icon-btn" aria-label="See the app"><SearchIcon /></a>
          <Button href="#join" label="Get early access" small magnetic />
        </div>
      </div>
    </header>
  );
}
