# Shaurya Sanyal — Portfolio Architecture

> Repository audit and implementation plan for transforming `D:\fool-portfolio` into a premium single-page personal portfolio for Shaurya Sanyal.
> This document only describes the plan. No source code was changed to produce it.

## 0. Executive summary

The repository is a **Vite + React starter template with light customization**, not the "motion-studio" codebase the original brief assumed. There is no Three.js, no PixiJS, no routing, no canvas/export system, no preset registry, and no "Motion Studio Open" animation infrastructure anywhere in the codebase. That infrastructure **will not be rebuilt** — the portfolio does not need WebGL to be premium, and a pure CSS/DOM approach is cheaper to build, cheaper to maintain, and faster to ship.

The plan below audits what exists, keeps the genuine signals (E-VARA, KNOWANDGROWV1, AgentWatch, "developer from Visakhapatnam", TypeScript/Python/C++), deletes or refactors the Jack-era artifacts, centralizes all content into a typed `src/data/` layer, and rebuilds the UI around React + framer-motion + Tailwind CSS v4.

---

## A. Current architecture

### A.1 Dependencies (`package.json`)

| Package | Role | Notes |
|---|---|---|
| `react` / `react-dom` 19.2 | UI runtime | `StrictMode` enabled in `src/main.tsx` |
| `typescript` ~6.0 | Type-checking | `tsc -b` runs as part of `build` |
| `vite` 8 | Bundler/dev server | |
| `tailwindcss` 4 + `@tailwindcss/vite` | Styling | CSS-first config via `src/index.css`, no `tailwind.config` |
| `framer-motion` 12.40 | Animation | Currently used by reusable components |
| `lucide-react` | Icons | Used by buttons/nav |

`package.json` `"name"` is `"temp"` — a leftover that should be renamed (e.g. `shaurya-sanyal-portfolio`).

Scripts: `dev`, `build` (`tsc -b && vite build`), `lint` (`eslint .`), `preview`. **No test runner is configured** — acceptable for a static portfolio, but the build-size gate in §I needs `vite build` output parsing.

### A.2 Entry points

- `index.html` — only real entry. Loads **Kanit** from Google Fonts (all 10 weights — heavy, §I), then `/src/main.tsx`.
- `src/main.tsx` — imports only `./index.css`, mounts `<App/>` in `StrictMode`.
- `src/App.tsx` — renders five sections in order: `HeroSection`, `MarqueeSection`, `AboutSection`, `ServicesSection`, `ProjectsSection`.

### A.3 Section composition (`src/sections/`)

| File | Content today | Verdict |
|---|---|---|
| `HeroSection.tsx` | Nav row, hero copy, external portrait | **Refactor** — see A.5 |
| `MarqueeSection.tsx` | 21 hot-linked motionsites.ai GIFs | **Refactor/Replace** — see §E |
| `AboutSection.tsx` | Copy + 4 decorative external 3D images | **Refactor** |
| `ServicesSection.tsx` | 3D modeling/rendering/motion/branding services | **Refactor** — wrong domain, see §E |
| `ProjectsSection.tsx` | E-VARA, KNOWANDGROWV1, AgentWatch listings | **Keep & extend** — the real signal |

### A.4 Reusable components (`src/components/`)

| Component | Purpose | Verdict |
|---|---|---|
| `FadeIn` | Scroll/reveal fade wrapper | **Reuse** |
| `AnimatedText` | Staggered text reveal | **Reuse** |
| `Magnet` | Cursor-magnet hover wrapper | **Reuse, gated** (§J) |
| `LiveProjectButton` | Outbound "Live Project" pill link | **Reuse, relabeled** |
| `ContactButton` | Decorative neon-gradient button with no action | **Refactor** — currently does nothing |

### A.5 Dead code and stale artifacts

- **`src/App.css` is dead code.** `src/main.tsx` imports only `./index.css`. `App.css` is a Vite template leftover and should be deleted.
- **`src/assets/vite.svg` / `src/assets/react.svg`** — Vite template leftovers; `react.svg` is unused, `vite.svg` may be referenced only by the dead favicon link.
- **Broken nav link.** `HeroSection.tsx` nav contains `href="#price"` — no `#price` section exists. The anchor goes nowhere.
- **Favicon 404.** `index.html` points at `/vite.svg`, which does not exist. `public/` contains `favicon.svg` and `icons.svg`. Point the icon link at `/favicon.svg`.
- **Jack artifacts.** `HeroSection` portrait is an external `figma.site` render with `alt="Jack - 3D Creator"`. `AboutSection` hot-links 4 decorative `figma.site` 3D images. `MarqueeSection` hot-links 21 external `motionsites.ai` GIFs — a reliability, performance, and trust risk.
- **Missing metadata.** No `meta description`, no Open Graph tags, no Twitter card tags, no `theme-color`.
- **`tsconfig.app.json` does not enable `strict`.** `noUnusedLocals`/`noUnusedParameters` are on, but strict null checks / implicit-any checks are off. A portfolio is small enough to fix this early: `"strict": true`.
- **Git history**: the repo was previously a "Jack — 3D Creator" portfolio; the latest commit renamed it to Shaurya Sanyal. The content layer never caught up.

### A.6 Signals to preserve

- `ProjectsSection.tsx`: E-VARA (`https://e-vara.vercel.app`), KNOWANDGROWV1, AgentWatch (`https://github.com/SHAURYASANYAL3/AgentWatch`).
- `AboutSection.tsx`: "I'm a developer from Visakhapatnam… using TypeScript, Python, and C++."

---

## B. Proposed architecture

### B.1 Shape

A **single-page** portfolio: one `App.tsx` composing ordered sections, no router (non-goal). Rendering is React + framer-motion + Tailwind v4. All content flows from a centralized, typed data layer. Components fall into three buckets — reuse (§C), create (§D), refactor (§E).

```
src/
  main.tsx                    # entry, MotionConfig reducedMotion="user"
  index.css                   # Tailwind v4 theme tokens, clamp() typography
  App.tsx                     # section composition + SkipLink + FloatingNav + Footer
  data/
    profile.ts                # name, title, bio, location, photo/monogram, meta
    social.ts                 # GitHub, LinkedIn, email, X, etc.
    projects.ts               # projects + experiments (kind, status, verified)
    skills.ts                 # skill clusters + capability graph edges
    experience.ts             # timeline entries (verified)
    achievements.ts           # honors/awards (verified)
    site.ts                   # nav links, section order, theme, copy strings
  components/
    primitives/               # FadeIn, AnimatedText, Magnet, LiveProjectButton…
    sections/                 # Hero, Marquee, About, Projects, Skills, Journey…
  utils/                      # asset/URL safety helpers (verified-filter, placeholder guard)
```

### B.2 "Motion Studio Open" — explicit stance

The user's brief assumed a "Motion Studio Open" rendering infrastructure (3D, canvas/export, preset registry). **It does not exist in this repository and will not be rebuilt.** Rebuilding it would be a multi-week WebGL project that competes with the portfolio's actual job: presenting Shaurya Sanyal's work. The hero orbit/constellation and any decorative motion use a **pure CSS/DOM approach (an `OrbitingConstellation` component) — deliberately no WebGL.** Outcomes: no gl/framebuffer code, no texture/bundle weight, no GPGPU shaders, and no canvas to make inaccessible.

### B.3 Non-goals (explicit)

- **No router** — single page, anchor-based navigation (`#projects`, `#about`, …) with one mounted route.
- **No WebGL / Three.js / PixiJS** — no runtime 3D anywhere.
- **No analytics** — no tracking scripts; performance is measured by build size and Lighthouse, not pageview spies.
- **No CMS/backend** — content lives in typed TS data files; edits are code reviews, which is appropriate at this scale.
- **No test framework** — build gate is `tsc -b` strict + `eslint .` + bundle-size check.

---

## C. Components to reuse

All four live in `src/components/` today and are generic enough to keep.

| Component | Change | Why it's safe |
|---|---|---|
| `FadeIn` | None | Works with any reveal style; drive it from MotionConfig. |
| `AnimatedText` | None | Staggered char/word reveal; reusable in hero and headings. |
| `Magnet` | **Gate on pointer type** | Keep component, disable via `matchMedia('(pointer: coarse)')` and reduced-motion, §J. |
| `LiveProjectButton` | **Relabel to accept `label` prop** | Current hardcodes "Live Project"; ProjectCard needs variant labels ("Live", "Source", "Case Study"). Default stays "Live Project". §F's `status` field drives it. |

`ContactButton` is **not** in the reuse list — it is decorative today and becomes config-driven in §E.

---

## D. Components to create

All under `src/components/`. Rough responsibility, not final APIs.

| Component | Description | Notes |
|---|---|---|
| `ProjectCard` | Card for a `Project` — title, category, short description, tech chips, actions (Live/Source/Case Study via `status`+`kind`), accent, `featured` layout variant. | Consumes `projects.ts`; links built from `github`/`live`, rendered verbatim only if `verified`. |
| `OrbitingConstellation` | Hero decoration: CSS/DOM nodes orbiting on concentric rings driven by CSS keyframes, JS only to vary each node's `--orbit-duration`/`--orbit-delay`/radius. **No canvas, no WebGL.** | Hidden below 640px and under `prefers-reduced-motion` (§G, §H). |
| `FloatingNav` | Fixed top navigation with backdrop blur; active-section highlight via scroll observer (one `IntersectionObserver`, ~20 lines). | Anchors come from `site.ts`; SSR-safe as it's client-only. |
| `LoadingExperience` | Short branded boot overlay (logo/name reveal, 600–800ms, then exit animation). | All purely decorative; respect reduced-motion by skipping it entirely. |
| `SkillClusterCard` | A group of related skills with proficiency bars/tags. Replaces the wrong-domain `ServicesSection` content. | Reads `skills.ts` clusters. |
| `CapabilityGraph` | Static SVG node-graph of capabilities/skill clusters; nodes positioned by data (radius + angle), edges from `skills.ts`. DOM text labels, decorative. | Pure SVG — accessible as an image with a textual fallback, §J. |
| `TimelineEntry` | Vertical timeline row for experience/education events from `experience.ts`. | `verified` filter applies. |
| `ExperimentCard` | Compact variant for `kind: "experiment"` (lab/misc projects) — smaller, secondary listing. | Distinguishes "work I own" from "things I tried". |
| `CaseStudyPanel` | Deep-dive block for `caseStudy` projects: long description, stack, role, outcome, screenshots. | Optional per-project; opened in-page (no router — anchor/accordion), §B.3. |
| `ImageWithFallback` | `<img loading="lazy" decoding="async">` wrapper with `onError` monogram fallback and intrinsic `aspect-ratio` box. | Every image path goes through this; kills layout shift and the figma.site dependency. |
| `SkipLink` | "Skip to content" link, first focusable element. | A11y requirement, §J. |
| `Footer` | Contact/CTA footer: email + social icon links from `social.ts`, colophon. | Icon links get `aria-label`s. |

---

## E. Components to refactor

| Target | What to change | Why |
|---|---|---|
| `HeroSection` | Replace nav with `FloatingNav`; drop the external figma.site portrait for a verified local portrait or monogram; fix `alt` (no more "Jack"); remove `#price` anchor; add the `OrbitingConstellation` backdrop; hero copy pulled from `profile.ts`. | Today: wrong identity, broken link, remote asset. |
| `MarqueeSection` | **Replace hot-linked external GIFs.** Two options: (a) a text/icon-based marquee of skills/tools (zero assets), or (b) a small set of self-hosted optimized captures. Default plan: (a) text marquee from `skills.ts`, revisit (b) only if visual proof needed. | 21 remote GIFs = unbounded bundle risk, third-party tracking surface, and slow paint. |
| `ServicesSection` | Repurpose into **skills section**: three `SkillClusterCard`s plus a `CapabilityGraph` for how clusters relate. Delete "3D Modeling / Rendering / Motion / Branding" copy. | Wrong domain — Shaurya is a software developer, not a 3D services vendor. |
| `ContactButton` | Rebuild as a real action: config-driven — either `mailto:` from `profile.ts` or link to a preferred social profile from `social.ts`. Remove the decorative gradient. | A premium site's primary CTA must do something. |
| `App.tsx` | New composition: `SkipLink`, `FloatingNav`, `Hero`, `Marquee`(if kept), `Projects`, `CaseStudy`/`About`, `Skills`, `Journey`(timeline), `Achievements`, `Contact/Footer`. Wrap in `<MotionConfig reducedMotion="user">` (§G). Delete `App.css` import habit — `App.css` file itself is removed. | Wiring follows the data-driven section order in `site.ts`. |
| `index.html` | Favicon → `/favicon.svg`; add meta description, OG/Twitter tags, `theme-color`; reduce Kanit to the weights actually used (2–3, not 10). | See A.5, I. |

---

## F. Data model

All content types live in `src/data/`. Every value that renders as a link or identity string comes from data — **no hardcoded URLs or names inside components.** Placeholders are written as literal `__PLACEHOLDER__` strings; a small `guardVerified()` util filters any entry whose `verified: true` is required at render time.

```ts
// src/data/types.ts — sketch, not final

interface Profile {
  name: string;                       // "Shaurya Sanyal"
  title: string;                      // headline
  bio: string;                        // "developer from Visakhapatnam…"
  location: string;                   // "Visakhapatnam, India"
  photo?: string;                     // verified asset or monogram — see open questions
  monogram: string;                   // "SS"
  email: string;                      // __PLACEHOLDER__ until confirmed
  contactHref: string;                // mailto: or social URL — decided, not assumed
  metaDescription: string;            // feeds index.html meta/OG
}

interface SocialLink {
  id: string;                         // "github" | "linkedin" | "x" | "email" | …
  label: string;                      // visible text
  href: string;                       // __PLACEHOLDER__ unless confirmed
  icon: string;                       // lucide icon key
  verified: boolean;
}

type ProjectKind = "project" | "experiment";
type ProjectStatus = "live" | "source" | "placeholder";

interface Project {
  id: string;                         // "e-vara"
  title: string;
  category: string;                   // "Web App" | "Tool" | …
  shortDescription: string;
  longDescription?: string;           // for CaseStudyPanel
  technologies: string[];
  status: ProjectStatus;              // "placeholder" = not yet launched, hidden by default?
  year?: number;
  github?: string;                    // __PLACEHOLDER__ if unconfirmed
  live?: string;
  accent: string;                     // color token per-card
  featured: boolean;
  caseStudy?: boolean;                // renders CaseStudyPanel
  kind: ProjectKind;
  verified: boolean;                  // render-time filter on true only
}

interface SkillCluster {
  id: string;
  name: string;                       // "Languages", "Frontend", "Tools & Platforms"
  skills: Array<{ name: string; level?: 1 | 2 | 3 | 4 | 5 }>;
  graphPosition?: { radius: number; angle: number }; // for CapabilityGraph
}

interface ExperienceEntry {
  id: string;
  role: string;
  organization: string;
  location?: string;
  start: string;                      // ISO "YYYY-MM"
  end?: string;                       // "present"
  summary: string;
  highlights: string[];
  verified: boolean;
}

interface AchievementEntry {
  id: string;
  title: string;
  issuer?: string;
  year?: number;
  description: string;
  verified: boolean;                  // no fabricated trophies
}
```

**Rendering rules:**
- Identity/social collection renders only `verified === true` entries.
- `Project.status === "placeholder"` items render only inside a clearly labeled "in progress" band (or are omitted) — never presented as shipped.
- Any `href` that is still `__PLACEHOLDER__` does not render as a link; it renders disabled text. This prevents shipping dead links.

---

## G. Animation architecture

- **Root:** `<MotionConfig reducedMotion="user">` in `App.tsx` — framer-motion respects system reduced-motion for free.
- **Scroll-linked motion** is used only where it explains hierarchy: section reveals (`FadeIn`), timeline emphasis, card stagger. Not for decoration.
- **CSS transitions** handle the rest — hovers, color/theme shifts, marquee loop. Cheap and composable.
- **Motion budgets** (duration, not distance of travel):

| Budget | Range | Used for |
|---|---|---|
| Micro | 100–250ms | hover states, icon swaps, focus rings |
| UI | 250–500ms | nav underline, accordions, card actions |
| Section | 500–1000ms | section reveals, hero intro sequence |
| Cinematic | 1000ms+ | reserved: the `LoadingExperience` boot in, nothing else |

- **No random animation.** No `Math.random()` durations/positions — variation comes from deterministic data (radius, angle, stagger index), so renders are stable and reduced-motion fallbacks are simple.
- `OrbitingConstellation` uses CSS keyframes with per-node `--orbit-duration` set once from data; under `prefers-reduced-motion` it renders as a static arrangement.

---

## H. Responsive strategy

- **Mobile-first.** Sections and cards are styled for a 360px viewport, then widened.
- **Breakpoints** (Tailwind v4 defaults where they match): `360 / 640 / 768 / 1024 / 1440 / 1920`.
- **Typography:** `clamp()` for headings (`font-size: clamp(2rem, 1.2rem + 4vw, 4rem)` etc.) via a small set of utility classes in `index.css` — no per-component magic numbers.
- **Hero constellation:** hidden below 640px (`hidden sm:block`) — it's decoration; on phones it costs scroll space and battery for nothing. Optionally a one-ring static version.
- **Touch/coarse pointers:** `Magnet` is disabled (via `matchMedia('(pointer: coarse)')`); hover-only affordances get tap equivalents. `FloatingNav` collapses to a compact bar.
- Cards stack to one column under 768px; `Grid`/`Flex` only where content benefits.

---

## I. Performance strategy

- **No heavy 3D:** WebGL is a non-goal (§B.3), so no shader compile, no texture memory, no 60fps imperative loop.
- **External GIFs are replaced** with text-based marquee (§E) or, at most, a couple of small self-hosted optimized assets. Remove the 21 remote GIF fetches.
- **Images:** every `<img>` is `loading="lazy"` + explicit `aspect-ratio` (via `ImageWithFallback`); hero/monogram only. No layout-shift.
- **Fonts:** Kanit → keep **2–3 weights** (e.g. 300/500/700) and `display=swap`; 10 weights today are ~all of Karen's variable payload.
- **Bundle gate:** parse `vite build` output — record `dist` total size and per-chunk sizes as a gate. Target: total JS well under 150 KB gzip (React + framer-motion dominate; data files are text). Regression = PR comment, not a silent creep.
- No third-party scripts: no analytics, no widget providers, no remote raster assets at runtime.

---

## J. Accessibility strategy

- **Semantic landmarks:** `header`/`nav`/`main`/`section`/`footer`; one `h1` (hero), `h2` per section.
- **Skip link:** `SkipLink` is the first focusable element; jumps to `#main`.
- **Focus visible:** consistent `focus-visible` outline (Tailwind theme token); never removed.
- **Icon links** (social, GitHub, live): `aria-label` always present.
- **Contrast:** body text/dark background ≥ 4.5:1 (WCAG AA) — current palette `#0C0C0C` / `#D7E2EA` passes; verify accents.
- **Keyboard operable:** every interactive element is a real `<a>`/`<button>`; no click-only divs; case study panels reachable and closable by keyboard.
- **Reduced motion:** `MotionConfig reducedMotion="user"` + CSS `@media (prefers-reduced-motion: reduce)` zeroes animation classes on marquee/constellation; `LoadingExperience` renders nothing.
- **Canvas/WebGL is never the only information channel** — and since we ship no canvas at all (§B.3), the risk is zero by construction. `CapabilityGraph` is SVG with a textual `<title>` + a real adjacent list of the same skills.

---

## K. Deployment strategy

- **Build:** static output from `npm run build` (`tsc -b && vite build`) → `dist/`.
- **Host:** recommend **Vercel or Netlify**, both zero-config for Vite (framework preset auto-detects `vite build`, serves `dist`). A `vercel.json`/`netlify.toml` is unnecessary at this scale; if added later it only sets headers/caching.
- **Domain: an open question.** No domain is assumed; the profile must work on the preview URL until a custom domain is chosen. If a custom domain is later added: DNS record + one setting on either platform, no code change.
- **Caching:** static assets hash-named by Vite → long-cache immutable; `index.html` never cached long (default on both platforms).
- **CI:** optional; a simple GitHub Action (`pnpm`/`npm ci` → `build` → `lint`) is enough. Not required for the first deploy.

---

## Open questions / user decisions needed

1. **GitHub handle** — confirm the canonical handle is `SHAURYASANYAL3` (AgentWatch currently links there).
2. **Social/contact URLs** — LinkedIn, X, email: all unconfirmed. Until provided, `social.ts` entries stay `__PLACEHOLDER__` and render disabled, not imagined links.
3. **Real photo vs monogram** — hero identity: verified local portrait or "SS" monogram (default until a real photo is provided).
4. **Project facts** — for each of AegisMail, ORION, E-VARA, Space Weather, Living Internet, LithoMesh: which are real & launched, which are source-only, which are experiments, which should exist at all? (`verified`/`status`/`kind` fields depend on this.)
5. **Achievements & timeline** — verified achievements and experience entries (dates, issuers). Nothing is fabricated; entries default to unverified.
6. **Contact email** — primary contact target (`mailto:` vs GitHub), feeds `profile.ts`.
7. **Font** — keep Kanit (already loaded, distinctive) or swap to a variable font; must confirm before build since it changes the font link.
8. **Deployment target** — Vercel or Netlify (or both?); custom domain yes/no.

---

## Implementation roadmap (adapted from the user's PHASE 0–16 to this repo's reality)

| Phase | Work | Notes |
|---|---|---|
| 0 | Audit review & decisions | Resolve the Open Questions above before Phases 2+ (data layer depends on them) |
| 1 | Foundation | Rename `package.json`; delete `src/App.css`, unused `src/assets/react.svg`; enable `"strict": true` in `tsconfig.app.json`; fix `index.html` favicon + meta + font weights |
| 2 | Data layer | Create `src/data/` types + all six files; wire `guardVerified()`; profile/social login |
| 3 | Shell | `MotionConfig`, `SkipLink`, `FloatingNav`, `LoadingExperience`, `Footer` |
| 4 | Hero | Refactor `HeroSection`: monogram/portrait, `OrbitingConstellation`, copy from `profile.ts`, remove `#price` |
| 5 | Project system | `ProjectCard`, `ExperimentCard`, `CaseStudyPanel`, `ProjectsSection` rewrite against `projects.ts` |
| 6 | Lab (kind: experiment) | Secondary listing for experiments; placeholder-status handling |
| 7 | About | Refactor `AboutSection` — local content, drop figma.site images |
| 8 | Skills | `SkillClusterCard` + `CapabilityGraph`; delete 3D-services content from `ServicesSection` |
| 9 | Journey | `TimelineEntry` against `experience.ts` (verified only) |
| 10 | Achievements | Verified achievements section |
| 11 | Contact | Refactor `ContactButton` → config-driven mailto/social; contact footer |
| 12 | Marquee | Replace GIF marquee with text/skills marquee; delete remote GIF list |
| 13 | A11y pass | Landmark audit, keyboard walk-through, contrast check, reduced-motion verification |
| 14 | SEO pass | Meta/OG/Twitter tags finalized, semantic headings |
| 15 | Fallback/perf pass | `ImageWithFallback` everywhere, aspect-ratio boxes, remove dead code, bundle-size gate recorded |
| 16 | Build verification | `npm run build` (strict tsc) + `npm run lint` clean; deploy to Vercel/Netlify |

Overlaps are intentional — the plan is ordered by dependency, not playbook ceremony.