import { useEffect, useRef } from 'react';
import Button from '../ui/Button';
import Phone from '../ui/Phone';
import { HeartIcon, PlusCircleIcon, CheckCircleIcon } from '../ui/Icons';
import { useGsap } from '../../hooks/useGsap';
import { gsap, EXPO } from '../../lib/gsap';
import { pointerFx } from '../../lib/env';
import './Hero.css';

/*
 * Fragments of the app orbiting the headline.
 * depth: 1 = closest (sharp, most parallax) … 3 = farthest (blurred).
 * out:   direction it flies off when the hero pins and scatters, as [x, y] in viewport fractions.
 * dx/dy: idle drift durations.
 */
const fragments = [
  {
    key: 'choose', depth: 3, out: [-1.1, -0.6], dx: '13s', dy: '17s', className: 'f-phone f-choose',
    style: { left: '4%', top: '12%', width: 'clamp(130px,11vw,180px)' },
    content: <><span className="tile-bg tb-a" /><Phone screen="choose" rotate="-7deg" /></>,
  },
  {
    key: 'step', depth: 2, out: [-0.6, -1], dx: '11s', dy: '14s', className: 'f-step',
    style: { left: '24%', top: '14%' },
    content: <span className="step-pill"><b>2</b> of 3</span>,
  },
  {
    key: 'like', depth: 3, out: [0.5, -1], dx: '15s', dy: '12s', className: 'f-like',
    style: { left: '61%', top: '11%' },
    content: (
      <div className="card" style={{ display: 'flex', gap: 14, alignItems: 'center', fontWeight: 600 }}>
        <span style={{ display: 'flex', gap: 6, alignItems: 'center' }}><HeartIcon color="#F43F5E" />140</span>
        <span style={{ color: 'var(--ink-sub)', fontWeight: 500 }}>12 comments</span>
      </div>
    ),
  },
  {
    key: 'certs', depth: 2, out: [1.1, -0.4], dx: '16s', dy: '13s', className: 'f-phone f-certs',
    style: { right: '4%', top: '15%', width: 'clamp(150px,12.5vw,200px)' },
    content: <><span className="tile-bg tb-b" /><Phone screen="certs" rotate="6deg" /></>,
  },
  {
    key: 'job', depth: 1, out: [-1, 0.6], dx: '12s', dy: '16s',
    style: { left: '6%', top: '66%' },
    content: (
      <div className="card" style={{ width: 250 }}>
        <div className="note">Job match · Behavior agency</div>
        <div style={{ fontWeight: 600, fontSize: '1.0625rem', margin: '3px 0 10px' }}>Behavior Technician (RBT)</div>
        <div className="meter"><i style={{ width: '92%' }} /></div>
        <div className="note" style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6 }}>
          <span>Match</span><b style={{ color: 'var(--ink)' }}>92%</b>
        </div>
      </div>
    ),
  },
  {
    key: 'chips', depth: 1, out: [-0.4, 1], dx: '14s', dy: '11s',
    style: { left: '26%', top: '83%' },
    content: (
      <div style={{ display: 'flex', gap: 10 }}>
        <span className="pill-chip">CPR <PlusCircleIcon /></span>
        <span className="pill-chip on">ACLS <CheckCircleIcon /></span>
      </div>
    ),
  },
  {
    key: 'feed', depth: 1, out: [0.3, 1.2], dx: '12s', dy: '15s', className: 'f-phone f-feed',
    style: { right: '20%', top: '63%', width: 'clamp(170px,14vw,230px)' },
    content: <Phone screen="feed" rotate="-3deg" />,
  },
  {
    key: 'copilot', depth: 2, out: [1, 0.8], dx: '17s', dy: '12s',
    style: { right: '3%', top: '70%' },
    content: (
      <div className="card" style={{ width: 240, background: 'var(--dark)', color: 'var(--on-dark)', borderColor: 'transparent' }}>
        <div style={{ fontSize: '.75rem', color: 'var(--on-dark-sub)' }}>✦ CareConnect Copilot</div>
        <div style={{ marginTop: 4, lineHeight: 1.4 }}>Your BLS expires in 30 days. Want a renewal class nearby?</div>
      </div>
    ),
  },
];

const PARALLAX = { 1: 32, 2: 20, 3: 10 };

export default function Hero() {
  const ref = useRef(null);

  // Pointer parallax: each fragment drifts against the pointer, nearer ones further.
  useEffect(() => {
    const hero = ref.current;
    if (!pointerFx) return undefined;
    const pars = [...hero.querySelectorAll('.frag')].map((f) => {
      const p = f.querySelector('.par');
      const d = PARALLAX[f.dataset.depth];
      return { d, x: gsap.quickTo(p, 'x', { duration: 1.2, ease: 'power3' }), y: gsap.quickTo(p, 'y', { duration: 1.2, ease: 'power3' }) };
    });
    const move = (e) => {
      const nx = e.clientX / window.innerWidth - 0.5, ny = e.clientY / window.innerHeight - 0.5;
      pars.forEach((p) => { p.x(-nx * p.d); p.y(-ny * p.d); });
    };
    hero.addEventListener('pointermove', move);
    return () => hero.removeEventListener('pointermove', move);
  }, []);

  useGsap(() => {
    const root = document.documentElement;
    // Intro: masked lines rise, copy fades up, then the orbit pops in with a slight overshoot.
    gsap.timeline({ delay: 0.15, onComplete: () => root.classList.remove('js-motion') })
      .fromTo('.line > span', { y: 0, yPercent: 108 }, { y: 0, yPercent: 0, duration: 1.2, ease: EXPO, stagger: 0.09 })
      .fromTo('.fade', { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 1, ease: EXPO, stagger: 0.08 }, '-=.9')
      .from('.frag .par', { scale: 0.6, opacity: 0, duration: 1.1, ease: 'back.out(1.6)', stagger: { each: 0.07, from: 'random' } }, '-=1');

    // Signature (desktop): the hero pins and the orbit scatters outward past the camera.
    const mm = gsap.matchMedia(ref.current);
    mm.add('(min-width: 901px)', () => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: ref.current, start: 'top top', end: '+=50%', scrub: 1, pin: true, invalidateOnRefresh: true } });
      tl.to('.hero-copy', { y: -60, opacity: 0, scale: 0.95, ease: 'power1.in', duration: 0.5 }, 0.5)
        .to('.hero-glow', { scale: 1.6, opacity: 0.4, ease: 'none' }, 0);
      gsap.utils.toArray('.frag').forEach((f) => {
        const [ox, oy] = f.dataset.out.split(',').map(Number);
        tl.to(f, {
          x: () => ox * window.innerWidth * 0.55, y: () => oy * window.innerHeight * 0.55,
          scale: 1.5, opacity: 0, filter: 'blur(8px)', ease: 'power2.in', duration: 0.9,
        }, 0);
      });
    });
    return () => mm.revert();
  }, ref);

  return (
    <section className="hero" id="hero" aria-labelledby="h1" ref={ref}>
      <div className="hero-glow" aria-hidden="true" />

      <div className="frags" aria-hidden="true">
        {fragments.map((f) => (
          <div key={f.key} className={['frag', f.className, `d${f.depth}`].filter(Boolean).join(' ')}
            style={f.style} data-depth={f.depth} data-out={f.out.join(',')}>
            <div className="par">
              <div className="drift" style={{ '--dx': f.dx, '--dy': f.dy }}>{f.content}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="hero-copy">
        <span className="chip fade"><span className="dot" />The healthcare ecosystem app</span>
        <h1 id="h1">
          <span className="line"><span>Care, <span className="t">careers</span></span></span>
          <span className="line"><span>and community.</span></span>
          <span className="line"><span>One app.</span></span>
        </h1>
        <p className="lede fade">Find opportunities, connect with professionals, access healthcare and grow your future.</p>
        <div className="hero-ctas fade">
          <Button href="#join" label="Get early access" magnetic arrow />
          <Button href="#app" label="See the app" variant="ghost" />
        </div>
      </div>
    </section>
  );
}
