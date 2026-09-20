import { ArrowUp, ArrowUpRight } from 'lucide-react';
import { FadeIn } from '../components/FadeIn';
import { profile } from '../data/profile';
import { site } from '../data/site';
import { socials } from '../data/social';

const PLACEHOLDER = '__PLACEHOLDER__';

const hasEmail = profile.email !== PLACEHOLDER && profile.email.trim() !== '';
const realSocials = socials.filter((social) => social.url !== PLACEHOLDER);

export function ContactSection() {
  return (
    <>
      <section id="contact" className="relative border-t border-border px-5 py-24 sm:px-8 sm:py-32 md:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <FadeIn y={24}>
            <h2 className="hero-heading font-black uppercase leading-[1.05] tracking-tight text-[clamp(2rem,6vw,4.5rem)]">
              Let's build something interesting.
            </h2>
          </FadeIn>

          <FadeIn delay={0.15} className="mt-8">
            {hasEmail ? (
              <a
                href={`mailto:${profile.email}`}
                className="inline-block text-subheading font-medium text-accent underline decoration-accent/40 underline-offset-8 transition-colors hover:decoration-accent"
              >
                {profile.email}
              </a>
            ) : (
              <p className="text-small uppercase tracking-[0.2em] text-muted">
                Contact details coming soon
              </p>
            )}
          </FadeIn>

          <FadeIn delay={0.25} className="mt-12">
            <ul className="flex flex-wrap items-center justify-center gap-3">
              {realSocials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-[0.7rem] font-medium uppercase tracking-[0.2em] text-muted transition-colors hover:border-accent/50 hover:text-accent"
                  >
                    {social.label}
                    <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      <footer className="border-t border-border px-5 py-10 sm:px-8 md:px-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 sm:flex-row sm:justify-between">
          <p className="text-small text-muted">
            © {new Date().getFullYear()} {site.copyrightName}
          </p>
          <nav aria-label="Footer" className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {site.nav.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="text-[0.7rem] uppercase tracking-[0.2em] text-muted transition-colors hover:text-accent"
              >
                {item.label}
              </a>
            ))}
          </nav>
          <a
            href="#hero"
            aria-label="Back to top"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent/50 hover:text-accent"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </a>
        </div>
        <p className="mt-8 text-center text-[0.65rem] uppercase tracking-[0.2em] text-muted/70">
          Built with React · Framer Motion · Tailwind
        </p>
      </footer>
    </>
  );
}