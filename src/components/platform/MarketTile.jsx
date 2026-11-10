import Tile, { TileHead } from './Tile';
import { marketCategories } from '../../data/content';

/** Category ticker. The first item is repeated at the end so the CSS loop wraps seamlessly. */
export default function MarketTile() {
  const loop = [...marketCategories, marketCategories[0]];
  return (
    <Tile>
      <TileHead title="Marketplace" text="Equipment, courses and services from people who know care." />
      <div className="ticker" role="img" aria-label="Categories include medical equipment, courses, uniforms, adaptive devices and consulting">
        <ul aria-hidden="true">{loop.map((c, i) => <li key={i}>{c}</li>)}</ul>
      </div>
    </Tile>
  );
}
