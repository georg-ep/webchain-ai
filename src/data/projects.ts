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
    category: "01 — AI & Content Creation",
    title: "Pixor",
    description:
      "AI-powered video and image generation platform that allows you to post to all social medias within a click, featuring an integrated video editing studio.",
    image: "/projects/pixor.png",
    url: "https://pixor.media",
    tags: ["Content Creation", "SaaS"],
    achievements: ["10K+ Users", "500K Videos Generated"],
  },
  {
    id: "oxium",
    category: "02 — Crypto & Web3",
    title: "Oxium",
    description:
      "Decentralized exchange with intelligent trading algorithms, liquidity pools, and cross-chain swaps for seamless crypto operations.",
    image: "/projects/oxium.png",
    url: "https://app.oxium.xyz",
    tags: ["Crypto", "DeFi"],
    achievements: ["$50M+ Volume", "99.9% Uptime"],
  },
  {
    id: "solar",
    category: "03 — Energy & Sustainability",
    title: "Solar Systems",
    description:
      "Solar energy management platform leveraging machine learning for real-time monitoring, predictive maintenance, and optimization analytics.",
    image: "/projects/solar.png",
    url: "https://solar-bywebchain.vercel.app/",
    tags: ["Analytics"],
    achievements: ["30% Efficiency Gain", "Real-time Monitoring"],
  },
  {
    id: "database-manager",
    category: "04 — Infrastructure",
    title: "Database Manager",
    description:
      "Enterprise database tooling with AI-driven query optimization, visual schema design, and automated backup solutions.",
    image: "/projects/database.png",
    url: "https://database-bywebchain.vercel.app/",
    tags: ["DevOps"],
    achievements: ["5x Faster Queries", "Zero Downtime"],
  },
  {
    id: "vogue-fashion",
    category: "05 — Fashion & Retail",
    title: "Vogue Fashion",
    description:
      "E-commerce platform with real-time inventory, intelligent product recommendations, and seamless checkout experience.",
    image: "/projects/vogue-fashion.png",
    url: "#",
    tags: ["Mobile", "Web"],
    achievements: ["40% Conversion Rate", "Sub-2s Load Time"],
  },
  {
    id: "stellar",
    category: "06 — API Security",
    title: "Stellar",
    description:
      "Open-source API security tool with autonomous threat detection, providing pre-built APIs to protect applications from common web attacks.",
    image: "/projects/stellar.png",
    url: "https://stellar-bywebchain.vercel.app/",
    tags: ["API"],
    achievements: ["Open Source", "OWASP Compliant"],
  },
];
