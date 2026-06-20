import { marquee } from "@/lib/site";

/**
 * A quiet two-row positioning ticker — meta tokens drifting in opposite
 * directions, warm-white-on-black at low opacity, edge-faded into the page and
 * paused on hover. Pure CSS keyframes: no JS runtime, no library. (The cliché is
 * the testimonial carousel — this is a restrained brand/positioning strip.)
 */
function Row({
  items,
  reverse = false,
  duration,
}: {
  items: readonly string[];
  reverse?: boolean;
  duration: number;
}) {
  return (
    <div className="marquee-mask flex overflow-hidden">
      <div
        className="marquee-track flex shrink-0 items-center"
        style={{
          animationDuration: `${duration}s`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex items-center whitespace-nowrap text-sm uppercase tracking-[0.18em] text-bone-dim md:text-base"
          >
            {item}
            <span aria-hidden className="px-7 text-bone-faint">
              &#10022;
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <section
      aria-label="What Yantrava is"
      className="group border-y border-[--color-ink-line] py-10 md:py-14"
    >
      <div className="flex flex-col gap-5 md:gap-7">
        <Row items={marquee.rowA} duration={42} />
        <Row items={marquee.rowB} reverse duration={52} />
      </div>
    </section>
  );
}
