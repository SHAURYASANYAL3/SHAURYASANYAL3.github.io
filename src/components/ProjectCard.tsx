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
    return { label: 'Concept / prototype', live: false };
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
          className="inline-flex items-center gap-1.5 rounded-full border border-slate-700/80 bg-slate-900/60 px-3.5 py-1.5 text-[0.7rem] font-mono font-medium uppercase tracking-wider text-slate-300 transition-colors hover:border-cyan-400/50 hover:text-cyan-300 active:scale-95"
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
          className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/40 bg-emerald-500/15 px-3.5 py-1.5 text-[0.7rem] font-mono font-medium uppercase tracking-wider text-emerald-300 transition-colors hover:bg-emerald-500/25 active:scale-95 shadow-[0_0_15px_rgba(16,185,129,0.2)]"
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
      className={`group relative flex flex-col overflow-hidden rounded-2xl glow-card ${
        featured ? 'lg:flex-row' : ''
      } ${className}`}
    >
      <ProjectVisual project={project} className={featured ? 'lg:w-1/2 lg:shrink-0' : ''} />

      <div className={`flex flex-col gap-4 p-6 md:p-7 ${featured ? 'lg:flex-1' : 'flex-1'}`}>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[0.7rem] uppercase tracking-[0.25em] text-cyan-400/90 font-mono font-semibold">
            {project.category}
          </span>
          <span
            className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1 text-[0.6rem] font-mono font-medium uppercase tracking-[0.18em] ${
              badge.live ? 'border-emerald-500/40 text-emerald-300 bg-emerald-950/40' : 'border-slate-800 text-slate-400 bg-slate-900/60'
            }`}
          >
            {badge.live && <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />}
            {badge.label}
          </span>
        </div>

        <h3 className="text-xl sm:text-2xl font-bold uppercase leading-tight text-white transition-transform duration-300 group-hover:translate-x-1 font-sans">
          {project.title}
        </h3>

        <p className="text-sm leading-relaxed text-slate-300">{project.summary}</p>

        {technologies.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {technologies.map((technology) => (
              <span
                key={technology}
                className="rounded-lg border border-slate-800/80 bg-slate-900/80 px-2.5 py-1 text-[0.68rem] font-mono uppercase tracking-wider text-slate-400 group-hover:text-slate-300 group-hover:border-slate-700 transition-colors"
              >
                {technology}
              </span>
            ))}
          </div>
        )}

        <div className="mt-auto pt-4 border-t border-slate-800/60">
          <ProjectLinks project={project} onInspect={onInspect} />
        </div>
      </div>
    </article>
  );
}
