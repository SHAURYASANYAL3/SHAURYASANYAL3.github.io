import { clusters } from '../data/skills';

const items = clusters.flatMap((c) => c.items);

/**
 * Single seamless text marquee of skills. CSS keyframe loop (translateX -50%
 * over duplicated halves), pauses on hover; reduced-motion leaves it static
 * via the global keyframe kill.
 */
export function MarqueeSection() {
  return (
    <section className="marquee overflow-hidden border-y border-border bg-surface/40 py-5" aria-label="Skills">
      <div className="marquee-track">
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center" aria-hidden={half === 1}>
            {items.map((item) => (
              <span key={item} className="flex shrink-0 items-center">
                <span className="px-6 text-xs font-medium uppercase tracking-[0.3em] text-muted">{item}</span>
                <span aria-hidden="true" className="text-border">
                  ✦
                </span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
}