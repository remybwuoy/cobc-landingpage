import { forwardRef } from 'react';
import { finePointer } from '../../lib/env';
import { ArrowIcon } from '../ui/Icons';

/** Tracks the pointer in CSS vars --mx/--my for the radial hover glow. */
const trackPointer = (e) => {
  const t = e.currentTarget, r = t.getBoundingClientRect();
  t.style.setProperty('--mx', `${e.clientX - r.left}px`);
  t.style.setProperty('--my', `${e.clientY - r.top}px`);
};

/** Bento tile. size: '22' (2×2) | '21' (2 wide) | undefined (1×1). */
const Tile = forwardRef(function Tile({ size, dark, className, children }, ref) {
  const cls = ['tile', size && `b${size}`, dark && 't-dark', className].filter(Boolean).join(' ');
  return (
    <article ref={ref} className={cls} onPointerMove={finePointer ? trackPointer : undefined}>
      {children}
    </article>
  );
});

export default Tile;

/** Title + description, optionally with the round arrow on the right. */
export function TileHead({ title, text, arrow }) {
  const body = <div><h3>{title}</h3><p>{text}</p></div>;
  if (!arrow) return body;
  return (
    <div className="t-top">
      {body}
      <span className="go" aria-hidden="true"><ArrowIcon /></span>
    </div>
  );
}
