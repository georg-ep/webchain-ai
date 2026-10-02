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
import {
  CalendarCheck,
  ClipboardList,
  Eye,
  FileSpreadsheet,
  FileText,
  Inbox,
  MapPin,
  Receipt,
  ShieldCheck,
  Sheet,
} from "lucide-react";
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
    Icon: Receipt,
    points: [
      "Reminders sent on a set schedule, from your own email address",
      "Every customer reply logged against their account",
      "Your aged-debt position in your inbox every Monday",
    ],
  },
  {
    kicker: "Purchase ledger",
    title: "Processing supplier invoices",
    Icon: Inbox,
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
    Icon: ClipboardList,
    points: [
      "Orders that arrive by email or PDF entered into your system",
      "Order confirmation sent to the customer",
      "Anything unclear flagged to you before it goes in",
    ],
  },
  {
    kicker: "Sales admin",
    title: "Preparing quotes",
    Icon: FileText,
    points: [
      "Customer enquiry read and the request worked out",
      "Priced from your own price list",
      "Quote drafted and ready for you to check and send",
    ],
  },
  {
    kicker: "Scheduling",
    title: "Booking engineers and site visits",
    Icon: CalendarCheck,
    points: [
      "Visits booked into the right diary",
      "Confirmation sent to the customer",
      "Reminder sent before the visit",
    ],
  },
  {
    kicker: "Office admin",
    title: "Data entry and reporting",
    Icon: FileSpreadsheet,
    points: [
      "Spreadsheets and records kept up to date",
      "A weekly report sent to you, in the format you already use",
    ],
  },
];

const STEPS = [
  {
    title: "A 15-minute call",
    body: "Tell us which task from your job ad you want handled and which tools you use. Nothing to prepare.",
  },
  {
    title: "We map it and fix the price",
    body: "We write the task down step by step, exactly as you do it today, and quote one fixed monthly price.",
  },
  {
    title: "Running within about two weeks",
    body: "Set up inside the systems you already use. No new software for you or your team to learn.",
  },
  {
    title: "You approve what matters",
    body: "Nothing goes out unchecked until you say so. You decide what needs your sign-off, and for how long.",
  },
];

const TRUST: OfferCardItem[] = [
  {
    title: "Your data stays in your systems",
    Icon: ShieldCheck,
    body: "We work inside your accounting package, inbox and spreadsheets. Your records stay where they are; nothing moves to a new platform you'd have to leave later.",
  },
  {
    title: "You see every action",
    Icon: Eye,
    body: "Every email sent and every entry posted is logged, so you can see what was done, when, and why, at any time.",
  },
  {
    title: "UK-based",
    Icon: MapPin,
    body: "We're a UK-based team working with UK businesses, on UK invoicing and the accounting packages you already use.",
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
            <span className="bg-gradient-to-br from-signal via-signal to-emerald-200 bg-clip-text text-transparent">
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
          <ChecklistPanel
            label="Works inside"
            items={[
              <>
                <span className="text-ink">Xero, Sage or QuickBooks</span>: bills, invoices and
                customer accounts
              </>,
              <>
                <span className="text-ink">Excel</span>: the spreadsheets your team already
                keeps
              </>,
              <>
                <span className="text-ink">Your email inbox</span>: sent from your address, in
                your tone
              </>,
            ]}
            footer="No new software · Your logins · Your records"
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
          <div className="panel relative overflow-hidden rounded-2xl px-7 py-10 lg:px-12 lg:py-12">
            <div
              aria-hidden
              className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(52,211,153,0.10),transparent_65%)] blur-xl"
            />
            <div className="relative grid grid-cols-1 gap-6 lg:grid-cols-12 lg:items-center lg:gap-12">
              <h2 className="font-display text-2xl leading-snug tracking-[-0.01em] text-ink md:text-3xl lg:col-span-5">
                Still make the hire.{" "}
                <span className="text-ink-3">Give them the work that needs a person.</span>
              </h2>
              <p className="text-[15px] font-light leading-relaxed text-ink-2 lg:col-span-6 lg:col-start-7">
                We sit beside your team, not in place of it. While you recruit, the routine work
                keeps moving. Once your new starter arrives, they spend their days on customers,
                judgement calls and the things that go wrong, not on keying, chasing and matching.
              </p>
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
        <OfferCards items={TRUST} />
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
