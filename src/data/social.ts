export interface SocialLink {
  label: string;
  url: string;
  platform: string;
}

/**
 * Only links whose `url` is not "__PLACEHOLDER__" should be rendered.
 */
export const socials: SocialLink[] = [
  { label: "GitHub", url: "https://github.com/SHAURYASANYAL3", platform: "github" },
  { label: "DEV Community", url: "https://dev.to/shauryasanyal3", platform: "dev" },
  { label: "Peerlist", url: "https://peerlist.io/shauryasanyal", platform: "peerlist" },
  { label: "PyPI", url: "https://pypi.org/user/SHAURYASANYAL3/", platform: "pypi" },
  { label: "SpigotMC", url: "__PLACEHOLDER__", platform: "spigotmc" },
  { label: "LinkedIn", url: "__PLACEHOLDER__", platform: "linkedin" },
  { label: "Portfolio", url: "https://fool-portfolio.vercel.app", platform: "web" },
];