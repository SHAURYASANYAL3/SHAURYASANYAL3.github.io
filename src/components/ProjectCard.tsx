import { ExternalLink, GitBranch, Layers } from 'lucide-react';
import type { Project } from '../data/projects';
import { ProjectVisual } from './ProjectVisual';
import { soundFx } from '../utils/soundFx';

const PLACEHOLDER = '__PLACEHOLDER__';

const isPlaceholder = (value?: string) => !value || value === PLACEHOLDER;

interface StatusBadge {
  label: string;
  live: boolean;
}

function statusBadge(project: Project): StatusBadge {
  if (!project.verified) {
    return { label: 'Concept / placeholder', live: false };
  }
  const hasLive = !isPlaceholder(project.live);
  const hasSource = !isPlaceholder(project.github);
  if (hasLive && project.status === 'live') return { label: 'Live MVP', live: true };
  if (hasSource && project.status === 'source') return { label: 'Active Source', live: true };
  return { label: 'Verified', live: true };
}

function ProjectLinks({ project, onInspect }: { project: Project; onInspect?: (project: Project) => void }) {
  return (
    <div className="flex flex-wrap items-center gap-2.5">
      {onInspect && (
        <button
          type="button"
          onClick={() => {
            soundFx.playClick();
            onInspect(project);
          }}
          className="inline-flex items-center gap-1.5 rounded-full bg-cyan-500/15 border border-cyan-400/40 px-3.5 py-1.5 text-[0.7rem] font-mono font-bold uppercase tracking-wider text-cyan-300 transition-all hover:bg-cyan-500/25 hover:border-cyan-300 active:scale-95"
        >
          <Layers className="h-3 w-3" />
          Dossier
        </button>
      )}

      {!isPlaceholder(project.github) && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => soundFx.playClick()}
          className="inline-flex items-center gap-1.5 rounded-full border border-border px-3.5 py-1.5 text-[0.7rem] font-mono font-medium uppercase tracking-wider text-muted transition-colors hover:border-accent/50 hover:text-accent active:scale-95"
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
          onClick={() => soundFx.playClick()}
          className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5 text-[0.7rem] font-mono font-medium uppercase tracking-wider text-accent transition-colors hover:bg-accent/20 active:scale-95"
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
  featured?: boolean;
  className?: string;
  onInspect?: (project: Project) => void;
}

export function ProjectCard({ project, featured = false, className = '', onInspect }: ProjectCardProps) {
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
          <span className="text-[0.7rem] uppercase tracking-[0.25em] text-muted font-mono">{project.category}</span>
          <span
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-[0.6rem] font-mono font-medium uppercase tracking-[0.18em] ${
              badge.live ? 'border-accent/40 text-accent bg-accent/5' : 'border-border text-muted'
            }`}
          >
            {badge.live && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />}
            {badge.label}
          </span>
        </div>

        <h3 className="text-heading font-semibold uppercase leading-tight text-secondary transition-transform duration-300 group-hover:translate-x-1">
          {project.title}
        </h3>

        <p className="text-small leading-relaxed text-muted">{project.summary}</p>

        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-lg border border-border bg-surface-2 px-2.5 py-1 text-[0.65rem] font-mono uppercase tracking-wider text-muted"
              >
                {technology}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-3 border-t border-border/40">
          <ProjectLinks project={project} onInspect={onInspect} />
        </div>
      </div>
    </article>
  );
}
