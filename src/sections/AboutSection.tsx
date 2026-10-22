import { motion } from 'framer-motion';
import { CapabilityGraph } from '../components/CapabilityGraph';
import { FadeIn } from '../components/FadeIn';
import { profile } from '../data/profile';
import { Shield, Sparkles } from 'lucide-react';

const HEADLINE = 'ENGINEERING AT THE EDGE OF SYSTEMS, SECURITY & AI.';

export function AboutSection() {
  return (
    <section id="about" className="relative border-t border-slate-800/80 px-5 py-24 sm:px-8 sm:py-32 md:px-10 overflow-hidden">
      {/* Background ambient blur */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-cyan-500/5 blur-[120px] rounded-full" />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-xs font-mono text-cyan-300 mb-6 shadow-[0_0_20px_rgba(0,242,254,0.15)]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>RESEARCH &amp; PHILOSOPHY</span>
        </div>

        <h2 className="mx-auto max-w-4xl font-extrabold uppercase leading-[1.08] tracking-tight text-3xl sm:text-5xl lg:text-6xl text-white font-sans">
          {HEADLINE.split('').map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0.15 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: 0.02 * i }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h2>

        <FadeIn delay={0.3} className="mx-auto mt-6 max-w-3xl">
          <p className="text-base sm:text-lg leading-relaxed text-slate-300 font-sans">
            {profile.bio}
          </p>
        </FadeIn>

        <FadeIn delay={0.4} className="mt-8 flex justify-center gap-4 flex-wrap text-xs font-mono text-slate-400">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            BITS Visakhapatnam (2025–2029)
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400" />
            RTIH AP Future Founder
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/80 border border-slate-800">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            Microsoft Learn Student Ambassador
          </span>
        </FadeIn>

        <FadeIn delay={0.5} className="mt-14 md:mt-18">
          <CapabilityGraph />
        </FadeIn>
      </div>
    </section>
  );
}
