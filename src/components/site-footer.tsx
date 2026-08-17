import { LocalClocks } from "@/components/local-clocks";
import { siteConfig } from "@/config/site";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const EXPLORE_LINKS = [
  { href: "/#projects", label: "Selected Works" },
  { href: "/#principles", label: "Manifesto" },
  { href: "/#process", label: "Methodology" },
  { href: "/#faq", label: "FAQ" },
  { href: "/#contact", label: "Book a Call" },
];

/**
 * Shared footer: brand column, sitemap, socials and live office clocks,
 * anchored by a watermark wordmark. Bottom padding clears the home
 * indicator now the page paints under it.
 */
export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-b from-transparent to-black px-6 pt-20 pb-[calc(2.5rem+env(safe-area-inset-bottom))] lg:px-12">
      {/* Watermark wordmark: painted behind the whole footer, bleeding off
          the bottom edge, so it adds depth without taking any space. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -bottom-4 select-none overflow-hidden leading-none md:-bottom-8"
      >
        <span className="block translate-y-[12%] bg-gradient-to-b from-white/[0.05] to-white/[0.01] bg-clip-text text-center font-display text-[16vw] font-medium tracking-[-0.04em] text-transparent whitespace-nowrap md:text-[12.5rem]">
          WEBCHAIN
        </span>
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid grid-cols-2 gap-x-8 gap-y-14 md:grid-cols-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4">
            <img
              src="/brand/large.svg"
              alt="WebChain Labs"
              width={127}
              height={17}
              className="h-7 w-auto object-contain"
            />
            <p className="mt-8 max-w-xs text-xs font-light leading-relaxed text-ink-3">
              WebChain Studio: custom AI agents, workflow automation and autonomous software,
              engineered with architectural precision.
            </p>
            {siteConfig.email && (
              <Link
                className="group mt-6 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-2 transition-colors hover:text-ink"
                href={`mailto:${siteConfig.email}`}
              >
                {siteConfig.email}
                <ArrowUpRight
                  className="h-3 w-3 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  strokeWidth={1.5}
                />
              </Link>
            )}
          </div>

          {/* Sitemap */}
          <nav className="md:col-span-3" aria-label="Footer">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-4">
              Explore
            </div>
            <ul className="mt-6 space-y-3.5">
              {EXPLORE_LINKS.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="text-xs font-light text-ink-3 transition-colors hover:text-ink"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="md:col-span-2">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-4">
              Connect
            </div>
            <ul className="mt-6 space-y-3.5">
              {Object.entries(siteConfig.links).map(([name, url]) => (
                <li key={name}>
                  <Link
                    href={url}
                    target="_blank"
                    className="group inline-flex items-center gap-2.5 text-xs font-light capitalize text-ink-3 transition-colors hover:text-ink"
                  >
                    <Image
                      alt=""
                      aria-hidden
                      width={12}
                      height={12}
                      className="h-3 w-3 object-contain opacity-40 transition-opacity group-hover:opacity-100"
                      src={`/socials/${name}.svg`}
                    />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Live ops strip */}
          <div className="col-span-2 md:col-span-3 md:col-start-10">
            <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-4">
              On the ground
            </div>
            <div className="mt-6">
              <LocalClocks />
            </div>
            <p className="mt-4 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-4">
              <span className="h-1 w-1 rounded-full bg-signal animate-breathe" />
              Replies within 24 hours
            </p>
          </div>
        </div>

        <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-line pt-8 md:flex-row">
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-4">
            © 2026 WebChain Labs Inc.
          </p>
          <div className="flex gap-8 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-4">
            <Link href="/privacy" className="transition-colors hover:text-ink">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors hover:text-ink">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
