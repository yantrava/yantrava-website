"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ventures } from "@/lib/site";

/**
 * Ventures showcase. On desktop (and when motion is allowed) the panels pin and
 * scroll horizontally — an intro panel followed by one panel per venture. On
 * mobile or under reduced-motion the same panels stack and scroll vertically,
 * so no content or meaning is lost.
 */
export function Ventures() {
  const container = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(
        "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
        () => {
          const el = track.current!;
          gsap.set(el, { display: "flex", flexDirection: "row" });
          gsap.set(".v-panel", { width: "100vw", flexShrink: 0 });

          const distance = () => el.scrollWidth - window.innerWidth;
          const tween = gsap.to(el, { x: () => -distance(), ease: "none" });

          ScrollTrigger.create({
            trigger: container.current,
            start: "top top",
            end: () => "+=" + distance(),
            pin: true,
            scrub: 1,
            animation: tween,
            invalidateOnRefresh: true,
          });

          gsap.to(".v-progress", {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: container.current,
              start: "top top",
              end: () => "+=" + distance(),
              scrub: true,
            },
          });
        },
      );
      return () => mm.revert();
    },
    { scope: container },
  );

  return (
    <section id="ventures" aria-label="Ventures" className="relative scroll-mt-24">
      <div ref={container} className="relative overflow-hidden">
        <div ref={track}>
          {/* Intro panel */}
          <div className="v-panel flex min-h-[80vh] flex-col justify-center px-6 md:h-screen md:px-16">
            <div className="mx-auto w-full max-w-[1100px]">
              <p className="label-mono mb-8">Ventures — 02</p>
              <h2 className="max-w-[18ch] text-[clamp(2.2rem,5.5vw,5rem)] font-medium leading-[0.98] tracking-[-0.03em] text-bone">
                Two ventures.{" "}
                <span className="font-display font-normal italic">
                  One way of building.
                </span>
              </h2>
              <p className="mt-8 max-w-[42ch] text-lg text-bone-dim">
                Independent brands, built by the same hands. Scroll across.
              </p>
            </div>
          </div>

          {ventures.map((v, i) => (
            <VenturePanel key={v.id} venture={v} index={i + 1} />
          ))}
        </div>

        {/* horizontal scroll progress — inside the pinned container (desktop) */}
        <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 mx-auto hidden w-full max-w-[1100px] px-16 md:block">
          <div className="relative h-px w-full bg-[--color-ink-line]">
            <div className="v-progress absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-bone" />
          </div>
        </div>
      </div>
    </section>
  );
}

function VenturePanel({
  venture,
  index,
}: {
  venture: (typeof ventures)[number];
  index: number;
}) {
  return (
    <article className="v-panel flex min-h-screen items-center px-6 py-24 md:h-screen md:px-16 md:py-0">
      <div className="mx-auto grid w-full max-w-[1100px] items-center gap-10 md:grid-cols-2 md:gap-16">
        {/* Visual frame — abstract, two-tone, accent used only as a faint glow */}
        <div className="relative order-2 aspect-[4/5] w-full overflow-hidden rounded-2xl border border-[--color-ink-line] md:order-1">
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(80% 60% at 50% 30%, ${venture.accent}40, transparent 60%), #060606`,
            }}
          />
          <div className="absolute inset-0 flex items-end p-8">
            <span className="font-display text-[clamp(3rem,7vw,6rem)] italic leading-none text-bone/12">
              {venture.name}
            </span>
          </div>
          <span className="label-mono absolute left-8 top-8">{venture.domain}</span>
        </div>

        {/* Copy */}
        <div className="order-1 md:order-2">
          <div className="mb-6 flex items-center gap-4">
            <span className="font-mono text-sm text-bone-faint">
              0{index}
            </span>
            <span className="h-px w-10 bg-[--color-ink-line]" />
            <span className="label-mono">{venture.stage}</span>
          </div>
          <h3 className="text-[clamp(2.5rem,6vw,4.5rem)] font-medium leading-none tracking-[-0.03em] text-bone">
            {venture.name}
          </h3>
          <p className="mt-5 font-display text-2xl italic text-bone md:text-3xl">
            {venture.tagline}
          </p>
          <p className="mt-6 max-w-[44ch] text-lg leading-relaxed text-bone-dim">
            {venture.body}
          </p>
        </div>
      </div>
    </article>
  );
}
