export interface SkillCluster {
  cluster: string;
  tagline: string;
  iconName: string;
  items: string[];
  level: "Mastery" | "Core Competency" | "Active Research";
}

export const clusters: SkillCluster[] = [
  {
    cluster: "Cybersecurity & Systems Defense",
    tagline: "Threat modeling, low-level inspection & zero-trust architecture",
    iconName: "Shield",
    level: "Core Competency",
    items: [
      "Threat Intelligence & OSINT",
      "IAM & Zero Trust Architectures",
      "Linux Kernel & Hardening",
      "Network Protocol Auditing",
      "Vulnerability Assessment",
      "Reverse Engineering Basics",
      "Deloitte Cyber Security Workflows",
    ],
  },
  {
    cluster: "Agentic AI & Observability",
    tagline: "Multi-turn LLM reasoning, evaluations & real-time telemetry",
    iconName: "Cpu",
    level: "Active Research",
    items: [
      "Autonomous Agent Architectures",
      "Reasoning Chain Audit & Observability",
      "Tool-Call Interception & Validation",
      "RAG & Geometric Vector Retrieval",
      "Supervised & Deep Learning (DeepLearning.AI)",
      "Recommender Systems & RL",
      "AWS Bedrock & OpenAI / Claude Integrations",
    ],
  },
  {
    cluster: "Systems & Low-Level Engineering",
    tagline: "Direct memory management, custom OS and kernel virtualization",
    iconName: "Terminal",
    level: "Core Competency",
    items: [
      "C (C11/C17 / UC Santa Cruz Spec)",
      "C++ (C++20)",
      "Rust (AgentWatch telemetry core)",
      "Debian live-build & QEMU",
      "POSIX Shell / Bash Scripting",
      "Memory Safety & Hardened Allocations",
    ],
  },
  {
    cluster: "Full-Stack & Cloud Architecture",
    tagline: "Ultra-responsive client frontends & resilient async services",
    iconName: "Layers",
    level: "Mastery",
    items: [
      "TypeScript & JavaScript (ESNext)",
      "React 19 & Next.js App Router",
      "Python (FastAPI, PyTorch, PyPI)",
      "Tailwind CSS v4 & Three.js WebGL",
      "PostgreSQL, Supabase & Vector Stores",
      "Docker & Containerization",
      "Git & GitHub CI/CD Actions",
    ],
  },
];
