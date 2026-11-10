import { useRef } from 'react';
import Tile, { TileHead } from './Tile';
import { useInViewOnce } from '../../hooks/useInViewOnce';

/** Job match score; the meter fills when the tile scrolls into view. */
export default function JobTile() {
  const ref = useRef(null);
  const inView = useInViewOnce(ref);
  return (
    <Tile ref={ref} className={inView ? 'in-view' : undefined}>
      <TileHead title="Jobs matched to you" text="Every match explains why it fits." />
      <div>
        <div className="match">92<small>%</small></div>
        <div className="note" style={{ margin: '4px 0 10px' }}>Behavior Technician · Part-time</div>
        <div className="meter jm"><i /></div>
      </div>
    </Tile>
  );
}
