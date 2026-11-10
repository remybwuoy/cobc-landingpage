import { useEffect, useState } from 'react';
import { HomeIcon, PhoneIcon, GridIcon, PeopleIcon, PlusIcon } from '../ui/Icons';
import './Dock.css';

const links = [
  { sec: 'top', href: '#top', label: 'Home', aria: 'Home', Icon: HomeIcon },
  { sec: 'app', href: '#app', label: 'The app', aria: 'The app', Icon: PhoneIcon },
  { sec: 'platform', href: '#platform', label: 'Platform', aria: 'Platform', Icon: GridIcon },
  { sec: 'who', href: '#who', label: 'Who', aria: "Who it's for", Icon: PeopleIcon },
  { sec: 'join', href: '#join', label: 'Join', aria: 'Join', Icon: PlusIcon },
];

/** Section element id → dock item it lights up. */
const sectionMap = [
  ['hero', 'top'], ['app', 'app'], ['platform', 'platform'], ['who', 'who'],
  ['stats', 'who'], ['trust', 'who'], ['join', 'join'],
];

/**
 * App-style floating dock (from the app's bottom nav). It slides in after half a screen
 * of scrolling, tracks the section at the viewport middle, and hides over the form and footer.
 */
export default function Dock() {
  const [active, setActive] = useState('top');
  const [away, setAway] = useState(true);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    let ticking = false;
    const update = () => { setAway(window.scrollY < window.innerHeight * 0.5); ticking = false; };
    const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
    window.addEventListener('scroll', onScroll, { passive: true });
    update();

    const secIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.dataset.dock); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sectionMap.forEach(([id, sec]) => {
      const el = document.getElementById(id);
      if (el) { el.dataset.dock = sec; secIO.observe(el); }
    });

    const over = new Set();
    const hideIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? over.add(e.target) : over.delete(e.target)));
      setHidden(over.size > 0);
    }, { rootMargin: '0px 0px -10% 0px' });
    ['form', 'footer'].forEach((id) => { const el = document.getElementById(id); if (el) hideIO.observe(el); });

    return () => {
      window.removeEventListener('scroll', onScroll);
      secIO.disconnect();
      hideIO.disconnect();
    };
  }, []);

  const cls = ['dock', away && 'is-away', hidden && 'is-hidden'].filter(Boolean).join(' ');
  return (
    <nav className={cls} id="dock" aria-label="Sections">
      {links.map(({ sec, href, label, aria, Icon }) => (
        <a key={sec} href={href} className={active === sec ? 'is-active' : undefined} aria-label={aria}
          aria-current={active === sec ? 'location' : undefined}>
          <Icon /><span>{label}</span>
        </a>
      ))}
    </nav>
  );
}
