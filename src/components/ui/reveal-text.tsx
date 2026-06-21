"use client";

import { useRef } from "react";
import SplitType from "split-type";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Word-by-word rise reveal that plays once as the block enters view (self-paced,
 * not coupled to scroll velocity). Text stays in the DOM (split-type only wraps
 * existing nodes), so it remains selectable and indexable for SEO. No-ops into a
 * plain render when reduced motion is requested.
 */
export function RevealText({
  children,
  className = "",
  as: Tag = "p",
  scrub = false,
}: {
  children: string;
  className?: string;
  as?: "p" | "h2" | "h3";
  /** When true, word reveal is scrubbed to scroll position (the Linear/Cosmos feel). */
  scrub?: boolean;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const split = new SplitType(ref.current, { types: "words,lines" });
      gsap.set(split.words, { yPercent: 110, opacity: 0 });
      gsap.to(split.words, {
        yPercent: 0,
        opacity: 1,
        // Smooth, self-paced reveal: plays once at a controlled tempo when the
        // block enters view, so the rhythm never couples to scroll velocity (the
        // old scrub felt clunky/rushed on a fast scroll). The gentle stagger lets
        // the words flow up rather than pop in groups.
        duration: scrub ? 1.1 : 0.9,
        ease: "power3.out",
        stagger: scrub ? 0.11 : 0.035,
        scrollTrigger: {
          trigger: ref.current,
          start: scrub ? "top 78%" : "top 82%",
          once: true,
        },
      });
      return () => {
        split.revert();
        ScrollTrigger.getAll().forEach((t) => {
          if (t.trigger === ref.current) t.kill();
        });
      };
    },
    { scope: ref },
  );

  // Line-level masking comes from the `.reveal-words .line` rule in globals.css
  // (clips vertically only). No overflow on the block itself.
  return (
    <Tag
      ref={ref as React.RefObject<HTMLHeadingElement & HTMLParagraphElement>}
      className={`reveal-words ${className}`}
    >
      {children}
    </Tag>
  );
}
