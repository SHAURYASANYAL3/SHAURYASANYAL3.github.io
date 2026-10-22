import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';
import { ProjectVisual } from '../components/ProjectVisual';
import { SectionHeading } from '../components/SectionHeading';
import { GitBranch, Layers } from 'lucide-react';
import { soundFx } from '../utils/soundFx';

interface ExperimentsSectionProps {
  onInspect?: (project: Project) => void;
}

function ExperimentCard({
  project,
  index,
  onInspect,
}: {
  project: Project;
  index: number;
  onInspect?: (project: Project) => void;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.07, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative flex flex-col overflow-hidden rounded-card border border-border bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40"
    >
      <ProjectVisual project={project} ratio="aspect-[16/9]" />
      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[0.65rem] uppercase tracking-[0.25em] text-muted font-mono">{project.category}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[0.6rem] font-mono uppercase tracking-[0.18em] text-muted">
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-cyan-400" />
            Verified Lab
          </span>
        </div>
        <h3 className="text-subheading font-semibold uppercase leading-tight text-secondary">{project.title}</h3>
        <p className="text-small leading-relaxed text-muted line-clamp-3">{project.summary}</p>

        <div className="mt-auto pt-3 flex items-center justify-between border-t border-border/40">
          <div className="flex items-center gap-2">
            {onInspect && (
              <button
                type="button"
                onClick={() => {
                  soundFx.playClick();
                  onInspect(project);
                }}
                className="text-[11px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-bold"
              >
                <Layers className="w-3 h-3" />
                Dossier
              </button>
            )}
          </div>

          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundFx.playClick()}
              className="text-[11px] font-mono text-slate-400 hover:text-white flex items-center gap-1"
            >
              <GitBranch className="w-3 h-3" />
              Source ↗
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}

export function ExperimentsSection({ onInspect }: ExperimentsSectionProps) {
  const experiments = projects.filter((project) => project.kind === 'experiment');

  return (
    <section id="lab" className="relative border-t border-border px-5 py-24 sm:px-8 sm:py-32 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Explorations & Open-Source Subsystems" title="The Subsystems Lab" />

        {experiments.length === 0 ? (
          <p className="mt-12 max-w-md text-small leading-relaxed text-muted md:mt-16">
            Nothing in the lab yet — experiments land here as they hatch.
          </p>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-16 md:gap-6 lg:grid-cols-3">
            {experiments.map((project, index) => (
              <ExperimentCard key={project.id} project={project} index={index} onInspect={onInspect} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
