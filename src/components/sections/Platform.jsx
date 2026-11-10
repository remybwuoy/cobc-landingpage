import { useRef } from 'react';
import SectionHead from '../ui/SectionHead';
import PostTile from '../platform/PostTile';
import CertsTile from '../platform/CertsTile';
import JobTile from '../platform/JobTile';
import TelehealthTile from '../platform/TelehealthTile';
import CopilotTile from '../platform/CopilotTile';
import MarketTile from '../platform/MarketTile';
import YouthTile from '../platform/YouthTile';
import { useGsap } from '../../hooks/useGsap';
import { gsap, EXPO } from '../../lib/gsap';
import './Platform.css';

/** The platform as a bento grid of small, working pieces of the app. */
export default function Platform() {
  const ref = useRef(null);
  useGsap(() => {
    gsap.from('.tile', {
      y: 40, scale: 0.96, opacity: 0, duration: 1, ease: EXPO, stagger: 0.1,
      scrollTrigger: { trigger: ref.current, start: 'top 80%' },
    });
  }, ref);

  return (
    <section className="bento-sec wrap" id="platform" aria-labelledby="platH">
      <SectionHead idx="03" label="The platform" id="platH"
        title={<>One profile.<br />Every part of <span className="t">care.</span></>}
        lede="Networking, hiring, telehealth, a marketplace and community, joined by an AI that knows your goals. Try the tiles." />
      <div className="bento" id="bento" ref={ref}>
        <PostTile />
        <CertsTile />
        <JobTile />
        <TelehealthTile />
        <CopilotTile />
        <MarketTile />
        <YouthTile />
      </div>
    </section>
  );
}
