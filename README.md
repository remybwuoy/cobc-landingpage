# CareOnboardConnect concept website — React + Vite

A React 19 + Vite port of the static site in the parent folder. It has the same markup, styles and motion, split into one component per section.

## Scripts
```
npm install
npm run dev       # local dev server with hot reload
npm run build     # production build into dist/
npm run preview   # serve the built dist/ locally
```

## Structure
```
index.html                    Vite entry (fonts; theme and js-motion flag set before first paint)
public/logo.png               logo (nav and footer)
public/favicon*.png, apple-touch-icon.png   square icons made from the logo
src/
  main.jsx                    mounts <App/>, imports base.css
  App.jsx                     page composition, Lenis smooth scroll, in-page anchor handling
  styles/base.css             design tokens, reset, shared pieces (buttons, phone, chips, sec-head)
  data/content.js             all copy and lists (steps, audiences, stats, trust items, FAQs, menu, links, AUTH_URL)
  lib/
    env.js                    reduced-motion / fine-pointer flags
    gsap.js                   GSAP + ScrollTrigger, registered once
    scroll.js                 Lenis setup and scrollToHash()
    theme.js                  light/dark theme: saved choice, OS fallback, circular reveal
  hooks/
    useGsap.js                gsap.context per component, reverted on unmount
    useInViewOnce.js          IntersectionObserver "seen once" flag
    useMagnetic.js            magnetic button effect
  components/
    ui/                       Button, Phone, SectionHead, ThemeToggle, Icons
    layout/                   Ambient (grain + edge blur), Nav (top bar), Menu (top bar → bottom dock), ToTop, Footer
    sections/                 Hero, Story, Statement, Platform, Who, Stats, Trust, Faq
    platform/                 bento tiles: Post, Certs, Job, Telehealth, HealthTips, Market, Cowry
  assets/images/              app screens and community post (hashed by Vite on build)
```
Each section's `.jsx` file has a `.css` file next to it, which holds that section's rules and its responsive breakpoints.

## Hosting
Run `npm run build` and upload the contents of `dist/` to any static host. `base: './'` in `vite.config.js` makes asset paths relative, so the build also works from a subfolder.

## Notes
- **Login / Sign up:** every sign-up link (nav, hero, Who rows, FAQ call to action, footer) goes to `AUTH_URL` in `src/data/content.js`. It's a placeholder: set the real URL there, or put `VITE_AUTH_URL=https://…` in a `.env` file before building.
- **Menu:** over the hero the menu sits in the top bar; once the next section reaches 60% down the screen it moves to a floating dock at the bottom, and it moves back on the way up. Items are `menuLinks` in `content.js`.
- **Dark mode:** the toggle in the top bar switches themes and remembers the choice (`localStorage` key `cc-theme`). With no saved choice the site follows the OS setting. Colours are tokens in `base.css`; dark values live under `:root[data-theme="dark"]`.
- **FAQs:** questions and answers are `faqs` in `content.js`. One opens at a time.
- **Content:** edit text in `src/data/content.js`. Hero fragments are defined at the top of `Hero.jsx`.
- **Motion:** every GSAP animation runs inside `useGsap` and is cleaned up on unmount. Under `prefers-reduced-motion` the site skips Lenis, GSAP, typing, timers, the odometer and the theme reveal, as the original did.
- **Fonts:** Urbanist loads from Google Fonts (`index.html`).
- **Licences:** GSAP is free under its standard licence, and Lenis is MIT.
