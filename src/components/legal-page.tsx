import { PageBackdrop } from "@/components/page-backdrop";
import { SectionLabel } from "@/components/section-label";
import { SiteFooter } from "@/components/site-footer";
import { SiteNav } from "@/components/site-nav";

export interface LegalSection {
  heading: string;
  body: React.ReactNode;
}

/**
 * Shared frame for the legal pages: same nav, backdrop and footer as the
 * home page, with a numbered single-column document in between.
 */
export function LegalPage({
  label,
  title,
  updated,
  intro,
  sections,
}: {
  label: string;
  title: string;
  updated: string;
  intro: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <SiteNav />
      <PageBackdrop />

      <main className="relative overflow-x-clip">
        <div className="px-6 pb-24 pt-40 lg:px-12">
          <div className="mx-auto max-w-3xl">
            <SectionLabel>{label}</SectionLabel>

            <h1 className="mt-7 font-display text-4xl tracking-[-0.02em] text-ink md:text-5xl">
              {title}
            </h1>
            <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-4">
              Last updated · {updated}
            </p>

            <p className="mt-10 text-[15px] font-light leading-relaxed text-ink-2">{intro}</p>

            <div className="mt-14 space-y-12">
              {sections.map(({ heading, body }, i) => (
                <section key={heading}>
                  <div className="flex items-baseline gap-4">
                    <span className="font-mono text-[10px] tracking-[0.2em] text-ink-4">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-xl text-ink">{heading}</h2>
                  </div>
                  <div className="mt-4 space-y-4 border-l border-line pl-[2.15rem] text-sm font-light leading-relaxed text-ink-3">
                    {body}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>

        <SiteFooter />
      </main>
    </>
  );
}
