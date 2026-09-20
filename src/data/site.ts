export interface NavLink {
  id: string;
  label: string;
}

export interface SiteConfig {
  nav: NavLink[];
  siteName: string;
  siteUrl: string;
  copyrightName: string;
}

export const site = {
  // Nav ids are the real section ids. skills/lab/journey/contact are created by Tasks 4-5.
  nav: [
    { id: "hero", label: "HOME" },
    { id: "projects", label: "WORK" },
    { id: "about", label: "ABOUT" },
    { id: "skills", label: "SKILLS" },
    { id: "lab", label: "LAB" },
    { id: "journey", label: "JOURNEY" },
    { id: "contact", label: "CONTACT" },
  ],
  siteName: "Shaurya Sanyal",
  siteUrl: "https://fool-portfolio.vercel.app",
  copyrightName: "Shaurya Sanyal",
} as const satisfies SiteConfig;