interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  className?: string;
}

/** Shared section heading: accent-dashed eyebrow + hero-gradient title. */
export function SectionHeading({ eyebrow, title, className = '' }: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="flex items-center gap-3 text-[0.7rem] font-medium uppercase tracking-[0.3em] text-muted sm:text-xs">
        <span aria-hidden="true" className="h-px w-8 bg-accent/60" />
        {eyebrow}
      </p>
      <h2 className="hero-heading mt-4 font-black uppercase leading-[1.05] tracking-tight text-[clamp(2.25rem,6vw,5rem)]">
        {title}
      </h2>
    </div>
  );
}