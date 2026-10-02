import { ogCard } from "@/lib/og-card";

export const alt =
  "WebChain Studio: the repetitive admin in your job ad, done every day in your own systems";
export { contentType, size } from "@/lib/og-card";

export default function OpengraphImage() {
  return ogCard({
    eyebrow: "WebChain Studio · Admin, done for you",
    headline: "The admin in your job ad,",
    muted: "done every day, in your systems.",
    blurb:
      "Invoice chasing, supplier invoices, orders and quotes, handled for UK businesses in Xero, Sage, QuickBooks, Excel and your inbox.",
  });
}
