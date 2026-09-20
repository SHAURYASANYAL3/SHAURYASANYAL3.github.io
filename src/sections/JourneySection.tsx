import { FadeIn } from '../components/FadeIn';
import { SectionHeading } from '../components/SectionHeading';
import { achievements } from '../data/achievements';
import { experience, type ExperienceCategory } from '../data/experience';

const CATEGORY_LABELS: Record<ExperienceCategory, string> = {
  education: 'Education',
  project: 'Project',
  hackathon: 'Hackathon',
  certification: 'Certification',
  research: 'Research',
  experiment: 'Experiment',
};

export function JourneySection() {
  const entries = experience.filter((entry) => entry.verified);
  const verifiedAchievements = achievements.filter((achievement) => achievement.verified);

  return (
    <section id="journey" className="relative border-t border-border px-5 py-24 sm:px-8 sm:py-32 md:px-10">
      <div className="mx-auto max-w-6xl">
        <FadeIn y={24}>
          <SectionHeading eyebrow="Story so far" title="Journey" />
        </FadeIn>

        {entries.length === 0 ? (
          <p className="mt-12 max-w-md text-small leading-relaxed text-muted md:mt-16">
            Timeline coming soon — the story is still being written.
          </p>
        ) : (
          <ol className="mt-12 md:mt-16">
            {entries.map((entry, index) => (
              <li
                key={entry.title}
                className={`relative grid grid-cols-[auto_1fr] gap-4 sm:gap-6 ${
                  index < entries.length - 1 ? 'pb-12' : ''
                }`}
              >
                <div aria-hidden="true" className="flex flex-col items-center">
                  <span className="mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full border border-accent bg-bg" />
                  {index < entries.length - 1 && <span className="mt-2 w-px flex-1 bg-border" />}
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[0.7rem] uppercase tracking-[0.2em] text-muted">
                    {entry.date}
                  </p>
                  <span className="mt-2 inline-block rounded-full border border-border px-2.5 py-0.5 text-[0.6rem] uppercase tracking-[0.2em] text-muted">
                    {CATEGORY_LABELS[entry.category]}
                  </span>
                  <h3 className="mt-3 text-heading font-semibold uppercase leading-tight text-secondary">
                    {entry.title}
                  </h3>
                  <p className="mt-2 max-w-2xl text-small leading-relaxed text-muted">
                    {entry.description}
                  </p>
                  {entry.technologies && entry.technologies.length > 0 && (
                    <ul className="mt-3 flex flex-wrap gap-2">
                      {entry.technologies.map((technology) => (
                        <li
                          key={technology}
                          className="rounded-full border border-border px-3 py-1 text-[0.65rem] uppercase tracking-[0.15em] text-muted"
                        >
                          {technology}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </li>
            ))}
          </ol>
        )}

        <div className="mt-20 md:mt-28">
          <FadeIn y={24}>
            <h3 className="flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.3em] text-muted sm:text-xs">
              <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
              Achievements
            </h3>
          </FadeIn>

          {verifiedAchievements.length === 0 ? (
            <p className="mt-8 max-w-md text-small leading-relaxed text-muted">
              Achievements coming soon.
            </p>
          ) : (
            <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {verifiedAchievements.map((achievement) => (
                <FadeIn
                  key={achievement.title}
                  delay={0.05}
                  className="rounded-card border border-border bg-surface p-5 shadow-card"
                >
                  <div className="flex items-start justify-between gap-3">
                    <h4 className="text-small font-semibold uppercase leading-snug text-secondary">
                      {achievement.title}
                    </h4>
                    {achievement.year && (
                      <span className="shrink-0 rounded-full border border-accent/30 px-2 py-0.5 font-mono text-[0.6rem] tracking-wider text-accent">
                        {achievement.year}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 text-[0.8rem] leading-relaxed text-muted">
                    {achievement.context}
                  </p>
                </FadeIn>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}