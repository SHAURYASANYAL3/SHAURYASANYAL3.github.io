import { useState } from 'react';
import type { Project } from '../data/projects';

const PLACEHOLDER = '__PLACEHOLDER__';

/**
 * Restrained accent-gradient blocks keyed by project.accent. Colors come only
 * from tokens (color-mix over --color-accent / --color-surface-*) so the
 * treatment stays subtle by construction.
 */
const ACCENT_GRADIENTS: Record<string, string> = {
  cyan:
    'linear-gradient(135deg, color-mix(in srgb, var(--color-accent) 18%, var(--color-surface-2)) 0%, var(--color-surface) 100%)',
  teal:
    'linear-gradient(135deg, color-mix(in srgb, var(--color-accent-dim) 14%, var(--color-surface-2)) 0%, var(--color-surface) 100%)',
};

const DEFAULT_GRADIENT =
  'linear-gradient(135deg, var(--color-surface-2) 0%, var(--color-surface) 100%)';

const accentGradient = (accent: string) => ACCENT_GRADIENTS[accent] ?? DEFAULT_GRADIENT;

const monogram = (title: string) =>
  title
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? '')
    .join('') || '·';

interface ProjectVisualProps {
  project: Project;
  /** Aspect ratio class for the image-less box, overridable per card. */
  ratio?: string;
  className?: string;
}

/**
 * Card header visual. Renders real screenshot when images[].0 is supplied;
 * otherwise a restrained accent gradient + monogram (no invented visuals).
 * Image failures fall back to the same CSS block.
 */
export function ProjectVisual({ project, ratio = 'aspect-[16/10]', className = '' }: ProjectVisualProps) {
  const [failed, setFailed] = useState(false);
  const src = project.images?.[0];
  const showImage = Boolean(src) && src !== PLACEHOLDER && !failed;

  return (
    <div
      className={`${ratio} relative shrink-0 overflow-hidden ${className}`}
      style={showImage ? undefined : { background: accentGradient(project.accent) }}
    >
      {showImage ? (
        <img
          src={src}
          alt={`${project.title} preview`}
          loading="lazy"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(circle at 28% 22%, color-mix(in srgb, var(--color-accent) 14%, transparent), transparent 65%)',
            }}
          />
          <span
            aria-hidden="true"
            className="pointer-events-none select-none font-black uppercase leading-none tracking-tight text-primary/10 text-[clamp(2.5rem,5vw,4.5rem)]"
          >
            {monogram(project.title)}
          </span>
        </div>
      )}
    </div>
  );
}