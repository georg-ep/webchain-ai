"use client";

export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "WebChain Labs",
    url: "https://webchain.studio",
    logo: "https://webchain.studio/brand/large.svg",
    description: "Building the intelligent layer. Custom AI architecture built for real-world impact.",
    foundingDate: "2024",
    contactPoint: {
      "@type": "ContactPoint",
      email: "hello@webchain.studio",
      contactType: "Customer Service",
    },
    sameAs: [
      "https://twitter.com/webchainceo",
      "https://linkedin.com/company/webchain-labs",
      "https://github.com/webchain-labs",
    ],
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "WebChain Labs",
    url: "https://webchain.studio",
    description: "We design autonomous systems that handle the thinking, so your team can focus on the doing.",
    publisher: {
      "@type": "Organization",
      name: "WebChain Labs",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
    </>
  );
}
