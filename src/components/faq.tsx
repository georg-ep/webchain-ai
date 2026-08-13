"use client";

import { faqItems } from "@/data/faq";
import { Plus } from "lucide-react";
import { Accordion } from "radix-ui";

/**
 * Objection-handling accordion. The same copy is emitted as FAQPage
 * structured data from `StructuredData`, so edits belong in `data/faq.ts`.
 */
export function Faq() {
  return (
    <Accordion.Root
      type="single"
      collapsible
      defaultValue={faqItems[0].id}
      className="panel divide-y divide-line overflow-hidden rounded-2xl"
    >
      {faqItems.map(({ id, question, answer }, i) => (
        <Accordion.Item key={id} value={id} className="group">
          <Accordion.Header asChild>
            <h3 className="font-sans">
              <Accordion.Trigger className="flex w-full items-center justify-between gap-6 px-7 py-6 text-left transition-colors duration-300 hover:bg-white/[0.02] lg:px-9">
                <span className="flex items-baseline gap-5">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-ink-4">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-lg text-ink transition-colors duration-300 md:text-xl">
                    {question}
                  </span>
                </span>
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line text-ink-3 transition-all duration-500 [transition-timing-function:var(--ease-out-expo)] group-data-[state=open]:rotate-45 group-data-[state=open]:border-signal/40 group-data-[state=open]:text-signal">
                  <Plus className="h-3.5 w-3.5" strokeWidth={1.5} />
                </span>
              </Accordion.Trigger>
            </h3>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
            <p className="max-w-3xl px-7 pb-7 pl-[4.15rem] pr-10 text-sm font-light leading-relaxed text-ink-2 lg:px-9 lg:pl-[4.65rem]">
              {answer}
            </p>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
