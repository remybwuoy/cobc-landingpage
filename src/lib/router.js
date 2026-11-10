import { useSyncExternalStore } from 'react';

/**
 * Minimal client-side router for the site's few pages, using the History API.
 * Routes are paths relative to the folder the site is served from, so the build works at the
 * domain root or in a subfolder:  ''  → home,  'privacy' → Privacy Policy,  'terms' → Terms.
 *
 * Links stay ordinary <a href> elements with relative URLs ("./", "privacy", "./#faq");
 * clicks on them are intercepted here and handled without a page load.
 */
export const ROUTES = { '': 'home', 'index.html': 'home', privacy: 'privacy', terms: 'terms' };
const PAGE_NAMES = Object.keys(ROUTES).filter((k) => k && k !== 'index.html');

/** The folder the app lives in, e.g. "/" or "/careconnect/". Worked out once from the first URL. */
const BASE = (() => {
  const p = location.pathname.replace(new RegExp(`(${PAGE_NAMES.join('|')})/?$`), '').replace(/index\.html$/, '');
  return p.endsWith('/') ? p : `${p}/`;
})();

/** Route name for a pathname, or null when it isn't one of ours (assets, other sites). */
export function routeFor(pathname) {
  if (!pathname.startsWith(BASE)) return null;
  const rel = pathname.slice(BASE.length).replace(/\/$/, '');
  return ROUTES[rel] ?? null;
}

const listeners = new Set();
const emit = () => listeners.forEach((l) => l());
const subscribe = (l) => { listeners.add(l); return () => listeners.delete(l); };
const snapshot = () => routeFor(location.pathname) ?? 'home';

/** Current route name; re-renders on navigation and on back/forward. */
export const useRoute = () => useSyncExternalStore(subscribe, snapshot);

/** Goes to a URL inside the site without reloading. */
export function navigate(url) {
  const next = new URL(url, location.href);
  if (next.pathname === location.pathname && next.search === location.search) return false; // same page: let anchors work
  history.pushState(null, '', next.pathname + next.search + next.hash);
  emit();
  return true;
}

window.addEventListener('popstate', emit);

/** Intercepts clicks on links to our own routes. Returns a cleanup function. */
export function startLinkRouting() {
  const onClick = (e) => {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest('a[href]');
    if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
    const href = a.getAttribute('href');
    if (href.startsWith('#')) return; // in-page anchors are handled by the scroll code
    const url = new URL(a.href);
    if (url.origin !== location.origin || routeFor(url.pathname) === null) return;
    if (navigate(url.href)) e.preventDefault();
  };
  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}
