import { LegalPage } from "@/components/legal-page";
import { siteConfig } from "@/config/site";
import type { Metadata } from "next";

// Env-driven so no address is hardcoded; the footer link stays the
// authoritative way to reach us when the variable is not set.
const CONTACT = siteConfig.email ?? "the contact address in the site footer";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "How WebChain Labs collects, uses and protects your data when you visit this website or get in touch about an engagement.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalPage
      label="Legal"
      title="Privacy Policy"
      updated="13 August 2026"
      intro="This policy explains what we collect when you visit webchain.ai or contact us, why we collect it, and the choices you have. The short version: we collect the minimum we need to respond to you and understand how the site is used, we don't sell personal data, and you can ask us at any time to show or delete what we hold."
      sections={[
        {
          heading: "Who is responsible",
          body: (
            <p>
              WebChain Labs (&ldquo;we&rdquo;, &ldquo;us&rdquo;), operating from Dubai and London,
              is the controller of personal data collected through this website. Contact:{" "}
              {CONTACT}.
            </p>
          ),
        },
        {
          heading: "What we collect",
          body: (
            <>
              <p>
                <span className="text-ink-2">Contact details you give us.</span> When you use the
                booking form we collect your name, email address and the message you write. That
                is the entire form.
              </p>
              <p>
                <span className="text-ink-2">Usage data.</span> Like most sites we receive
                technical data when you visit — IP address, browser type, pages viewed and
                approximate location — through the analytics services described below.
              </p>
            </>
          ),
        },
        {
          heading: "How we use it",
          body: (
            <>
              <p>We use personal data to:</p>
              <p>
                — respond to your enquiry and schedule the call you requested;
                <br />— understand how visitors use the site so we can improve it;
                <br />— keep the site secure and prevent abuse of our forms.
              </p>
              <p>
                We do not sell personal data, and we do not use the contents of your enquiries to
                train AI models.
              </p>
            </>
          ),
        },
        {
          heading: "Legal bases",
          body: (
            <p>
              Where GDPR or similar laws apply, we rely on legitimate interests (responding to
              enquiries you initiate, running and securing the site), consent where required for
              analytics cookies, and contract performance once an engagement begins.
            </p>
          ),
        },
        {
          heading: "Analytics",
          body: (
            <p>
              We use Google Analytics and Ahrefs Analytics to measure site usage. These services
              set identifiers and collect usage data described in their own privacy policies. We
              use the resulting reports in aggregate; we do not attempt to identify individual
              visitors from them.
            </p>
          ),
        },
        {
          heading: "Who we share it with",
          body: (
            <p>
              Data is processed by the service providers that run this site on our behalf: our
              hosting provider, our email provider (to deliver your enquiry to us), and the
              analytics services above. Each acts under its own data-processing terms. We may
              also disclose data where the law requires it.
            </p>
          ),
        },
        {
          heading: "International transfers",
          body: (
            <p>
              We operate from the UAE and the United Kingdom, and our providers may process data
              in other countries, including the United States. Where required, transfers are
              protected by recognised safeguards such as standard contractual clauses.
            </p>
          ),
        },
        {
          heading: "Retention",
          body: (
            <p>
              Enquiry emails are kept while we correspond with you and for a reasonable period
              afterwards, then deleted. Analytics data is retained on the schedules of the
              respective providers. Data connected to a client engagement is kept for the life of
              the engagement and as required for legal and accounting purposes.
            </p>
          ),
        },
        {
          heading: "Your rights",
          body: (
            <p>
              Depending on where you live, you may have the right to access, correct, delete or
              receive a copy of your personal data, to object to or restrict processing, and to
              complain to a supervisory authority. Email {CONTACT} and we will action your
              request promptly.
            </p>
          ),
        },
        {
          heading: "Security",
          body: (
            <p>
              The site is served over HTTPS, form submissions are transmitted encrypted, and
              access to enquiry data is limited to the people who need it to respond. No internet
              transmission is perfectly secure, but we design for the same caution we apply in
              client systems.
            </p>
          ),
        },
        {
          heading: "Children",
          body: (
            <p>
              This site is aimed at businesses and is not directed at children under 16. We do
              not knowingly collect their data; if you believe a child has provided us personal
              data, contact us and we will delete it.
            </p>
          ),
        },
        {
          heading: "Changes to this policy",
          body: (
            <p>
              We may update this policy as the site or the law changes. The date above reflects
              the latest revision; material changes will be visible on this page.
            </p>
          ),
        },
      ]}
    />
  );
}
