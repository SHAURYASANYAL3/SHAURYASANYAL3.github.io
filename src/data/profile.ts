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
  status: string;
  stats: { label: string; value: string; detail: string }[];
}

export const profile: Profile = {
  name: "Shaurya Sanyal",
  handle: "Mr Fool",
  roles: [
    "AI Agent Systems & Observability Researcher",
    "Cybersecurity Undergrad (BITS Visakhapatnam)",
    "Founder of E-VARA & TrustLayer",
    "R&D Group Specialist @ STEEGA Pvt Ltd",
    "Microsoft Learn Student Ambassador",
    "Systems & C / Linux Kernel Hacker",
  ],
  tagline:
    "Engineering autonomous agent observability, resilient security architectures, and zero-dependency systems at the edge.",
  bio: "Cybersecurity and Systems undergraduate at Baba Institute of Technology and Sciences (BITS), Visakhapatnam (2025–2029). Creator of AgentWatch (real-time reasoning chain auditor), ATLAS (privacy-preserving cross-org compute), and founder of E-VARA & TrustLayer. Combining low-level systems programming in C and Rust with high-performance LLM agent infrastructure and security intelligence.",
  location: "Visakhapatnam, India",
  education:
    "B.Tech in Cybersecurity (2025–2029) — Baba Institute of Technology and Sciences (BITS), Visakhapatnam",
  email: "shauryasanyal.21jun@gmail.com",
  avatar: null,
  status: "OPEN FOR RESEARCH / VENTURE COLLABORATION",
  stats: [
    { label: "NSOC 26 Rank", value: "Top 27", detail: "Out of 125 selected nationwide projects" },
    { label: "Public Repositories", value: "40+", detail: "Open source tooling, systems & AI models" },
    { label: "Active Roles", value: "3", detail: "RTIH AP Founder • STEEGA R&D • MLSA" },
    { label: "Specialization", value: "Dual", detail: "Cybersecurity & Agentic AI Architectures" },
  ],
};
