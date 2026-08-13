"use client";

import { HeaderProgress } from "@/components/header-progress";
import { InquireModal } from "@/components/inquire-modal";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

// Order mirrors the order the sections appear in on the page. Hrefs carry
// the leading `/` so the links also work from /terms and /privacy.
const NAV_LINKS = [
  { href: "/#projects", label: "Work" },
  { href: "/#principles", label: "Principles" },
  { href: "/#process", label: "Process" },
  { href: "/#faq", label: "FAQ" },
];

/** `/#projects` → `#projects`, for querySelector and id comparisons. */
const hashOf = (href: string) => href.slice(href.indexOf("#"));

/** Every stop shown on the header progress rail, in scroll order. */
const PROGRESS_SECTIONS = [
  { id: "shift", label: "The Shift" },
  { id: "projects", label: "Works" },
  { id: "principles", label: "Manifesto" },
  { id: "process", label: "Method" },
  { id: "faq", label: "FAQ" },
  { id: "contact", label: "Contact" },
];

export function SiteNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the section currently occupying the middle of the viewport.
  useEffect(() => {
    const sections = NAV_LINKS.map(({ href }) => document.querySelector(hashOf(href))).filter(
      (el): el is Element => Boolean(el),
    );
    if (!sections.length) return;

    // Track every section in the band so the highlight clears again once the
    // reader scrolls back out into the hero or the footer.
    const intersecting = new Set<string>();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) intersecting.add(entry.target.id);
          else intersecting.delete(entry.target.id);
        });

        const next = NAV_LINKS.find(({ href }) => intersecting.has(hashOf(href).slice(1)));
        setActiveSection(next?.href ?? "");
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /**
   * Lock scroll behind the mobile drawer.
   *
   * `overflow: hidden` on the body no longer works: the document reserves its
   * scrollbar gutter with `overflow-y: scroll` on the html element, which
   * stops the body's overflow propagating to the viewport. Pinning the body
   * instead holds the page still and keeps the gutter, so nothing shifts
   * sideways when the drawer opens.
   */
  useEffect(() => {
    if (!mobileMenuOpen) return;

    const { body } = document;
    const scrollY = window.scrollY;
    const previous = body.style.cssText;

    body.style.position = "fixed";
    body.style.top = `${-scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";

    return () => {
      body.style.cssText = previous;
      // Instant, or the html element's smooth scrolling animates the restore.
      window.scrollTo({ top: scrollY, behavior: "instant" });
    };
  }, [mobileMenuOpen]);

  /**
   * Drawer links scroll manually. The body is pinned while the drawer is
   * open, so a default anchor jump would be undone by the scroll restore
   * above; this waits for the pin to lift and then moves.
   */
  const followLink = (event: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const target = document.querySelector(hashOf(href));
    // Off the home page the section doesn't exist: let the link navigate.
    if (!target) {
      setMobileMenuOpen(false);
      return;
    }
    event.preventDefault();
    setMobileMenuOpen(false);
    requestAnimationFrame(() => {
      target.scrollIntoView({ behavior: "smooth" });
    });
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMobileMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header
        className={cn(
          // Top padding keeps the logo clear of the status bar / notch now
          // that the page paints edge to edge.
          "fixed top-0 z-50 w-full px-6 pt-[env(safe-area-inset-top)] transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] lg:px-12",
          scrolled ? "bg-surface-0/70 backdrop-blur-xl" : "bg-transparent",
        )}
      >
        {/* Padding lives on the header and the max-width on the inner row, so
            the logo lines up with the section content below it. */}
        <div
          className={cn(
            "mx-auto flex max-w-[1400px] items-center justify-between transition-all duration-500",
            scrolled ? "h-18" : "h-24",
          )}
        >
          <Link href="/#top" className="flex items-center" aria-label="WebChain Labs, back to top">
            <img
              src="/brand/large.svg"
              alt="WebChain Labs"
              width={127}
              height={17}
              className={cn(
                "w-auto object-contain transition-all duration-500",
                scrolled ? "h-6" : "h-7",
              )}
            />
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map(({ href, label }) => {
              const isActive = activeSection === href;
              return (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "group relative px-4 py-2 font-mono text-[10px] font-medium uppercase tracking-[0.22em] transition-colors duration-300",
                    isActive ? "text-ink" : "text-ink-3 hover:text-ink",
                  )}
                >
                  {label}
                  <span
                    className={cn(
                      "absolute inset-x-4 -bottom-px h-px origin-left bg-gradient-to-r from-signal/70 to-transparent transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)]",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden md:block">
            <InquireModal>
              <button className="btn-sweep group relative rounded-full border border-line-strong px-6 py-2.5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-ink transition-colors duration-300 hover:border-signal/40 hover:bg-signal/5 hover:text-white">
                Book a Call
              </button>
            </InquireModal>
          </div>

          <button
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-line-strong md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </div>

        <HeaderProgress sections={PROGRESS_SECTIONS} />
      </header>

      {/* Mobile drawer */}
      <div
        className={cn(
          "fixed inset-0 z-60 md:hidden",
          mobileMenuOpen ? "pointer-events-auto" : "pointer-events-none",
        )}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className={cn(
            "absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500",
            mobileMenuOpen ? "opacity-100" : "opacity-0",
          )}
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={cn(
            "absolute inset-y-0 right-0 flex w-[82%] max-w-sm flex-col border-l border-line bg-surface-1 pt-[env(safe-area-inset-top)] transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)]",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full",
          )}
        >
          <div className="flex items-center justify-between border-b border-line px-6 py-6">
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-4">Menu</span>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink"
              aria-label="Close menu"
            >
              <X className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>

          <nav className="flex flex-col px-6 py-4">
            {NAV_LINKS.map(({ href, label }, i) => (
              <Link
                key={href}
                href={href}
                onClick={(event) => followLink(event, href)}
                className="group flex items-center justify-between border-b border-line py-5 text-ink-2 transition-colors hover:text-ink"
              >
                <span className="font-display text-2xl">{label}</span>
                <span className="font-mono text-[10px] text-ink-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            ))}
          </nav>

          <div className="mt-auto p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
            <InquireModal>
              <button className="btn-cta btn-sweep w-full rounded-full bg-white px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-black">
                Book a Call
              </button>
            </InquireModal>
          </div>
        </div>
      </div>
    </>
  );
}
