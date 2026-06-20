"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { founders } from "@/lib/site";
import { FadeUp } from "@/components/ui/fade-up";

export function Founders() {
  return (
    <section
      id="founders"
      aria-label="Founders"
      className="mx-auto max-w-[1280px] scroll-mt-24 px-6 py-28 md:px-10 md:py-44"
    >
      <h2 className="sr-only">Founders</h2>
      <FadeUp>
        <p className="label-mono mb-12" aria-hidden="true">Partners in Crime</p>
      </FadeUp>

      <div className="grid gap-16 md:grid-cols-2 md:gap-12">
        {founders.map((f, i) => (
          <FounderCard key={f.name} founder={f} index={i} />
        ))}
      </div>
    </section>
  );
}

function FounderCard({
  founder,
  index,
}: {
  founder: (typeof founders)[number];
  index: number;
}) {
  const reduced = useReducedMotion();

  return (
    <article className={index === 1 ? "md:mt-24" : ""}>
      <motion.div
        className="relative aspect-[4/5] w-full overflow-hidden rounded-frame border border-[--color-ink-line] bg-[--color-ink-raised]"
        initial={reduced ? { opacity: 0 } : { clipPath: "inset(100% 0 0 0)" }}
        whileInView={
          reduced ? { opacity: 1 } : { clipPath: "inset(0% 0 0 0)" }
        }
        viewport={{ once: true, margin: "-15% 0px" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Grayscale to unify the two shots on the monochrome theme; restores to
            full colour on hover. */}
        <Image
          src={founder.image}
          alt={`${founder.name}, ${founder.role}`}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          priority={index === 0}
          className="object-cover grayscale transition-[filter,transform] duration-700 ease-out hover:grayscale-0 hover:scale-[1.02]"
        />
      </motion.div>

      <div className="mt-6 flex items-end justify-between gap-4">
        <div>
          <h3 className="text-2xl font-medium tracking-[-0.01em] text-bone md:text-3xl">
            {founder.name}
          </h3>
          <p className="mt-1 text-bone-faint">{founder.role}</p>
        </div>
        {founder.linkedin !== "#" && (
          <a
            href={founder.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="label-mono shrink-0 transition-colors hover:text-bone"
          >
            LinkedIn ↗
          </a>
        )}
      </div>
      <p className="mt-5 max-w-[42ch] text-lg leading-relaxed text-bone-dim">
        {founder.bio}
      </p>
    </article>
  );
}
