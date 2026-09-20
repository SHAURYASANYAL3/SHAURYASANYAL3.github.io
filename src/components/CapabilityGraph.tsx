import { useState } from 'react';
import { motion } from 'framer-motion';

const DOMAINS = ['SECURITY', 'AI', 'WEB', 'CLOUD', 'SYSTEMS', 'RESEARCH'];

const CX = 150;
const CY = 150;
const R = 90;

const positions = DOMAINS.map((_, i) => {
  const angle = (i / DOMAINS.length) * Math.PI * 2 - Math.PI / 2;
  return { x: CX + R * Math.cos(angle), y: CY + R * Math.sin(angle) };
});

/**
 * Static SVG capability constellation: central identity node connected to six
 * domain nodes. Edges pulse in as the section enters the viewport; hovering a
 * domain highlights its edge and node. Contains the same information as the
 * visible domain chips beside it (and, for screen readers, instead of it).
 */
export function CapabilityGraph() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <div>
      <div aria-hidden="true" className="mx-auto w-full max-w-[340px]">
        <svg viewBox="0 0 300 300" className="w-full">
          {positions.map((pos, i) => (
            <motion.g
              key={DOMAINS[i]}
              onMouseEnter={() => setActive(i)}
              onMouseLeave={() => setActive(null)}
            >
              <motion.line
                x1={CX}
                y1={CY}
                x2={pos.x}
                y2={pos.y}
                stroke="var(--color-accent)"
                strokeWidth={0.75}
                initial={{ strokeOpacity: 0.08 }}
                whileInView={{ strokeOpacity: active === i ? 1 : 0.55 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 1.1, delay: 0.35 + i * 0.12, ease: 'easeOut' }}
              />
              <circle
                cx={pos.x}
                cy={pos.y}
                r={4}
                fill={active === i ? 'var(--color-accent)' : 'var(--color-border)'}
              />
              <text
                x={pos.x}
                y={pos.y + 16}
                textAnchor="middle"
                fontSize={10}
                letterSpacing="0.12em"
                fill={active === i ? 'var(--color-accent)' : 'var(--color-muted)'}
              >
                {DOMAINS[i]}
              </text>
            </motion.g>
          ))}
          <motion.g
            initial={{ opacity: 0, scale: 0.85 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ transformOrigin: `${CX}px ${CY}px` }}
          >
            <circle
              cx={CX}
              cy={CY}
              r={36}
              fill="var(--color-surface)"
              stroke="var(--color-border)"
              strokeWidth={1}
            />
            <text
              x={CX}
              y={CY + 4}
              textAnchor="middle"
              fontSize={12}
              fontWeight={700}
              letterSpacing="0.1em"
              fill="var(--color-accent)"
            >
              SHAURYA
            </text>
          </motion.g>
        </svg>
      </div>
      <ul className="mt-4 flex flex-wrap justify-center gap-2">
        {DOMAINS.map((domain) => (
          <li
            key={domain}
            className="rounded-full border border-border px-3 py-1 text-[0.6rem] uppercase tracking-[0.2em] text-muted"
          >
            {domain}
          </li>
        ))}
      </ul>
    </div>
  );
}