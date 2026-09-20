import { Fragment } from 'react';
import { projects } from '../data/projects';
import type { Project } from '../data/projects';
import { CaseStudyPanel } from '../components/CaseStudyPanel';
import { FadeIn } from '../components/FadeIn';
import { ProjectCard } from '../components/ProjectCard';
import { SectionHeading } from '../components/SectionHeading';

const featured = projects.filter((project) => project.kind === 'project' && project.featured && project.verified);
const rest = projects.filter((project) => project.kind === 'project' && !(project.featured && project.verified));

/** Asymmetric 12-col spans: alternating 7/5, full-width for a trailing odd card. */
function featuredSpan(index: number, total: number): string {
  if (total % 2 === 1 && index === total - 1) return 'md:col-span-12';
  return index % 2 === 0 ? 'md:col-span-7' : 'md:col-span-5';
}

function restSpan(index: number, total: number): string {
  return total % 2 === 1 && index === total - 1 ? 'sm:col-span-2' : '';
}

export function ProjectsSection() {
  return (
    <section id="projects" className="relative px-5 py-24 sm:px-8 sm:py-32 md:px-10">
      <div className="mx-auto max-w-6xl">
        <FadeIn y={24}>
          <SectionHeading eyebrow="Selected work" title="Projects" />
        </FadeIn>

        {featured.length > 0 && (
          <div className="mt-12 grid gap-5 md:mt-16 md:grid-cols-12 md:gap-6">
            {featured.map((project: Project, index: number) => {
              const span = featuredSpan(index, featured.length);
              return (
                <Fragment key={project.id}>
                  <ProjectCard project={project} featured={span === 'md:col-span-12'} className={span} />
                  {project.caseStudy && <CaseStudyPanel project={project} className="md:col-span-12" />}
                </Fragment>
              );
            })}
          </div>
        )}

        {rest.length > 0 && (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 md:mt-10 md:gap-6">
            {rest.map((project: Project, index: number) => (
              <ProjectCard key={project.id} project={project} className={restSpan(index, rest.length)} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}