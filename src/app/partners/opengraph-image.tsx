import { ogCard } from "@/lib/og-card";

export const alt =
  "WebChain Studio: white-label AI and development team for UK agencies";
export { contentType, size } from "@/lib/og-card";

export default function OpengraphImage() {
  return ogCard({
    eyebrow: "WebChain Studio · Agency partners",
    headline: "Your clients want AI.",
    muted: "We build it, under your brand.",
    blurb:
      "AI agents, automations and integrations for web, marketing and HubSpot agencies, with a live preview of every change.",
  });
}
