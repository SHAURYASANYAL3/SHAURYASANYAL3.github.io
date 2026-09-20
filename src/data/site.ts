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
  // Nav ids are provisional; Task 5 reconciles them with the final section ids.
  nav: [
    { id: "home", label: "HOME" },
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