import { useEffect, useRef, useState } from 'react';
import Tile, { TileHead } from './Tile';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { reduceMotion } from '../../lib/env';

const START = 120;
const fmt = (s) => `0${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;

/** Virtual waiting room with a looping two-minute countdown, started once in view. */
export default function TelehealthTile() {
  const ref = useRef(null);
  const inView = useInViewOnce(ref);
  const [secs, setSecs] = useState(START);

  useEffect(() => {
    if (!inView || reduceMotion) return undefined;
    const id = setInterval(() => setSecs((s) => (s <= 0 ? START : s - 1)), 1000);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <Tile ref={ref}>
      <TileHead title="Telehealth" text="Pick a slot, choose how to pay and meet by video." />
      <div>
        <div className="waiting"><span className="pulse" />Virtual waiting room</div>
        <div className="timer">{fmt(secs)}</div>
      </div>
    </Tile>
  );
}
