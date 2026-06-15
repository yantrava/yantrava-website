"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "motion/react";

type FadeUpProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  once?: boolean;
};

/**
 * Section-entrance primitive: content rises ~28px and fades in as it enters the
 * viewport. Cheap, high-perception. Collapses to an instant appearance when the
 * user prefers reduced motion.
 */
export function FadeUp({
  children,
  delay = 0,
  y = 28,
  once = true,
  ...props
}: FadeUpProps) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-12% 0px -12% 0px" }}
      transition={{
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
