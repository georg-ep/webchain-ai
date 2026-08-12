import GoogleAnalyticsProvider from "@/components/google-analytics-provider";
import { StructuredData } from "@/components/structured-data";
import type { Metadata } from "next";
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

export const metadata: Metadata = {
  metadataBase: new URL("https://webchain.studio"),
  title: {
    default: "WebChain Labs | AI Architecture & Autonomous Systems",
    template: "%s | WebChain Labs",
  },
  description:
    "We build systems that think, not just software that executes. Custom AI architecture and autonomous systems built for real-world impact. Dubai & London based.",
  keywords: [
    "AI architecture",
    "autonomous systems",
    "custom AI development",
    "intelligent systems",
    "AI engineering",
    "machine learning",
    "AI consulting",
    "enterprise AI",
    "AI solutions",
    "WebChain Labs",
  ],
  authors: [{ name: "WebChain Labs" }],
  creator: "WebChain Labs",
  publisher: "WebChain Labs",
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
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://webchain.studio",
    siteName: "WebChain Labs",
    title: "WebChain Labs | AI Architecture & Autonomous Systems",
    description:
      "We build systems that think, not just software that executes. Custom AI architecture and autonomous systems built for real-world impact.",
    images: [
      {
        url: "/brand/large.svg",
        width: 1200,
        height: 630,
        alt: "WebChain Labs - Building the intelligent layer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "WebChain Labs | AI Architecture & Autonomous Systems",
    description:
      "We build systems that think, not just software that executes. Custom AI architecture and autonomous systems built for real-world impact.",
    images: ["/brand/large.svg"],
    creator: "@webchainlabs",
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
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
