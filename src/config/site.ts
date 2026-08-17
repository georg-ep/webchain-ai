/**
 * Canonical origin for absolute URLs: metadata, canonical link, sitemap,
 * robots and structured data all derive from this.
 *
 * Set NEXT_PUBLIC_SITE_URL per deployment so previews do not advertise
 * themselves as production.
 */
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ??
  // Vercel exposes the project's production domain to every deployment, so
  // previews still emit the production canonical rather than a build URL.
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://webchain.ai");

export const siteConfig = {
  /** Public-facing brand. The registered company stays `legalName` below. */
  name: "WebChain Studio",
  legalName: "WebChain Labs Inc.",
  /**
   * Alternate spellings people (and Google's entity graph) use for the brand.
   * Fed into structured data so the Knowledge Graph can reconcile "WebChain",
   * "WebChain Labs" and "WebChain Studio" as one organisation.
   */
  alternateNames: ["WebChain", "WebChain Labs"],
  description:
    "WebChain Studio engineers custom AI agents, workflow automation and autonomous software.",
  url: SITE_URL,
  /** Published in structured data, so it is omitted rather than guessed. */
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
  links: {
    twitter: "https://x.com/webchainceo",
    instagram: "https://www.instagram.com/webchainstudio",
    telegram: "https://t.me/georg_ep",
    linkedin: "https://www.linkedin.com/company/web-chain/",
    discord: "https://discord.gg/JwnQsKkk",
  },
};
