import {
  BookButton,
  ChecklistPanel,
  GhostLink,
  OfferCards,
  OfferCta,
  OfferHero,
  OfferPage,
  OfferSection,
  OfferSteps,
  type OfferCardItem,
} from "@/components/offer-page";
import { Reveal } from "@/components/reveal";
import { SectionBridge } from "@/components/section-bridge";
import { siteConfig } from "@/config/site";
import { selectedWorks } from "@/data/projects";
import {
  AppWindow,
  ArrowUpRight,
  Bot,
  Clock,
  Code2,
  FileLock2,
  FlaskConical,
  MonitorPlay,
  Plug,
  Workflow,
} from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

const TITLE = "White-label AI and development for agencies";
const DESCRIPTION =
  "Your clients want AI agents, automations and integrations. We build them under your brand, with a live preview of every change and fixed quotes within 48 hours.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/partners" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: `${siteConfig.url}/partners`,
    siteName: siteConfig.name,
    title: `${TITLE} | ${siteConfig.name}`,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: `${TITLE} | ${siteConfig.name}`,
    description: DESCRIPTION,
  },
};

const SERVICES: OfferCardItem[] = [
  {
    title: "AI agents and assistants",
    Icon: Bot,
    body: "Customer-facing assistants and internal agents that answer from your client's own content and take real actions in their tools.",
  },
  {
    title: "Workflow automation",
    Icon: Workflow,
    body: "Enquiry triage, lead routing, document handling and the glue between the systems your client already pays for.",
  },
  {
    title: "LLM integrations",
    Icon: Plug,
    body: "AI added to existing sites and CRMs, HubSpot included: enrichment, summaries, drafting and search, inside the tools the team already uses.",
  },
  {
    title: "Custom web apps and internal tools",
    Icon: AppWindow,
    body: "Portals, dashboards and internal tools, built properly and handed over documented.",
  },
  {
    title: "Overflow development",
    Icon: Code2,
    body: "Extra engineering on builds you already run, when your own team is at capacity.",
  },
];

/** Led by delivery: testing is the reason most agencies stall on AI work. */
const REASONS: OfferCardItem[] = [
  {
    title: "Tested before handover",
    Icon: FlaskConical,
    body: "We test against real examples from the brief before anything reaches you, and again whenever something changes.",
  },
  {
    title: "Fixed quotes within 48 hours",
    Icon: Clock,
    body: "Send the brief and get a fixed price back within 48 hours. No open-ended day rates to explain to your client.",
  },
  {
    title: "NDA as standard",
    Icon: FileLock2,
    body: "We sign your NDA before the first brief. We never contact your client unless you ask us to, and nothing we deliver carries our name.",
  },
];

const STEPS = [
  {
    title: "You send the brief",
    body: "Forward what your client asked for, in whatever shape it arrived. A call works too.",
  },
  {
    title: "Fixed quote in 48 hours",
    body: "Scope, price and timeline, fixed, so you can set your margin and quote your client with confidence.",
  },
  {
    title: "Build, with a preview per change",
    body: "Every change arrives as a live preview link you can click through, and share with your client if you choose.",
  },
  {
    title: "You present it as yours",
    body: "Your brand, your relationship, your sign-off meeting. We stay behind the scenes.",
  },
  {
    title: "Support, if you want it",
    body: "Ongoing support or a monthly retainer after launch, or a clean handover to your team.",
  },
];

/** Shown as proof of range. Ids from data/projects.ts, so edits happen there. */
const SHOWCASE_IDS = ["porchlight", "pixor", "solar"];
const SHOWCASE = SHOWCASE_IDS.flatMap((id) => selectedWorks.filter((work) => work.id === id));

/** Categories carry a carousel index ("07 — …") that means nothing here. */
const categoryName = (category: string) => category.split(" — ").pop() ?? category;

export default function PartnersPage() {
  return (
    <OfferPage>
      <OfferHero
        eyebrow="White-label partners · UK agencies"
        title={
          <>
            <span className="text-gradient">Your clients want AI. </span>
            <span className="bg-gradient-to-br from-signal via-signal to-emerald-200 bg-clip-text text-transparent">
              We build it
            </span>
            <span className="text-gradient">, under your brand.</span>
          </>
        }
        lede={
          <p>
            WebChain Studio is the AI and development team behind web, marketing and HubSpot
            agencies. Your clients keep asking for agents, automations and integrations. We build
            them, you deliver them as your own, and the client relationship stays yours.
          </p>
        }
        actions={
          <>
            <BookButton>Book a partner call</BookButton>
            <GhostLink href="#build">What we build</GhostLink>
          </>
        }
        note="Fixed quotes within 48 hours · NDA as standard · Paid pilot to start"
        aside={
          <ChecklistPanel
            label="Every partner project"
            items={[
              <>
                <span className="text-ink">A live preview of every change</span>, for you and
                your client to click through
              </>,
              <>
                <span className="text-ink">Tested before handover</span>, against real examples
                from the brief
              </>,
              <>
                <span className="text-ink">Delivered under your brand</span>. We never contact
                your client unless you ask
              </>,
            ]}
            footer="Your brand · Your client · Your margin"
          />
        }
      />

      <SectionBridge />

      <OfferSection
        id="build"
        label="What we build"
        title={
          <>
            The AI and engineering work{" "}
            <span className="text-ink-3">your clients are asking you for.</span>
          </>
        }
        intro={
          <p>
            You keep the strategy, design and account management. We add the engineering team
            you&apos;d otherwise have to hire, for exactly as long as each project needs it.
          </p>
        }
        glow="signal"
      >
        <OfferCards items={SERVICES} />
      </OfferSection>

      <SectionBridge delay={0.9} />

      <OfferSection
        id="why"
        label="Why partner with us"
        title={
          <>
            Reliable delivery,{" "}
            <span className="text-ink-3">because you&apos;re the one in front of the client.</span>
          </>
        }
        intro={
          <p>
            The hard part of AI work isn&apos;t the demo, it&apos;s knowing it behaves before
            the client sees it. So every piece of work is built to be checked.
          </p>
        }
        glow="indigo"
      >
        <Reveal>
          <div className="panel relative overflow-hidden rounded-2xl">
            <div
              aria-hidden
              className="grid-fine absolute inset-0 opacity-40 [mask-image:radial-gradient(ellipse_70%_90%_at_100%_0%,#000,transparent_70%)]"
            />
            <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.12),transparent_65%)] blur-xl" />
            <div className="relative grid grid-cols-1 gap-8 p-7 lg:grid-cols-12 lg:gap-12 lg:p-12">
              <div className="lg:col-span-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full border border-signal/40 text-signal">
                  <MonitorPlay className="h-4 w-4" strokeWidth={1.5} />
                </span>
                <h3 className="mt-6 font-display text-2xl leading-snug text-ink md:text-3xl">
                  A live preview environment for every change.
                </h3>
              </div>
              <p className="text-[15px] font-light leading-relaxed text-ink-2 lg:col-span-6 lg:self-end">
                Each change ships with its own working preview. You, and your client if you
                choose, click through the real thing before anything goes live. Testing happens
                before the sign-off meeting, not after launch.
              </p>
            </div>
          </div>
        </Reveal>

        <div className="mt-4">
          <OfferCards items={REASONS} />
        </div>
      </OfferSection>

      <SectionBridge delay={1.8} />

      <OfferSection
        id="how"
        label="How a partnership works"
        title={
          <>
            Brief to launch,{" "}
            <span className="text-ink-3">with you in front the whole way.</span>
          </>
        }
        intro={
          <p>
            Your first project can be a small paid pilot, so you can see how we work before you
            put us in front of a bigger client.
          </p>
        }
      >
        <OfferSteps steps={STEPS} />
      </OfferSection>

      <SectionBridge delay={0.5} />

      <OfferSection
        id="commercials"
        label="Commercials"
        title={
          <>
            Two ways to work. <span className="text-ink-3">You set your own margin.</span>
          </>
        }
        intro={
          <p>
            We price to you, the agency. What you charge your client is your decision, and we
            never discuss pricing with them.
          </p>
        }
        glow="signal"
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Reveal className="h-full">
            <div className="panel flex h-full flex-col rounded-2xl p-7 lg:p-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-4">
                Per project
              </span>
              <h3 className="mt-5 font-display text-2xl text-ink">Fixed project quotes</h3>
              <p className="mt-3 text-[15px] font-light leading-relaxed text-ink-2">
                A fixed price per project, from your brief, within 48 hours. Changes to scope
                are quoted before any work starts.
              </p>
              {/* TODO George: typical pilot / project starting price */}
              <p className="mt-auto border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
                Pilot projects from £___
              </p>
            </div>
          </Reveal>
          <Reveal delay={90} className="h-full">
            <div className="panel flex h-full flex-col rounded-2xl p-7 lg:p-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-4">
                Per month
              </span>
              <h3 className="mt-5 font-display text-2xl text-ink">Reserved monthly capacity</h3>
              <p className="mt-3 text-[15px] font-light leading-relaxed text-ink-2">
                A set amount of engineering time held for your agency each month, for a steady
                flow of client work and support.
              </p>
              {/* TODO George: monthly capacity price and what it includes (days / hours) */}
              <p className="mt-auto border-t border-line pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-3">
                From £___ / month for ___ days
              </p>
            </div>
          </Reveal>
        </div>
      </OfferSection>

      <SectionBridge delay={1.4} />

      <OfferSection
        id="built"
        label="Things we've built"
        title={
          <>
            Some of our own work.{" "}
            <span className="text-ink-3">Partner work ships under your name.</span>
          </>
        }
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {SHOWCASE.map((project, i) => {
            const card = (
              <>
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl bg-surface-0">
                  <img
                    src={project.image}
                    alt={`${project.title}: ${project.description}`}
                    loading="lazy"
                    className="h-full w-full object-cover object-top transition-transform duration-1000 [transition-timing-function:var(--ease-out-expo)] group-hover:scale-[1.03]"
                  />
                </div>
                <div className="flex flex-1 flex-col px-5 pb-6 pt-6">
                  <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-4">
                    {categoryName(project.category)}
                  </span>
                  <h3 className="mt-3 flex items-center gap-2 font-display text-xl text-ink">
                    {project.title}
                    {project.url !== "#" && (
                      <ArrowUpRight
                        className="h-4 w-4 text-ink-4 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink"
                        strokeWidth={1.5}
                      />
                    )}
                  </h3>
                  <p className="mt-3 text-[13px] font-light leading-relaxed text-ink-3">
                    {project.description}
                  </p>
                </div>
              </>
            );

            return (
              <Reveal key={project.id} delay={i * 90} className="h-full">
                {project.url !== "#" ? (
                  <Link
                    href={project.url}
                    target="_blank"
                    className="panel panel-hover group flex h-full flex-col overflow-hidden rounded-2xl p-2"
                  >
                    {card}
                  </Link>
                ) : (
                  <div className="panel group flex h-full flex-col overflow-hidden rounded-2xl p-2">
                    {card}
                  </div>
                )}
              </Reveal>
            );
          })}
        </div>
      </OfferSection>

      <OfferCta
        title="Got a client asking for AI?"
        muted="Let's quote it together."
        body="Bring a real brief or just a hunch. In one call we'll tell you what's buildable, roughly what it costs, and how we'd deliver it under your name."
        button="Book a partner call"
        note="NDA as standard · Reply within 24 hours"
      />
    </OfferPage>
  );
}
