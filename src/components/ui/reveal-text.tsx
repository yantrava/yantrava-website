"use client";

import { useRef } from "react";
import SplitType from "split-type";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

/**
 * Word-by-word reveal driven by scroll. Text stays in the DOM (split-type only
 * wraps existing nodes), so it remains selectable and indexable for SEO. No-ops
 * into a plain render when reduced motion is requested.
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
        duration: 0.9,
        ease: "power3.out",
        stagger: scrub ? 0.4 : 0.035,
        scrollTrigger: scrub
          ? {
              // Deliberate, cinematic reveal: spread over more scroll distance
              // and resolve as the line block reaches vertical centre — not low
              // and rushed in the bottom third of the viewport.
              trigger: ref.current,
              start: "top 92%",
              end: "bottom 45%",
              scrub: 0.8,
            }
          : {
              trigger: ref.current,
              start: "top 82%",
              end: "top 42%",
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
