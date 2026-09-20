import { useEffect, useState } from 'react';
import { ChevronUp } from 'lucide-react';
import { site } from '../data/site';

const HIDDEN_ON_MOBILE = new Set(['lab', 'journey']);

/**
 * Fixed floating nav: desktop pill (full nav) + mobile bottom bar (5 items
 * + More sheet). Scrollspy via IntersectionObserver sets aria-current on
 * the section in view. Anchors rely on CSS scroll-behavior + scroll-margin-top.
 */
export function FloatingNav() {
  const [active, setActive] = useState('hero');
  const [moreOpen, setMoreOpen] = useState(false);

  useEffect(() => {
    const ids = site.nav.map((n) => n.id).filter((id) => document.getElementById(id));
    if (ids.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: '-35% 0px -55% 0px', threshold: 0 },
    );
    for (const id of ids) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }
    return () => observer.disconnect();
  }, []);

  const linkClass = (id: string) =>
    `rounded-full px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.2em] transition-colors ${
      active === id ? 'text-accent' : 'text-muted hover:text-primary'
    }`;

  const mobileItems = site.nav.filter((n) => !HIDDEN_ON_MOBILE.has(n.id));
  const moreItems = site.nav.filter((n) => HIDDEN_ON_MOBILE.has(n.id));

  return (
    <header>
      <nav
        aria-label="Primary"
        className="fixed left-1/2 top-5 z-50 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-border bg-surface/70 px-3 py-2 backdrop-blur-md md:flex"
      >
        {site.nav.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={linkClass(item.id)}
            aria-current={active === item.id ? 'true' : undefined}
          >
            {item.label}
          </a>
        ))}
      </nav>

      <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 md:hidden">
        <div className="relative">
          {moreOpen && (
            <div
              id="nav-more-sheet"
              className="absolute bottom-full right-0 mb-2 flex flex-col gap-1 rounded-2xl border border-border bg-surface/90 p-2 backdrop-blur-md"
            >
              {moreItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => setMoreOpen(false)}
                  className={linkClass(item.id)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          )}
          <div className="flex items-center gap-1 rounded-full border border-border bg-surface/80 px-3 py-2 backdrop-blur-md">
            {mobileItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => setMoreOpen(false)}
                className={linkClass(item.id)}
                aria-current={active === item.id ? 'true' : undefined}
              >
                {item.label}
              </a>
            ))}
            <button
              type="button"
              onClick={() => setMoreOpen((v) => !v)}
              aria-expanded={moreOpen}
              aria-controls={moreOpen ? 'nav-more-sheet' : undefined}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-[0.7rem] uppercase tracking-[0.2em] text-muted transition-colors hover:text-primary ${
                moreOpen ? 'text-accent' : ''
              }`}
            >
              More
              <ChevronUp className={`h-3.5 w-3.5 transition-transform ${moreOpen ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}