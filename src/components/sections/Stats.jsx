import { useRef } from 'react';
import SectionHead from '../ui/SectionHead';
import { useGsap } from '../../hooks/useGsap';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { gsap, EXPO } from '../../lib/gsap';
import { reduceMotion } from '../../lib/env';
import { stats } from '../../data/content';
import './Stats.css';

const DIGITS = [...Array(10).keys()];

/** Number that rolls into place digit by digit, like an odometer, once it's on screen. */
function Odometer({ value }) {
  const ref = useRef(null);
  const inView = useInViewOnce(ref, '0px 0px -15% 0px');
  if (reduceMotion) return <div className="odo">{value}</div>;
  return (
    <div className="odo" ref={ref} role="img" aria-label={value}>
      {value.split('').map((d, k) => (
        <span className="dg" aria-hidden="true" key={k}>
          <span style={inView ? { transitionDelay: `${k * 120}ms`, transform: `translateY(-${Number(d)}em)` } : undefined}>
            {DIGITS.map((n) => <b key={n}>{n}</b>)}
          </span>
        </span>
      ))}
    </div>
  );
}

export default function Stats() {
  const colsRef = useRef(null);
  useGsap(() => {
    gsap.from('.col', {
      y: 40, opacity: 0, duration: 1, ease: EXPO, stagger: 0.1,
      scrollTrigger: { trigger: colsRef.current, start: 'top 85%' },
    });
  }, colsRef);

  return (
    <section className="stats" id="stats" aria-labelledby="statsH">
      <div className="wrap">
        <SectionHead idx="05" label="By design" id="statsH" title="Wide by design." />
        <div className="cols" ref={colsRef}>
          {stats.map((s, i) => (
            <div className="col" key={s.value}>
              <span className="idx">{String(i + 1).padStart(2, '0')}</span>
              <Odometer value={s.value} />
              <p>{s.text}</p>
            </div>
          ))}
        </div>
        <p className="note src">Counts from the CareConnect product requirements, v1.0.</p>
      </div>
    </section>
  );
}
