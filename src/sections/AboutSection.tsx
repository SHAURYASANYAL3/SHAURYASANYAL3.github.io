import { motion } from 'framer-motion';
import { CapabilityGraph } from '../components/CapabilityGraph';
import { FadeIn } from '../components/FadeIn';
import { profile } from '../data/profile';

const HEADLINE = 'BUILDING AT THE EDGE OF SOFTWARE, SECURITY & AI.';

export function AboutSection() {
  return (
    <section id="about" className="relative border-t border-border px-5 py-24 sm:px-8 sm:py-32 md:px-10">
      <div className="mx-auto max-w-5xl text-center">
        <h2 className="mx-auto max-w-4xl font-black uppercase leading-[1.05] tracking-tight text-[clamp(1.75rem,4.5vw,3.5rem)]">
          {HEADLINE.split('').map((char, i) => (
            <motion.span
              key={i}
              className="inline-block"
              initial={{ opacity: 0.12 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.45, delay: 0.025 * i }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h2>

        <FadeIn delay={0.3} className="mx-auto mt-6 max-w-2xl">
          <p className="text-small leading-relaxed text-muted sm:text-body md:text-subheading">
            {profile.bio}
          </p>
        </FadeIn>

        <FadeIn delay={0.45} className="mt-12 md:mt-16">
          <CapabilityGraph />
        </FadeIn>
      </div>
    </section>
  );
}