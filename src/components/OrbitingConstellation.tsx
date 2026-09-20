import type { CSSProperties } from 'react';
import { useEffect, useRef } from 'react';
import { projects } from '../data/projects';

interface RingSpec {
  radius: number;
  duration: number;
  delay: number;
  count: number;
}

const RING_SPECS: RingSpec[] = [
  { radius: 128, duration: 20, delay: 0, count: 3 },
  { radius: 168, duration: 27, delay: -9, count: 3 },
  { radius: 206, duration: 36, delay: -18, count: 2 },
];

// Featured projects + key skills, from the data layer.
const labels = [
  ...projects.filter((p) => p.featured).map((p) => p.title),
  'SmartSurvivalRPG',
  'ORION',
  'Cybersecurity',
  'AI',
  'Web',
];

interface RingNode {
  label: string;
  angle: number;
  radius: number;
}

const rings: { nodes: RingNode[]; duration: number; delay: number }[] = (() => {
  const built: { nodes: RingNode[]; duration: number; delay: number }[] = [];
  let cursor = 0;
  for (const spec of RING_SPECS) {
    const nodes: RingNode[] = [];
    for (let i = 0; i < spec.count; i += 1) {
      const angle = (i / spec.count) * Math.PI * 2;
      nodes.push({ label: labels[cursor], angle, radius: spec.radius });
      cursor += 1;
    }
    built.push({ nodes, duration: spec.duration, delay: spec.delay });
  }
  return built;
})();

/**
 * Pure CSS/DOM 3D constellation: rings of chips orbiting a center node.
 * No WebGL/canvas. Reduced-motion: rings stay static (global keyframe kill),
 * labels are always visible; a static badge cloud replaces it below 640px.
 */
export function OrbitingConstellation() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scene = sceneRef.current;
    const wrapper = wrapperRef.current;
    if (!scene || !wrapper) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = scene.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        scene.style.transform = `rotateY(${(nx * 7).toFixed(2)}deg) rotateX(${(-ny * 7).toFixed(2)}deg)`;
      });
    };
    const onLeave = () => {
      cancelAnimationFrame(raf);
      scene.style.transform = '';
    };

    wrapper.addEventListener('mousemove', onMove);
    wrapper.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      wrapper.removeEventListener('mousemove', onMove);
      wrapper.removeEventListener('mouseleave', onLeave);
      scene.style.transform = '';
    };
  }, []);

  return (
    <div className="relative mx-auto w-full max-w-[480px]">
      <div className="orbit-wrapper relative hidden aspect-square sm:block">
        <div ref={sceneRef} className="orbit-scene">
          <div className="orbit-plane">
            {rings.map((ring, ri) => (
              <div
                key={ri}
                className="orbit-ring"
                style={{ animationDuration: `${ring.duration}s`, animationDelay: `${ring.delay}s` }}
              >
                {ring.nodes.map((node) => (
                  <div
                    key={node.label}
                    className="orbit-node"
                    style={{ transform: `translate(-50%, -50%) rotate(${node.angle}rad) translateX(${node.radius}px)` }}
                  >
                    <span className="orbit-chip" style={{ '--r': `${-node.angle}rad` } as CSSProperties} title={node.label}>
                      {node.label}
                    </span>
                  </div>
                ))}
              </div>
            ))}
            <span className="orbit-center" title="Shaurya Sanyal">
              SHAURYA
            </span>
          </div>
        </div>
      </div>

      <div aria-hidden="true" className="relative z-10 mt-10 flex flex-wrap justify-center gap-2 sm:hidden">
        {labels.map((label) => (
          <span
            key={label}
            className="rounded-full border border-border bg-surface/80 px-3 py-1 text-[0.65rem] uppercase tracking-[0.15em] text-muted"
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}