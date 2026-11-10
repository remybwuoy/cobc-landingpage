# CareConnect concept website — React + Vite

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
index.html                    Vite entry (fonts, js-motion flag set before first paint)
public/logo-mark.png          favicon + nav logo
src/
  main.jsx                    mounts <App/>, imports base.css
  App.jsx                     page composition, Lenis smooth scroll, in-page anchor handling
  styles/base.css             design tokens, reset, shared pieces (buttons, phone, chips, sec-head)
  data/content.js             all copy and lists (steps, audiences, stats, trust items, links)
  lib/
    env.js                    reduced-motion / fine-pointer flags
    gsap.js                   GSAP + ScrollTrigger, registered once
    scroll.js                 Lenis setup and scrollToHash()
  hooks/
    useGsap.js                gsap.context per component, reverted on unmount
    useInViewOnce.js          IntersectionObserver "seen once" flag
    useMagnetic.js            magnetic button effect
  components/
    ui/                       Button, Phone, SectionHead, Icons
    layout/                   Ambient (grain + edge blur), Nav, Dock, Footer
    sections/                 Hero, Story, Statement, Platform, Who, Stats, Trust, Join
    platform/                 bento tiles: Post, Certs, Job, Telehealth, Copilot, Market, Youth
  assets/images/              app screens and community post (hashed by Vite on build)
```
Each section's `.jsx` file has a `.css` file next to it, which holds that section's rules and its responsive breakpoints.

## Hosting
Run `npm run build` and upload the contents of `dist/` to any static host. `base: './'` in `vite.config.js` makes asset paths relative, so the build also works from a subfolder.

## Notes
- **Form:** the early-access form is a demo. It validates the email but sends nothing. Hook it up in `src/components/sections/Join.jsx` (`onSubmit`).
- **Content:** edit text in `src/data/content.js`. Hero fragments and dock items are defined at the top of `Hero.jsx` and `Dock.jsx`.
- **Motion:** every GSAP animation runs inside `useGsap` and is cleaned up on unmount. Under `prefers-reduced-motion` the site skips Lenis, GSAP, typing, timers and the odometer, as the original did.
- **Fonts:** Urbanist loads from Google Fonts (`index.html`).
- **Licences:** GSAP is free under its standard licence, and Lenis is MIT.
