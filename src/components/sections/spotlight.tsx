"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "motion/react";
import { spotlight } from "@/lib/site";

/**
 * A tactile beat: the statement sits dim on black and is brightened by a soft
 * spotlight that tracks the pointer. The full text is always in the DOM and
 * legible (dim, not hidden) — the spotlight is enhancement, not a gate. On touch
 * / reduced motion the bright layer simply renders in full.
 */
export function Spotlight() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const sx = useSpring(mx, { stiffness: 90, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 90, damping: 18, mass: 0.6 });
  const mask = useMotionTemplate`radial-gradient(circle 22rem at ${sx}% ${sy}%, #000 0%, #000 30%, transparent 72%)`;

  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set(((e.clientX - r.left) / r.width) * 100);
    my.set(((e.clientY - r.top) / r.height) * 100);
  };

  const Statement = (
    <>
      {spotlight.lead}{" "}
      <span className="font-display font-normal italic">{spotlight.emphasis}</span>
    </>
  );

  const typeClass =
    "max-w-[16ch] text-[clamp(2rem,5.5vw,4.75rem)] font-medium leading-[1.02] tracking-[-0.03em]";

  return (
    <section
      ref={ref}
      onPointerMove={reduced ? undefined : onMove}
      aria-label="Our outlook"
      className="relative mx-auto max-w-[1280px] px-6 py-28 md:px-10 md:py-44"
    >
      <p className="label-mono mb-12">The long game</p>

      <div className="relative">
        {/* Dim base — always present and legible (readable on touch where there's
            no pointer to drive the spotlight) */}
        <h2 className={`${typeClass} text-bone/40`}>{Statement}</h2>

        {/* Bright layer, revealed by the spotlight (decorative duplicate) */}
        {reduced ? null : (
          <motion.p
            aria-hidden="true"
            className={`${typeClass} absolute inset-0 text-bone`}
            style={{ WebkitMaskImage: mask, maskImage: mask }}
          >
            {Statement}
          </motion.p>
        )}
      </div>
    </section>
  );
}
