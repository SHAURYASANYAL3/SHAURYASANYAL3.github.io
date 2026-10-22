import { useEffect, useRef } from 'react';

interface MatrixDigitalRainProps {
  active: boolean;
  onClose?: () => void;
}

export function MatrixDigitalRain({ active, onClose }: MatrixDigitalRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲンRAID_AGENT_WATCH_ATLAS_RYUOS_SECURITY';
    const fontSize = 14;
    const columns = Math.floor(width / fontSize);
    const drops = new Array(columns).fill(1);

    let animationId: number;

    const render = () => {
      ctx.fillStyle = 'rgba(6, 9, 19, 0.08)';
      ctx.fillRect(0, 0, width, height);

      ctx.fillStyle = '#00f2fe';
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars.charAt(Math.floor(Math.random() * chars.length));
        ctx.fillStyle = Math.random() > 0.9 ? '#ffffff' : Math.random() > 0.5 ? '#00f2fe' : '#8a2be2';
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-40 pointer-events-none opacity-40 mix-blend-screen">
      <canvas ref={canvasRef} className="w-full h-full block" />
      {onClose && (
        <button
          onClick={onClose}
          className="pointer-events-auto absolute top-4 right-4 px-3 py-1 bg-slate-900/90 text-cyan-400 border border-cyan-500/40 rounded font-mono text-xs hover:bg-cyan-500/20"
        >
          [ESC] EXIT MATRIX
        </button>
      )}
    </div>
  );
}
