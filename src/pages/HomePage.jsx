import Menu from '../components/layout/Menu';
import Hero from '../components/sections/Hero';
import Story from '../components/sections/Story';
import Statement from '../components/sections/Statement';
import Platform from '../components/sections/Platform';
import Who from '../components/sections/Who';
import Stats from '../components/sections/Stats';
import Trust from '../components/sections/Trust';
import Faq from '../components/sections/Faq';

/** The landing page: the moving menu and every section. */
export default function HomePage() {
  return (
    <>
      <Menu />
      <main id="top">
        <Hero />
        <Story />
        <Statement />
        <Platform />
        <Who />
        <Stats />
        <Trust />
        <Faq />
      </main>
    </>
  );
}
