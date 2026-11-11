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
index.html                    the single entry page (fonts; theme and js-motion flag set before first paint)
public/logo.png               logo (nav and footer)
public/.htaccess              Apache rewrite so /privacy and /terms load the app
public/favicon*.png, apple-touch-icon.png   square icons made from the logo
src/
  main.jsx                    mounts <App/>, imports base.css
  App.jsx                     route switch: shared header/footer around the current page, per-route title and scroll
  pages/                      HomePage (menu + all sections), LegalPage (Privacy Policy, Terms & Conditions)
  styles/base.css             design tokens, reset, shared pieces (buttons, phone, chips, sec-head)
  data/legal.js               Privacy Policy and Terms text, plus company details (placeholders)
  data/content.js             all copy and lists (steps, audiences, stats, trust items, FAQs, menu, links, AUTH_URL)
  lib/
    env.js                    reduced-motion / fine-pointer flags
    gsap.js                   GSAP + ScrollTrigger, registered once
    scroll.js                 Lenis setup, scrollToHash() and jumpToTop()
    router.js                 tiny History API router: '' home, 'privacy', 'terms'
    theme.js                  light/dark theme: saved choice, OS fallback, circular reveal
  hooks/
    useGsap.js                gsap.context per component, reverted on unmount
    useInViewOnce.js          IntersectionObserver "seen once" flag
    useMagnetic.js            magnetic button effect
    useSiteScroll.js          Lenis + smooth in-page anchors, shared by every page
  components/
    ui/                       Button, Phone, SectionHead, ThemeToggle, Icons
    layout/                   Ambient (grain + edge blur), Nav (top bar), Menu (top bar → bottom dock), ToTop, Footer
    sections/                 Hero, Story, Statement, Platform, Who, Stats, Trust, Partners, Faq
    platform/                 bento tiles: Post, Certs, Job, Telehealth, HealthTips, Market, Cowry
  assets/images/              app screens and community post (hashed by Vite on build)
  assets/partners/            partner logos: drop files here and they appear in the Partners slider
```
Each section's `.jsx` file has a `.css` file next to it, which holds that section's rules and its responsive breakpoints.

## Hosting
Run `npm run build` and upload the contents of `dist/` (including the hidden `.htaccess`) to any static host. `base: './'` in `vite.config.js` makes asset paths relative, so the build also works from a subfolder.

The site is one React app with client-side routes (`/`, `/privacy`, `/terms`). Opening or refreshing `/privacy` directly needs the server to answer with `index.html`:
- **Apache** (Laragon, cPanel): handled by `.htaccess` (needs `mod_rewrite` and `AllowOverride`).
- **Nginx:** `location / { try_files $uri $uri/ /index.html; }`
- **Netlify:** a `_redirects` file with `/*  /index.html  200`
- **Vercel:** a rewrite of `/(.*)` to `/index.html`
- `npm run dev` and `npm run preview` already do this.

## Notes
- **Login / Sign up:** every sign-up link (nav, hero, Who rows, FAQ call to action, footer) goes to `AUTH_URL` in `src/data/content.js`. It's a placeholder: set the real URL there, or put `VITE_AUTH_URL=https://…` in a `.env` file before building.
- **Menu:** over the hero the menu sits in the top bar; once the next section reaches 60% down the screen it moves to a floating dock at the bottom, and it moves back on the way up. Items are `menuLinks` in `content.js`.
- **Dark mode:** the toggle in the top bar switches themes and remembers the choice (`localStorage` key `cc-theme`). With no saved choice the site follows the OS setting. Colours are tokens in `base.css`; dark values live under `:root[data-theme="dark"]`.
- **Legal pages:** `/privacy` and `/terms` are React routes (`src/pages/LegalPage.jsx`), linked from the footer. The text lives in `src/data/legal.js`. It's a draft written from the feature list, not legal advice: have it reviewed and replace the `[bracketed]` company details at the top of that file before launch.
- **Partners:** logos in `src/assets/partners/` show up in the slider automatically. Names, order and links are `partners` in `content.js` (see the README in that folder). The slider shows logos only; an entry whose file is missing is skipped (with a console warning in dev). The slider pauses on hover, on keyboard focus and with its Pause button, and stands still under reduced motion.
- **FAQs:** questions and answers are `faqs` in `content.js`. One opens at a time.
- **Content:** edit text in `src/data/content.js`. Hero fragments are defined at the top of `Hero.jsx`.
- **Motion:** every GSAP animation runs inside `useGsap` and is cleaned up on unmount. Under `prefers-reduced-motion` the site skips Lenis, GSAP, typing, timers, the odometer and the theme reveal, as the original did.
- **Fonts:** Urbanist loads from Google Fonts (`index.html`).
- **Licences:** GSAP is free under its standard licence, and Lenis is MIT.
