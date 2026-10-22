import { useState, useEffect } from 'react';
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
import { CyberTerminalModal } from './components/CyberTerminalModal';
import { ProjectDetailModal } from './components/ProjectDetailModal';
import { MatrixDigitalRain } from './components/MatrixDigitalRain';
import type { Project } from './data/projects';
import { projects } from './data/projects';
import { soundFx } from './utils/soundFx';

function App() {
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [matrixActive, setMatrixActive] = useState(false);

  // Global keyboard listener for `~` or `` ` `` to open/close terminal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        // Avoid intercepting if typing inside an active input element
        const target = e.target as HTMLElement;
        if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
          return;
        }
        e.preventDefault();
        soundFx.playTerminal();
        setTerminalOpen((prev) => !prev);
      } else if (e.key === 'Escape') {
        if (selectedProject) setSelectedProject(null);
        if (terminalOpen) setTerminalOpen(false);
        if (matrixActive) setMatrixActive(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [terminalOpen, selectedProject, matrixActive]);

  const handleSelectProjectId = (projectId: string) => {
    const found = projects.find((p) => p.id === projectId);
    if (found) {
      soundFx.playClick();
      setSelectedProject(found);
    }
  };

  const handleSelectProject = (project: Project) => {
    soundFx.playClick();
    setSelectedProject(project);
  };

  return (
    <>
      <SkipLink />
      <LoadingExperience />
      <FloatingNav />

      {/* Optional Matrix Cyber Rain Overlay */}
      <MatrixDigitalRain active={matrixActive} onClose={() => setMatrixActive(false)} />

      <main id="main" className="bg-[#060913] min-h-screen font-sans text-secondary selection:bg-cyan-500/30 selection:text-cyan-200">
        <HeroSection
          onSelectProject={handleSelectProjectId}
          onOpenTerminal={() => setTerminalOpen(true)}
        />
        <MarqueeSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection onInspect={handleSelectProject} />
        <ExperimentsSection onInspect={handleSelectProject} />
        <JourneySection />
        <ContactSection />
      </main>

      {/* Cyberpunk Interactive CLI Terminal */}
      <CyberTerminalModal
        isOpen={terminalOpen}
        onClose={() => setTerminalOpen(false)}
        onSelectProject={handleSelectProjectId}
        onToggleMatrix={() => setMatrixActive((prev) => !prev)}
      />

      {/* Tactical Project Dossier Modal */}
      <ProjectDetailModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

export default App;
