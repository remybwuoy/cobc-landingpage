// Read once at startup, as the original script did.
const mq = (q) => typeof window !== 'undefined' && window.matchMedia(q).matches;

export const reduceMotion = mq('(prefers-reduced-motion: reduce)');
export const finePointer = mq('(pointer: fine) and (hover: hover)');
/** Pointer-only polish (magnetic buttons, parallax, tilt, hover preview). */
export const pointerFx = finePointer && !reduceMotion;
