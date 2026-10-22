import { useState } from 'react';
import { ArrowUpRight, Copy, Check, Send, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { FadeIn } from '../components/FadeIn';
import { profile } from '../data/profile';
import { site } from '../data/site';
import { socials } from '../data/social';
import { soundFx } from '../utils/soundFx';

export function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [dispatched, setDispatched] = useState(false);

  const handleCopyEmail = () => {
    soundFx.playClick();
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    soundFx.playSuccess();
    setTimeout(() => setCopied(false), 2400);
  };

  const handleDispatch = (e: React.FormEvent) => {
    e.preventDefault();
    soundFx.playSuccess();
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#00f2fe', '#8a2be2', '#00e676'],
    });
    setDispatched(true);
    // Open mailto fallback with prefilled text
    const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
      subject || 'Inquiry: Systems & AI Collaboration'
    )}&body=${encodeURIComponent(message)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <>
      <section id="contact" className="relative border-t border-border px-5 py-24 sm:px-8 sm:py-32 md:px-10 overflow-hidden">
        {/* Glow backdrop */}
        <div className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-cyan-500/10 blur-[120px] rounded-full" />

        <div className="mx-auto max-w-4xl text-center relative z-10">
          <FadeIn y={24}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>DIRECT TRANSMISSION GATEWAY</span>
            </div>

            <h2 className="font-sans font-black uppercase leading-[1.05] tracking-tight text-3xl sm:text-5xl lg:text-6xl text-white">
              Let's Build Something High-Leverage.
            </h2>
          </FadeIn>

          <FadeIn delay={0.15} className="mt-6 max-w-xl mx-auto">
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed font-sans">
              Open for exploratory AI agent observability research, low-level systems engineering, and high-impact venture building.
            </p>
          </FadeIn>

          {/* Email Copy Card */}
          <FadeIn delay={0.2} className="mt-8 flex justify-center">
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-[0_0_30px_rgba(0,242,254,0.1)]">
              <span className="font-mono text-sm sm:text-base text-cyan-300 font-semibold select-all">
                {profile.email}
              </span>
              <button
                type="button"
                onClick={handleCopyEmail}
                aria-label="Copy email address"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 text-xs font-mono transition-all"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold">COPIED</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>COPY</span>
                  </>
                )}
              </button>
            </div>
          </FadeIn>

          {/* Fast Message Form */}
          <FadeIn delay={0.25} className="mt-10 max-w-lg mx-auto text-left">
            <form onSubmit={handleDispatch} className="p-6 rounded-3xl bg-slate-900/50 border border-slate-800 backdrop-blur-md space-y-4">
              <div className="text-xs font-mono font-bold text-slate-400 uppercase tracking-wider">
                Direct Dispatch (Opens Mail Client)
              </div>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Subject: e.g. R&D / Project Collaboration"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 font-mono text-xs outline-none focus:border-cyan-500/60"
              />
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
                placeholder="Your message / inquiry..."
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder:text-slate-600 font-sans text-xs outline-none focus:border-cyan-500/60"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-teal-400 text-slate-950 font-mono text-xs font-bold uppercase tracking-wider hover:brightness-110 active:scale-98 transition-all shadow-[0_0_20px_rgba(0,242,254,0.25)]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Transmit Message</span>
              </button>
            </form>
          </FadeIn>

          {/* Social Links Chips */}
          <FadeIn delay={0.3} className="mt-12">
            <ul className="flex flex-wrap items-center justify-center gap-2.5">
              {socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFx.playClick()}
                    className="inline-flex items-center gap-2 rounded-xl border border-slate-800 bg-slate-900/60 px-4 py-2 text-xs font-mono font-medium text-slate-300 transition-colors hover:border-cyan-500/40 hover:text-cyan-300"
                  >
                    <span>{social.label}</span>
                    <ArrowUpRight className="h-3.5 w-3.5 text-slate-500" />
                  </a>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* Global Footer */}
      <footer className="border-t border-slate-900 bg-[#050811] px-5 py-10 sm:px-8 md:px-10 text-xs font-mono text-slate-500">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span className="text-slate-300 font-bold">{site.copyrightName}</span>
            <span>•</span>
            <span>BITS Visakhapatnam (2025–2029)</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-slate-400">
            {site.nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="hover:text-cyan-400 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
