export interface AchievementEntry {
  title: string;
  organization: string;
  category: "Recognition" | "Certification" | "Competition" | "Fellowship";
  year: string;
  highlight: string;
  badge?: string;
  verified: boolean;
}

export const achievements: AchievementEntry[] = [
  {
    title: "NSOC 26 Top 27 Finalist (E-Vara)",
    organization: "National Summer of Code 2026",
    category: "Competition",
    year: "2026",
    highlight: "Ranked 27th out of 125 nationwide open-source engineering submissions for E-VARA.",
    badge: "National Finalist",
    verified: true,
  },
  {
    title: "Future Founder Fellowship",
    organization: "Ratan Tata Innovation Hub (RTIH) AP",
    category: "Fellowship",
    year: "2026",
    highlight: "Selected as Future Founder representing BITS Visakhapatnam in startup incubation.",
    badge: "Fellow",
    verified: true,
  },
  {
    title: "Microsoft Learn Student Ambassador",
    organization: "Microsoft",
    category: "Recognition",
    year: "2025-2026",
    highlight: "Appointed global Student Ambassador; completed specialized Microsoft AI and Cloud learning tracks.",
    badge: "MLSA",
    verified: true,
  },
  {
    title: "Supervised Machine Learning: Regression & Classification",
    organization: "DeepLearning.AI / Andrew Ng",
    category: "Certification",
    year: "2025",
    highlight: "Mastered linear/logistic regression, loss function optimization, gradient descent, and regularization.",
    badge: "DeepLearning.AI",
    verified: true,
  },
  {
    title: "Advanced Learning Algorithms (Neural Networks & Trees)",
    organization: "DeepLearning.AI + Stanford University",
    category: "Certification",
    year: "2025",
    highlight: "Trained multi-layer perceptrons, TensorFlow neural architectures, decision trees, and ensemble forests.",
    badge: "Stanford / DL.AI",
    verified: true,
  },
  {
    title: "Unsupervised Learning, Recommenders & Reinforcement Learning",
    organization: "DeepLearning.AI",
    category: "Certification",
    year: "2025",
    highlight: "Implemented clustering (K-Means), anomaly detection, collaborative filtering recommenders, and Q-learning.",
    badge: "DeepLearning.AI",
    verified: true,
  },
  {
    title: "Cyber Job Simulation (Threat Analysis & Defense)",
    organization: "Deloitte Australia / Forage",
    category: "Certification",
    year: "2025",
    highlight: "Executed forensic threat hunting, breach containment protocols, and executive cybersecurity reporting.",
    badge: "Deloitte Cyber",
    verified: true,
  },
  {
    title: "Data Analytics & Technology Consulting Simulations",
    organization: "Deloitte Australia / Forage",
    category: "Certification",
    year: "2025",
    highlight: "Business intelligence modeling, technical roadmap architecture, and stakeholder strategy.",
    badge: "Deloitte Tech",
    verified: true,
  },
  {
    title: "Coding for Everyone: C and C++ Specialization",
    organization: "University of California, Santa Cruz",
    category: "Certification",
    year: "2024",
    highlight: "Rigorous systems programming: pointers, memory layout, structured programming in C and modern C++.",
    badge: "UC Santa Cruz",
    verified: true,
  },
  {
    title: "HackerRank Certified: Python & SQL (Intermediate)",
    organization: "HackerRank",
    category: "Certification",
    year: "2024",
    highlight: "Verified algorithmic fluency in Python and complex relational query design in SQL.",
    badge: "HackerRank",
    verified: true,
  },
];
