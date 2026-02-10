export interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  image: string;
  url: string;
  tags: string[];
  achievements: string[];
}

export const selectedWorks: Project[] = [
  {
    id: "pixor",
    category: "01 — Autonomous Media Systems",
    title: "Pixor",
    description:
      "Autonomous content production system that plans, generates, edits, and publishes media across platforms without human coordination.",
    image: "/projects/pixor.png",
    url: "https://pixor.media",
    tags: ["Autonomous Systems", "Content"],
    achievements: [
      "Millions of creative decisions automated",
      "Content pipelines running without supervision",
    ],
  },
  {
    id: "oxium",
    category: "02 — Autonomous Financial Systems",
    title: "Oxium",
    description:
      "Self-directed trading and liquidity system that executes market decisions continuously without manual intervention.",
    image: "/projects/oxium.png",
    url: "https://app.oxium.xyz",
    tags: ["Autonomous Finance", "DeFi"],
    achievements: [
      "$50M+ autonomously executed volume",
      "Continuous decision-making at market speed",
    ],
  },
  {
    id: "solar",
    category: "03 — Autonomous Infrastructure",
    title: "Solar Systems",
    description:
      "Energy optimization system that monitors, predicts, and corrects infrastructure behavior without operator involvement.",
    image: "/projects/solar.png",
    url: "https://solar-bywebchain.vercel.app/",
    tags: ["Autonomous Ops", "Energy"],
    achievements: [
      "30% efficiency gains through self-optimization",
      "Predictive maintenance without manual scheduling",
    ],
  },
  {
    id: "database-manager",
    category: "04 — Self-Managing Systems",
    title: "Database Manager",
    description:
      "Self-managing data infrastructure that optimizes queries, adapts schemas, and maintains uptime without human tuning.",
    image: "/projects/database.png",
    url: "https://database-bywebchain.vercel.app/",
    tags: ["Autonomous Infrastructure"],
    achievements: [
      "5× performance improvements without manual tuning",
      "Zero-downtime operations under changing load",
    ],
  },
  {
    id: "vogue-fashion",
    category: "05 — Autonomous Commerce",
    title: "Vogue Fashion",
    description:
      "Commerce system that dynamically adjusts inventory, pricing, and recommendations based on real-time demand signals.",
    image: "/projects/vogue-fashion.png",
    url: "#",
    tags: ["Autonomous Commerce"],
    achievements: [
      "Inventory decisions automated in real time",
      "Conversion optimization without manual campaigns",
    ],
  },
  {
    id: "stellar",
    category: "06 — Autonomous Security Systems",
    title: "Stellar",
    description:
      "Self-defending API security system that detects, evaluates, and mitigates threats without human escalation.",
    image: "/projects/stellar.png",
    url: "https://stellar-bywebchain.vercel.app/",
    tags: ["Autonomous Security"],
    achievements: [
      "Threats mitigated without operator review",
      "Continuous protection aligned with OWASP standards",
    ],
  },
];

