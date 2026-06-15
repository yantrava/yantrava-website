"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

/** True only on fine-pointer devices that haven't asked for reduced motion. */
function useCursorEnabled() {
  return useSyncExternalStore(
    (cb) => {
      const a = window.matchMedia("(pointer: fine)");
      const b = window.matchMedia("(prefers-reduced-motion: reduce)");
      a.addEventListener("change", cb);
      b.addEventListener("change", cb);
      return () => {
        a.removeEventListener("change", cb);
        b.removeEventListener("change", cb);
      };
    },
    () =>
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false, // server snapshot — render nothing until hydrated
  );
}

/**
 * A quiet blend cursor: a ring that lags behind the pointer and swells over
 * interactive targets. The native cursor is never removed, so nothing breaks
 * for anyone; this is pure decoration on top.
 */
export function Cursor() {
  const enabled = useCursorEnabled();
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const springX = useSpring(x, { stiffness: 380, damping: 36, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 380, damping: 36, mass: 0.4 });

  useEffect(() => {
    if (!enabled) return;
    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      setActive(!!el?.closest("a, button, [data-cursor]"));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [enabled, x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden md:block"
      style={{ x: springX, y: springY, mixBlendMode: "difference" }}
    >
      <motion.span
        className="block -translate-x-1/2 -translate-y-1/2 rounded-full border border-white"
        animate={{
          width: active ? 56 : 12,
          height: active ? 56 : 12,
          opacity: active ? 0.9 : 0.6,
        }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
      />
    </motion.div>
  );
}
