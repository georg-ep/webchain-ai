import GoogleAnalyticsProvider from "@/components/google-analytics-provider";
import { StructuredData } from "@/components/structured-data";
import { siteConfig } from "@/config/site";
import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter, Inter_Tight } from "next/font/google";
import "./globals.css";

// Body and UI face. Calm and neutral, so the display type and the animated
// diagrams carry the personality.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Display face, set at a whisper weight (300) with tight tracking. Authority
// comes from restraint rather than bold: never set headlines heavier.
const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
});

// Technical micro-copy: eyebrows, step numbers, captions inside diagrams.
const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Short enough to survive a browser tab and a search result without
// truncation: brand first, then the service keywords. "Studio" lives in the
// brand itself, so the descriptor spends its characters on services.
const TITLE = "WebChain Studio | Custom AI Agents & Autonomous Systems";
const DESCRIPTION =
  "WebChain Studio engineers custom AI agents, workflow automation and autonomous software for production. Dubai & London. Book a free architecture call.";

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: TITLE,
    template: "%s | WebChain Studio",
  },
  description: DESCRIPTION,
  applicationName: siteConfig.name,
  category: "technology",
  keywords: [
    "AI systems studio",
    "AI studio",
    "custom AI agents",
    "AI agents",
    "autonomous systems",
    "custom software development",
    "LLM integration",
    "workflow automation",
    "AI consulting",
    "WebChain",
    "WebChain Studio",
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
  // The site is light in both schemes, so matching the page surface keeps the
  // browser chrome from banding against it.
  themeColor: "#fdfcfc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      // The font variables live on <html> because Tailwind's theme tokens
      // (--font-sans, --font-mono) are declared on :root and resolve there;
      // set on <body>, they resolve to nothing and every face falls back.
      className={`${inter.variable} ${interTight.variable} ${geistMono.variable}`}
    >
      <head>
        <script src="https://analytics.ahrefs.com/analytics.js" data-key="5ttpepYQZEEqGz2PfKyLCg" async></script>
      </head>
      <body
        className={`antialiased bg-surface-0 text-ink-2 selection:bg-ink selection:text-surface-0 font-sans`}
      >
        <StructuredData />
        <GoogleAnalyticsProvider />
        {children}
      </body>
    </html>
  );
}
