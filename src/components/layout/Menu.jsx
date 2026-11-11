import { useEffect, useState } from 'react';
import { HomeIcon, PhoneIcon, GridIcon, PeopleIcon, PartnersIcon, QuestionIcon } from '../ui/Icons';
import { menuLinks, menuSections } from '../../data/content';
import './Menu.css';

const icons = { home: HomeIcon, phone: PhoneIcon, grid: GridIcon, people: PeopleIcon, partners: PartnersIcon, question: QuestionIcon };

/** True once the first section after the hero reaches 60% down the viewport. */
const pastHero = () => {
  const next = document.getElementById('app');
  return !!next && next.getBoundingClientRect().top < window.innerHeight * 0.6;
};

/**
 * The main menu. Over the hero it sits in the top bar; once the hero is passed it
 * moves to an app-style floating dock at the bottom (and back again on the way up).
 * It tracks the section at the viewport middle and steps aside over the footer.
 */
export default function Menu() {
  const [active, setActive] = useState('top');
  const [docked, setDocked] = useState(pastHero);
  const [hidden, setHidden] = useState(false);
  // Set during render (not in an effect) so the first switch already carries the animation class.
  const [prevDocked, setPrevDocked] = useState(docked);
  const [moved, setMoved] = useState(false);
  if (prevDocked !== docked) { setPrevDocked(docked); setMoved(true); }

  useEffect(() => {
    let ticking = false;
    const update = () => { setDocked(pastHero()); ticking = false; };
    const onScroll = () => { if (!ticking) { requestAnimationFrame(update); ticking = true; } };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();

    const secIO = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.dataset.menu); });
    }, { rootMargin: '-45% 0px -50% 0px' });
    menuSections.forEach(([id, sec]) => {
      const el = document.getElementById(id);
      if (el) { el.dataset.menu = sec; secIO.observe(el); }
    });

    const footer = document.getElementById('footer');
    const hideIO = new IntersectionObserver(([e]) => setHidden(e.isIntersecting), { rootMargin: '0px 0px -10% 0px' });
    if (footer) hideIO.observe(footer);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      secIO.disconnect();
      hideIO.disconnect();
    };
  }, []);

  const cls = ['menu', docked ? 'is-docked' : 'is-top', moved && 'has-moved', docked && hidden && 'is-hidden']
    .filter(Boolean).join(' ');
  return (
    // is-top ↔ is-docked swaps the CSS animation, which replays the entrance on each switch.
    <nav className={cls} id="menu" aria-label="Main">
      {menuLinks.map(({ sec, href, label, short, icon }) => {
        const Icon = icons[icon];
        const on = active === sec;
        return (
          // data-tip feeds the hover/focus name bubble; data-same marks items whose short label is already the full name.
          <a key={sec} href={href} className={on ? 'is-active' : undefined} aria-label={label}
            aria-current={on ? 'location' : undefined} data-tip={label} data-same={!short || undefined}>
            <Icon />
            <span className="full">{label}</span>
            <span className="short" aria-hidden="true">{short || label}</span>
          </a>
        );
      })}
    </nav>
  );
}
