"use client";

import { MotionConfig } from "motion/react";

/**
 * Site-wide reduced-motion policy for every `motion` component. With
 * reducedMotion="user" and the OS Reduce Motion setting on, transform and
 * layout animations stop while opacity and colour still animate. GSAP code
 * is not covered and keeps its own `prefersReducedMotion()` guard.
 */
export function MotionProvider({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
