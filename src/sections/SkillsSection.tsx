import { useState } from 'react';
import { FadeIn } from '../components/FadeIn';
import { SectionHeading } from '../components/SectionHeading';
import { clusters } from '../data/skills';
import { projects } from '../data/projects';
import { soundFx } from '../utils/soundFx';
import { Shield, Cpu, Terminal, Layers } from 'lucide-react';

type Selection = { cluster: string; chip: string };

const ICONS: Record<string, JSX.Element> = {
  Shield: <Shield className="w-4 h-4 text-cyan-400" />,
  Cpu: <Cpu className="w-4 h-4 text-violet-400" />,
  Terminal: <Terminal className="w-4 h-4 text-emerald-400" />,
  Layers: <Layers className="w-4 h-4 text-indigo-400" />,
};

const LEVEL_COLORS: Record<string, string> = {
  Mastery: 'bg-emerald-500/15 border-emerald-500/40 text-emerald-300',
  'Core Competency': 'bg-cyan-500/15 border-cyan-500/40 text-cyan-300',
  'Active Research': 'bg-indigo-500/15 border-indigo-500/40 text-indigo-300',
};

function matchingProjects(chip: string): string[] {
  return projects
    .filter(
      (project) =>
        project.verified &&
        project.technologies.some((technology) => technology.toLowerCase().includes(chip.toLowerCase())),
    )
    .map((project) => project.title);
}

export function SkillsSection() {
  const [selection, setSelection] = useState<Selection | null>(null);

  return (
    <section id="skills" className="relative border-t border-slate-800/80 px-5 py-24 sm:px-8 sm:py-32 md:px-10">
      <div className="mx-auto max-w-6xl">
        <FadeIn y={24}>
          <SectionHeading eyebrow="Architectures & Capabilities" title="Weaponry & Skills" />
        </FadeIn>

        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2">
          {clusters.map((cluster, index) => (
            <FadeIn
              key={cluster.cluster}
              delay={index * 0.08}
              className="glow-card flex flex-col gap-4 rounded-2xl p-6 sm:p-7 group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <span className="p-2 rounded-xl bg-slate-900 border border-slate-800">
                    {ICONS[cluster.iconName] || <Layers className="w-4 h-4 text-cyan-400" />}
                  </span>
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold font-sans text-white">
                      {cluster.cluster}
                    </h3>
                    <div className="text-xs text-slate-400 font-sans mt-0.5">{cluster.tagline}</div>
                  </div>
                </div>

                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase tracking-wider border shrink-0 ${
                    LEVEL_COLORS[cluster.level] || 'bg-slate-800 text-slate-300'
                  }`}
                >
                  {cluster.level}
                </span>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {cluster.items.map((chip) => {
                  const isActive = selection?.cluster === cluster.cluster && selection.chip === chip;
                  return (
                    <button
                      key={chip}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => {
                        soundFx.playClick();
                        setSelection(isActive ? null : { cluster: cluster.cluster, chip });
                      }}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-mono transition-all ${
                        isActive
                          ? 'border-cyan-400 bg-cyan-500/20 text-cyan-200 shadow-[0_0_15px_rgba(0,242,254,0.3)]'
                          : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-cyan-500/40 hover:text-cyan-300'
                      }`}
                    >
                      {chip}
                    </button>
                  );
                })}
              </div>

              {selection?.cluster === cluster.cluster &&
                (() => {
                  const titles = matchingProjects(selection.chip);
                  return titles.length > 0 ? (
                    <div className="mt-auto pt-3 border-t border-cyan-500/20 text-xs font-mono text-cyan-300 flex items-center gap-2">
                      <span className="text-emerald-400">⚡</span>
                      <span>Implemented in: <span className="font-bold text-white">{titles.join(' • ')}</span></span>
                    </div>
                  ) : null;
                })()}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
