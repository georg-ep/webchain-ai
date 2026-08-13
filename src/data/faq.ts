/**
 * FAQ content rendered in the on-page accordion and mirrored verbatim in the
 * FAQPage structured data. Google requires the schema text to match what the
 * visitor can see, so both consumers import from here.
 */
export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const faqItems: FaqItem[] = [
  {
    id: "what-we-build",
    question: "What does WebChain Labs actually build?",
    answer:
      "Custom AI agents and autonomous systems: workflow automation that routes and executes work on its own, LLM integrations wired into your existing stack, and decision engines with deterministic guardrails. Everything is engineered for production — evaluated, monitored, and owned by you — not a thin wrapper around a chat window.",
  },
  {
    id: "intro-call",
    question: "What happens on the intro call?",
    answer:
      "Thirty minutes, no pitch deck. We map where work currently stalls in your operation, identify which decisions can run autonomously, and tell you honestly whether AI creates leverage there or whether plain software is the better tool. You leave with a clear picture either way.",
  },
  {
    id: "speed",
    question: "How fast can we ship?",
    answer:
      "Cognitive mapping and a working prototype come first, in weeks not quarters. We iterate against golden datasets until output quality is proven, then harden with guardrails and adversarial testing before anything touches production. Speed comes from scoping tightly, not from skipping evaluation.",
  },
  {
    id: "team",
    question: "Do we need an in-house AI team to run this?",
    answer:
      "No. Systems are delivered documented, monitored, and designed to run without babysitting — that is the entire point of building autonomy in. When you want ongoing evolution, we stay engaged; when you want to take over, your engineers inherit a codebase built like traditional distributed software, not a research notebook.",
  },
  {
    id: "pricing",
    question: "How is an engagement priced?",
    answer:
      "Fixed-scope phases, priced after the initial call once we understand the terrain. You commit to one phase at a time — starting with cognitive mapping — so you see evidence before you fund the build. No open-ended retainers to get started.",
  },
];
