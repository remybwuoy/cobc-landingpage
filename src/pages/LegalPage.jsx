import { useEffect, useRef, useState } from 'react';
import { ArrowIcon } from '../components/ui/Icons';
import { useGsap } from '../hooks/useGsap';
import { gsap, EXPO } from '../lib/gsap';
import { company, legalPages } from '../data/legal';
import './LegalPage.css';

const pad = (n) => String(n).padStart(2, '0');

/** One body block: a paragraph, a bulleted list, or a paragraph with links. */
function Block({ b }) {
  if (typeof b === 'string') return <p>{b}</p>;
  if (b.list) return <ul>{b.list.map((li) => <li key={li}>{li}</li>)}</ul>;
  return (
    <p>
      {b.p.map((part, i) => (typeof part === 'string' ? part : <a key={i} className="legal-link" href={part.a}>{part.t}</a>))}
    </p>
  );
}

/**
 * A legal document: title block, a contents list that tracks the section you're reading
 * (sticky on desktop, collapsible on small screens), the numbered sections, and a link to
 * the other legal page.
 */
export default function LegalPage({ page }) {
  const doc = legalPages[page];
  const other = Object.values(legalPages).find((p) => p.key !== page);
  const headRef = useRef(null);
  const docRef = useRef(null);
  const [active, setActive] = useState(doc.sections[0].id);
  const [tocOpen, setTocOpen] = useState(false);
  const [small, setSmall] = useState(() => matchMedia('(max-width: 900px)').matches);

  useEffect(() => {
    const mq = matchMedia('(max-width: 900px)');
    const on = (e) => setSmall(e.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);

  // Highlight the section crossing the upper part of the viewport.
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
    }, { rootMargin: '-20% 0px -70% 0px' });
    docRef.current.querySelectorAll('.legal-sec').forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useGsap(() => {
    gsap.from(headRef.current.children, { y: 40, opacity: 0, duration: 1.1, ease: EXPO, stagger: 0.08, delay: 0.1 });
    gsap.from('.legal-toc', { y: 24, opacity: 0, duration: 1, ease: EXPO, delay: 0.35 });
    gsap.utils.toArray('.legal-sec, .legal-next').forEach((el) => {
      gsap.from(el, { y: 34, opacity: 0, duration: 1, ease: EXPO, scrollTrigger: { trigger: el, start: 'top 90%' } });
    });
  });

  return (
    <main id="top" className="legal">
      <header className="legal-head wrap" ref={headRef}>
        <a href="./" className="legal-back"><ArrowIcon className="back-ico" /><span className="ul">Back to home</span></a>
        <span className="chip"><span className="dot" />Legal</span>
        <h1 id="h1" className="legal-title">{doc.title}</h1>
        <p className="lede">{doc.intro}</p>
        <p className="legal-meta">Effective {company.effective}</p>
      </header>

      <div className="legal-body wrap">
        <nav className={`legal-toc${tocOpen ? ' is-open' : ''}`} aria-label="On this page">
          <button type="button" className="toc-toggle" aria-expanded={tocOpen} aria-controls="toc-list" onClick={() => setTocOpen((o) => !o)}>
            On this page <span className="toc-ico" aria-hidden="true" />
          </button>
          <p className="label toc-label">On this page</p>
          <div className="toc-panel" id="toc-list" inert={small && !tocOpen}>
          <ol>
            {doc.sections.map((s, i) => (
              <li key={s.id}>
                <a href={`#${s.id}`} className={active === s.id ? 'is-active' : undefined}
                  aria-current={active === s.id ? 'location' : undefined} onClick={() => setTocOpen(false)}>
                  <span className="idx">{pad(i + 1)}</span>{s.title}
                </a>
              </li>
            ))}
          </ol>
          </div>
        </nav>

        <article className="legal-doc" ref={docRef}>
          {doc.sections.map((s, i) => (
            <section key={s.id} id={s.id} className="legal-sec" aria-labelledby={`${s.id}-h`}>
              <h2 id={`${s.id}-h`}><span className="idx">{pad(i + 1)}</span>{s.title}</h2>
              {s.body.map((b, j) => <Block key={j} b={b} />)}
            </section>
          ))}

          <a className="legal-next" href={other.href}>
            <span>
              <span className="label">Read next</span>
              <span className="legal-next-t">{other.title}</span>
            </span>
            <span className="go" aria-hidden="true"><ArrowIcon /></span>
          </a>
        </article>
      </div>
    </main>
  );
}
