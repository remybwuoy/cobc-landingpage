import { useEffect, useRef, useState } from 'react';
import SectionHead from '../ui/SectionHead';
import { ArrowIcon } from '../ui/Icons';
import { useGsap } from '../../hooks/useGsap';
import { gsap, EXPO } from '../../lib/gsap';
import { pointerFx } from '../../lib/env';
import { audiences, AUTH_URL } from '../../data/content';
import './Who.css';

const pad = (n) => String(n).padStart(2, '0');

/** Numbered audience rows. On fine pointers a dark preview card follows the cursor. */
export default function Who() {
  const listRef = useRef(null);
  const previewRef = useRef(null);
  const follow = useRef(null);
  const [preview, setPreview] = useState({ on: false, n: '01', text: '' });

  useEffect(() => {
    if (!pointerFx) return undefined;
    const pv = previewRef.current;
    follow.current = {
      x: gsap.quickTo(pv, 'x', { duration: 0.6, ease: 'power3' }),
      y: gsap.quickTo(pv, 'y', { duration: 0.6, ease: 'power3' }),
    };
    return () => { gsap.killTweensOf(pv); follow.current = null; };
  }, []);

  useGsap(() => {
    gsap.from('.row', {
      y: 30, opacity: 0, duration: 0.9, ease: EXPO, stagger: 0.08,
      scrollTrigger: { trigger: listRef.current, start: 'top 82%' },
    });
  }, listRef);

  const rowHandlers = (n, text) => (pointerFx ? {
    onPointerEnter: () => setPreview({ on: true, n, text }),
    onPointerLeave: () => setPreview((p) => ({ ...p, on: false })),
    onPointerMove: (e) => { follow.current?.x(e.clientX + 28); follow.current?.y(e.clientY - 120); },
  } : {});

  return (
    <>
      <section className="who" id="who" aria-labelledby="whoH">
        <div className="wrap">
          <SectionHead idx="04" label="Who it's for" id="whoH"
            title={<>Three ways to join.<br />One <span className="t">community.</span></>} />
          <ul className="rows" ref={listRef}>
            {audiences.map((a, i) => {
              const n = pad(i + 1);
              return (
                <li key={a.title} className="row" {...rowHandlers(n, a.preview)}>
                  <a href={AUTH_URL}>
                    <span className="idx">{n}</span>
                    <h3>{a.title}</h3>
                    <span className="roles">{a.roles}</span>
                    <span className="go" aria-hidden="true"><ArrowIcon /></span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
      <div className={`preview${preview.on ? ' is-on' : ''}`} aria-hidden="true" ref={previewRef}>
        <div className="big">{preview.n}</div>
        <p>{preview.text}</p>
      </div>
    </>
  );
}
