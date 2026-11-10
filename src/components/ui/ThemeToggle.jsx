import { useEffect, useState } from 'react';
import { ThemeIcon } from './Icons';
import { getTheme, setTheme, followSystemTheme } from '../../lib/theme';

/** Round icon button that switches between light and dark mode. */
export default function ThemeToggle() {
  const [theme, setLocal] = useState(getTheme);
  useEffect(() => followSystemTheme(setLocal), []);

  const dark = theme === 'dark';
  const toggle = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    const next = dark ? 'light' : 'dark';
    setTheme(next, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
    setLocal(next);
  };

  return (
    <button type="button" className="icon-btn theme-btn" onClick={toggle}
      aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'} title={dark ? 'Light mode' : 'Dark mode'}>
      <ThemeIcon />
    </button>
  );
}
