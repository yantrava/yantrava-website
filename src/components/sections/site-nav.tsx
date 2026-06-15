"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { nav, site } from "@/lib/site";

/**
 * Floating, curved (pill) navigation, centred at the top. At rest it reads
 * "Yantrava Labs"; once you scroll it compresses — smaller, tighter, and the
 * " Labs" folds away so just "Yantrava" remains. Mobile collapses to wordmark +
 * a full-screen overlay menu.
 */
export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
      <div
        className={`pointer-events-auto flex items-center rounded-full border border-[--color-ink-line] bg-black/55 backdrop-blur-xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? "mt-3 gap-0.5 px-1.5 py-1.5" : "mt-5 gap-1 px-2 py-2"
        }`}
      >
        {/* Wordmark — " Labs" folds away on scroll */}
        <a
          href="#top"
          aria-label={`${site.name}, home`}
          className={`whitespace-nowrap rounded-full px-3 font-mono uppercase tracking-[0.28em] text-bone transition-all duration-500 ${
            scrolled ? "py-1 text-[0.72rem]" : "py-1.5 text-[0.78rem]"
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

        <span className="mx-1 hidden h-4 w-px bg-[--color-ink-line] md:block" />

        {/* Links */}
        <ul className="hidden items-center md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`block rounded-full px-3 text-sm text-bone-dim transition-colors duration-300 hover:bg-white/5 hover:text-bone ${
                  scrolled ? "py-1" : "py-1.5"
                }`}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile toggle */}
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

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-auto fixed inset-0 z-40 flex flex-col bg-black px-6 pt-28 md:hidden"
          >
            <ul className="flex flex-col gap-2">
              {nav.map((item, i) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.08 * i + 0.1 }}
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
