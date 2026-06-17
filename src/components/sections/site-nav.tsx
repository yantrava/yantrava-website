"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { nav, site } from "@/lib/site";
import { ScrollTrigger, useGSAP } from "@/lib/gsap";

/**
 * Wide "tubelight" navigation. The bar fills most of the top width with a margin
 * on each side; a glowing lamp sits over the active link and slides between links
 * (driven by the section in view, or whatever you hover). On scroll the bar
 * contracts to a comfortable centred width — smaller, but never cramped — and the
 * " Labs" in the wordmark folds away. Mobile is wordmark + a full-screen overlay.
 */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState(-1);
  const [hover, setHover] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  // Scroll state runs off ScrollTrigger's batched updates (synced to Lenis via the
  // gsap ticker) rather than a raw window scroll listener. Same behaviour — the bar
  // still compresses past 40px and the lamp still tracks the section in view — with
  // no standalone per-frame scroll listener. Mirrors the scroll-index spy.
  useGSAP(() => {
    const compute = () => {
      setScrolled(window.scrollY > 40);
      // Active link = the nav section most recently crossed the upper viewport.
      const line = window.innerHeight * 0.35;
      let idx = -1;
      let best = -Infinity;
      nav.forEach((item, i) => {
        const el = document.getElementById(item.href.slice(1));
        if (!el) return;
        const top = el.getBoundingClientRect().top;
        if (top <= line && top > best) {
          best = top;
          idx = i;
        }
      });
      setActive(idx);
    };
    const st = ScrollTrigger.create({ start: 0, end: "max", onUpdate: compute });
    compute();
    return () => st.kill();
  });

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  const reduce = useReducedMotion();
  const lit = hover ?? active;

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-5 md:px-8">
      <nav
        aria-label="Primary"
        className={`pointer-events-auto flex w-full items-center justify-between rounded-full border border-[--color-ink-line] bg-black/50 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? "mt-3 max-w-3xl px-4 py-2.5"
            : "mt-5 max-w-[1340px] px-6 py-3.5"
        }`}
      >
        {/* Wordmark — " Labs" folds away on scroll */}
        <a
          href="#top"
          aria-label={`${site.name}, home`}
          className={`shrink-0 whitespace-nowrap font-mono uppercase tracking-[0.28em] text-bone transition-all duration-500 ${
            scrolled ? "text-[0.78rem]" : "text-[0.82rem]"
          }`}
        >
          Yantrava
          <span
            className={`inline-block overflow-hidden align-bottom transition-all duration-500 ${
              scrolled ? "max-w-0 opacity-0" : "max-w-[4rem] opacity-100"
            }`}
          >
            &nbsp;Labs
          </span>
        </a>

        {/* Tubelight links */}
        <ul
          className="hidden flex-1 items-center justify-center gap-1 md:flex"
          onMouseLeave={() => setHover(null)}
        >
          {nav.map((item, i) => {
            const on = lit === i;
            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  onMouseEnter={() => setHover(i)}
                  className={`relative block rounded-full px-4 text-sm transition-colors duration-300 ${
                    scrolled ? "py-1.5" : "py-2"
                  } ${on ? "text-bone" : "text-bone-dim hover:text-bone"}`}
                >
                  {on && (
                    <motion.span
                      layoutId="tubelight"
                      aria-hidden
                      className="absolute inset-0 -z-10 rounded-full bg-white/[0.08]"
                      transition={
                        reduce
                          ? { duration: 0 }
                          : { type: "spring", stiffness: 340, damping: 30 }
                      }
                    >
                      {/* the lamp: a bright bar at the top with soft halos */}
                      <span className="absolute -top-[7px] left-1/2 h-[3px] w-8 -translate-x-1/2 rounded-full bg-white">
                        <span className="absolute -left-2 -top-2 h-6 w-12 rounded-full bg-white/40 blur-md" />
                        <span className="absolute -top-1 h-6 w-8 rounded-full bg-white/30 blur-md" />
                        <span className="absolute left-2 top-0 h-4 w-4 rounded-full bg-white/30 blur-sm" />
                      </span>
                    </motion.span>
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>

        {/* CTA + mobile toggle */}
        <div className="flex shrink-0 items-center">
          <a
            href="#contact"
            className={`hidden whitespace-nowrap rounded-full border border-[--color-ink-line] text-sm text-bone transition-all duration-300 hover:bg-bone hover:text-black md:inline-block ${
              scrolled ? "px-4 py-1.5" : "px-5 py-2"
            }`}
          >
            Get in touch
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            <span className="relative block h-3 w-5">
              <span
                className={`absolute left-0 block h-px w-5 bg-bone transition-all duration-300 ${open ? "top-1.5 rotate-45" : "top-0"}`}
              />
              <span
                className={`absolute left-0 top-3 block h-px w-5 bg-bone transition-all duration-300 ${open ? "-translate-y-[6px] -rotate-45" : ""}`}
              />
            </span>
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.3 }}
            className="pointer-events-auto fixed inset-0 z-40 flex flex-col bg-black px-6 pt-28 md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={reduce ? { duration: 0 } : { delay: 0.08 * i + 0.1 }}
                >
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 font-display text-4xl text-bone"
                  >
                    {item.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <a
              href={`mailto:${site.email}`}
              onClick={() => setOpen(false)}
              className="mt-10 inline-block w-fit rounded-full border border-[--color-ink-line] px-6 py-3 text-bone"
            >
              Get in touch
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
