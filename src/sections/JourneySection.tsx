import { FadeIn } from '../components/FadeIn';
import { SectionHeading } from '../components/SectionHeading';
import { achievements } from '../data/achievements';
import { experience, type ExperienceCategory } from '../data/experience';
import { Briefcase, GraduationCap, Award, Compass, ShieldCheck } from 'lucide-react';

const CATEGORY_ICONS: Record<ExperienceCategory, JSX.Element> = {
  work: <Briefcase className="w-3.5 h-3.5 text-cyan-400" />,
  founder: <Compass className="w-3.5 h-3.5 text-amber-400" />,
  education: <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />,
  research: <ShieldCheck className="w-3.5 h-3.5 text-violet-400" />,
  community: <Award className="w-3.5 h-3.5 text-teal-400" />,
};

export function JourneySection() {
  const verifiedAchievements = achievements.filter((achievement) => achievement.verified);

  return (
    <section id="journey" className="relative border-t border-border px-5 py-24 sm:px-8 sm:py-32 md:px-10">
      <div className="mx-auto max-w-6xl">
        <FadeIn y={24}>
          <SectionHeading eyebrow="Career Trajectory & Affiliations" title="Journey" />
        </FadeIn>

        {/* Experience Timeline */}
        <div className="mt-12 md:mt-16">
          <ol className="relative border-l border-slate-800 ml-4 sm:ml-6 space-y-10">
            {experience.map((entry, index) => (
              <li key={index} className="relative pl-6 sm:pl-8">
                {/* Timeline Node Icon */}
                <span className="absolute -left-3 top-1 flex items-center justify-center w-6 h-6 rounded-full bg-slate-900 border border-slate-700 shadow-[0_0_12px_rgba(0,242,254,0.2)]">
                  {CATEGORY_ICONS[entry.category] || <span className="w-2 h-2 rounded-full bg-cyan-400" />}
                </span>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-sm sm:text-base font-bold font-mono text-white">
                      {entry.role}
                    </span>
                    <span className="text-slate-500 font-mono text-xs">@</span>
                    <span className="text-xs sm:text-sm font-semibold text-cyan-300">
                      {entry.organization}
                    </span>
                    {entry.current && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/15 border border-emerald-500/30 text-emerald-400">
                        Present
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-mono text-slate-400">
                    {entry.date} • {entry.location}
                  </div>
                </div>

                <p className="mt-2 text-sm text-slate-300 leading-relaxed max-w-3xl">
                  {entry.description}
                </p>

                {entry.achievements && entry.achievements.length > 0 && (
                  <ul className="mt-2.5 space-y-1 text-xs text-slate-400 font-sans">
                    {entry.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="flex items-start gap-2">
                        <span className="text-cyan-400 font-bold mt-0.5">›</span>
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {entry.technologies && entry.technologies.length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {entry.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-0.5 rounded-md text-[10px] font-mono bg-slate-900/80 border border-slate-800 text-slate-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ol>
        </div>

        {/* Verified Certifications & Achievements Section */}
        <div id="credentials" className="mt-20 md:mt-28">
          <FadeIn y={24}>
            <div className="flex items-center gap-3 text-xs font-mono font-bold uppercase tracking-[0.25em] text-cyan-400 mb-2">
              <ShieldCheck className="w-4 h-4 text-cyan-400" />
              <span>Verified Credentials & Honors</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white font-sans">
              Certifications & Recognitions
            </h3>
          </FadeIn>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {verifiedAchievements.map((achievement, idx) => (
              <FadeIn
                key={idx}
                delay={0.04 * idx}
                className="group relative flex flex-col justify-between rounded-2xl border border-slate-800 bg-[#0d121f]/70 p-5 shadow-card hover:border-cyan-500/40 transition-all duration-200 backdrop-blur-sm"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-cyan-950/60 text-cyan-300 border border-cyan-500/30">
                      {achievement.badge || achievement.category}
                    </span>
                    <span className="font-mono text-xs text-slate-500">
                      {achievement.year}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-200 group-hover:text-white transition-colors leading-snug">
                    {achievement.title}
                  </h4>
                  <div className="text-[11px] font-mono text-cyan-400/90 mt-1">
                    {achievement.organization}
                  </div>
                  <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                    {achievement.highlight}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
                  <span>VERIFIED RECORD</span>
                  <span className="text-emerald-400 font-bold">✓ SECURED</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
