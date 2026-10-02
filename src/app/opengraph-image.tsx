import { ogCard } from "@/lib/og-card";

/**
 * Social share card, generated at build time.
 *
 * The previous card pointed at the brand SVG, which none of the major
 * crawlers render, so shared links had no image at all.
 */
export const alt =
  "WebChain Studio — custom AI agents, workflow automation and autonomous software";
export { contentType, size } from "@/lib/og-card";

export default function OpengraphImage() {
  return ogCard({
    headline: "We build systems that think,",
    muted: "not just software that executes.",
    blurb:
      "Custom AI architecture and autonomous systems that automate the decisions your team is stuck making by hand.",
  });
}
