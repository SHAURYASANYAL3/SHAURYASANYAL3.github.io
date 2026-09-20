import { SkipLink } from './components/SkipLink';
import { FloatingNav } from './components/FloatingNav';
import { LoadingExperience } from './components/LoadingExperience';
import { HeroSection } from './sections/HeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { AboutSection } from './sections/AboutSection';
import { SkillsSection } from './sections/SkillsSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ExperimentsSection } from './sections/ExperimentsSection';
import { JourneySection } from './sections/JourneySection';
import { ContactSection } from './sections/ContactSection';

function App() {
  return (
    <>
      <SkipLink />
      <LoadingExperience />
      <FloatingNav />
      <main id="main" className="bg-bg min-h-screen font-sans text-secondary">
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperimentsSection />
        <JourneySection />
        <ContactSection />
      </main>
    </>
  );
}

export default App;