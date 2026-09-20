export interface Profile {
  name: string;
  handle: string;
  roles: string[];
  tagline: string;
  bio: string;
  location: string;
  education: string;
  email: string;
  avatar: string | null;
}

export const profile: Profile = {
  name: "Shaurya Sanyal",
  handle: "Mr Fool",
  roles: [
    "Cybersecurity Student",
    "AI/ML Builder",
    "Full-Stack Developer",
    "Creative Technologist",
  ],
  tagline:
    "I build systems at the intersection of cybersecurity, artificial intelligence, software engineering and experimental digital experiences.",
  bio: "Cybersecurity and AI/ML student at Baba Institute of Technology and Sciences (BITS), Visakhapatnam. I build security tooling, ML systems and experimental web/creative tech. Microsoft Learn Student Ambassador and founder of TrustLayer & E-VARA.",
  location: "Visakhapatnam, India",
  education:
    "Baba Institute of Technology and Sciences (BITS), Visakhapatnam — Computer Science",
  email: "__PLACEHOLDER__",
  avatar: null,
};