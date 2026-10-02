import { InquireModal } from "@/components/inquire-modal";
import { PageBackdrop } from "@/components/page-backdrop";
import { Reveal } from "@/components/reveal";
import { SectionBridge } from "@/components/section-bridge";
import { SectionLabel } from "@/components/section-label";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ArrowRight, Check } from "lucide-react";
import Link from "next/link";

/**
 * Building blocks for the audience landing pages (/automation, /partners).
 * They are what a cold email links to, so they keep the home page's frame
 * (nav, backdrop, footer, booking dialog) and only swap the words.
 */

/** Nav, backdrop and footer around a landing page's sections. */
export function OfferPage({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SiteNav />
      <PageBackdrop />

      <main id="top" className="relative overflow-x-clip">
        {children}
        <SiteFooter />
      </main>
    </>
  );
}

/** The white pill that opens the booking dialog, as used on the home page. */
export function BookButton({
  children,
  size = "md",
}: {
  children: React.ReactNode;
  size?: "md" | "lg";
}) {
  return (
    <InquireModal>
      <button
        className={cn(
          "btn-cta btn-sweep group inline-flex items-center gap-3 rounded-full bg-white font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-black",
          size === "lg" ? "px-10 py-5" : "px-6 py-4 sm:px-8",
        )}
      >
        {children}
        <ArrowRight
          className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
          strokeWidth={2}
        />
      </button>
    </InquireModal>
  );
}

/** The outlined secondary pill, for in-page jumps. */
export function GhostLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      className="group inline-flex items-center gap-3 rounded-full border border-line px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-ink-2 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-line-strong hover:text-ink sm:px-8"
      href={href}
    >
      {children}
      <ArrowRight
        className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
        strokeWidth={1.5}
      />
    </Link>
  );
}

/**
 * Two-column hero: copy on the left, a supporting panel on the right. Unlike
 * the home hero the copy leads on phones, because a cold reader needs the
 * promise before anything else.
 */
export function OfferHero({
  eyebrow,
  title,
  lede,
  actions,
  note,
  aside,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lede: React.ReactNode;
  actions: React.ReactNode;
  note: string;
  aside: React.ReactNode;
}) {
  return (
    <section className="relative px-6 pb-20 pt-32 lg:flex lg:min-h-svh lg:items-center lg:px-12 lg:pt-28">
      <div className="relative mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <Reveal>
            <div className="flex items-center gap-4">
              <span className="h-px w-10 bg-gradient-to-r from-ink-4 to-transparent" />
              <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-3">
                {eyebrow}
              </span>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="mt-8 text-balance font-display text-[2.25rem] leading-[1.08] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[2.75rem] xl:text-[3.25rem]">
              {title}
            </h1>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-8 max-w-xl text-lg font-light leading-relaxed text-ink-2 md:text-xl">
              {lede}
            </div>
          </Reveal>

          <Reveal delay={240}>
            <div className="mt-10 flex flex-wrap items-center gap-4">{actions}</div>
            <p className="mt-5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-ink-4">
              {note}
            </p>
          </Reveal>
        </div>

        <Reveal delay={200} className="lg:col-span-5 lg:col-start-8">
          {aside}
        </Reveal>
      </div>
    </section>
  );
}

/** Glass panel with a mono heading and a ticked list, for hero asides. */
export function ChecklistPanel({
  label,
  items,
  footer,
}: {
  label: string;
  items: React.ReactNode[];
  footer?: React.ReactNode;
}) {
  return (
    <div className="panel relative overflow-hidden rounded-2xl">
      <div
        aria-hidden
        className="grid-fine absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_90%_80%_at_100%_0%,#000,transparent_70%)]"
      />
      <div className="relative border-b border-line px-7 py-5">
        <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-ink-3">
          <span className="h-1.5 w-1.5 rounded-full bg-signal animate-breathe" />
          {label}
        </span>
      </div>
      <ul className="relative divide-y divide-line">
        {items.map((item, i) => (
          <li key={i} className="flex items-start gap-4 px-7 py-4">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-signal/80" strokeWidth={1.5} />
            <span className="text-sm font-light leading-relaxed text-ink-2">{item}</span>
          </li>
        ))}
      </ul>
      {footer && (
        <div className="relative border-t border-line px-7 py-5 font-mono text-[10px] uppercase leading-relaxed tracking-[0.2em] text-ink-4">
          {footer}
        </div>
      )}
    </div>
  );
}

const GLOWS = {
  white: "bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(255,255,255,0.035),transparent_70%)]",
  signal: "bg-[radial-gradient(ellipse_70%_55%_at_80%_10%,rgba(52,211,153,0.05),transparent_65%)]",
  indigo: "bg-[radial-gradient(ellipse_75%_60%_at_25%_20%,rgba(99,102,241,0.05),transparent_65%)]",
} as const;

/**
 * A content section with the home page's header pattern: eyebrow and
 * heading on the left, a short intro paragraph on the right.
 */
export function OfferSection({
  id,
  label,
  title,
  intro,
  glow = "white",
  children,
}: {
  id: string;
  label: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  glow?: keyof typeof GLOWS;
  children: React.ReactNode;
}) {
  return (
    <section className="relative scroll-mt-20 px-6 py-24 lg:px-12 lg:py-28" id={id}>
      <div aria-hidden className={cn("pointer-events-none absolute inset-0", GLOWS[glow])} />
      <div className="relative mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-5">
            <SectionLabel>{label}</SectionLabel>
            <h2 className="mt-7 font-display text-3xl leading-[1.14] tracking-[-0.02em] text-ink md:text-[2.5rem]">
              {title}
            </h2>
          </Reveal>
          {intro && (
            <Reveal delay={100} className="lg:col-span-6 lg:col-start-7 lg:self-end">
              <div className="max-w-xl space-y-4 text-[15px] font-light leading-relaxed text-ink-2">
                {intro}
              </div>
            </Reveal>
          )}
        </div>

        <div className="mt-14 lg:mt-16">{children}</div>
      </div>
    </section>
  );
}

export interface OfferCardItem {
  title: string;
  /** Small mono line above the title. */
  kicker?: string;
  Icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  body?: React.ReactNode;
  points?: string[];
}

/** Grid of glass cards, each with an optional icon, kicker, body and ticked points. */
export function OfferCards({
  items,
  columns = 3,
}: {
  items: OfferCardItem[];
  columns?: 2 | 3;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-4 md:grid-cols-2",
        columns === 3 && "lg:grid-cols-3",
      )}
    >
      {items.map(({ title, kicker, Icon, body, points }, i) => (
        <Reveal key={title} delay={(i % 3) * 90} className="h-full">
          <article className="panel panel-hover group relative flex h-full flex-col overflow-hidden rounded-2xl p-7 lg:p-8">
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-signal/60 to-transparent transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-x-100"
            />
            <div className="flex items-start justify-between gap-4">
              {kicker ? (
                <span className="pt-1 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-4 transition-colors duration-500 group-hover:text-signal/80">
                  {kicker}
                </span>
              ) : (
                <span className="pt-1 font-mono text-[10px] tracking-[0.22em] text-ink-4">
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
              {Icon && (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-line text-ink-3 transition-colors duration-500 group-hover:border-signal/40 group-hover:text-signal">
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </span>
              )}
            </div>

            <h3 className="mt-6 font-display text-xl text-ink">{title}</h3>
            {body && (
              <p className="mt-3 text-[13px] font-light leading-relaxed text-ink-3">{body}</p>
            )}
            {points && (
              <ul className="mt-5 space-y-3">
                {points.map((point) => (
                  <li key={point} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-signal/70" strokeWidth={1.75} />
                    <span className="text-[13px] font-light leading-relaxed text-ink-2">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </article>
        </Reveal>
      ))}
    </div>
  );
}

/** Numbered process steps joined by a hairline, in a row on wide screens. */
export function OfferSteps({ steps }: { steps: { title: string; body: React.ReactNode }[] }) {
  return (
    <ol
      className={cn(
        "grid grid-cols-1 gap-4 sm:grid-cols-2",
        steps.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-5",
      )}
    >
      {steps.map(({ title, body }, i) => (
        <Reveal as="li" key={title} delay={i * 90} className="h-full">
          <div className="panel relative flex h-full flex-col rounded-2xl p-7">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 rotate-45 border border-signal/50 bg-signal/20" />
              <span className="font-mono text-[10px] tracking-[0.24em] text-ink-4">
                STEP {String(i + 1).padStart(2, "0")}
              </span>
            </div>
            <h3 className="mt-6 font-display text-lg leading-snug text-ink">{title}</h3>
            <p className="mt-3 text-[13px] font-light leading-relaxed text-ink-3">{body}</p>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}

/** Closing call to action, matching the home page's #contact block. */
export function OfferCta({
  title,
  muted,
  body,
  button,
  note,
}: {
  title: string;
  muted: string;
  body: string;
  button: string;
  note: string;
}) {
  return (
    <>
      <SectionBridge delay={2.2} />
      <section
        className="relative overflow-hidden px-6 py-32 text-center lg:px-12 lg:py-40"
        id="book"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 grid-lines opacity-60" />
          <div className="absolute left-1/2 top-1/2 h-[560px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(52,211,153,0.10),transparent_65%)] blur-3xl animate-drift" />
        </div>

        <Reveal className="relative mx-auto max-w-4xl">
          <h2 className="font-display text-4xl leading-[1.08] tracking-[-0.03em] text-ink md:text-6xl">
            <span className="text-gradient">{title}</span>
            <br />
            <span className="text-ink-3">{muted}</span>
          </h2>

          <p className="mx-auto mt-8 max-w-md text-lg font-light leading-relaxed text-ink-2">
            {body}
          </p>

          <div className="mt-12 flex flex-col items-center gap-8">
            <BookButton size="lg">{button}</BookButton>

            <div className="flex flex-col items-center gap-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-4">{note}</p>
              {siteConfig.email && (
                <Link
                  className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3 transition-colors hover:text-ink"
                  href={`mailto:${siteConfig.email}`}
                >
                  {siteConfig.email}
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
