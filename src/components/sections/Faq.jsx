import { useId, useRef, useState } from 'react';
import SectionHead from '../ui/SectionHead';
import Button from '../ui/Button';
import { PlusIcon } from '../ui/Icons';
import { useGsap } from '../../hooks/useGsap';
import { gsap, EXPO, ScrollTrigger } from '../../lib/gsap';
import { faqs, AUTH_URL, AUTH_LABEL } from '../../data/content';
import './Faq.css';

const pad = (n) => String(n).padStart(2, '0');

/** One question. The answer opens by animating its grid row from 0fr to 1fr. */
function FaqItem({ n, q, a, open, onToggle, uid }) {
  const qId = `${uid}-q${n}`, aId = `${uid}-a${n}`;
  // Content below moved, so recalculate ScrollTrigger positions once the panel settles.
  const onSettled = (e) => { if (e.target === e.currentTarget) ScrollTrigger.refresh(); };
  return (
    <li className={`faq-item${open ? ' is-open' : ''}`}>
      <h3>
        <button type="button" id={qId} aria-expanded={open} aria-controls={aId} onClick={onToggle}>
          <span className="idx">{pad(n)}</span>
          <span className="faq-q">{q}</span>
          <span className="go faq-ico" aria-hidden="true"><PlusIcon /></span>
        </button>
      </h3>
      <div className="faq-a" id={aId} role="region" aria-labelledby={qId} inert={!open} onTransitionEnd={onSettled}>
        <div><p>{a}</p></div>
      </div>
    </li>
  );
}

/** FAQs as numbered accordion rows, in the same style as "Who it's for". One opens at a time. */
export default function Faq() {
  const [openIdx, setOpenIdx] = useState(0);
  const listRef = useRef(null);
  const ctaRef = useRef(null);
  const uid = useId();

  useGsap(() => {
    gsap.from('.faq-item', {
      y: 30, opacity: 0, duration: 0.9, ease: EXPO, stagger: 0.07,
      scrollTrigger: { trigger: listRef.current, start: 'top 82%' },
    });
    gsap.from(ctaRef.current.children, {
      y: 30, opacity: 0, duration: 1, ease: EXPO, stagger: 0.08,
      scrollTrigger: { trigger: ctaRef.current, start: 'top 90%' },
    });
  });

  return (
    <section className="faq" id="faq" aria-labelledby="faqH">
      <div className="wrap">
        <SectionHead idx="08" label="FAQs" id="faqH"
          title={<>Questions,<br /><span className="t">answered.</span></>}
          lede="Accounts, jobs, Cowries and treasures, telehealth, and how your information is kept safe." />
        <ul className="faq-list" ref={listRef}>
          {faqs.map((f, i) => (
            <FaqItem key={f.q} n={i + 1} q={f.q} a={f.a} uid={uid} open={openIdx === i}
              onToggle={() => setOpenIdx((cur) => (cur === i ? -1 : i))} />
          ))}
        </ul>
        <div className="faq-cta" ref={ctaRef}>
          <h3 className="h2">Your future in care <span className="t">starts here.</span></h3>
          <p className="lede">Build your CareOnboardConnect profile and join the people who make care work.</p>
          <Button href={AUTH_URL} label={AUTH_LABEL} magnetic arrow />
        </div>
      </div>
    </section>
  );
}
