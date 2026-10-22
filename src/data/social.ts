export interface SocialLink {
  label: string;
  url: string;
  platform: string;
  username: string;
  description: string;
}

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    url: "https://github.com/SHAURYASANYAL3",
    platform: "github",
    username: "@SHAURYASANYAL3",
    description: "40+ open source repositories, systems & AI prototypes",
  },
  {
    label: "Peerlist",
    url: "https://peerlist.io/shauryasanyal",
    platform: "peerlist",
    username: "@shauryasanyal",
    description: "Verified founder and student developer profile",
  },
  {
    label: "DEV Community",
    url: "https://dev.to/shauryasanyal3",
    platform: "dev",
    username: "@shauryasanyal3",
    description: "Technical writings on cybersecurity and agent systems",
  },
  {
    label: "PyPI",
    url: "https://pypi.org/user/SHAURYASANYAL3/",
    platform: "pypi",
    username: "SHAURYASANYAL3",
    description: "Published Python packages and CLI utilities",
  },
  {
    label: "Email",
    url: "mailto:shauryasanyal.21jun@gmail.com",
    platform: "email",
    username: "shauryasanyal.21jun@gmail.com",
    description: "Primary direct communications channel",
  },
];
