"use client";

import dynamic from "next/dynamic";
import { hero } from "@/lib/site";

// Defer WebGL: the dark gradient + headline paint first (good LCP), the shader
// hydrates and fades in afterwards. The text reveal is pure CSS, so it animates
// at first paint instead of waiting for JS to hydrate.
const ShaderAtmosphere = dynamic(
  () => import("@/components/ui/shader-atmosphere").then((m) => m.ShaderAtmosphere),
  { ssr: false },
);

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden"
      aria-label="Introduction"
    >
      <ShaderAtmosphere />
      {/* fade the atmosphere into the page */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-64 bg-gradient-to-b from-transparent to-black" />

      <div className="relative z-20 mx-auto flex w-full max-w-[1280px] flex-col px-6 pt-28 md:px-10">
        {/* CSS-driven reveal: starts at first paint, so the text never waits on
            JS hydration. Reduced-motion users get it instantly (globals.css). */}
        <p
          className="label-mono mb-8 [animation:soft-rise_0.8s_cubic-bezier(0.16,1,0.3,1)_both]"
          style={{ animationDelay: "0.05s" }}
        >
          {hero.label}
        </p>

        <h1 className="max-w-[16ch] text-[clamp(2.75rem,8vw,8rem)] font-medium leading-[0.95] tracking-[-0.03em] text-bone">
          {hero.headline.map((part, i) => (
            <Word key={i} delay={0.12 + i * 0.08}>
              {part === hero.emphasis ? (
                <span className="font-display font-normal italic">{part}</span>
              ) : (
                part
              )}
            </Word>
          ))}
        </h1>

        <p
          className="mt-10 max-w-[46ch] text-lg leading-relaxed text-bone-dim [animation:soft-rise_0.9s_cubic-bezier(0.16,1,0.3,1)_both] md:text-xl"
          style={{ animationDelay: "0.45s" }}
        >
          {hero.sub}
        </p>
      </div>
    </section>
  );
}

function Word({
  children,
  delay,
}: {
  children: React.ReactNode;
  delay: number;
}) {
  return (
    <span
      className="inline-block overflow-hidden align-top"
      style={{ marginRight: "0.26em" }}
    >
      <span
        className="inline-block [animation:word-rise_1s_cubic-bezier(0.16,1,0.3,1)_both]"
        style={{ animationDelay: `${delay}s` }}
      >
        {children}
      </span>
    </span>
  );
}
