import { ExternalLink, GitBranch } from 'lucide-react';
import type { Project } from '../data/projects';
import { ProjectVisual } from './ProjectVisual';

const PLACEHOLDER = '__PLACEHOLDER__';

const isPlaceholder = (value?: string) => !value || value === PLACEHOLDER;

interface StatusBadge {
  label: string;
  live: boolean;
}

function statusBadge(project: Project): StatusBadge {
  if (!project.verified) {
    return { label: 'Concept / placeholder — details pending', live: false };
  }
  const hasLive = !isPlaceholder(project.live);
  const hasSource = !isPlaceholder(project.github);
  if (hasLive && project.status === 'live') return { label: 'Live', live: true };
  if (hasSource && project.status === 'source') return { label: 'Source', live: true };
  return { label: 'Placeholder', live: false };
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {!isPlaceholder(project.github) && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted transition-colors hover:border-accent/50 hover:text-accent"
        >
          <GitBranch className="h-3.5 w-3.5" aria-hidden="true" />
          Source
        </a>
      )}
      {!isPlaceholder(project.live) && (
        <a
          href={project.live}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted transition-colors hover:border-accent/50 hover:text-accent"
        >
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
          Live
        </a>
      )}
    </div>
  );
}

interface ProjectCardProps {
  project: Project;
  /** Wide/horizontal flagship layout for the feature grid's full-span card. */
  featured?: boolean;
  /** Grid span classes to apply on the article (the direct grid item). */
  className?: string;
}

export function ProjectCard({ project, featured = false, className = '' }: ProjectCardProps) {
  const badge = statusBadge(project);
  const technologies = project.technologies.filter((t) => !isPlaceholder(t)).slice(0, 5);

  return (
    <article
      className={`group relative flex flex-col overflow-hidden rounded-card border border-border bg-surface shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 ${
        featured ? 'lg:flex-row' : ''
      } ${className}`}
    >
      <ProjectVisual project={project} className={featured ? 'lg:w-1/2 lg:shrink-0' : ''} />

      <div className={`flex flex-col gap-4 p-6 md:p-7 ${featured ? 'lg:flex-1' : 'flex-1'}`}>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[0.7rem] uppercase tracking-[0.25em] text-muted">{project.category}</span>
          <span
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-[0.6rem] font-medium uppercase tracking-[0.18em] ${
              badge.live ? 'border-accent/40 text-accent' : 'border-border text-muted'
            }`}
          >
            {badge.live && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent" />}
            {badge.label}
          </span>
        </div>

        <h3 className="text-heading font-semibold uppercase leading-tight text-secondary transition-transform duration-300 group-hover:translate-x-1">
          {project.title}
        </h3>

        <p className="text-small leading-relaxed text-muted">{project.summary}</p>

        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-full border border-border px-3 py-1 text-[0.65rem] uppercase tracking-[0.15em] text-muted"
              >
                {technology}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-2">
          <ProjectLinks project={project} />
        </div>
      </div>
    </article>
  );
}