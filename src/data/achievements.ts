export interface AchievementEntry {
  title: string;
  context: string;
  year?: string;
  verified: boolean;
}

export const achievements: AchievementEntry[] = [
  {
    title: "RTIH AP Future Founders Program",
    context: "Represented BITS Visakhapatnam.",
    verified: true,
  },
  {
    title: "Microsoft Learn Student Ambassador",
    context: "Joined and completed Microsoft Learn badges.",
    verified: true,
  },
  {
    title: "Elite Coders Summer of Code 2026",
    context: "MediFlow selected for the program.",
    year: "2026",
    verified: true,
  },
  {
    title: "C/C++ Certification",
    context: "Programming certification in C and C++.",
    verified: true,
  },
  {
    title: "HackerRank Python",
    context: "Python skill certification.",
    verified: true,
  },
  {
    title: "HackerRank SQL",
    context: "SQL skill certification.",
    verified: true,
  },
  {
    title: "Deloitte / Forage Job Simulations",
    context: "Completed job simulations.",
    verified: true,
  },
  {
    title: "Microsoft Learn Badges",
    context: "Completed Microsoft Learn learning paths.",
    verified: true,
  },
  // Unverified seeds — render-time filters can demonstrate hiding placeholders.
  {
    title: "__PLACEHOLDER__",
    context: "New milestone — details pending.",
    verified: false,
  },
  {
    title: "__PLACEHOLDER__",
    context: "New milestone — details pending.",
    verified: false,
  },
];