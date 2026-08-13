import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

// Env-driven so no address is hardcoded; the footer link stays the
// authoritative way to reach us when the variable is not set.
const CONTACT = siteConfig.email ?? "the contact address in the site footer";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "The terms that govern your use of the WebChain Labs website and our engagements for AI automation and autonomous system development.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalPage
      label="Legal"
      title="Terms of Service"
      updated="13 August 2026"
      intro="These terms govern your use of the WebChain Labs website and, unless superseded by a signed agreement, form the baseline for our client engagements. By using this site or engaging our services you accept them. If a statement of work or master services agreement exists between us, that document prevails wherever the two conflict."
      sections={[
        {
          heading: "Who we are",
          body: (
            <p>
              WebChain Labs (&ldquo;WebChain&rdquo;, &ldquo;we&rdquo;, &ldquo;us&rdquo;) designs
              and engineers custom AI agents and autonomous systems, operating from Dubai and
              London. You can reach us at {CONTACT}.
            </p>
          ),
        },
        {
          heading: "Use of this website",
          body: (
            <>
              <p>
                You may browse this site and use its contact features for their intended purpose:
                learning about our work and getting in touch. You agree not to misuse the site —
                including attempting to breach its security, scraping it at disruptive volume,
                or submitting unlawful, deceptive or malicious content through our forms.
              </p>
              <p>
                We may suspend or restrict access to the site at any time, without notice, for
                maintenance or any other reason.
              </p>
            </>
          ),
        },
        {
          heading: "Proposals and engagements",
          body: (
            <p>
              Descriptions of our services on this site are informational and do not constitute a
              binding offer. Engagements are scoped in phases and confirmed in writing — typically
              a proposal or statement of work covering deliverables, timeline and fees. Work
              begins only once that document is agreed and any initial payment described in it has
              been received.
            </p>
          ),
        },
        {
          heading: "Fees and payment",
          body: (
            <p>
              Fees are fixed per phase unless agreed otherwise in writing. Invoices are payable
              within the period stated on the invoice. We may pause work on overdue accounts after
              giving notice. Fees exclude taxes, which are added where applicable.
            </p>
          ),
        },
        {
          heading: "Intellectual property",
          body: (
            <>
              <p>
                On full payment for a phase, the deliverables produced specifically for you in
                that phase are assigned to you. We retain ownership of our pre-existing materials
                — frameworks, internal tooling, libraries and general know-how — and grant you a
                perpetual, non-exclusive licence to use them as embedded in your deliverables.
              </p>
              <p>
                The WebChain Labs name, brand and the content of this website remain our property
                and may not be reproduced without permission.
              </p>
            </>
          ),
        },
        {
          heading: "Confidentiality",
          body: (
            <p>
              Each party keeps the other&rsquo;s non-public information confidential and uses it
              only for the engagement. We are happy to work under your NDA. We may name you as a
              client and describe the engagement in general terms unless you ask us not to.
            </p>
          ),
        },
        {
          heading: "Third-party services and AI models",
          body: (
            <p>
              Systems we build commonly depend on third-party infrastructure and AI model
              providers. Those services are governed by their own terms and pricing, which you
              accept when the system uses them under your accounts. Probabilistic components are
              engineered with evaluation and guardrails, but no AI system is error-free; agreed
              acceptance criteria in the statement of work define what &ldquo;working&rdquo;
              means.
            </p>
          ),
        },
        {
          heading: "Disclaimers",
          body: (
            <p>
              This website and its content are provided &ldquo;as is&rdquo; without warranties of
              any kind. Nothing on this site is professional advice for your specific situation,
              and case-study figures describe particular engagements rather than promised
              outcomes.
            </p>
          ),
        },
        {
          heading: "Limitation of liability",
          body: (
            <p>
              To the fullest extent permitted by law, we are not liable for indirect or
              consequential losses, loss of profits, revenue or data arising from use of this
              website. For client engagements, our total aggregate liability is capped at the
              fees paid for the phase giving rise to the claim, except where liability cannot be
              limited by law.
            </p>
          ),
        },
        {
          heading: "Termination",
          body: (
            <p>
              Either party may end an engagement at a phase boundary with written notice. Fees for
              work performed up to the effective date remain payable, and sections on intellectual
              property, confidentiality and liability survive termination.
            </p>
          ),
        },
        {
          heading: "Changes to these terms",
          body: (
            <p>
              We may revise these terms from time to time. The date above reflects the latest
              revision, and continued use of the site after a change constitutes acceptance. For
              active engagements, changes apply only from the next agreed phase.
            </p>
          ),
        },
        {
          heading: "Contact",
          body: (
            <p>
              Questions about these terms? Write to us at {CONTACT} and we&rsquo;ll come back to
              you within one business day.
            </p>
          ),
        },
      ]}
    />
  );
}
