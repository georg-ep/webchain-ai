import { Faq } from "@/components/faq";
import { FeaturedProjectCarousel } from "@/components/featured-project-carousel";
import { AgentLoop } from "@/components/explainers/agent-loop";
import { OrbMark } from "@/components/explainers/spark-orb";
import { InquireModal } from "@/components/inquire-modal";
import { PageBackdrop } from "@/components/page-backdrop";
import { Parallax } from "@/components/parallax";
import { PhaseCards } from "@/components/phase-cards";
import { PrincipleCards } from "@/components/principle-cards";
import { Reveal } from "@/components/reveal";
import { SectionBridge } from "@/components/section-bridge";
import { SectionLabel } from "@/components/section-label";
import { SiteNav } from "@/components/site-nav";
import { StateShift } from "@/components/state-shift";
import { SiteFooter } from "@/components/site-footer";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

/**
 * Proof strip under the hero CTAs. Every figure is already published on this
 * page: volume and efficiency come from the project achievements, the count
 * from the works archive.
 */
const PROOF = [
  { value: "$50M+", label: "Autonomous volume executed" },
  { value: "14", label: "Systems in production" },
  { value: "30%", label: "Avg. efficiency reclaimed" },
] as const;

/** Labels for the methodology phase rail; the cards themselves live in PhaseCards. */
const PHASE_LABELS = ["PHASE I", "PHASE II", "PHASE III", "PHASE IV"] as const;

export default function Home() {
  return (
    <>
      <SiteNav />

      <PageBackdrop />

      <main id="top" className="relative overflow-x-clip">
        {/* ---------------- Hero ---------------- */}
        <section className="relative flex min-h-svh items-center px-6 pb-20 pt-28 lg:px-12">
          <div className="relative mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <Reveal>
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-gradient-to-r from-ink-4 to-transparent" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-3">
                    AI Systems Studio · Est. 2024
                  </span>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="mt-8 text-balance font-display text-[2.5rem] leading-[1.06] tracking-[-0.03em] text-ink sm:text-5xl lg:text-[3.25rem] xl:text-[3.75rem]">
                  <span className="text-gradient">We build systems that </span>
                  <span className="text-spark">
                    think
                  </span>
                  <span className="text-gradient">,</span>
                  <br />
                  <span className="text-gradient">not just software that executes.</span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="mt-9 max-w-xl text-lg font-light leading-relaxed text-ink-2 md:text-xl">
                  WebChain Studio designs autonomous systems that handle the thinking, so your
                  team can focus on the doing. Custom AI agents and architecture, engineered for
                  real-world impact.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-12 flex flex-wrap items-center gap-4">
                  <InquireModal>
                    <button className="btn-cta btn-sweep group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3.5 text-sm font-medium text-surface-0">
                      Book a Call
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                        strokeWidth={2}
                      />
                    </button>
                  </InquireModal>

                  <Link
                    className="group inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-surface-0 px-6 py-3.5 text-sm font-medium text-ink transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-ink/30"
                    href="#projects"
                  >
                    Explore Works
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                      strokeWidth={1.5}
                    />
                  </Link>
                </div>

                <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.2em] text-ink-4">
                  Free 30-min architecture call&ensp;·&ensp;Reply within 24 hours
                </p>
              </Reveal>

              <Reveal delay={320}>
                <dl className="mt-12 flex max-w-xl divide-x divide-line border-t border-line pt-8">
                  {PROOF.map(({ value, label }) => (
                    <div key={label} className="flex-1 pr-4 [&:not(:first-child)]:pl-5">
                      <dt className="sr-only">{label}</dt>
                      <dd className="font-display text-2xl tracking-tight text-ink sm:text-3xl">
                        {value}
                      </dd>
                      <dd className="mt-2 font-mono text-[9px] uppercase leading-relaxed tracking-[0.16em] text-ink-4">
                        {label}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            {/* What "a system that thinks" means, drawn as the agent's loop.
                Follows the copy on phones. */}
            <Reveal delay={200} className="lg:col-span-6">
              <Parallax distance={-24}>
                <AgentLoop />
              </Parallax>
            </Reveal>
          </div>
        </section>

        <SectionBridge />

        {/* ---------------- State shift ---------------- */}
        <section className="relative px-6 py-24 lg:px-12 lg:py-28" id="shift">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(68,64,59,0.035),transparent_70%)]"
          />
          <div className="relative mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
              <Reveal className="lg:col-span-5">
                <SectionLabel>The Shift</SectionLabel>
                <h2 className="mt-7 font-display text-3xl leading-[1.14] tracking-[-0.02em] text-ink md:text-[2.5rem]">
                  What changes when the{" "}
                  <span className="text-ink-3">system does the thinking.</span>
                </h2>
              </Reveal>
              <Reveal delay={100} className="lg:col-span-6 lg:col-start-7 lg:self-end">
                <p className="max-w-xl text-[15px] font-light leading-relaxed text-ink-2">
                  Most operations stall in the same place: work arrives faster than people can
                  route it, and anything unfamiliar waits for a human. Below is the same pipeline
                  before and after we rebuild it — where the work stops today, and where it keeps
                  moving once the system can reason for itself.
                </p>
              </Reveal>
            </div>

            <Parallax distance={-28} className="mt-16 lg:mt-20">
              <StateShift />
            </Parallax>
          </div>
        </section>

        <SectionBridge delay={0.9} />

        {/* ---------------- Selected Works ---------------- */}
        <section
          className="relative px-6 py-24 lg:px-12 lg:py-32"
          id="projects"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_80%_10%,rgba(4,71,255,0.05),transparent_65%)]"
          />
          <div className="relative mx-auto max-w-[1400px]">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-10">
                <h2 className="font-display text-4xl tracking-[-0.03em] text-ink md:text-6xl">
                  Selected Works
                </h2>
                <Link
                  className="group hidden items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-3 transition-colors hover:text-ink md:inline-flex"
                  href="#"
                >
                  Archive (14)
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                    strokeWidth={1.5}
                  />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={100} className="mt-16 block">
              <FeaturedProjectCarousel />
            </Reveal>
          </div>
        </section>

        <SectionBridge delay={1.8} />

        {/* ---------------- Principles ---------------- */}
        <section
          className="relative px-6 py-24 lg:px-12 lg:py-32"
          id="principles"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_15%_0%,rgba(68,64,59,0.03),transparent_65%)]"
          />
          <div className="relative mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              <Reveal className="lg:col-span-4">
                <SectionLabel>Manifesto</SectionLabel>
              </Reveal>
              <Reveal delay={80} className="lg:col-span-8">
                <h2 id="principles-heading" className="max-w-3xl font-display text-3xl leading-[1.14] tracking-[-0.02em] text-ink md:text-[2.75rem]">
                  AI where it creates leverage,{" "}
                  <span className="text-ink-3">software where it creates certainty.</span>
                </h2>
              </Reveal>
            </div>

            <div className="mt-20">
              <PrincipleCards />
            </div>
          </div>
        </section>

        <SectionBridge delay={0.5} />

        {/* ---------------- Process ---------------- */}
        <section
          className="relative px-6 py-24 lg:px-12 lg:py-32"
          id="process"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_60%_at_25%_20%,rgba(255,71,4,0.05),transparent_65%)]"
          />
          <div className="relative mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <Reveal>
                  <SectionLabel>Methodology</SectionLabel>
                  <h2 id="process-heading" className="mt-7 font-display text-3xl tracking-[-0.02em] text-ink md:text-4xl">
                    Rigorous Evaluation
                  </h2>
                  <p className="mt-6 max-w-sm text-sm font-light leading-relaxed text-ink-3">
                    We don&apos;t just prompt and pray. Our engineering process treats AI components
                    with the same scientific rigor as traditional distributed systems.
                  </p>

                  {/* Phase rail: four steps, drawn rather than spelled out */}
                  <ol aria-hidden className="mt-12 hidden lg:block">
                    {PHASE_LABELS.map((phase, i) => (
                      <li key={phase} className="group flex items-stretch gap-4">
                        <div className="flex flex-col items-center">
                          <span className="h-2 w-2 rotate-45 border border-signal/50 bg-signal/20" />
                          {i < PHASE_LABELS.length - 1 && (
                            <span className="w-px flex-1 bg-gradient-to-b from-signal/25 to-line" />
                          )}
                        </div>
                        <span
                          className={cn(
                            "font-mono text-[10px] uppercase tracking-[0.24em] text-ink-4",
                            i < PHASE_LABELS.length - 1 && "pb-8",
                          )}
                        >
                          {phase}
                        </span>
                      </li>
                    ))}
                  </ol>
                </Reveal>
              </div>

              <div className="lg:col-span-8">
                <PhaseCards />
              </div>
            </div>
          </div>
        </section>

        <SectionBridge delay={1.4} />

        {/* ---------------- FAQ ---------------- */}
        <section className="relative px-6 py-24 lg:px-12 lg:py-32" id="faq">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_85%_30%,rgba(4,71,255,0.04),transparent_65%)]"
          />
          <div className="relative mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <Reveal>
                  <SectionLabel>Questions</SectionLabel>
                  <h2 className="mt-7 font-display text-[2.125rem] leading-[1.12] tracking-[-0.01em] text-ink md:text-[2.625rem]">
                    Before you <span className="text-ink-3">book the call.</span>
                  </h2>
                  <p className="mt-6 max-w-sm text-sm font-light leading-relaxed text-ink-3">
                    The questions every serious operator asks us first — answered straight, so the
                    thirty minutes we spend together go to your systems, not our sales script.
                  </p>
                </Reveal>
              </div>

              <Reveal delay={100} className="lg:col-span-8">
                <Faq />
              </Reveal>
            </div>
          </div>
        </section>

        <SectionBridge delay={2.2} />

        {/* ---------------- CTA ---------------- */}
        <section className="relative overflow-hidden px-6 py-32 text-center lg:px-12 lg:py-40" id="contact">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 grid-lines opacity-60" />
            <div className="absolute left-1/2 top-1/2 h-[560px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(4,71,255,0.10),transparent_65%)] blur-3xl animate-drift" />
          </div>

          <Reveal className="relative mx-auto max-w-4xl">
            <OrbMark className="mx-auto mb-8" />
            <h2 className="font-display text-4xl leading-[1.08] tracking-[-0.03em] text-ink md:text-6xl lg:text-7xl">
              <span className="text-gradient">Ready to architect the</span>
              <br />
              <span className="text-ink-3">intelligent layer?</span>
            </h2>

            <p className="mx-auto mt-8 max-w-md text-lg font-light leading-relaxed text-ink-2">
              Thirty minutes. We map which of your workflows can run without you — and tell you if
              they can&apos;t.
            </p>

            <div className="mt-12 flex flex-col items-center gap-8">
              <InquireModal>
                <button className="btn-cta btn-sweep group inline-flex items-center gap-2.5 rounded-full bg-ink px-8 py-4 text-[15px] font-medium text-surface-0">
                  Book Your Call
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </button>
              </InquireModal>

              <div className="flex flex-col items-center gap-3">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-ink-4">
                  No obligation&ensp;·&ensp;Reply within 24 hours
                </p>
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

        <SiteFooter />
      </main>
    </>
  );
}
