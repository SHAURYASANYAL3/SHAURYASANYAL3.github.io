export interface ProjectCaseStudy {
  problem?: string;
  approach?: string;
  stack?: string;
  outcomes?: string;
  /** Ordered flow of stages for a pipeline-style case study (e.g. GEOShield). */
  pipeline?: { label: string; detail?: string }[];
  /** Forecast/impact horizons for pipeline case studies. */
  horizons?: string[];
  /** Compact capability list for signal-style case studies (e.g. VISION-CLI). */
  capabilities?: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  kind: "project" | "experiment";
  status: "live" | "source" | "placeholder";
  summary: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  year?: string;
  github?: string;
  live?: string;
  accent: string;
  /** Optional real screenshots. Omit to render the CSS accent block instead. */
  images?: string[];
  featured: boolean;
  verified: boolean;
  caseStudy?: ProjectCaseStudy;
}

export const projects: Project[] = [
  {
    id: "geoshield",
    title: "GEOShield",
    category: "Space Weather AI",
    kind: "project",
    status: "source",
    summary:
      "Physics-aware ML pipeline for forecasting energetic electron flux at geostationary orbit using GOES, OMNI and GRASP data.",
    description:
      "Physics-aware machine-learning pipeline that forecasts energetic electron flux at geostationary orbit from GOES, OMNI and GRASP data.",
    technologies: ["Python", "Machine Learning", "GOES", "OMNI", "GRASP"],
    accent: "cyan",
    featured: true,
    verified: true,
    live: "__PLACEHOLDER__",
    github: "__PLACEHOLDER__",
    caseStudy: {
      approach:
        "GOES/OMNI/GRASP data → feature engineering → model → forecast with radiation-risk output (45 min / 6 h / 12 h horizons).",
      pipeline: [
        { label: "Data sources", detail: "GOES / OMNI / GRASP" },
        { label: "Feature engineering" },
        { label: "Model", detail: "Physics-aware ML" },
        { label: "Forecast", detail: "Energetic electron flux at geostationary orbit" },
        { label: "Radiation risk" },
      ],
      horizons: ["45 min", "6 hours", "12 hours"],
    },
  },
  {
    id: "vision-cli",
    title: "VISION-CLI",
    category: "Security Tooling",
    kind: "project",
    status: "source",
    summary:
      "Python security and threat-intelligence CLI: leak scanning, phishing analysis, breach lookup and AI-generated-media checking.",
    description:
      "Python security and threat-intelligence command-line tool covering leak scanning, phishing analysis, breach lookup and AI-generated-media checking.",
    longDescription: "Published on PyPI (maintainer: SHAURYASANYAL3).",
    technologies: ["Python", "Security", "Threat Intelligence"],
    accent: "cyan",
    featured: true,
    verified: true,
    github: "https://github.com/SHAURYASANYAL3",
    caseStudy: {
      approach: "Capability-first CLI published on PyPI (maintainer: SHAURYASANYAL3).",
      capabilities: [
        "Leak scanning",
        "Phishing analysis",
        "Breach lookup",
        "AI-generated-media checking",
      ],
    },
  },
  {
    id: "e-vara",
    title: "E-VARA",
    category: "AI Product",
    kind: "project",
    status: "live",
    summary: "Identity intelligence product; founder/creator.",
    description:
      "Identity intelligence product founded and created by Shaurya. The product is live; detailed feature copy is still being written.",
    technologies: ["TypeScript", "React", "AI"],
    accent: "teal",
    featured: true,
    verified: true,
    live: "https://e-vara.vercel.app",
  },
  {
    id: "smartsurvivalrpg",
    title: "SmartSurvivalRPG",
    category: "Game Development",
    kind: "project",
    status: "source",
    summary: "Survival-horror RPG plugin for Minecraft, published on SpigotMC.",
    description: "Survival-horror RPG plugin for Minecraft, published on SpigotMC.",
    technologies: ["Java", "Minecraft", "Plugin Development"],
    accent: "cyan",
    featured: false,
    verified: true,
    github: "https://github.com/SHAURYASANYAL3/SmartSurvivalRPG",
  },
  {
    id: "orion",
    title: "ORION",
    category: "AI / Game Intelligence",
    kind: "project",
    status: "placeholder",
    summary:
      "AI/game-intelligence architecture developed within Team Auralis (ACI/OCI framework).",
    description:
      "AI/game-intelligence architecture developed within Team Auralis (ACI/OCI framework).",
    longDescription: "__PLACEHOLDER__",
    technologies: ["Python", "AI"],
    accent: "cyan",
    featured: false,
    verified: true,
  },
  {
    id: "mediflow",
    title: "MediFlow",
    category: "Open Source",
    kind: "project",
    status: "placeholder",
    summary:
      "Open-source project maintained by Shaurya; selected for Elite Coders Summer of Code 2026.",
    description:
      "Open-source project maintained by Shaurya; selected for Elite Coders Summer of Code 2026.",
    longDescription: "__PLACEHOLDER__",
    technologies: ["Open Source"],
    accent: "cyan",
    featured: false,
    verified: true,
    year: "2026",
  },
  {
    id: "memori",
    title: "Memori",
    category: "Open Source Contribution",
    kind: "project",
    status: "source",
    summary:
      "Public contribution implementing support for unstreamed AWS Bedrock responses and repository modernization.",
    description:
      "Public open-source contribution implementing support for unstreamed AWS Bedrock responses and general repository modernization.",
    technologies: ["AWS", "Python"],
    accent: "cyan",
    featured: false,
    verified: true,
    github: "__PLACEHOLDER__",
  },
  {
    id: "trustlayer",
    title: "TrustLayer",
    category: "Security",
    kind: "project",
    status: "placeholder",
    summary:
      "Founder; security framework work including the ACI/OCI framework documented with Team Auralis.",
    description:
      "Security framework founded by Shaurya, including the ACI/OCI framework documented with Team Auralis.",
    longDescription: "__PLACEHOLDER__",
    technologies: ["Security"],
    accent: "cyan",
    featured: false,
    verified: true,
  },
  {
    id: "agentwatch",
    title: "AgentWatch",
    category: "Security",
    kind: "project",
    status: "source",
    summary: "Existing project from the previous build; source available on GitHub.",
    description:
      "Security project continued from an earlier build; source is available on GitHub.",
    technologies: ["Python", "Security"],
    accent: "cyan",
    featured: false,
    verified: true,
    github: "https://github.com/SHAURYASANYAL3/AgentWatch",
  },
  {
    id: "aegismail",
    title: "AegisMail",
    category: "Cybersecurity",
    kind: "project",
    status: "placeholder",
    summary:
      "Concept: email threat detection and forensic reconstruction pipeline (header analysis, SPF/DKIM/DMARC, evidence graph, campaign fingerprinting).",
    description:
      "Concept: email threat detection and forensic reconstruction pipeline (header analysis, SPF/DKIM/DMARC, evidence graph, campaign fingerprinting).",
    technologies: ["__PLACEHOLDER__"],
    accent: "cyan",
    featured: false,
    verified: false,
  },
  {
    id: "living-internet",
    title: "Living Internet / LithoMesh",
    category: "Experimental",
    kind: "experiment",
    status: "placeholder",
    summary: "Exploratory experimental project ideas; details pending.",
    description: "__PLACEHOLDER__",
    technologies: ["__PLACEHOLDER__"],
    accent: "cyan",
    featured: false,
    verified: false,
  },
  // Generic experiment tiles seed the Lab grid; details pending.
  {
    id: "experiment-01",
    title: "Lab Experiment 01",
    category: "Lab",
    kind: "experiment",
    status: "placeholder",
    summary: "Creative coding / WebGL / AI-agent experiments — detail pending.",
    description: "__PLACEHOLDER__",
    technologies: ["__PLACEHOLDER__"],
    accent: "cyan",
    featured: false,
    verified: false,
  },
  {
    id: "experiment-02",
    title: "Lab Experiment 02",
    category: "Lab",
    kind: "experiment",
    status: "placeholder",
    summary: "Creative coding / WebGL / AI-agent experiments — detail pending.",
    description: "__PLACEHOLDER__",
    technologies: ["__PLACEHOLDER__"],
    accent: "cyan",
    featured: false,
    verified: false,
  },
  {
    id: "experiment-03",
    title: "Lab Experiment 03",
    category: "Lab",
    kind: "experiment",
    status: "placeholder",
    summary: "Creative coding / WebGL / AI-agent experiments — detail pending.",
    description: "__PLACEHOLDER__",
    technologies: ["__PLACEHOLDER__"],
    accent: "cyan",
    featured: false,
    verified: false,
  },
  {
    id: "experiment-04",
    title: "Lab Experiment 04",
    category: "Lab",
    kind: "experiment",
    status: "placeholder",
    summary: "Creative coding / WebGL / AI-agent experiments — detail pending.",
    description: "__PLACEHOLDER__",
    technologies: ["__PLACEHOLDER__"],
    accent: "cyan",
    featured: false,
    verified: false,
  },
];