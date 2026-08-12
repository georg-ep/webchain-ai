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

// Short enough to survive a browser tab and a search result without
// truncation: brand first, one plain descriptor after it.
const TITLE = "WebChain Labs | AI Automation";
const DESCRIPTION =
  "We build custom AI agents and autonomous systems that run your operations end to end. Dubai and London.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: TITLE,
    template: "%s | WebChain Labs",
  },
  description: DESCRIPTION,
  applicationName: siteConfig.name,
  category: "technology",
  keywords: ["AI automation", "AI agents", "autonomous systems", "WebChain Labs"],
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
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
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
  // Paint edge to edge so the page's own background runs under the home
  // indicator instead of the browser filling that strip with a flat colour.
  // Elements that reach an edge pad themselves with env(safe-area-inset-*).
  viewportFit: "cover",
  // The site is dark in both schemes, so matching the page surface keeps the
  // browser chrome from banding against it.
  themeColor: "#070708",
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
