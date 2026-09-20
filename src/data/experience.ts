export type ExperienceCategory =
  | "education"
  | "project"
  | "hackathon"
  | "certification"
  | "research"
  | "experiment";

export interface ExperienceEntry {
  date: string;
  title: string;
  description: string;
  category: ExperienceCategory;
  verified: boolean;
  technologies?: string[];
}

export const experience: ExperienceEntry[] = [
  {
    date: "—",
    title: "B.Tech Computer Science — BITS Visakhapatnam",
    description:
      "Cybersecurity and AI/ML student at Baba Institute of Technology and Sciences (BITS), Visakhapatnam.",
    category: "education",
    verified: true,
    technologies: ["Cybersecurity", "AI / ML"],
  },
  {
    date: "—",
    title: "Microsoft Learn Student Ambassador",
    description:
      "Active Microsoft Learn Student Ambassador; joined and completed Microsoft Learn badges.",
    category: "education",
    verified: true,
  },
  {
    date: "—",
    title: "Founder — TrustLayer & E-VARA",
    description:
      "Founded TrustLayer (security framework) and E-VARA (identity intelligence product).",
    category: "project",
    verified: true,
  },
  {
    date: "—",
    title: "Team Auralis — ACI/OCI/ORION",
    description:
      "Contributor to Team Auralis: the ACI/OCI security framework and the ORION AI/game-intelligence architecture.",
    category: "research",
    verified: true,
  },
];