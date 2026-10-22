export interface NavItem {
  id: string;
  label: string;
}

export interface SiteConfig {
  name: string;
  domain: string;
  copyrightName: string;
  nav: NavItem[];
}

export const site: SiteConfig = {
  name: "Shaurya Sanyal",
  domain: "shauryasanyal3.github.io",
  copyrightName: "Shaurya Sanyal (Mr Fool)",
  nav: [
    { id: "nexus", label: "3D Nexus" },
    { id: "about", label: "About" },
    { id: "projects", label: "Systems" },
    { id: "skills", label: "Skills" },
    { id: "journey", label: "Journey" },
    { id: "contact", label: "Transmit" },
  ],
};

export const siteConfig = site;
