"use client";

import { values } from "@/lib/site";
import { FadeUp } from "@/components/ui/fade-up";

export function Values() {
  return (
    <section
      id="values"
      aria-label="Principles"
      className="mx-auto max-w-[1280px] scroll-mt-24 px-6 py-28 md:px-10 md:py-44"
    >
      <h2 className="sr-only">How we build</h2>
      <FadeUp>
        <p className="label-mono mb-12" aria-hidden="true">How we build</p>
      </FadeUp>

      <div className="border-t border-[--color-ink-line]">
        {values.map((v, i) => (
          <FadeUp key={v.index} delay={i * 0.04}>
            <div className="group grid grid-cols-1 gap-4 border-b border-[--color-ink-line] py-10 transition-colors md:grid-cols-12 md:gap-10 md:py-14">
              <span className="font-mono text-sm text-bone-faint md:col-span-2">
                {v.index}
              </span>
              <h3 className="text-3xl font-medium tracking-[-0.02em] text-bone transition-transform duration-500 ease-out group-hover:translate-x-2 md:col-span-4 md:text-4xl">
                {v.title}
              </h3>
              <p className="max-w-[44ch] text-lg leading-relaxed text-bone-dim md:col-span-6">
                {v.body}
              </p>
            </div>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}
