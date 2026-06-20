"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

/**
 * Drives buttery scroll with Lenis and keeps GSAP ScrollTrigger in lockstep
 * by running both off GSAP's ticker. Disabled when the user prefers reduced
 * motion so the page falls back to native, instant scrolling.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Recompute trigger positions after the real web-font swap (the `load` event
    // fires on subresources, not the font swap, so split/line metrics can shift
    // after it). fonts.ready covers everyone, including reduced-motion users.
    const refreshOnFonts = () => {
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
    };

    if (prefersReducedMotion()) {
      refreshOnFonts();
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    // Settle layout once fonts/images are in. fonts.ready fires after the swap;
    // `load` is kept as a belt-and-braces fallback for image-driven reflow.
    const refresh = () => ScrollTrigger.refresh();
    refreshOnFonts();
    window.addEventListener("load", refresh);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      window.removeEventListener("load", refresh);
    };
  }, []);

  return <>{children}</>;
}
