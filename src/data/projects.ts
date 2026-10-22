export interface ProjectCaseStudy {
  problem?: string;
  approach?: string;
  stack?: string;
  outcomes?: string;
  pipeline?: { label: string; detail?: string }[];
  horizons?: string[];
  capabilities?: string[];
}

export interface Project {
  id: string;
  title: string;
  category: string;
  kind: "project" | "experiment";
  status: "live" | "source";
  summary: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  year?: string;
  github?: string;
  live?: string;
  accent: "cyan" | "purple" | "teal" | "emerald" | "amber";
  featured: boolean;
  verified: boolean;
  caseStudy?: ProjectCaseStudy;
}

export const projects: Project[] = [
  {
    id: "agentwatch",
    title: "AgentWatch",
    category: "AI Agent Observability",
    kind: "project",
    status: "source",
    summary:
      "Real-time reasoning auditor and observability platform for autonomous AI agents. Catches silent failures in your agent's reasoning chain before they execute live actions.",
    description:
      "Production-grade observability platform designed to monitor, intercept, and evaluate multi-turn LLM agent reasoning traces in flight. Features sub-millisecond trace inspection and deterministic guardrails.",
    longDescription:
      "AgentWatch decouples agent execution from validation, introducing a telemetry layer that scores reasoning chain coherence, detects tool misuse loops, and prevents catastrophic actions in high-stakes environments.",
    technologies: ["Rust", "TypeScript", "Python", "LLM Evals", "Observability", "Vector Indexing"],
    accent: "cyan",
    year: "2026",
    featured: true,
    verified: true,
    github: "https://github.com/SHAURYASANYAL3/AgentWatch",
    caseStudy: {
      problem:
        "Autonomous agents silently hallucinate, hallucinate tool arguments, or enter infinite query loops without standard APMs capturing the semantic deviation.",
      approach:
        "High-throughput async audit proxy that computes trace perplexity, semantic tool contract adherence, and state divergence before triggering runtime mutations.",
      stack: "Rust Core Engine • TypeScript SDK • Python Evaluation Harness • Vector Similarity Cache",
      outcomes:
        "Intercepts 94% of tool-call parameter hallucinations before database execution with sub-15ms audit latency.",
      pipeline: [
        { label: "Agent Output Stream", detail: "Multi-turn reasoning tokens captured" },
        { label: "Semantic Guard", detail: "Contract & schema validation" },
        { label: "Reasoning Auditor", detail: "Perplexity & intent divergence evaluation" },
        { label: "Interception Gate", detail: "Live pass/block/correct decision" },
      ],
      capabilities: [
        "Pre-execution tool call interception",
        "Reasoning drift & hallucination scoring",
        "Deterministic recovery replay",
        "Zero-latency streaming telemetry",
      ],
    },
  },
  {
    id: "atlas",
    title: "ATLAS",
    category: "Enterprise AI Infrastructure",
    kind: "project",
    status: "source",
    summary:
      "AI infrastructure that lets agents reason across enterprise data without the data ever leaving its source — geometry-based retrieval + privacy-preserving cross-org compute.",
    description:
      "Federated enterprise compute architecture allowing autonomous agents to query and reason over distributed silos while maintaining cryptographic privacy boundaries.",
    technologies: ["Python", "Differential Privacy", "Geometry Retrieval", "Federated Compute", "Cryptography"],
    accent: "purple",
    year: "2026",
    featured: true,
    verified: true,
    github: "https://github.com/SHAURYASANYAL3/ATLAS",
    caseStudy: {
      problem:
        "Enterprises cannot expose sensitive customer and financial records to centralized LLM models or cross-border vector databases due to compliance and security constraints.",
      approach:
        "Geometry-based manifold indexing combined with local client-side embedding projections and zero-knowledge proof verification.",
      stack: "Python • PyTorch • Differential Privacy Libraries • Geometric Vector Spaces",
      outcomes:
        "Enables multi-institution agent workflows while strictly guaranteeing zero raw-data leakage.",
    },
  },
  {
    id: "e-vara",
    title: "E-VARA & TrustLayer",
    category: "AI Reputation & Trust",
    kind: "project",
    status: "live",
    summary:
      "AI-driven digital reputation protection and entity verification platform. Selected and ranked 27th out of 125 nationwide projects in NSOC 26.",
    description:
      "Comprehensive identity intelligence and digital footprint defense system. Actively tracks reputation spoofing, impersonation vectors, and credential misuse across web surfaces.",
    technologies: ["TypeScript", "React", "Next.js", "AI Verification", "FastAPI", "Tailwind CSS"],
    accent: "teal",
    year: "2025-2026",
    featured: true,
    verified: true,
    live: "https://e-vara.vercel.app",
    github: "https://github.com/SHAURYASANYAL3/E-Vara",
    caseStudy: {
      problem:
        "Generative deepfakes and automated profile impersonation make manual digital reputation defense impossible for professionals and emerging founders.",
      approach:
        "Multi-modal surveillance that cross-references cryptographic proofs of identity against detected online appearances, scoring risk in real time.",
      stack: "React 19 • Next.js • Python FastAPI • PostgreSQL • Automated OSINT Scanners",
      outcomes:
        "Recognized in NSOC 26, reaching rank 27 among 125 selected national open source engineering submissions.",
    },
  },
  {
    id: "anywindows",
    title: "AnyWindows",
    category: "Systems & Game Porting",
    kind: "project",
    status: "source",
    summary:
      "Zero-dependency Windows-to-macOS Game Porter and Server-Side AI Anti-Cheat Telemetry Engine.",
    description:
      "Systems-level translation layer and runtime harness enabling Windows DX11/DX12 binaries to execute smoothly on Apple Silicon with embedded server-side anti-cheat heuristics.",
    technologies: ["C++", "C", "macOS Metal", "Systems Programming", "Telemetry AI", "Reverse Engineering"],
    accent: "emerald",
    year: "2026",
    featured: true,
    verified: true,
    github: "https://github.com/SHAURYASANYAL3/AnyWindows",
    caseStudy: {
      problem:
        "Porting games to macOS usually requires heavyweight virtualization or complex custom toolchains, while traditional client-side anti-cheat fails under translation layers.",
      approach:
        "Lightweight ABI bridging coupled with server-side behavioral telemetry models that detect non-human aimbot/input patterns without requiring intrusive kernel ring-0 drivers.",
      stack: "C++20 • Metal Shading Language • Wine ABI Wrappers • Python AI Telemetry Backend",
      outcomes:
        "Near-native frame pacing on M-series chips with zero client-side kernel module dependencies.",
    },
  },
  {
    id: "ryuos",
    title: "RyuOS",
    category: "Operating Systems & C",
    kind: "project",
    status: "source",
    summary:
      "Custom Debian-based live operating system and systems programming environment built with live-build, QEMU virtualization, and low-level C utilities.",
    description:
      "Minimalist, hardened Linux distribution tailored for security researchers, reverse engineers, and systems developers. Featuring custom kernel configurations and preloaded analytical toolchains.",
    technologies: ["C", "Linux Kernel", "Debian live-build", "QEMU", "Shell Scripting", "Virtualization"],
    accent: "amber",
    year: "2025",
    featured: true,
    verified: true,
    github: "https://github.com/SHAURYASANYAL3/RyuOS",
    caseStudy: {
      problem:
        "Standard security distributions are bloated with thousands of legacy packages, increasing surface area and slowing down ephemeral analysis environments.",
      approach:
        "Stripped-down live-build pipeline creating reproducible ISOs booting in under 4 seconds in QEMU with hardened memory allocations.",
      stack: "Debian Live • Linux 6.x Kernel • C Toolchains • BusyBox / Custom Shell Tools",
      outcomes:
        "Fully reproducible live system under 650MB with instant ephemeral teardown capabilities.",
    },
  },
  {
    id: "astrion",
    title: "Astrion",
    category: "Neural Game Intelligence",
    kind: "project",
    status: "source",
    summary:
      "Hybrid neural chess AI engine and Android application engineered in collaboration with Team-Auralis.",
    description:
      "Advanced chess intelligence combining classical alpha-beta minimax search heuristics with deep residual neural network evaluation tensors for superhuman tactical evaluation on edge hardware.",
    technologies: ["Python", "TensorFlow", "C++", "Android NDK", "Game Tree Search"],
    accent: "cyan",
    year: "2025",
    featured: true,
    verified: true,
    github: "https://github.com/SHAURYASANYAL3",
    caseStudy: {
      problem:
        "Evaluating deep positions on mobile processors requires balancing heavy neural inference latency against combinatorial move tree depths.",
      approach:
        "Quantized INT8 neural evaluation heads coupled with bitboard board representations and bitwise move generation.",
      stack: "C++ Chess Core • TensorFlow / PyTorch Training • Android Java/Kotlin Shell",
      outcomes:
        "Achieved 2400+ ELO positional accuracy while sustaining 120,000 nodes/sec evaluation speed on mobile ARM processors.",
    },
  },
  {
    id: "vision-cli",
    title: "VISION-CLI",
    category: "Security Tooling",
    kind: "experiment",
    status: "source",
    summary:
      "Python security and threat-intelligence CLI on PyPI: leak scanning, phishing analysis, breach lookup, and AI-generated media verification.",
    description:
      "All-in-one terminal Swiss Army knife for blue-teamers and OSINT investigators. Published and maintained on PyPI.",
    technologies: ["Python", "PyPI Package", "Threat Intelligence", "OSINT", "Cryptographic Hashing"],
    accent: "cyan",
    year: "2025",
    featured: false,
    verified: true,
    github: "https://github.com/SHAURYASANYAL3/VISION-CLI",
    caseStudy: {
      approach: "Modular threat intelligence engine published as a zero-dependency CLI on PyPI.",
      capabilities: [
        "Credential and API leak scanning",
        "Heuristic phishing domain analysis",
        "Breach database cross-referencing",
        "Synthetic / AI media artifact inspection",
      ],
    },
  },
  {
    id: "geoshield",
    title: "GEOshield",
    category: "Space Weather AI",
    kind: "experiment",
    status: "source",
    summary:
      "Physics-aware ML pipeline for forecasting energetic electron flux at geostationary orbit using GOES, OMNI and GRASP space weather data.",
    description:
      "Scientific computing pipeline predicting radiation-belt dynamics to protect orbital communication satellites from solar storm electrostatic discharge.",
    technologies: ["Python", "Physics ML", "GOES Satellite Data", "OMNI Solar Wind", "Time-Series Forecasting"],
    accent: "purple",
    year: "2025",
    featured: false,
    verified: true,
    github: "https://github.com/SHAURYASANYAL3/GEOshield",
    caseStudy: {
      approach: "Space weather dataset ingestion → solar wind feature engineering → physics-informed neural network.",
      pipeline: [
        { label: "Data Ingestion", detail: "NOAA GOES / NASA OMNI telemetry" },
        { label: "Solar Wind Dynamics", detail: "IMF Bz & solar velocity features" },
        { label: "PINN Model", detail: "Diffusion-advection loss constraints" },
        { label: "Satellite Warning", detail: "Early notification at 45m / 6h / 12h" },
      ],
      horizons: ["45 min", "6 hours", "12 hours"],
    },
  },
  {
    id: "saferoute",
    title: "SafeRoute",
    category: "Public Safety Orchestration",
    kind: "experiment",
    status: "source",
    summary:
      "Adaptive student safety orchestration system with real-time risk assessment and automated emergency telemetry.",
    description:
      "Geospatial security platform calculating safest transit corridors based on ambient illumination, crowd density, and historical threat indexes.",
    technologies: ["Python", "FastAPI", "React", "Geospatial GIS", "IoT Telemetry"],
    accent: "emerald",
    year: "2025",
    featured: false,
    verified: true,
    github: "https://github.com/SHAURYASANYAL3/SafeRoute",
  },
  {
    id: "smartsurvivalrpg",
    title: "SmartSurvivalRPG",
    category: "Game Architecture",
    kind: "experiment",
    status: "source",
    summary:
      "Survival-horror RPG game plugin for Minecraft featuring custom entity AI state machines, procedural dungeon generation, and sound-based monster agro.",
    description:
      "Complex server-side Java plugin with over 5,000 downloads on SpigotMC.",
    technologies: ["Java", "SpigotMC API", "Entity AI", "Procedural Generation"],
    accent: "amber",
    year: "2024",
    featured: false,
    verified: true,
    github: "https://github.com/SHAURYASANYAL3/SmartSurvivalRPG",
  },
  {
    id: "memori",
    title: "Memori (OSS Contribution)",
    category: "Agent Infrastructure",
    kind: "experiment",
    status: "source",
    summary:
      "Agent-native memory infrastructure contribution implementing unstreamed AWS Bedrock model support and runtime stabilization.",
    description:
      "Open source contributions adding robust enterprise provider abstractions to production LLM agent memory pipelines.",
    technologies: ["Python", "AWS Bedrock", "Agent Memory", "Open Source"],
    accent: "teal",
    year: "2026",
    featured: false,
    verified: true,
    github: "https://github.com/SHAURYASANYAL3/Memori",
  },
];
