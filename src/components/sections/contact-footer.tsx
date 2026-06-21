"use client";

import { contact, nav, site } from "@/lib/site";
import { FadeUp } from "@/components/ui/fade-up";
import { Magnetic } from "@/components/ui/magnetic";
import { Logo } from "@/components/ui/logo";

export function ContactFooter() {
  return (
    <footer id="contact" className="relative scroll-mt-24 overflow-hidden">
      {/* faint atmosphere echo to bookend the hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[60vh]"
        style={{
          background:
            "radial-gradient(70% 80% at 50% 120%, rgba(109,124,255,0.14), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 pb-12 pt-28 md:px-10 md:pt-44">
        <FadeUp>
          <h2 className="max-w-[14ch] text-[clamp(2.75rem,8vw,7rem)] font-medium leading-[0.95] tracking-[-0.03em] text-bone">
            Build with{" "}
            <span className="font-display font-normal italic">us.</span>
          </h2>
        </FadeUp>

        <FadeUp delay={0.1}>
          <p className="mt-8 max-w-[40ch] text-lg text-bone-dim md:text-xl">
            {contact.body}
          </p>
        </FadeUp>

        <FadeUp delay={0.15}>
          <Magnetic strength={0.25} className="mt-12">
            <a
              href={`mailto:${site.email}`}
              className="group inline-flex items-baseline gap-3 text-[clamp(1.5rem,4vw,2.75rem)] font-medium tracking-[-0.02em] text-bone"
            >
              <span className="relative">
                {site.email}
                <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-bone transition-transform duration-500 ease-out group-hover:scale-x-100" />
              </span>
              <span className="transition-transform duration-500 group-hover:translate-x-2">
                ↗
              </span>
            </a>
          </Magnetic>
        </FadeUp>

        {/* Footer */}
        <div className="mt-28 border-t border-[--color-ink-line] pt-10 md:mt-40">
          <div className="flex flex-col justify-between gap-10 md:flex-row">
            <div>
              <Logo className="h-14 w-auto text-bone" />
              <p className="mt-5 max-w-[34ch] text-base leading-relaxed text-bone-dim">
                {site.tagline}
              </p>
            </div>

            <nav aria-label="Footer" className="flex flex-col gap-3">
              {nav.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm text-bone-dim transition-colors hover:text-bone"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>

          <div className="mt-16 flex flex-col justify-between gap-2 text-bone-faint md:flex-row">
            <p className="text-xs">
              © {site.year} {site.legalName}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
