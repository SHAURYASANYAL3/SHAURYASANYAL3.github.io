import { useState } from 'react';
import { FadeIn } from '../components/FadeIn';
import { SectionHeading } from '../components/SectionHeading';
import { clusters } from '../data/skills';
import { projects } from '../data/projects';

type Selection = { cluster: string; chip: string };

function matchingProjects(chip: string): string[] {
  return projects
    .filter(
      (project) =>
        project.verified &&
        project.technologies.some((technology) => technology.toLowerCase() === chip.toLowerCase()),
    )
    .map((project) => project.title);
}

export function SkillsSection() {
  const [selection, setSelection] = useState<Selection | null>(null);

  return (
    <section id="skills" className="relative border-t border-border px-5 py-24 sm:px-8 sm:py-32 md:px-10">
      <div className="mx-auto max-w-6xl">
        <FadeIn y={24}>
          <SectionHeading eyebrow="Capabilities" title="Skills" />
        </FadeIn>

        <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-2 lg:grid-cols-3">
          {clusters.map((cluster, index) => (
            <FadeIn
              key={cluster.cluster}
              delay={index * 0.06}
              className="flex flex-col gap-4 rounded-card border border-border bg-surface p-6 shadow-card md:p-7"
            >
              <h3 className="text-heading font-semibold uppercase leading-tight text-secondary">
                {cluster.cluster}
              </h3>
              <div className="flex flex-wrap gap-2">
                {cluster.items.map((chip) => {
                  const isActive =
                    selection?.cluster === cluster.cluster && selection.chip === chip;
                  return (
                    <button
                      key={chip}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() =>
                        setSelection(isActive ? null : { cluster: cluster.cluster, chip })
                      }
                      className={`rounded-full border px-3 py-1 text-[0.65rem] uppercase tracking-[0.15em] transition-colors ${
                        isActive
                          ? 'border-accent/60 bg-accent/10 text-accent'
                          : 'border-border text-muted hover:border-accent/40 hover:text-accent'
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
                    <p className="mt-auto pt-2 text-[0.65rem] uppercase leading-relaxed tracking-[0.2em] text-accent/80">
                      Used in — {titles.join(' · ')}
                    </p>
                  ) : null;
                })()}
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}