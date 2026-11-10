import { useEffect, useRef, useState } from 'react';
import SectionHead from '../ui/SectionHead';
import Phone from '../ui/Phone';
import { useGsap } from '../../hooks/useGsap';
import { gsap } from '../../lib/gsap';
import { pointerFx } from '../../lib/env';
import { storySteps, storyCallouts } from '../../data/content';
import './Story.css';

const pad = (n) => String(n).padStart(2, '0');

/**
 * Signature part 2: a sticky phone whose screen wipes to the next step as each step's copy
 * crosses the middle of the viewport. On small screens each step gets its own phone instead.
 */
export default function Story() {
  const [step, setStep] = useState(0);
  const stepsRef = useRef([]);
  const stageRef = useRef(null);
  const phoneRef = useRef(null);

  // Activate the step crossing the middle of the viewport.
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setStep(Number(e.target.dataset.step)); });
    }, { rootMargin: '-48% 0px -48% 0px' });
    stepsRef.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  // Phone tilts toward the pointer.
  useEffect(() => {
    const stage = stageRef.current, phone = phoneRef.current;
    if (!pointerFx) return undefined;
    const move = (e) => {
      const r = stage.getBoundingClientRect();
      const nx = (e.clientX - r.left) / r.width - 0.5, ny = (e.clientY - r.top) / r.height - 0.5;
      phone.style.transform = `rotateY(${nx * 14}deg) rotateX(${-ny * 10}deg)`;
    };
    const leave = () => { phone.style.transform = ''; };
    stage.addEventListener('pointermove', move);
    stage.addEventListener('pointerleave', leave);
    return () => { stage.removeEventListener('pointermove', move); stage.removeEventListener('pointerleave', leave); };
  }, []);

  // Desktop: the stage rises in as the hero hands over.
  useGsap(() => {
    const mm = gsap.matchMedia();
    mm.add('(min-width: 901px)', () => {
      gsap.from(stageRef.current, {
        y: 120, scale: 0.92, opacity: 0, ease: 'none',
        scrollTrigger: { trigger: '#app', start: 'top bottom', end: 'top 30%', scrub: 1 },
      });
    });
    return () => mm.revert();
  });

  const total = storySteps.length;
  return (
    <section className="story wrap" id="app" aria-labelledby="appH">
      <SectionHead idx="01" label="The app" id="appH"
        title={<>Three taps from<br />sign-up to <span className="t">belonging.</span></>}
        lede="These are real screens from the CareOnboardConnect build. Scroll to walk through them." />

      <div className="story-grid">
        <div className="story-visual" aria-hidden="true">
          <div className="stage" id="stage" ref={stageRef}>
            <span className="ring" style={{ width: '56%', aspectRatio: 1 }} />
            <span className="ring" style={{ width: '82%', aspectRatio: 1 }} />
            <span className="ring" style={{ width: '112%', aspectRatio: 1 }} />
            <div className="progress">
              <span>{pad(step + 1)} / {pad(total)}</span>
              <span className="bar"><i style={{ transform: `scaleX(${(step + 1) / total})` }} /></span>
            </div>
            <div className="stage-phone" ref={phoneRef}>
              <Phone>
                <div className="layers">
                  {storySteps.map((s, j) => (
                    <div key={s.screen} className={`scr scr-${s.screen}${j <= step ? ' on' : ''}`} />
                  ))}
                </div>
              </Phone>
            </div>
            {storyCallouts.map((c) => (
              <span key={c.text} className={['callout', c.light && 'light', c.step === step && 'on'].filter(Boolean).join(' ')} style={c.style}>
                <i />{c.text}
              </span>
            ))}
          </div>
        </div>

        <ol className="story-steps">
          {storySteps.map((s, i) => (
            <li key={s.screen} className={`st${i === step ? ' on' : ''}`} data-step={i} ref={(el) => { stepsRef.current[i] = el; }}>
              <span className="n">{pad(i + 1)}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul>{s.points.map((p) => <li key={p}>{p}</li>)}</ul>
              <div className="m-phone" aria-hidden="true"><Phone screen={s.screen} /></div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
