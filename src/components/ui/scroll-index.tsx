"use client";

import { useState } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

const SECTIONS = [
  { id: "model", label: "The model" },
  { id: "ventures", label: "Ventures" },
  { id: "values", label: "Principles" },
  { id: "founders", label: "Founders" },
  { id: "contact", label: "Contact" },
] as const;

/**
 * A fixed editorial section index — `01 / 02 / 03 …` in the left gutter, the
 * active row widening and brightening as you scroll. Pure typographic restraint
 * (rauno / monopo register). Desktop-only and pointer-inert; never obscures content.
 */
export function ScrollIndex() {
  const [active, setActive] = useState(0);

  useGSAP(() => {
    // Scroll-spy from LIVE rects (not pre-computed trigger positions): the active
    // section is the last one whose top has crossed the viewport midline. Reading
    // getBoundingClientRect each update makes this immune to the pinned Ventures
    // section's scroll spacer (which otherwise mis-positions later triggers) and
    // correctly "holds" on the prior section while inside untracked bands.
    const compute = () => {
      const mid = window.innerHeight / 2;
      let current = 0;
      SECTIONS.forEach((s, i) => {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= mid) current = i;
      });
      setActive(current);
    };
    const st = ScrollTrigger.create({ start: 0, end: "max", onUpdate: compute });
    compute();
    return () => st.kill();
  });

  return (
    <nav
      aria-hidden="true"
      className="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 xl:block"
    >
      <ul className="flex flex-col gap-4">
        {SECTIONS.map((s, i) => (
          <li key={s.id} className="flex items-center gap-3">
            <span
              className={`font-mono text-[0.65rem] tabular-nums transition-colors duration-500 ${
                active === i ? "text-bone" : "text-bone-faint"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            <span
              className={`h-px bg-bone transition-all duration-500 ${
                active === i ? "w-8 opacity-100" : "w-3 opacity-30"
              }`}
            />
            <span
              className={`font-mono text-[0.6rem] uppercase tracking-[0.2em] text-bone transition-all duration-500 ${
                active === i ? "opacity-100" : "-translate-x-1 opacity-0"
              }`}
            >
              {s.label}
            </span>
          </li>
        ))}
      </ul>
    </nav>
  );
}
