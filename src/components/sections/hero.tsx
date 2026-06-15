"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "motion/react";
import { hero } from "@/lib/site";

// Defer WebGL entirely: the dark gradient + headline paint first (good LCP),
// the shader hydrates and fades in afterwards.
const ShaderAtmosphere = dynamic(
  () => import("@/components/ui/shader-atmosphere").then((m) => m.ShaderAtmosphere),
  { ssr: false },
);

export function Hero() {
  const reduced = useReducedMotion();
  const ease = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between overflow-hidden"
      aria-label="Introduction"
    >
      <ShaderAtmosphere />
      {/* fade the atmosphere into the page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-64 bg-gradient-to-b from-transparent to-black" />

      <div className="relative z-20 mx-auto flex w-full max-w-[1280px] flex-1 flex-col justify-center px-6 pt-28 md:px-10">
        <motion.p
          className="label-mono mb-8"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
        >
          {hero.label}
        </motion.p>

        <h1 className="max-w-[16ch] text-[clamp(2.75rem,8vw,8rem)] font-medium leading-[0.95] tracking-[-0.03em] text-bone">
          {hero.headline.map((part, i) =>
            part === hero.emphasis ? (
              <Word key={i} delay={0.2 + i * 0.08} reduced={reduced}>
                <span className="font-display font-normal italic text-bone">
                  {part}
                </span>{" "}
              </Word>
            ) : (
              <Word key={i} delay={0.2 + i * 0.08} reduced={reduced}>
                {part}{" "}
              </Word>
            ),
          )}
        </h1>

        <motion.p
          className="mt-10 max-w-[46ch] text-lg leading-relaxed text-bone-dim md:text-xl"
          initial={reduced ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease }}
        >
          {hero.sub}
        </motion.p>
      </div>

      <motion.div
        className="relative z-20 mx-auto flex w-full max-w-[1280px] items-center justify-between px-6 pb-8 md:px-10"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.9 }}
      >
        <span className="label-mono">Scroll</span>
        <span className="label-mono hidden md:block">Investors · Recruits · Partners · Press</span>
        <motion.span
          aria-hidden
          className="block h-10 w-px origin-top bg-bone-faint"
          animate={reduced ? {} : { scaleY: [0.2, 1, 0.2] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
}

function Word({
  children,
  delay,
  reduced,
}: {
  children: React.ReactNode;
  delay: number;
  reduced: boolean | null;
}) {
  return (
    <span
      className="inline-block overflow-hidden align-top"
      style={{ marginRight: "0.26em" }}
    >
      <motion.span
        className="inline-block"
        initial={reduced ? false : { y: "110%" }}
        animate={{ y: 0 }}
        transition={{ duration: 1, delay, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.span>
    </span>
  );
}
