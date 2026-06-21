"use client";

import { useState } from "react";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

const SECTIONS = [
  { id: "model", label: "Model" },
  { id: "ventures", label: "Ventures" },
  { id: "values", label: "Principles" },
  { id: "founders", label: "Founders" },
  { id: "contact", label: "Contact" },
] as const;

/**
 * A fixed editorial section index in the left gutter: the section labels stacked
 * vertically, the active one brightening as you scroll. Pure typographic restraint
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
    // Narrow column in the far-left gutter. The label sits BELOW its number (not
    // to the right) so it can't run into the page text, and the whole index only
    // shows at >=1440px where there's enough gutter beside the centred content.
    <nav
      aria-hidden="true"
      className="pointer-events-none fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 min-[1440px]:block"
    >
      <ul className="flex flex-col gap-5">
        {SECTIONS.map((s, i) => {
          const on = active === i;
          return (
            <li key={s.id}>
              <span
                className={`block font-mono text-[0.6rem] uppercase leading-none tracking-[0.18em] transition-colors duration-500 ${
                  on ? "text-bone" : "text-bone-faint"
                }`}
              >
                {s.label}
              </span>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
