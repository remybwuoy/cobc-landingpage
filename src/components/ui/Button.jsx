import { useRef } from 'react';
import { useMagnetic } from '../../hooks/useMagnetic';
import { ArrowIcon } from './Icons';

/**
 * Pill button with the rolling label. Renders an <a> when `href` is given, otherwise a <button>.
 * variant: 'ink' | 'ghost'. `magnetic` adds the pointer pull on fine pointers.
 */
export default function Button({ label, href, variant = 'ink', small, magnetic, arrow, type = 'button', className, ...rest }) {
  const ref = useRef(null);
  useMagnetic(ref, magnetic);
  const cls = ['btn', `btn-${variant}`, small && 'btn-sm', className].filter(Boolean).join(' ');
  const inner = (
    <>
      <span className="roll"><span data-text={label}>{label}</span></span>
      {arrow && <ArrowIcon className="arrow" />}
    </>
  );
  return href ? (
    <a ref={ref} href={href} className={cls} aria-label={label} {...rest}>{inner}</a>
  ) : (
    <button ref={ref} type={type} className={cls} aria-label={label} {...rest}>{inner}</button>
  );
}
