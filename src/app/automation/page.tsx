import { ActivityLog, type ActivityEntry } from "@/components/explainers/activity-log";
import {
  ApproveScene,
  CallScene,
  HireSplitScene,
  MapPriceScene,
  PlugInScene,
} from "@/components/explainers/automation-scenes";
import {
  FlowExplainer,
  type FlowInput,
  type FlowOutput,
} from "@/components/explainers/flow-explainer";
import { TaskStory } from "@/components/explainers/task-scenes";
import {
  BookButton,
  GhostLink,
  OfferCards,
  OfferCta,
  OfferHero,
  OfferList,
  OfferPage,
  OfferSection,
  OfferSteps,
  type OfferCardItem,
} from "@/components/offer-page";
import { Reveal } from "@/components/reveal";
import { SectionBridge } from "@/components/section-bridge";
import { siteConfig } from "@/config/site";
import { Eye, MapPin, ShieldCheck, Sheet } from "lucide-react";
import type { Metadata } from "next";

const TITLE = "Admin and finance tasks, done for you";
const DESCRIPTION =
  "Hiring a purchase ledger clerk, credit controller or order processor? We take the repetitive part of the role off your plate, every day, inside Xero, Sage, QuickBooks, Excel and your inbox.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: "/automation" },
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: `${siteConfig.url}/automation`,
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

/**
 * Each card is one task as it appears in a job ad, with the role it usually
 * sits under as the kicker so the reader recognises their own advert.
 */
const TASKS: OfferCardItem[] = [
  {
    kicker: "Credit control",
    title: "Chasing overdue invoices",
    visual: <TaskStory kind="chase" />,
    points: [
      "Reminders sent on a set schedule, from your own email address",
      "Every customer reply logged against their account",
      "Your aged-debt position in your inbox every Monday",
    ],
  },
  {
    kicker: "Purchase ledger",
    title: "Processing supplier invoices",
    visual: <TaskStory kind="match" />,
    points: [
      "Invoices picked up from your accounts inbox",
      "Matched to the purchase order",
      "Posted to your accounting system, ready for you to approve",
      "Anything that doesn't match is flagged, never forced through",
    ],
  },
  {
    kicker: "Order processing",
    title: "Entering customer orders",
    visual: <TaskStory kind="order" />,
    points: [
      "Orders that arrive by email or PDF entered into your system",
      "Order confirmation sent to the customer",
      "Anything unclear flagged to you before it goes in",
    ],
  },
  {
    kicker: "Sales admin",
    title: "Preparing quotes",
    visual: <TaskStory kind="quote" />,
    points: [
      "Customer enquiry read and the request worked out",
      "Priced from your own price list",
      "Quote drafted and ready for you to check and send",
    ],
  },
  {
    kicker: "Scheduling",
    title: "Booking engineers and site visits",
    visual: <TaskStory kind="booking" />,
    points: [
      "Visits booked into the right diary",
      "Confirmation sent to the customer",
      "Reminder sent before the visit",
    ],
  },
  {
    kicker: "Office admin",
    title: "Data entry and reporting",
    visual: <TaskStory kind="report" />,
    points: [
      "Spreadsheets and records kept up to date",
      "A weekly report sent to you, in the format you already use",
    ],
  },
];

const STEPS = [
  {
    title: "A 15-minute call",
    body: "Which task, and which tools. Nothing to prepare.",
    visual: <CallScene />,
  },
  {
    title: "We map it and fix the price",
    body: "Written down step by step, as you do it today. One monthly price.",
    visual: <MapPriceScene />,
  },
  {
    title: "Running within about two weeks",
    body: "Inside the systems you already use. Nothing new to learn.",
    visual: <PlugInScene />,
  },
  {
    title: "You approve what matters",
    body: "Nothing goes out unchecked until you say so.",
    visual: <ApproveScene />,
  },
];

const TRUST: OfferCardItem[] = [
  {
    title: "Your data stays in your systems",
    Icon: ShieldCheck,
    body: "We work inside your accounting package, inbox and spreadsheets. Nothing moves.",
  },
  {
    title: "You see every action",
    Icon: Eye,
    body: "Every email sent and every entry posted is logged, like the day shown here.",
  },
  {
    title: "UK-based",
    Icon: MapPin,
    body: "A UK team, working on UK invoicing in the packages you already use.",
  },
];

/** The hero diagram: the job-ad work arriving, and where it ends up. */
const HERO_INPUTS: FlowInput[] = [
  { label: "Supplier invoice", meta: "Accounts inbox", glyph: "doc" },
  { label: "Customer order", meta: "Email · PDF", glyph: "mail" },
  { label: "Overdue invoice", meta: "Aged debt", glyph: "ledger" },
];

const HERO_OUTPUTS: FlowOutput[] = [
  { label: "Posted to Xero", meta: "Ready to approve", tone: "done" },
  { label: "Order confirmed", meta: "From your address", tone: "done" },
  { label: "Chaser drafted", meta: "Waiting for your OK", tone: "review" },
];

/**
 * A morning's log, as the customer would see it. Illustrative: the
 * references are made up and no customer is named.
 */
const ACTIVITY: ActivityEntry[] = [
  {
    time: "08:02",
    title: "Reminder sent",
    detail: "INV-1042, day 7 reminder, sent from your own accounts address",
  },
  {
    time: "08:15",
    title: "Supplier invoice matched",
    detail: "Matched to PO-311 and posted as a draft bill",
    tone: "review",
  },
  {
    time: "08:41",
    title: "Order entered",
    detail: "Order from a PDF attachment, confirmation sent to the customer",
  },
  {
    time: "09:03",
    title: "Reply logged",
    detail: "Customer on INV-1042 promised payment Friday, noted on the account",
  },
  {
    time: "09:20",
    title: "Draft bill approved by you",
    detail: "PO-311 bill released for payment",
    tone: "approved",
  },
];

const PRICING_POINTS = [
  "One fixed monthly price per task, quoted after the call",
  "No setup project and no hourly billing",
  "Cancel any month",
];

export default function AutomationPage() {
  return (
    <OfferPage>
      <OfferHero
        eyebrow="Done-for-you admin · UK businesses"
        title={
          <>
            <span className="text-gradient">The repetitive admin in your job ad, </span>
            <span className="text-spark">
              done every day
            </span>
            <span className="text-gradient"> from next week, in your own systems.</span>
          </>
        }
        lede={
          <p>
            Chasing invoices, posting supplier bills, keying in orders. We take that work off your
            plate as a service, running on our own AI pipelines and wired into the tools you
            already use.
          </p>
        }
        actions={
          <>
            <BookButton>Book a 15-min call</BookButton>
            <GhostLink href="#tasks">What we take on</GhostLink>
          </>
        }
        note="Fixed monthly price · Cancel any month · Nothing sent without your say-so"
        aside={
          <FlowExplainer
            label="Diagram: supplier invoices, customer orders and overdue invoices arrive in your inbox. WebChain posts the bill to Xero ready to approve, confirms the order from your address, and drafts the chaser for your OK."
            inputs={HERO_INPUTS}
            outputs={HERO_OUTPUTS}
          />
        }
      />

      <SectionBridge />

      <OfferSection
        id="tasks"
        label="What we take on"
        title={
          <>
            One task or several.{" "}
            <span className="text-ink-3">Each one done in full, every working day.</span>
          </>
        }
        intro={
          <p>
            These are the jobs that fill most admin and finance job ads. Pick the ones that eat
            your week; we run them from start to finish and hand you anything that needs a
            decision.
          </p>
        }
        glow="signal"
      >
        <OfferCards items={TASKS} />

        <Reveal delay={100}>
          <p className="mt-8 flex items-center gap-3 text-sm font-light text-ink-3">
            <Sheet className="h-4 w-4 shrink-0 text-ink-4" strokeWidth={1.5} />
            Something else in your job ad? If it&apos;s repetitive and lives in email, spreadsheets
            or your accounts package, ask us on the call.
          </p>
        </Reveal>
      </OfferSection>

      {/* Beside the hire, never instead of it. */}
      <section className="relative px-6 pb-16 lg:px-12">
        <Reveal className="relative mx-auto max-w-[1400px]">
          <div className="panel relative overflow-hidden rounded-2xl px-4 py-8 sm:px-7 sm:py-10 lg:px-12 lg:py-12">
            <div className="relative grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-center lg:gap-12">
              <div className="lg:col-span-5">
                <h2 className="font-display text-2xl leading-snug tracking-[-0.01em] text-ink md:text-3xl">
                  Still make the hire.{" "}
                  <span className="text-ink-3">Give them the work that needs a person.</span>
                </h2>
                <p className="mt-5 max-w-md text-[15px] font-light leading-relaxed text-ink-2">
                  We sit beside your team, not in place of it.
                </p>
              </div>
              <div className="rounded-xl border border-line bg-surface-0 p-2 sm:p-8 lg:col-span-7">
                <HireSplitScene className="mx-auto max-w-[560px]" />
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <SectionBridge delay={0.9} />

      <OfferSection
        id="how"
        label="How it works"
        title={
          <>
            From a short call{" "}
            <span className="text-ink-3">to the work running in your systems.</span>
          </>
        }
        glow="indigo"
      >
        <OfferSteps steps={STEPS} />
      </OfferSection>

      <SectionBridge delay={1.8} />

      <OfferSection
        id="pricing"
        label="Pricing"
        title={
          <>
            A fixed monthly price <span className="text-ink-3">for each task.</span>
          </>
        }
        intro={
          <p>
            You pay for the work being done, not for a project to build it. We quote after the
            call, once we&apos;ve seen how the task runs in your business.
          </p>
        }
      >
        <Reveal>
          <div className="panel relative grid grid-cols-1 overflow-hidden rounded-2xl lg:grid-cols-12">
            <div className="border-b border-line p-7 lg:col-span-5 lg:border-b-0 lg:border-r lg:p-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-4">
                Per task, per month
              </span>
              {/* TODO George: price */}
              <p className="mt-5 font-display text-4xl tracking-[-0.02em] text-ink md:text-5xl">
                From £___
                <span className="mt-2 block text-lg text-ink-3 sm:ml-2 sm:mt-0 sm:inline md:text-xl">
                  / month per task
                </span>
              </p>
            </div>
            <ul className="space-y-4 p-7 lg:col-span-7 lg:p-10">
              {PRICING_POINTS.map((point) => (
                <li key={point} className="flex items-start gap-4">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-signal/70" />
                  <span className="text-[15px] font-light leading-relaxed text-ink-2">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </OfferSection>

      <SectionBridge delay={0.5} />

      <OfferSection
        id="trust"
        label="Your business, your control"
        title={
          <>
            Nothing hidden, <span className="text-ink-3">nothing moved.</span>
          </>
        }
        glow="signal"
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <ActivityLog entries={ACTIVITY} />
          </Reveal>
          <div className="lg:col-span-5">
            <OfferList items={TRUST} />
          </div>
        </div>
      </OfferSection>

      <OfferCta
        title="Which task is first?"
        muted="Fifteen minutes to find out."
        body="Tell us the role you're hiring for. We'll tell you which parts of it we can take on, and what it would cost each month."
        button="Book a 15-min call"
        note="No obligation · Reply within 24 hours"
      />
    </OfferPage>
  );
}
