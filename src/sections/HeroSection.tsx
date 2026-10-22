import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Terminal as TerminalIcon, Sparkles, Shield, Cpu, ExternalLink } from 'lucide-react';
import { profile } from '../data/profile';
import { socials } from '../data/social';
import { Hero3DCanvas } from '../components/Hero3DCanvas';
import { soundFx } from '../utils/soundFx';

interface HeroSectionProps {
  onSelectProject?: (projectId: string) => void;
  onOpenTerminal?: () => void;
}

function RotatingRole() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((v) => (v + 1) % profile.roles.length), 2600);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="relative inline-flex h-[1.4em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={profile.roles[index]}
          initial={{ y: '110%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-110%', opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-violet-400 font-mono font-bold"
        >
          {profile.roles[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export function HeroSection({ onSelectProject, onOpenTerminal }: HeroSectionProps) {
  const github = socials.find((s) => s.platform === 'github');

  return (
    <section id="nexus" className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-24 pb-16">
      {/* Background Ambience */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(0,242,254,0.12),transparent_70%)]" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Top Text & Headline Row */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Holographic Verification Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-400/30 text-xs font-mono text-cyan-300 shadow-[0_0_20px_rgba(0,242,254,0.15)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
              </span>
              <span>BITS VIZAG CYBERSECURITY</span>
              <span className="text-slate-500">•</span>
              <span className="text-violet-300">MICROSOFT AMBASSADOR</span>
            </div>

            {/* Title & Alias */}
            <div>
              <div className="flex items-center gap-3">
                <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-sans uppercase">
                  {profile.name}
                </h1>
                <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-700/80 text-xs font-mono text-slate-400 font-semibold">
                  {profile.handle}
                </span>
              </div>

              {/* Dynamic Typewriter / Cycler */}
              <div className="mt-3 text-lg sm:text-2xl text-slate-300 font-medium">
                <RotatingRole />
              </div>
            </div>

            <p className="max-w-2xl text-base sm:text-lg text-slate-400 leading-relaxed font-sans">
              {profile.tagline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#systems"
                onClick={() => soundFx.playClick()}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-slate-950 transition hover:brightness-110 shadow-[0_0_30px_rgba(0,242,254,0.3)] active:scale-95"
              >
                <span>Inspect Systems</span>
                <ArrowUpRight className="h-4 w-4" />
              </a>

              {onOpenTerminal && (
                <button
                  onClick={() => {
                    soundFx.playTerminal();
                    onOpenTerminal();
                  }}
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900/90 border border-cyan-500/40 px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider text-cyan-300 transition hover:bg-cyan-500/15 hover:border-cyan-300 active:scale-95 shadow-[0_0_20px_rgba(0,242,254,0.15)]"
                >
                  <TerminalIcon className="h-4 w-4" />
                  <span>Launch CLI (~ / `)</span>
                </button>
              )}

              {github && (
                <a
                  href={github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/40 px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider text-slate-300 transition hover:border-slate-500 hover:text-white active:scale-95"
                >
                  <span>GitHub</span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Quick Stats Grid */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 grid grid-cols-2 gap-3"
          >
            {profile.stats.map((s, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-900/50 border border-slate-800/80 backdrop-blur-sm hover:border-cyan-500/40 transition-colors group"
              >
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-500 group-hover:text-cyan-400 transition-colors">
                  {s.label}
                </div>
                <div className="mt-1 text-2xl font-bold font-mono text-white">
                  {s.value}
                </div>
                <div className="mt-1 text-[11px] text-slate-400 leading-tight">
                  {s.detail}
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* 3D Neural Nexus Interactive Canvas */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="w-full"
        >
          <Hero3DCanvas onSelectProject={onSelectProject} onOpenTerminal={onOpenTerminal} />
        </motion.div>
      </div>
    </section>
  );
}
