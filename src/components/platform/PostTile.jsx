import { useEffect, useRef, useState } from 'react';
import Tile from './Tile';
import { HeartIcon, RepostIcon } from '../ui/Icons';
import postImg from '../../assets/images/post-burnout.jpg';

/** Toggle button with a count that goes up by one while pressed, and a little pop on click. */
function ReactionButton({ kind, base, label, unit, Icon }) {
  const [on, setOn] = useState(false);
  const [pop, setPop] = useState(false);
  const timer = useRef();
  useEffect(() => () => clearTimeout(timer.current), []);
  const n = base + (on ? 1 : 0);
  const click = () => {
    setOn((v) => !v);
    setPop(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setPop(false), 300);
  };
  return (
    <button type="button" className={`r-btn ${kind}${pop ? ' pop' : ''}`} aria-pressed={on}
      aria-label={`${label}, ${n} ${unit}`} onClick={click}>
      <Icon /><span>{n}</span>
    </button>
  );
}

/** Community post from the feed, with working like and repost. */
export default function PostTile() {
  return (
    <Tile size="22">
      <div className="post-head">
        <span className="av" aria-hidden="true">SM</span>
        <div><b>Community</b><div className="note">A post from the CareOnboardConnect feed</div></div>
      </div>
      <div className="post-img">
        <img src={postImg} alt="A post reading: Burnout is not a badge of honor. Rest is part of the work." loading="lazy" />
      </div>
      <div className="post-bar">
        <div className="react">
          <ReactionButton kind="like" base={140} label="Like" unit="likes" Icon={HeartIcon} />
          <ReactionButton kind="rp" base={12} label="Repost" unit="reposts" Icon={RepostIcon} />
        </div>
        <span className="note">12 comments</span>
      </div>
    </Tile>
  );
}
