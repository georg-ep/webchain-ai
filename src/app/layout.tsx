import GoogleAnalyticsProvider from "@/components/google-analytics-provider";
import { StructuredData } from "@/components/structured-data";
import { siteConfig } from "@/config/site";
import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono-jet",
  subsets: ["latin"],
});

// Kept inside the lengths search engines actually render: roughly 60
// characters for the title and 155 for the description.
const TITLE = "AI Automation Agency for Autonomous Systems";
const DESCRIPTION =
  "We build custom AI agents and autonomous systems that run your operations end to end, so your team stops making routine decisions by hand. Dubai & London.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${TITLE} | WebChain Labs`,
    template: "%s | WebChain Labs",
  },
  description: DESCRIPTION,
  applicationName: siteConfig.name,
  category: "technology",
  keywords: [
    "AI automation agency",
    "business process automation",
    "AI agents for business",
    "workflow automation",
    "autonomous systems",
    "AI architecture",
    "custom AI development",
    "AI integration services",
    "enterprise AI consulting",
    "intelligent automation",
    "WebChain Labs",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Images come from the opengraph-image / twitter-image file conventions,
  // which produce a real 1200x630 PNG. Crawlers do not render SVG.
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${TITLE} | WebChain Labs`,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | WebChain Labs`,
    description: DESCRIPTION,
    creator: "@webchainceo",
    site: "@webchainceo",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="5ttpepYQZEEqGz2PfKyLCg" async></script>
      </head>
      <body
        className={`${inter.variable} ${playfair.variable} ${jetbrainsMono.variable} antialiased bg-surface-0 text-ink-2 selection:bg-white selection:text-black font-sans`}
      >
        <StructuredData />
        <GoogleAnalyticsProvider />
        {children}
      </body>
    </html>
  );
}
