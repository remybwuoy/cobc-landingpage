import { useRef } from 'react';
import Tile, { TileHead } from './Tile';
import { useInViewOnce } from '../../hooks/useInViewOnce';
import { applicationStages } from '../../data/content';

/** Applications tracker: the current stage, with a meter that fills when the tile scrolls into view. */
export default function JobTile() {
  const ref = useRef(null);
  const inView = useInViewOnce(ref);
  const { stages, at } = applicationStages;
  const progress = (at + 1) / stages.length;
  return (
    <Tile ref={ref} className={inView ? 'in-view' : undefined}>
      <TileHead title="Jobs and applications" text="Apply with screening questions, then follow every stage to offer." />
      <div>
        <div className="match">{stages[at]}</div>
        <div className="note" style={{ margin: '4px 0 10px' }}>Registered Nurse · Credentials verified</div>
        <div className="meter jm" style={{ '--to': progress }} role="img" aria-label={`Stage ${at + 1} of ${stages.length}: ${stages[at]}`}><i /></div>
        <div className="ylabels" aria-hidden="true">{stages.map((s) => <span key={s}>{s}</span>)}</div>
      </div>
    </Tile>
  );
}
