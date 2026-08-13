import { siteConfig } from "@/config/site";
import { faqItems } from "@/data/faq";

/**
 * JSON-LD for the organisation, the site and the service offered.
 *
 * Rendered from the server so it is present in the initial HTML, and
 * serialised with `<` escaped, which is the sanitisation Next's JSON-LD
 * guide calls for.
 */

const organization = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": `${siteConfig.url}/#organization`,
  name: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/brand/large.svg`,
  image: `${siteConfig.url}/opengraph-image`,
  description:
    "WebChain Labs designs and builds custom AI architecture and autonomous systems, so businesses can automate the decisions their teams currently make by hand.",
  slogan: "We build systems that think, not just software that executes.",
  foundingDate: "2024",
  ...(siteConfig.email ? { email: siteConfig.email } : {}),
  areaServed: [
    { "@type": "Place", name: "United Arab Emirates" },
    { "@type": "Place", name: "United Kingdom" },
  ],
  address: [
    { "@type": "PostalAddress", addressLocality: "Dubai", addressCountry: "AE" },
    { "@type": "PostalAddress", addressLocality: "London", addressCountry: "GB" },
  ],
  knowsAbout: [
    "AI automation",
    "Autonomous systems",
    "AI agents",
    "Business process automation",
    "AI architecture",
    "Machine learning engineering",
  ],
  contactPoint: {
    "@type": "ContactPoint",
    ...(siteConfig.email ? { email: siteConfig.email } : {}),
    contactType: "Sales",
    availableLanguage: ["English"],
  },
  // Only profiles that actually exist: dead sameAs entries are a negative signal.
  sameAs: Object.values(siteConfig.links),
};

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  name: siteConfig.name,
  url: siteConfig.url,
  description:
    "Custom AI architecture and autonomous systems for businesses integrating automation into their operations.",
  inLanguage: "en",
  publisher: { "@id": `${siteConfig.url}/#organization` },
};

const service = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "AI automation and autonomous system development",
  serviceType: "AI automation",
  provider: { "@id": `${siteConfig.url}/#organization` },
  areaServed: "Worldwide",
  description:
    "Design and engineering of autonomous systems: deterministic core logic, AI reasoning at the edges, guardrails and evaluation, deployed and monitored in production.",
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Engagements",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Cognitive mapping",
          description:
            "Defining the boundaries of deterministic logic versus probabilistic reasoning, and establishing the architectural constraints.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Model prototyping",
          description:
            "Rapid iteration of model selection, quantifying output quality against golden datasets.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Guardrail engineering",
          description:
            "Semantic filters and adversarial testing to ensure system safety and alignment.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "High-availability scale",
          description:
            "Deployment to distributed edge networks with real-time monitoring of token usage and drift.",
        },
      },
    ],
  },
};

// Mirrors the visible FAQ section word for word, which is a requirement for
// the rich result: the schema may not contain content the page does not show.
const faq = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "@id": `${siteConfig.url}/#faq`,
  mainEntity: faqItems.map(({ question, answer }) => ({
    "@type": "Question",
    name: question,
    acceptedAnswer: { "@type": "Answer", text: answer },
  })),
};

export function StructuredData() {
  const payload = [organization, website, service, faq];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(payload).replace(/</g, "\\u003c"),
      }}
    />
  );
}
