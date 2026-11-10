import { useEffect, useRef, useState } from 'react';
import SectionHead from '../ui/SectionHead';
import { CheckIcon } from '../ui/Icons';
import { useGsap } from '../../hooks/useGsap';
import { gsap, EXPO, ScrollTrigger } from '../../lib/gsap';
import { trust } from '../../data/content';
import './Trust.css';

function TrustCol({ n, title, items, children }) {
  return (
    <div className="trust-col">
      <span className="ghost" aria-hidden="true">{n}</span>
      <h3>{title}</h3>
      <ul>{items.map((t) => <li key={t}><CheckIcon />{t}</li>)}</ul>
      {children}
    </div>
  );
}

/** Try-it control: scales the whole page's root font size. */
function TextSize() {
  const [size, setSize] = useState(100);
  useEffect(() => () => { document.documentElement.style.fontSize = ''; }, []);
  const choose = (value) => {
    setSize(value);
    document.documentElement.style.fontSize = `${value}%`;
    ScrollTrigger.refresh(); // layout changed, so recalculate pin and trigger positions
  };

  return (
    <div className="textsize" role="group" aria-label="Try it: text size on this page">
      <span>Try it — text size</span>
      {trust.textSizes.map((s) => (
        <button key={s.value} type="button" aria-pressed={size === s.value} onClick={() => choose(s.value)}>{s.label}</button>
      ))}
    </div>
  );
}

/** Dark contrast moment: security and everyday-comfort lists. */
export default function Trust() {
  const colsRef = useRef(null);
  useGsap(() => {
    gsap.from('.trust-col', {
      y: 40, opacity: 0, duration: 1, ease: EXPO, stagger: 0.1,
      scrollTrigger: { trigger: colsRef.current, start: 'top 85%' },
    });
  }, colsRef);

  return (
    <section className="trust" id="trust" aria-labelledby="trustH">
      <div className="wrap">
        <SectionHead idx="06" label="Trust" id="trustH"
          title={<>Trust is built in,<br /><span className="t">not bolted on.</span></>}
          lede="Health information, careers and money are personal. Consent, verification and privacy choices are part of the foundation." />
        <div className="trust-cols" ref={colsRef}>
          <TrustCol n="01" title="Security" items={trust.security} />
          <TrustCol n="02" title="Everyday comfort" items={trust.everyday}>
            <TextSize />
          </TrustCol>
        </div>
      </div>
    </section>
  );
}
