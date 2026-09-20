/**
 * Skip link: off-screen until focused, first tab stop, jumps keyboard
 * users past the fixed nav straight to the main landmark.
 */
export function SkipLink() {
  return (
    <a
      href="#main"
      className="fixed left-4 top-4 z-[200] -translate-y-24 rounded-full bg-accent px-5 py-2 text-sm font-semibold uppercase tracking-widest text-bg focus:translate-y-0"
    >
      Skip to content
    </a>
  );
}