import Tile, { TileHead } from './Tile';
import { youthStages } from '../../data/content';

/** Youth Hub career map: stages done so far. */
export default function YouthTile() {
  const done = youthStages.filter((s) => s.done).length;
  return (
    <Tile>
      <TileHead title="Youth Hub" text="Supervised accounts for ages 13–17, with parental permissions." />
      <div>
        <div className="ypath" role="img" aria-label={`Career map: ${done} of ${youthStages.length} stages done`}>
          {youthStages.map((s) => <span key={s.label} className={s.done ? 'done' : undefined} />)}
        </div>
        <div className="ylabels">{youthStages.map((s) => <span key={s.label}>{s.label}</span>)}</div>
      </div>
    </Tile>
  );
}
