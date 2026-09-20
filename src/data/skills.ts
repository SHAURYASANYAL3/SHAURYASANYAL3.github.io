export interface SkillCluster {
  cluster: string;
  items: string[];
}

export const clusters: SkillCluster[] = [
  {
    cluster: "Cybersecurity",
    items: ["Linux", "Networking", "Web Security", "OSINT", "Security Engineering", "Threat Analysis"],
  },
  {
    cluster: "Programming",
    items: ["Python", "C", "C++", "JavaScript", "TypeScript", "HTML", "CSS"],
  },
  {
    cluster: "Web",
    items: ["React", "Next.js", "Vite", "Tailwind", "Node.js", "Supabase"],
  },
  {
    cluster: "AI / ML",
    items: ["Machine Learning", "LLMs", "Computer Intelligence", "Model Integration", "Data Processing"],
  },
  {
    cluster: "Tools",
    items: ["Git", "Docker", "VirtualBox", "Kali Linux", "Cloud Platforms"],
  },
];