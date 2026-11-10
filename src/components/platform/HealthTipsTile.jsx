import { useEffect, useRef, useState } from 'react';
import Tile, { TileHead } from './Tile';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { reduceMotion } from '../../lib/env';
import { healthTip } from '../../data/content';

/** The one dark tile: a wellness question whose AI answer types itself out once the tile is in view. */
export default function HealthTipsTile() {
  const ref = useRef(null);
  const inView = useInViewOnce(ref);
  const full = healthTip.answer;
  const [shown, setShown] = useState(reduceMotion ? full.length : 0);

  useEffect(() => {
    if (!inView || reduceMotion) return undefined;
    let i = 0, id;
    const type = () => {
      i = Math.min(i + 2, full.length);
      setShown(i);
      if (i < full.length) id = setTimeout(type, 28);
    };
    id = setTimeout(type, 500);
    return () => clearTimeout(id);
  }, [inView, full]);

  const typing = shown < full.length && inView;
  return (
    <Tile ref={ref} size="21" dark>
      <TileHead title="Health tips" text="Ask about everyday wellness and get an answer in seconds. Save tips, rate them and set reminders." arrow />
      <div className="chat">
        <div className="bubble me">{healthTip.question}</div>
        <div className="bubble ai" aria-label={full}>
          <span aria-hidden="true">{full.slice(0, shown)}{typing && <span className="caret" />}</span>
        </div>
        <p className="disclaimer">{healthTip.disclaimer}</p>
      </div>
    </Tile>
  );
}
