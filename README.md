# fool-portfolio

Personal portfolio for **Shaurya Sanyal** — Cybersecurity / AI / Full-Stack.
Built with **React 19 + Vite + Tailwind CSS v4 + Framer Motion**, and
deployed as a static site.

## Commands

```bash
npm install        # install dependencies
npm run dev        # start the dev server
npm run build      # type-check (tsc) + production build
npm run lint       # eslint
npm run preview    # preview the production build locally
```

## Content editing guide

All content lives in **`src/data/`** — edit the data, not the components:

| File | Contents |
|------|----------|
| `profile.ts` | Name, roles, bio, location, education, email |
| `projects.ts` | Project & experiment cards, case-study panels |
| `skills.ts` | Skill clusters (marquee + skills section) |
| `experience.ts` | Journey timeline entries |
| `achievements.ts` | Achievement cards |
| `social.ts` | Social links (contact section + hero GitHub button) |
| `site.ts` | Site name, URL, nav links |

### Conventions

- **`__PLACEHOLDER__`** — any string set to this value is never rendered
  (links, emails, images, case-study fields). Replace it with real data;
  placeholder-free values render as empty/hidden.
- **`verified: boolean`** — entries with `verified: false` are never
  rendered anywhere. Flip to `true` to publish an entry.
- Project cards filter out placeholder technologies; experiment tiles with no
  real content stay hidden until filled in.

## Adding a real project

1. Open `src/data/projects.ts` and add an entry to `projects`.
2. Set `verified: true`, `featured` (for the big grid), `kind: 'project'`,
   status, summary, technologies, and a real `github`/`live` URL.
3. Optional: drop screenshots in `public/` and reference them with
   `images: ['/my-project.png']`. Without images the card renders a clean
   CSS accent block instead.
4. Add a `caseStudy` object to power the expandable panel (pipeline,
   horizons, capabilities, or free-form fields).

## Deployment

Static site — `npm run build` outputs `dist/`. Deploy with zero
configuration on **Vercel** or **Netlify** (build command `npm run build`,
output `dist`). Placeholder domain: `fool-portfolio.vercel.app`.

## Honest note

Some project details are placeholders pending real data (links, screenshots,
case-study depth). The site renders everything through `__PLACEHOLDER__` /
`verified` filters, so nothing fabricated or unverified is shown — no
invented metrics.