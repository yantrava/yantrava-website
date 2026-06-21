"use client";

import { manifesto, model } from "@/lib/site";
import { FadeUp } from "@/components/ui/fade-up";
import { RevealText } from "@/components/ui/reveal-text";

export function Model() {
  return (
    <section
      id="model"
      className="relative mx-auto max-w-[1280px] scroll-mt-24 px-6 py-28 md:px-10 md:py-44"
      aria-label="The model"
    >
      {/* Manifesto: the emotional thesis, revealed word by word */}
      <div className="max-w-[820px]">
        <FadeUp>
          <p className="mb-6 max-w-[34ch] text-lg text-bone-faint md:text-xl">
            {manifesto.lead}
          </p>
        </FadeUp>
        <RevealText
          as="p"
          scrub
          className="text-[clamp(1.6rem,3.6vw,3rem)] font-medium leading-[1.12] tracking-[-0.02em] text-bone"
        >
          {manifesto.body}
        </RevealText>
      </div>

      <div className="mt-24 h-px w-full bg-[--color-ink-line] md:mt-36" />

      {/* The structural explanation */}
      <div className="mt-16 grid gap-12 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <h2 className="text-balance text-2xl font-medium leading-snug tracking-[-0.01em] text-bone md:sticky md:top-28 md:text-[2rem]">
            {model.heading}
          </h2>
        </div>
        <div className="space-y-8 md:col-span-6 md:col-start-7">
          {model.paragraphs.map((p, i) => (
            <FadeUp key={i} delay={i * 0.05}>
              <p className="text-pretty text-lg leading-relaxed text-bone-dim">{p}</p>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
