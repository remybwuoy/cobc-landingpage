import { Fragment, useRef } from 'react';
import { useGsap } from '../../hooks/useGsap';
import { gsap } from '../../lib/gsap';
import { statement } from '../../data/content';
import './Statement.css';

/** Each word in its own span so the scroll scrub can fill them one by one. */
const words = (text) => text.split(' ').map((w, i) => (
  <Fragment key={i}>{i > 0 && ' '}<span className="w">{w}</span></Fragment>
));

/** Why CareOnboardConnect exists: a big paragraph whose words fill from muted to ink as you scroll. */
export default function Statement() {
  const ref = useRef(null);
  useGsap(() => {
    gsap.fromTo('.w', { opacity: 0.18 }, {
      opacity: 1, stagger: 0.1, ease: 'none',
      scrollTrigger: { trigger: ref.current, start: 'top 78%', end: 'bottom 45%', scrub: true },
    });
  }, ref);

  return (
    <section className="statement wrap" aria-label="Why CareOnboardConnect">
      <p className="label"><span className="idx">02</span>&nbsp; Why CareOnboardConnect</p>
      <p className="big" id="statement" ref={ref}>
        <span className="lead">{words(statement.lead)}</span> {words(statement.rest)}
      </p>
    </section>
  );
}
