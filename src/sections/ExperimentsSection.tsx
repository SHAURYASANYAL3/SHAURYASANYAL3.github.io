import { motion } from 'framer-motion';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';
import { ProjectVisual } from '../components/ProjectVisual';
import { SectionHeading } from '../components/SectionHeading';

function ExperimentCard({ project, index }: { project: Project; index: number }) {
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
          <span className="text-[0.65rem] uppercase tracking-[0.25em] text-muted">{project.category}</span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2.5 py-1 text-[0.6rem] uppercase tracking-[0.18em] text-muted">
            <span aria-hidden="true" className="h-1 w-1 rounded-full bg-muted" />
            Placeholder
          </span>
        </div>
        <h3 className="text-subheading font-semibold uppercase leading-tight text-secondary">{project.title}</h3>
        <p className="text-small leading-relaxed text-muted">{project.summary}</p>
      </div>
    </motion.article>
  );
}

export function ExperimentsSection() {
  const experiments = projects.filter((project) => project.kind === 'experiment');

  return (
    <section id="lab" className="relative border-t border-border px-5 py-24 sm:px-8 sm:py-32 md:px-10">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="Ongoing experiments" title="The Lab" />

        {experiments.length === 0 ? (
          <p className="mt-12 max-w-md text-small leading-relaxed text-muted md:mt-16">
            Nothing in the lab yet — experiments land here as they hatch.
          </p>
        ) : (
          <div className="mt-12 grid gap-5 sm:grid-cols-2 md:mt-16 md:gap-6 lg:grid-cols-3">
            {experiments.map((project, index) => (
              <ExperimentCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}