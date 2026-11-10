import { reduceMotion } from './env';

const KEY = 'cc-theme';
const root = () => document.documentElement;

/** The theme on <html>. index.html sets it before first paint (saved choice, else the OS setting). */
export const getTheme = () => (root().dataset.theme === 'dark' ? 'dark' : 'light');

/** The visitor's saved choice, or null when they haven't picked one. */
export function savedTheme() {
  try { return localStorage.getItem(KEY); } catch { return null; }
}

function apply(theme) {
  root().dataset.theme = theme;
}

/**
 * Switches theme and remembers the choice. Where View Transitions are supported, the new theme
 * spreads out in a circle from `origin` (the toggle's centre); otherwise it switches instantly.
 */
export function setTheme(theme, origin) {
  try { localStorage.setItem(KEY, theme); } catch { /* storage blocked: still switch for this visit */ }

  if (reduceMotion || !document.startViewTransition) { apply(theme); return; }

  const { x = innerWidth / 2, y = 0 } = origin || {};
  const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
  const vt = document.startViewTransition(() => apply(theme));
  vt.ready.then(() => {
    root().animate(
      { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
      { duration: 700, easing: 'cubic-bezier(.19,1,.22,1)', pseudoElement: '::view-transition-new(root)' },
    );
  }).catch(() => {});
}

/** Follows OS theme changes until the visitor picks a theme themselves. Returns a cleanup. */
export function followSystemTheme(onChange) {
  const mq = matchMedia('(prefers-color-scheme: dark)');
  const listener = (e) => {
    if (savedTheme()) return;
    const theme = e.matches ? 'dark' : 'light';
    apply(theme);
    onChange(theme);
  };
  mq.addEventListener('change', listener);
  return () => mq.removeEventListener('change', listener);
}
