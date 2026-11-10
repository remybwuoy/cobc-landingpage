import { useEffect, useRef, useState } from 'react';
import Tile, { TileHead } from './Tile';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { reduceMotion } from '../../lib/env';
import { copilot } from '../../data/content';

/** The one dark tile: the AI reply types itself out once the tile is in view. */
export default function CopilotTile() {
  const ref = useRef(null);
  const inView = useInViewOnce(ref);
  const full = copilot.answer;
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
      <TileHead title="AI Copilot" text="Career advice, résumé reviews, interview prep and compliance reminders, everywhere in the app." arrow />
      <div className="chat">
        <div className="bubble me">{copilot.question}</div>
        <div className="bubble ai" aria-label={full}>
          <span aria-hidden="true">{full.slice(0, shown)}{typing && <span className="caret" />}</span>
        </div>
      </div>
    </Tile>
  );
}
