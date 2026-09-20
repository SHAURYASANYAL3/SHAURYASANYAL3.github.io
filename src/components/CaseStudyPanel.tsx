import { Fragment, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowRight, Plus } from 'lucide-react';
import type { Project } from '../data/projects';

const PLACEHOLDER = '__PLACEHOLDER__';

const isPlaceholder = (value?: string) => !value || value === PLACEHOLDER;

interface FieldRow {
  label: string;
  value: string;
}

function GenericFields({ project }: { project: Project }) {
  const cs = project.caseStudy;
  if (!cs) return null;

  const rows: FieldRow[] = [
    { label: 'Problem', value: cs.problem ?? '' },
    { label: 'Approach', value: cs.approach ?? '' },
    { label: 'Stack', value: cs.stack ?? '' },
    { label: 'Outcomes', value: cs.outcomes ?? '' },
  ].filter((row) => !isPlaceholder(row.value));

  if (rows.length === 0) return null;

  return (
    <div className="mt-5 flex flex-col gap-4">
      {rows.map((row) => (
        <div key={row.label}>
          <p className="text-[0.7rem] uppercase tracking-[0.25em] text-muted">{row.label}</p>
          <p className="mt-1 text-small leading-relaxed text-secondary">{row.value}</p>
        </div>
      ))}
    </div>
  );
}

interface CaseStudyPanelProps {
  project: Project;
  className?: string;
}

/**
 * Expandable case-study panel, rendered per featured project that has a
 * caseStudy object. Layout is driven entirely by data shape: capabilities
 * render as a signal list, pipeline (+horizons) as a connected flow.
 * Placeholder fields are skipped. Renders nothing when there is no real content.
 */
export function CaseStudyPanel({ project, className = '' }: CaseStudyPanelProps) {
  const [open, setOpen] = useState(false);
  const cs = project.caseStudy;
  const id = `case-${project.id}`;

  if (!cs) return null;

  const hasContent =
    (cs.pipeline?.length ?? 0) > 0 ||
    (cs.horizons?.length ?? 0) > 0 ||
    (cs.capabilities?.length ?? 0) > 0 ||
    [cs.problem, cs.approach, cs.stack, cs.outcomes].some((value) => !isPlaceholder(value));

  if (!hasContent) return null;

  return (
    <div className={`overflow-hidden rounded-card border border-border bg-surface shadow-card ${className}`}>
      <button
        type="button"
        id={`${id}-trigger`}
        aria-expanded={open}
        aria-controls={open ? `${id}-panel` : undefined}
        onClick={() => setOpen((value) => !value)}
        className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-surface-2"
      >
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          <span className="text-[0.7rem] uppercase tracking-[0.25em] text-muted">Case study</span>
          <span className="text-subheading font-semibold uppercase leading-none text-secondary">
            {project.title}
          </span>
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-accent"
        >
          <Plus className="h-5 w-5" aria-hidden="true" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={`${id}-panel`}
            role="region"
            aria-labelledby={`${id}-trigger`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-border px-6 pb-6 pt-5">
              {cs.capabilities && cs.capabilities.length > 0 && (
                <ul className="grid gap-2 sm:grid-cols-2">
                  {cs.capabilities.map((capability) => (
                    <li
                      key={capability}
                      className="flex items-center gap-2.5 rounded-lg border border-border bg-surface-2 px-4 py-2.5 text-small text-secondary"
                    >
                      <span aria-hidden="true" className="h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {capability}
                    </li>
                  ))}
                </ul>
              )}

              {cs.pipeline && cs.pipeline.length > 0 && (
                <div>
                  <p className="text-[0.7rem] uppercase tracking-[0.25em] text-muted">Pipeline</p>
                  <div className="mt-3 flex items-stretch gap-2 overflow-x-auto pb-2">
                    {cs.pipeline.map((step, i) => (
                      <Fragment key={`${step.label}-${i}`}>
                        {i > 0 && (
                          <ArrowRight aria-hidden="true" className="h-4 w-4 shrink-0 self-center text-accent/60" />
                        )}
                        <div className="flex min-w-[9rem] flex-col gap-1 rounded-lg border border-border bg-surface-2 px-4 py-3">
                          <span className="text-[0.6rem] uppercase tracking-[0.2em] text-muted">
                            Step {String(i + 1).padStart(2, '0')}
                          </span>
                          <span className="text-xs font-semibold uppercase tracking-wide text-secondary">
                            {step.label}
                          </span>
                          {step.detail && (
                            <span className="text-[0.7rem] leading-snug text-muted">{step.detail}</span>
                          )}
                        </div>
                      </Fragment>
                    ))}
                  </div>
                </div>
              )}

              {cs.horizons && cs.horizons.length > 0 && (
                <div className="mt-4 flex flex-wrap items-center gap-2">
                  <span className="text-[0.7rem] uppercase tracking-[0.25em] text-muted">
                    Forecast horizons
                  </span>
                  {cs.horizons.map((horizon) => (
                    <span
                      key={horizon}
                      className="rounded-full border border-accent/40 px-3 py-1 text-xs font-medium text-accent"
                    >
                      {horizon}
                    </span>
                  ))}
                </div>
              )}

              <GenericFields project={project} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}