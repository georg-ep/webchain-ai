import { FeaturedProjectCarousel } from "@/components/featured-project-carousel";
import { InquireModal } from "@/components/inquire-modal";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { SiteNav } from "@/components/site-nav";
import { StateShift } from "@/components/state-shift";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import {
  ArrowRight,
  Binary,
  FlaskConical,
  Radar,
  Rocket,
  ShieldCheck,
  Waves,
  UserRoundCheck,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const PRINCIPLES = [
  {
    index: "001",
    icon: Binary,
    title: "Deterministic Core",
    body: "Foundational logic must be absolute. We engineer 100% reliability for data integrity, reserving AI for higher-order reasoning.",
  },
  {
    index: "002",
    icon: Waves,
    title: "Probabilistic Edge",
    body: "Deployment of models for synthesis and pattern matching. Leveraging ambiguity as a feature, not a bug, in creative workflows.",
  },
  {
    index: "003",
    icon: UserRoundCheck,
    title: "Human Agency",
    body: "Systems designed to augment, not replace. We build rigorous “human-in-the-loop” protocols for high-stakes decision making.",
  },
] as const;

const PHASES = [
  {
    phase: "PHASE I",
    icon: Radar,
    title: "Cognitive Mapping",
    body: "Defining the boundaries of deterministic logic vs probabilistic reasoning. Establishing the architectural constraints.",
  },
  {
    phase: "PHASE II",
    icon: FlaskConical,
    title: "Model Prototyping",
    body: "Rapid iteration of model selection. Quantifying output quality against golden datasets.",
  },
  {
    phase: "PHASE III",
    icon: ShieldCheck,
    title: "Guardrail Engineering",
    body: "Implementing semantic filters and adversarial testing to ensure system safety and alignment.",
  },
  {
    phase: "PHASE IV",
    icon: Rocket,
    title: "High-Availability Scale",
    body: "Deploying to distributed edge networks with real-time monitoring of token usage and drift.",
  },
] as const;

export default function Home() {
  return (
    <>
      <SiteNav />

      <main id="top" className="relative overflow-x-clip">
        {/* ---------------- Hero ---------------- */}
        <section className="relative flex min-h-svh items-center overflow-hidden px-6 pb-20 pt-32 lg:px-12 lg:pt-28">
          {/* Ambient field */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 grid-lines opacity-70" />
            <div className="absolute -left-[10%] top-[-20%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.10),transparent_65%)] blur-2xl animate-drift" />
            <div className="absolute right-[-10%] top-[10%] h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(99,102,241,0.10),transparent_65%)] blur-2xl animate-drift [animation-delay:-9s]" />
            <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-surface-0 to-transparent" />
          </div>

          <div className="relative mx-auto grid w-full max-w-[1400px] grid-cols-1 items-center gap-16 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Reveal>
                <div className="flex items-center gap-4">
                  <span className="h-px w-10 bg-gradient-to-r from-ink-4 to-transparent" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-3">
                    Est. 2024
                  </span>
                </div>
              </Reveal>

              <Reveal delay={80}>
                <h1 className="mt-8 max-w-[15ch] font-serif text-[2.5rem] font-medium leading-[1.06] tracking-[-0.02em] text-ink sm:text-5xl lg:max-w-none lg:text-[3.5rem] xl:text-6xl">
                  <span className="text-gradient">We build systems that </span>
                  <span className="bg-gradient-to-br from-signal via-signal to-emerald-200 bg-clip-text font-light italic text-transparent">
                    think
                  </span>
                  <span className="text-gradient">,</span>
                  <br />
                  <span className="text-gradient">not just software that executes.</span>
                </h1>
              </Reveal>

              <Reveal delay={160}>
                <p className="mt-9 max-w-xl font-serif text-lg font-light italic leading-relaxed text-ink-2 md:text-xl">
                  We design autonomous systems that handle the thinking, so your team can focus on
                  the doing. Custom AI architecture built for real-world impact.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-12 flex flex-wrap items-center gap-4">
                  <InquireModal>
                    <button className="shine group inline-flex items-center gap-3 rounded-full bg-white px-8 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-black transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] hover:-translate-y-0.5">
                      Inquire
                    </button>
                  </InquireModal>

                  <Link
                    className="group inline-flex items-center gap-3 rounded-full border border-line px-8 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-ink-2 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] hover:-translate-y-0.5 hover:border-line-strong hover:text-ink"
                    href="#projects"
                  >
                    Explore Works
                    <ArrowRight
                      className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                      strokeWidth={1.5}
                    />
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal delay={200} className="lg:col-span-5">
              <StateShift />
            </Reveal>
          </div>
        </section>

        {/* ---------------- Principles ---------------- */}
        <section
          className="noise relative border-t border-line bg-surface-1 px-6 py-24 lg:px-12 lg:py-32"
          id="principles"
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-12">
              <Reveal className="lg:col-span-4">
                <SectionLabel>Manifesto</SectionLabel>
              </Reveal>
              <Reveal delay={80} className="lg:col-span-8">
                <h3 className="max-w-3xl font-serif text-3xl font-light leading-[1.15] tracking-[-0.01em] text-ink md:text-[2.75rem]">
                  AI where it creates leverage,{" "}
                  <span className="italic text-ink-3">software where it creates certainty.</span>
                </h3>
              </Reveal>
            </div>

            <div className="mt-20 grid grid-cols-1 gap-4 md:grid-cols-3">
              {PRINCIPLES.map(({ index, icon: Icon, title, body }, i) => (
                <Reveal key={index} delay={i * 100}>
                  <article className="panel panel-hover group relative h-full overflow-hidden rounded-2xl p-8 lg:p-10">
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.12),transparent_65%)] opacity-0 blur-xl transition-opacity duration-700 group-hover:opacity-100"
                    />

                    <div className="relative flex items-start justify-between">
                      <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-white/[0.03] text-ink-2 transition-colors duration-500 group-hover:border-signal/30 group-hover:text-signal">
                        <Icon className="h-4.5 w-4.5" strokeWidth={1.25} />
                      </span>
                      <span className="font-mono text-[10px] tracking-[0.2em] text-ink-4">
                        {index}
                      </span>
                    </div>

                    <h4 className="relative mt-14 font-serif text-2xl italic text-ink">{title}</h4>
                    <p className="relative mt-4 text-sm font-light leading-relaxed text-ink-3">
                      {body}
                    </p>
                  </article>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ---------------- Selected Works ---------------- */}
        <section
          className="relative border-t border-line bg-surface-0 px-6 py-24 lg:px-12 lg:py-32"
          id="projects"
        >
          <div className="mx-auto max-w-[1400px]">
            <Reveal>
              <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-10">
                <h2 className="font-serif text-4xl font-medium tracking-[-0.02em] text-ink md:text-6xl">
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

        {/* ---------------- Process ---------------- */}
        <section
          className="noise relative border-t border-line bg-surface-1 px-6 py-24 lg:px-12 lg:py-32"
          id="process"
        >
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">
              <div className="lg:col-span-4">
                <Reveal>
                  <SectionLabel>Methodology</SectionLabel>
                  <h3 className="mt-7 font-serif text-3xl text-ink md:text-4xl">
                    Rigorous Evaluation
                  </h3>
                  <p className="mt-6 max-w-sm text-sm font-light leading-relaxed text-ink-3">
                    We don&apos;t just prompt and pray. Our engineering process treats AI components
                    with the same scientific rigor as traditional distributed systems.
                  </p>

                  {/* Phase rail: four steps, drawn rather than spelled out */}
                  <ol aria-hidden className="mt-12 hidden lg:block">
                    {PHASES.map(({ phase }, i) => (
                      <li key={phase} className="group flex items-stretch gap-4">
                        <div className="flex flex-col items-center">
                          <span className="h-2 w-2 rotate-45 border border-signal/50 bg-signal/20" />
                          {i < PHASES.length - 1 && (
                            <span className="w-px flex-1 bg-gradient-to-b from-signal/25 to-line" />
                          )}
                        </div>
                        <span
                          className={cn(
                            "font-mono text-[10px] uppercase tracking-[0.24em] text-ink-4",
                            i < PHASES.length - 1 && "pb-8",
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
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {PHASES.map(({ phase, icon: Icon, title, body }, i) => (
                    <Reveal key={phase} delay={i * 90}>
                      <article className="panel panel-hover group relative h-full overflow-hidden rounded-2xl p-8">
                        <div
                          aria-hidden
                          className="pointer-events-none absolute inset-x-0 top-0 h-px scale-x-0 bg-gradient-to-r from-transparent via-signal/60 to-transparent transition-transform duration-700 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-x-100"
                        />

                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] tracking-[0.24em] text-ink-4">
                            {phase}
                          </span>
                          <Icon
                            className="h-4 w-4 text-ink-4 transition-colors duration-500 group-hover:text-signal"
                            strokeWidth={1.25}
                          />
                        </div>

                        <h5 className="mt-10 font-serif text-xl text-ink">{title}</h5>
                        <p className="mt-3 text-[13px] font-light leading-relaxed text-ink-3">
                          {body}
                        </p>
                      </article>
                    </Reveal>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ---------------- CTA ---------------- */}
        <section className="relative overflow-hidden border-t border-line bg-surface-0 px-6 py-32 text-center lg:px-12 lg:py-40">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute inset-0 grid-lines opacity-60" />
            <div className="absolute left-1/2 top-1/2 h-[560px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(ellipse,rgba(52,211,153,0.10),transparent_65%)] blur-3xl animate-drift" />
          </div>

          <Reveal className="relative mx-auto max-w-4xl">
            <h2 className="font-serif text-4xl font-medium leading-[1.08] tracking-[-0.02em] text-ink md:text-6xl lg:text-7xl">
              <span className="text-gradient">Ready to architect the</span>
              <br />
              <span className="italic text-ink-3">intelligent layer?</span>
            </h2>

            <div className="mt-14 flex flex-col items-center gap-8">
              <InquireModal>
                <button className="shine group inline-flex items-center gap-3 rounded-full bg-white px-10 py-5 font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-black transition-transform duration-500 [transition-timing-function:var(--ease-out-expo)] hover:-translate-y-0.5">
                  Initiate Consultation
                  <ArrowRight
                    className="h-3.5 w-3.5 transition-transform duration-500 group-hover:translate-x-1"
                    strokeWidth={2}
                  />
                </button>
              </InquireModal>

              <Link
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink-3 transition-colors hover:text-ink"
                href="mailto:hello@webchain.studio"
              >
                hello@webchain.studio
              </Link>
            </div>
          </Reveal>
        </section>

        {/* ---------------- Footer ---------------- */}
        <footer className="border-t border-line bg-black px-6 py-20 lg:px-12">
          <div className="mx-auto max-w-[1400px]">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-12">
              <div className="md:col-span-5">
                <img
                  src="/brand/large.svg"
                  alt="WebChain Labs Logo"
                  className="h-7 w-auto object-contain"
                />
                <p className="mt-8 max-w-xs text-xs font-light leading-relaxed text-ink-3">
                  Dubai &amp; London based.
                  <br />
                  Engineering next-generation systems with architectural precision.
                </p>
              </div>

              <div className="flex flex-col md:col-span-4 md:col-start-9 md:items-end">
                <div className="font-mono text-[10px] uppercase tracking-[0.28em] text-ink-4">
                  Connect
                </div>
                <div className="mt-6 flex items-center gap-2">
                  {Object.entries(siteConfig.links).map(([name, url]) => (
                    <Link
                      key={name}
                      href={url}
                      target="_blank"
                      aria-label={name}
                      className="group flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/[0.03] p-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:border-line-strong hover:bg-white/[0.07]"
                    >
                      <Image
                        alt={`Webchain ${name}`}
                        width={16}
                        height={16}
                        className="h-full w-full object-contain opacity-40 transition-opacity group-hover:opacity-100"
                        src={`/socials/${name}.svg`}
                      />
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-16 flex flex-col items-center justify-between gap-6 border-t border-line pt-8 md:flex-row">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-4">
                © 2026 WebChain Labs Inc.
              </p>
              <div className="flex gap-8 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-4">
                <Link href="#" className="transition-colors hover:text-ink">
                  Privacy Policy
                </Link>
                <Link href="#" className="transition-colors hover:text-ink">
                  Terms &amp; Conditions
                </Link>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
