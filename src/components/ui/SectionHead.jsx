import { useRef } from 'react';
import { useGsap } from '../../hooks/useGsap';
import { gsap, EXPO } from '../../lib/gsap';

/** Numbered label, large heading and optional lede, revealed on scroll. */
export default function SectionHead({ idx, label, id, title, lede }) {
  const ref = useRef(null);
  useGsap(() => {
    gsap.from(ref.current.children, {
      y: 40, opacity: 0, duration: 1, ease: EXPO, stagger: 0.08,
      scrollTrigger: { trigger: ref.current, start: 'top 82%' },
    });
  }, ref);
  return (
    <div className="sec-head" ref={ref}>
      <p className="label"><span className="idx">{idx}</span> {label}</p>
      <h2 className="h2" id={id}>{title}</h2>
      {lede && <p className="lede">{lede}</p>}
    </div>
  );
}
