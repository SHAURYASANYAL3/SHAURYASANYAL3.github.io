export type ExperienceCategory =
  | "founder"
  | "work"
  | "education"
  | "research"
  | "community";

export interface ExperienceEntry {
  date: string;
  role: string;
  organization: string;
  location: string;
  category: ExperienceCategory;
  description: string;
  achievements: string[];
  technologies: string[];
  current?: boolean;
}

export const experience: ExperienceEntry[] = [
  {
    date: "2026 — Present",
    role: "Research & Development Specialist",
    organization: "STEEGA Pvt Ltd",
    location: "Visakhapatnam, India",
    category: "work",
    current: true,
    description:
      "Leading technical R&D and rapid prototyping across high-impact computer systems, AI software workflows, and security architectures.",
    achievements: [
      "Engineered foundational telemetry prototypes and exploratory technical tooling.",
      "Conducted feasibility studies on agentic intelligence systems and secure edge deployment.",
    ],
    technologies: ["Python", "Systems Engineering", "R&D", "AI Architecture"],
  },
  {
    date: "2026 — Present",
    role: "Future Founder (Entrepreneurship & Innovation)",
    organization: "Ratan Tata Innovation Hub (RTIH) AP",
    location: "Andhra Pradesh, India",
    category: "founder",
    current: true,
    description:
      "Selected as Future Founder to represent BITS Visakhapatnam in building scalable, venture-backed technology startups in AI and Cybersecurity.",
    achievements: [
      "Completed intense entrepreneurship and innovation sprint curricula.",
      "Pitched and validated enterprise trust and identity security propositions.",
    ],
    technologies: ["Venture Strategy", "Product Design", "Security Economics"],
  },
  {
    date: "2025 — Present",
    role: "Founder & Lead Architect",
    organization: "E-VARA & TrustLayer",
    location: "Visakhapatnam, India",
    category: "founder",
    current: true,
    description:
      "Founded E-VARA (AI Digital Reputation Protection platform) and TrustLayer security framework. Built the end-to-end multi-modal identity validation engine.",
    achievements: [
      "Ranked 27th out of 125 selected nationwide engineering projects in NSOC 26 (National Summer of Code).",
      "Launched live MVP serving automated digital reputation audit scans at e-vara.vercel.app.",
    ],
    technologies: ["TypeScript", "React", "Next.js", "Python FastAPI", "OSINT"],
  },
  {
    date: "2025 — Present",
    role: "Microsoft Learn Student Ambassador (MLSA)",
    organization: "Microsoft",
    location: "Global / India",
    category: "community",
    current: true,
    description:
      "Empowering student communities in cloud architecture, AI solutions, and open-source contribution under Microsoft's global ambassador network.",
    achievements: [
      "Completed advanced technical learning paths across Azure, AI services, and developer tooling.",
      "Mentored peers in system programming, Linux workflows, and modern web frameworks.",
    ],
    technologies: ["Cloud Computing", "AI Services", "Technical Mentorship"],
  },
  {
    date: "2025 — 2029",
    role: "B.Tech in Cybersecurity Undergrad",
    organization: "Baba Institute of Technology and Sciences (BITS)",
    location: "Visakhapatnam, India",
    category: "education",
    current: true,
    description:
      "Comprehensive engineering degree focused on network security, cryptographic protocols, low-level systems programming, and machine learning systems.",
    achievements: [
      "Consistently developing open source tooling alongside rigorous coursework.",
      "Leading technical collaborations across university hackathons and developer teams.",
    ],
    technologies: ["C", "C++", "Linux Systems", "Cryptography", "Network Security"],
  },
];
