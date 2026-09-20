import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { profile } from '../data/profile';
import { socials } from '../data/social';
import { OrbitingConstellation } from '../components/OrbitingConstellation';

const PLACEHOLDER = '__PLACEHOLDER__';

function RotatingRole() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((v) => (v + 1) % profile.roles.length), 2400);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="relative inline-flex h-[1.5em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={profile.roles[index]}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-110%', opacity: 0 }}
          transition={{ duration: 0.32, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-accent"
        >
          {profile.roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function HeroSection() {
  const github = socials.find((s) => s.platform === 'github' && s.url !== PLACEHOLDER);
  // LinkedIn / SpigotMC urls are placeholders in social.ts: skip rendering until real.

  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden">
      <div className="hero-grid absolute inset-0" aria-hidden="true" />
      <div className="hero-vignette pointer-events-none absolute inset-0" aria-hidden="true" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-16 px-6 pb-28 pt-28 md:px-10 md:pb-24 md:pt-32 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <p className="text-[0.7rem] uppercase tracking-[0.35em] text-muted">Building • Learning • Experimenting</p>

          <h1 className="hero-heading mt-5 font-black uppercase leading-none tracking-tight text-[clamp(2.75rem,9vw,6rem)]">
            {profile.name}
          </h1>

          <p className="mt-6 text-subheading font-medium text-primary">
            <RotatingRole />
          </p>

          <p className="mt-4 max-w-xl text-body text-muted">{profile.tagline}</p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center rounded-full bg-accent px-7 py-3 text-sm font-semibold uppercase tracking-widest text-bg transition hover:brightness-110"
            >
              Explore My Work
            </a>
            {github && (
              <a
                href={github.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border px-7 py-3 text-sm uppercase tracking-widest text-primary transition hover:border-accent hover:text-accent"
              >
                GitHub
                <ArrowUpRight className="h-4 w-4" />
              </a>
            )}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <OrbitingConstellation />
        </motion.div>
      </div>
    </section>
  );
}