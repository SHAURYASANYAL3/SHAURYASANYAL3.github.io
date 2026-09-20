import { FloatingNav } from './components/FloatingNav';
import { LoadingExperience } from './components/LoadingExperience';
import { HeroSection } from './sections/HeroSection';
import { MarqueeSection } from './sections/MarqueeSection';
import { AboutSection } from './sections/AboutSection';
import { ServicesSection } from './sections/ServicesSection';
import { ProjectsSection } from './sections/ProjectsSection';
import { ExperimentsSection } from './sections/ExperimentsSection';

function App() {
  return (
    <>
      <LoadingExperience />
      <FloatingNav />
      <main className="bg-bg min-h-screen font-sans text-secondary">
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <ExperimentsSection />
      </main>
    </>
  );
}

export default App;
