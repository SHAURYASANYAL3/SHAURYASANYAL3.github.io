import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, Terminal as TerminalIcon, Sparkles, ExternalLink, ShieldCheck, Flame } from 'lucide-react';
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
          className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-indigo-300 to-emerald-300 font-mono font-bold"
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
    <section id="nexus" className="relative flex min-h-screen flex-col justify-center overflow-hidden pt-28 pb-16">
      {/* Bioluminescent Ambient Glow Orbs */}
      <div className="pointer-events-none absolute -top-40 left-1/4 w-[550px] h-[550px] bg-indigo-600/15 blur-[140px] rounded-full" />
      <div className="pointer-events-none absolute top-1/3 right-10 w-[450px] h-[450px] bg-cyan-500/12 blur-[130px] rounded-full" />

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
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-cyan-400/30 text-xs font-mono text-cyan-300 shadow-[0_0_25px_rgba(0,242,254,0.18)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-400"></span>
              </span>
              <span className="font-semibold tracking-wide">BITS VIZAG CYBERSECURITY</span>
              <span className="text-slate-600">•</span>
              <span className="text-indigo-300 flex items-center gap-1">
                <Flame className="w-3 h-3 text-amber-400" />
                NSOC 26 TOP 27
              </span>
            </div>

            {/* Title & Alias */}
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h1 className="hero-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight font-sans uppercase">
                  {profile.name}
                </h1>
                <span className="px-3 py-1 rounded-lg bg-slate-900/90 border border-indigo-500/30 text-xs font-mono text-indigo-300 font-bold shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                  {profile.handle}
                </span>
              </div>

              {/* Dynamic Typewriter / Cycler */}
              <div className="mt-3 text-lg sm:text-2xl text-slate-300 font-medium">
                <RotatingRole />
              </div>
            </div>

            <p className="max-w-2xl text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
              {profile.tagline}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#projects"
                onClick={() => soundFx.playClick()}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-cyan-400 via-sky-400 to-indigo-500 px-6 py-3 text-xs font-mono font-bold uppercase tracking-wider text-slate-950 transition-all hover:brightness-115 shadow-[0_0_30px_rgba(56,189,248,0.35)] active:scale-95"
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
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900/90 border border-indigo-500/40 px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider text-indigo-300 transition-all hover:bg-indigo-500/20 hover:border-indigo-400 active:scale-95 shadow-[0_0_25px_rgba(99,102,241,0.2)]"
                >
                  <TerminalIcon className="h-4 w-4 text-cyan-300" />
                  <span>Launch CLI (~ / `)</span>
                </button>
              )}

              {github && (
                <a
                  href={github.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => soundFx.playClick()}
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-700/80 bg-slate-900/60 px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider text-slate-300 transition-all hover:border-cyan-500/40 hover:text-white active:scale-95"
                >
                  <span>GitHub</span>
                  <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
                </a>
              )}
            </div>
          </motion.div>

          {/* Quick Stats Grid with Glow Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 grid grid-cols-2 gap-3"
          >
            {profile.stats.map((s, idx) => (
              <div
                key={idx}
                className="glow-card p-4 rounded-2xl group"
              >
                <div className="text-[11px] font-mono uppercase tracking-wider text-slate-400 group-hover:text-cyan-300 transition-colors flex items-center justify-between">
                  <span>{s.label}</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-500/60 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="mt-1 text-2xl font-bold font-mono text-white tracking-tight">
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
