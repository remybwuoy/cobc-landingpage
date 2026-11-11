import { useRef, useState } from 'react';
import SectionHead from '../ui/SectionHead';
import { PauseIcon, PlayIcon } from '../ui/Icons';
import { useGsap } from '../../hooks/useGsap';
import { gsap, EXPO } from '../../lib/gsap';
import { reduceMotion } from '../../lib/env';
import { partners } from '../../data/content';
import './Partners.css';

/*
 * Every image in src/assets/partners/ is bundled automatically.
 * Keys are lower-cased file names, e.g. "acme.svg" → URL of the hashed build file, so
 * "Acme-Logo.svg" in the folder and "acme-logo.svg" in the data still match.
 */
const files = Object.fromEntries(
  Object.entries(import.meta.glob('../../assets/partners/*.{svg,png,webp,jpg,jpeg}', { eager: true, import: 'default' }))
    .map(([path, url]) => [path.split('/').pop().toLowerCase(), url]),
);
const key = (f) => f?.toLowerCase();

/** "example-health-logo.svg" → "Example Health" */
const nameFromFile = (f) => f.replace(/\.[^.]+$/, '').replace(/[-_]?logo$/i, '').replace(/[-_]+/g, ' ').trim()
  .replace(/\b\w/g, (c) => c.toUpperCase());

/**
 * Logos only. Listed partners first (in order), then any logo in the folder that isn't listed.
 * A listed partner whose file isn't in the folder is left out rather than shown as text.
 */
const listed = new Set(partners.map((p) => key(p.logo)).filter(Boolean));
const all = [
  ...partners.filter((p) => {
    if (files[key(p.logo)]) return true;
    if (import.meta.env.DEV) console.warn(`Partners: no logo file for "${p.name}"${p.logo ? ` (looked for src/assets/partners/${p.logo})` : ''}; it is not shown.`);
    return false;
  }).map((p) => ({ ...p, src: files[key(p.logo)] })),
  ...Object.keys(files).filter((f) => !listed.has(f)).map((f) => ({ name: nameFromFile(f), src: files[f] })),
];

/** Each half of the loop holds at least this many logos, so it's always wider than the screen. */
const MIN_PER_HALF = 10;

function Logo({ p, hidden }) {
  const inner = <img src={p.src} alt={hidden ? '' : p.name} loading="lazy" draggable="false" />;
  return (
    <li className="partner" aria-hidden={hidden || undefined}>
      {p.href
        ? <a href={p.href} target="_blank" rel="noopener noreferrer" tabIndex={hidden ? -1 : undefined}
            aria-label={hidden ? undefined : `${p.name} (opens in a new tab)`}>{inner}</a>
        : <span className="partner-tile">{inner}</span>}
    </li>
  );
}

/**
 * Partner logos in an endless sliding row. It pauses while hovered or focused and has a
 * pause button (moving content must be stoppable). With reduced motion it's a still, wrapping row.
 */
export default function Partners() {
  const ref = useRef(null);
  const [paused, setPaused] = useState(false);

  useGsap(() => {
    gsap.from('.partners-rail', {
      y: 40, opacity: 0, duration: 1.1, ease: EXPO,
      scrollTrigger: { trigger: '.partners-rail', start: 'top 88%' },
    });
  }, ref);

  if (!all.length) return null;

  // One half = the list repeated until it's long enough; the track is two halves, moved by -50%.
  const repeat = Math.max(1, Math.ceil(MIN_PER_HALF / all.length));
  const half = Array.from({ length: repeat }, () => all).flat();
  const track = reduceMotion ? all : [...half, ...half];

  return (
    <section className="partners" id="partners" aria-labelledby="partnersH" ref={ref}>
      <div className="wrap">
        <SectionHead idx="07" label="Partners" id="partnersH"
          title={<>Building care<br />with <span className="t">good company.</span></>}
          lede="The organisations working with us to connect care, careers and community." />
      </div>

      <div className={`partners-rail${paused ? ' is-paused' : ''}${reduceMotion ? ' is-still' : ''}`}>
        <ul className="partners-track" style={{ '--dur': `${half.length * 4}s` }} aria-label="Our partners">
          {/* Only the first copy of each partner is announced and focusable; the rest are visual repeats. */}
          {track.map((p, i) => <Logo key={i} p={p} hidden={i >= all.length} />)}
        </ul>
      </div>

      {!reduceMotion && (
        <div className="wrap partners-ctrl">
          <button type="button" className="partners-toggle" aria-pressed={paused} onClick={() => setPaused((v) => !v)}>
            {paused ? <PlayIcon /> : <PauseIcon />}
            <span>{paused ? 'Play' : 'Pause'} slider</span>
          </button>
        </div>
      )}
    </section>
  );
}
