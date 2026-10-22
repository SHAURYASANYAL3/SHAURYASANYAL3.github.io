import { X, ExternalLink, Layers, ShieldCheck, ArrowRight, Cpu } from 'lucide-react';
import type { Project } from '../data/projects';
import { soundFx } from '../utils/soundFx';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
}

function GithubIcon({ className = 'w-4 h-4' }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
      />
    </svg>
  );
}

export function ProjectDetailModal({ project, onClose }: ProjectDetailModalProps) {
  if (!project) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative flex flex-col w-full max-w-2xl max-h-[90vh] bg-[#090d16] border border-cyan-500/40 rounded-3xl shadow-[0_0_60px_rgba(0,242,254,0.18)] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-cyan-500/20 bg-gradient-to-r from-slate-900/90 via-[#0c1222] to-slate-900/90">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider bg-cyan-500/15 border border-cyan-400/40 text-cyan-300">
                {project.category}
              </span>
              {project.year && (
                <span className="text-xs font-mono text-slate-500">[{project.year}]</span>
              )}
            </div>
            <h2 className="text-2xl font-bold font-mono tracking-tight text-white flex items-center gap-2">
              <span>{project.title}</span>
            </h2>
          </div>

          <button
            onClick={() => {
              soundFx.playClick();
              onClose();
            }}
            aria-label="Close dossier"
            className="p-2 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-400 hover:text-white hover:border-cyan-400 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 p-5 sm:p-7 overflow-y-auto space-y-6 font-sans text-sm text-slate-300 leading-relaxed">
          {/* Summary Banner */}
          <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 text-cyan-200/90 font-medium">
            {project.summary}
          </div>

          {/* Detailed Narrative */}
          <div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase mb-2 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Architecture & Engineering Focus</span>
            </h3>
            <p className="text-slate-300 leading-relaxed">{project.description}</p>
            {project.longDescription && (
              <p className="text-slate-400 mt-2 text-xs">{project.longDescription}</p>
            )}
          </div>

          {/* Pipeline / Stages Flow */}
          {project.caseStudy?.pipeline && (
            <div>
              <h3 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase mb-3 flex items-center gap-1.5">
                <Cpu className="w-4 h-4 text-violet-400" />
                <span>Execution Topology</span>
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {project.caseStudy.pipeline.map((stage, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-900/70 border border-slate-800 flex items-start gap-2.5"
                  >
                    <span className="flex items-center justify-center w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 text-[10px] font-mono font-bold shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="text-xs font-semibold text-slate-200">{stage.label}</div>
                      {stage.detail && (
                        <div className="text-[11px] text-slate-400 mt-0.5">{stage.detail}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Capabilities */}
          {project.caseStudy?.capabilities && (
            <div>
              <h3 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>Core Capabilities</span>
              </h3>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
                {project.caseStudy.capabilities.map((cap, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-300">
                    <span className="text-emerald-400">✓</span>
                    <span>{cap}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack Pills */}
          <div>
            <h3 className="text-xs font-mono font-bold tracking-widest text-slate-400 uppercase mb-2">
              Technologies & Toolchains
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {project.technologies.map((t) => (
                <span
                  key={t}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono bg-slate-900 border border-slate-800 text-slate-300"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer (Action CTAs) */}
        <div className="p-4 sm:p-5 border-t border-slate-800/80 bg-slate-950 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs font-mono text-slate-500">
            SHAURYASANYAL3 // REPO ID: {project.id}
          </div>

          <div className="flex items-center gap-2">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playClick()}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-700/80 text-white hover:border-cyan-400 hover:text-cyan-300 transition-all text-xs font-mono font-bold"
              >
                <GithubIcon className="w-4 h-4" />
                <span>Source Code</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </a>
            )}

            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundFx.playClick()}
                className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400 transition-all text-xs font-mono shadow-[0_0_20px_rgba(0,242,254,0.3)]"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Launch Live</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
