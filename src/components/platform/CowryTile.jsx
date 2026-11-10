import Tile, { TileHead } from './Tile';
import { cowryWeek } from '../../data/content';

/** Cowry rewards: this week's streak of daily activity. */
export default function CowryTile() {
  const done = cowryWeek.filter((d) => d.done).length;
  return (
    <Tile>
      <TileHead title="Cowry rewards" text="Earn for daily activity, send treasures, redeem for data or withdraw." />
      <div>
        <div className="streak-n">{done}<small>days in a row</small></div>
        <div className="ypath" role="img" aria-label={`Weekly streak: ${done} of ${cowryWeek.length} days`}>
          {cowryWeek.map((d, i) => <span key={i} className={d.done ? 'done' : undefined} />)}
        </div>
        <div className="ylabels" aria-hidden="true">{cowryWeek.map((d, i) => <span key={i}>{d.day}</span>)}</div>
      </div>
    </Tile>
  );
}
