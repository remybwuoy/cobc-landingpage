import { useState } from 'react';
import Tile, { TileHead } from './Tile';
import { PlusCircleIcon } from '../ui/Icons';
import { certifications } from '../../data/content';

/** Try-it chips: pick certifications, the note below summarises the selection. */
export default function CertsTile() {
  const [selected, setSelected] = useState([]);
  const toggle = (c) => setSelected((s) => (s.includes(c) ? s.filter((x) => x !== c) : [...s, c]));
  // Keep the summary in display order, not click order.
  const picked = certifications.filter((c) => selected.includes(c));

  return (
    <Tile size="21">
      <TileHead title="Certifications in a tap" text="Pick what you hold and upload proof. Agencies see it on your profile." arrow />
      <div>
        <div className="chipset" role="group" aria-label="Try it: select certifications">
          {certifications.map((c) => {
            const on = selected.includes(c);
            return (
              <button key={c} type="button" className={`pill-chip${on ? ' on' : ''}`} aria-pressed={on} onClick={() => toggle(c)}>
                {c} <PlusCircleIcon className="ico" />
              </button>
            );
          })}
        </div>
        <p className="note" style={{ marginTop: 12 }} role="status">
          {picked.length ? `${picked.length} selected · ${picked.join(', ')}` : '0 selected'}
        </p>
      </div>
    </Tile>
  );
}
