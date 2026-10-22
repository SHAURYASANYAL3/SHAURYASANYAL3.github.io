import { useState, useRef, useEffect, type KeyboardEvent } from 'react';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2, CornerDownLeft, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { soundFx } from '../utils/soundFx';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { clusters } from '../data/skills';
import { experience } from '../data/experience';
import { achievements } from '../data/achievements';
import { socials } from '../data/social';

interface CyberTerminalModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProject?: (projectId: string) => void;
  onToggleMatrix?: () => void;
}

interface CommandLog {
  id: string;
  type: 'input' | 'output' | 'error' | 'success';
  content: string | JSX.Element;
}

const COMMAND_LIST = [
  'help',
  'whoami',
  'projects',
  'skills',
  'certs',
  'experience',
  'cat bio.md',
  'matrix',
  'sudo hire',
  'contact',
  'sound',
  'clear',
  'exit',
];

export function CyberTerminalModal({ isOpen, onClose, onSelectProject, onToggleMatrix }: CyberTerminalModalProps) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: 'init-1',
      type: 'output',
      content: (
        <div className="space-y-1 text-slate-300">
          <div className="text-cyan-400 font-bold">
            FOOL-OS TERMINAL v2.6.0 [KERNEL: RYUOS 6.1-HARDENED]
          </div>
          <div className="text-slate-400 text-xs">
            Logged in as <span className="text-emerald-400">guest@shauryasanyal3.nexus</span>
          </div>
          <div className="text-slate-400 text-xs">
            Type <span className="text-cyan-300 font-mono font-bold">help</span> to list commands or{' '}
            <span className="text-amber-400 font-mono font-bold">sudo hire</span> for quick recruitment dispatch.
          </div>
        </div>
      ),
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isMaximized, setIsMaximized] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  if (!isOpen) return null;

  const handleCommand = (rawCmd: string) => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return;

    soundFx.playTerminal();

    // Add to input history
    setCmdHistory((prev) => [trimmed, ...prev]);
    setHistoryIndex(-1);

    const newLogs: CommandLog[] = [
      { id: `in-${Date.now()}`, type: 'input', content: trimmed },
    ];

    const lower = trimmed.toLowerCase();

    switch (lower) {
      case 'help':
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 text-xs font-mono my-1">
              <div><span className="text-cyan-300 font-bold">whoami</span> - Identity & credentials</div>
              <div><span className="text-cyan-300 font-bold">projects</span> - Active repos & systems</div>
              <div><span className="text-cyan-300 font-bold">skills</span> - Weaponry & architectures</div>
              <div><span className="text-cyan-300 font-bold">certs</span> - Verified certifications</div>
              <div><span className="text-cyan-300 font-bold">experience</span> - RTIH AP, STEEGA, BITS</div>
              <div><span className="text-cyan-300 font-bold">cat bio.md</span> - Personal philosophy</div>
              <div><span className="text-cyan-300 font-bold">matrix</span> - Toggle matrix cyber rain</div>
              <div><span className="text-cyan-300 font-bold">sudo hire</span> - Direct talent acquisition</div>
              <div><span className="text-cyan-300 font-bold">contact</span> - Email & transmission channels</div>
              <div><span className="text-cyan-300 font-bold">clear</span> - Clear terminal buffer</div>
              <div><span className="text-cyan-300 font-bold">exit</span> - Terminate CLI session</div>
            </div>
          ),
        });
        break;

      case 'whoami':
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: (
            <div className="space-y-1 text-xs font-mono">
              <div className="text-emerald-400 font-bold text-sm">{profile.name} (aka {profile.handle})</div>
              <div className="text-slate-300">{profile.bio}</div>
              <div className="text-cyan-300">📍 {profile.location} • 🎓 {profile.education}</div>
              <div className="text-amber-300 font-semibold">Status: {profile.status}</div>
            </div>
          ),
        });
        break;

      case 'projects':
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: (
            <div className="space-y-2 text-xs font-mono my-1">
              <div className="text-slate-400 font-bold">FEATURED SYSTEMS & REPOSITORIES:</div>
              {projects.slice(0, 6).map((p) => (
                <div key={p.id} className="border-l-2 border-cyan-500/50 pl-2">
                  <div className="flex items-center gap-2">
                    <span className="text-cyan-300 font-bold">{p.title}</span>
                    <span className="text-slate-500">[{p.category}]</span>
                    {p.github && (
                      <a href={p.github} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">
                        gh ↗
                      </a>
                    )}
                  </div>
                  <div className="text-slate-400">{p.summary}</div>
                </div>
              ))}
            </div>
          ),
        });
        break;

      case 'skills':
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: (
            <div className="space-y-2 text-xs font-mono my-1">
              {clusters.map((c) => (
                <div key={c.cluster}>
                  <div className="text-cyan-300 font-bold">{c.cluster} <span className="text-slate-500 font-normal">({c.level})</span></div>
                  <div className="text-slate-400">{c.items.join(' • ')}</div>
                </div>
              ))}
            </div>
          ),
        });
        break;

      case 'certs':
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: (
            <div className="space-y-1.5 text-xs font-mono my-1">
              <div className="text-amber-400 font-bold">VERIFIED CREDENTIALS:</div>
              {achievements.map((a, i) => (
                <div key={i} className="flex flex-col">
                  <div className="text-slate-200 font-semibold">✓ {a.title} ({a.year})</div>
                  <div className="text-slate-400 text-[11px] pl-3">{a.organization} — {a.highlight}</div>
                </div>
              ))}
            </div>
          ),
        });
        break;

      case 'experience':
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: (
            <div className="space-y-2 text-xs font-mono my-1">
              {experience.map((e, idx) => (
                <div key={idx} className="border-l-2 border-emerald-500/50 pl-2">
                  <div className="text-emerald-300 font-bold">{e.role} @ {e.organization}</div>
                  <div className="text-slate-400 text-[11px]">{e.date} • {e.location}</div>
                  <div className="text-slate-300 mt-0.5">{e.description}</div>
                </div>
              ))}
            </div>
          ),
        });
        break;

      case 'cat bio.md':
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: (
            <div className="text-xs font-mono text-slate-300 space-y-1.5 p-2 rounded bg-slate-900/60 border border-slate-800">
              <div className="text-cyan-400 font-bold"># Philosophy: The Dark & Full of Code</div>
              <p>“A reader lives a thousand lives before he dies. The man who never reads lives only one.”</p>
              <p>
                I am a passionate CS undergrad and security researcher crafting high-performance systems and exploring the depths of computer science.
                From zero-knowledge agent privacy to Linux kernels and neural game engines, I thrive on building where software touches the metal.
              </p>
            </div>
          ),
        });
        break;

      case 'matrix':
        if (onToggleMatrix) {
          onToggleMatrix();
        }
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'success',
          content: '⚡ Matrix digital neural rain toggled.',
        });
        break;

      case 'sudo hire':
      case 'hire':
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f2fe', '#8a2be2', '#00e676', '#ffaa00'],
        });
        soundFx.playSuccess();
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'success',
          content: (
            <div className="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded text-emerald-300 space-y-1">
              <div className="font-bold text-sm flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                RECRUITMENT PROTOCOL INITIATED!
              </div>
              <div>Direct channel: <a href="mailto:shauryasanyal.21jun@gmail.com" className="underline font-bold text-white">shauryasanyal.21jun@gmail.com</a></div>
              <div>Open for: AI Agent Observability Research, Systems Engineering, Security Architecture, High-Leverage Founding Roles.</div>
            </div>
          ),
        });
        break;

      case 'contact':
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: (
            <div className="text-xs font-mono space-y-1">
              {socials.map((s) => (
                <div key={s.platform}>
                  <span className="text-cyan-300 font-bold">{s.label}: </span>
                  <a href={s.url} target="_blank" rel="noreferrer" className="text-emerald-400 hover:underline">
                    {s.username}
                  </a>
                </div>
              ))}
            </div>
          ),
        });
        break;

      case 'sound':
        const muted = soundFx.toggleMute();
        newLogs.push({
          id: `out-${Date.now()}`,
          type: 'output',
          content: `Sound effects are now ${muted ? 'MUTED' : 'ENABLED'}.`,
        });
        break;

      case 'clear':
        setHistory([]);
        setInputVal('');
        return;

      case 'exit':
      case 'quit':
        onClose();
        return;

      default:
        newLogs.push({
          id: `err-${Date.now()}`,
          type: 'error',
          content: `Command not recognized: '${trimmed}'. Type 'help' for valid instructions.`,
        });
        break;
    }

    setHistory((prev) => [...prev, ...newLogs]);
    setInputVal('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleCommand(inputVal);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (cmdHistory.length > 0) {
        const nextIdx = Math.min(cmdHistory.length - 1, historyIndex + 1);
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(cmdHistory[nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const match = COMMAND_LIST.find((c) => c.startsWith(inputVal.toLowerCase().trim()));
      if (match) {
        setInputVal(match);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className={`relative flex flex-col w-full bg-[#070b14] border border-cyan-500/40 rounded-2xl shadow-[0_0_50px_rgba(0,242,254,0.15)] overflow-hidden transition-all duration-200 ${
          isMaximized ? 'h-[96vh] max-w-full' : 'max-w-3xl h-[560px]'
        }`}
      >
        {/* Terminal Window Header Bar */}
        <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-cyan-500/20 select-none">
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
            <span className="w-3 h-3 rounded-full bg-green-500/80 inline-block" />
            <span className="ml-2 font-mono text-xs text-cyan-300 font-bold flex items-center gap-1.5">
              <TerminalIcon className="w-3.5 h-3.5" />
              <span>fool-cli@shauryasanyal3:~</span>
            </span>
          </div>

          <div className="flex items-center gap-2 text-slate-400">
            <button
              onClick={() => setIsMaximized(!isMaximized)}
              aria-label="Toggle maximize"
              className="p-1 hover:text-cyan-400 transition-colors"
            >
              {isMaximized ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </button>
            <button
              onClick={() => {
                soundFx.playClick();
                onClose();
              }}
              aria-label="Close terminal"
              className="p-1 hover:text-red-400 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Command Toolbar */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-950/60 border-b border-slate-800/80 overflow-x-auto text-[11px] font-mono scrollbar-none">
          <span className="text-slate-500">Quick:</span>
          {['help', 'whoami', 'projects', 'skills', 'certs', 'sudo hire', 'matrix', 'clear'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="px-2 py-0.5 rounded bg-slate-900 hover:bg-cyan-500/20 hover:text-cyan-300 text-slate-300 border border-slate-800 transition-all whitespace-nowrap"
            >
              {cmd}
            </button>
          ))}
        </div>

        {/* Terminal Output Stream */}
        <div className="flex-1 p-4 overflow-y-auto font-mono text-xs text-slate-300 space-y-2.5">
          {history.map((log) => (
            <div key={log.id} className="leading-relaxed">
              {log.type === 'input' && (
                <div className="flex items-center gap-2 text-cyan-400 font-bold">
                  <span>guest@shauryasanyal3:~$</span>
                  <span className="text-white">{log.content}</span>
                </div>
              )}
              {log.type === 'output' && <div>{log.content}</div>}
              {log.type === 'error' && <div className="text-red-400 font-semibold">{log.content}</div>}
              {log.type === 'success' && <div className="text-emerald-400 font-semibold">{log.content}</div>}
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Terminal Prompt Input Bar */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-slate-950 border-t border-slate-800/80 font-mono text-xs">
          <span className="text-emerald-400 font-bold shrink-0">guest@shauryasanyal3:~$</span>
          <input
            ref={inputRef}
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command (try 'help' or 'sudo hire')..."
            className="flex-1 bg-transparent text-white outline-none placeholder:text-slate-600 font-mono"
            autoFocus
          />
          <button
            onClick={() => handleCommand(inputVal)}
            aria-label="Send command"
            className="p-1 text-slate-400 hover:text-cyan-400 transition-colors"
          >
            <CornerDownLeft className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
