/**
 * Single source of truth for site copy. Kept out of components so the words can
 * be revised without touching layout. Voice: confident, specific, no buzzwords.
 * Audience: investors, recruits, partners, press.
 *
 * BANNED WORDS (read before editing copy): cutting-edge, state-of-the-art,
 * transformative, revolutionize, harness the power of, at scale, the future of,
 * seamless, robust, passionate team, game-changer, proprietary, clinical-grade
 * (regulatory term — CardioGuard is pre-clinical), "at the intersection of".
 */

export const site = {
  name: "Yantrava Labs",
  legalName: "Yantrava Labs Private Limited",
  tagline: "Building software that earns trust.",
  email: "support@yantrava.com",
  location: "India",
  year: 2026,
} as const;

export const hero = {
  label: "A house of software brands",
  // Headline as explicit lines (each an array of rise-animated groups). Line 1
  // stays on a single line at desktop; the `emphasis` group renders in serif italic.
  headline: [["We build software ventures."], ["AI is our", "co-founder."]],
  emphasis: "co-founder.",
  sub: "Yantrava Labs is a holding company building independent product brands, one at a time.",
} as const;

export const manifesto = {
  // Word-by-word reveal on scroll. Reads as a stance.
  lead: "Most software is built to capture attention.",
  body: "We build software that earns trust, and then keep earning it. Small teams, real products, no shortcuts.",
} as const;

export const values = [
  {
    index: "01",
    title: "Build",
    body: "Builders ship. We put real products in front of real people and stand behind what we make.",
  },
  {
    index: "02",
    title: "Earn it",
    body: "Trust is earned, never assumed. We ask for the least data and give the most care.",
  },
  {
    index: "03",
    title: "Think in decades",
    body: "Most software optimises for the first week. We optimise for the long compound. Durability over momentum.",
  },
  {
    index: "04",
    title: "Full attention",
    body: "Focus is the strategy. Each venture gets everything we have until it can stand on its own.",
  },
] as const;

export const ventures = [
  {
    id: "rooted",
    name: "Rooted",
    domain: "Consumer",
    stage: "Closed beta",
    tagline: "Plant care, made precise.",
    body: "Plant care without the guesswork. Rooted reads what each plant needs and tells you exactly when to act, warmly and precisely.",
    accent: "#4f7a5b",
  },
  {
    id: "cardioguard",
    name: "CardioGuard",
    domain: "Health-tech",
    stage: "Pre-clinical · ring-fenced",
    tagline: "An early-warning system for cardiac care.",
    body: "An AICD alert and monitoring system in development for cardiac patients and their clinicians. Ring-fenced from the rest of the portfolio from day one. On first clinical use, it graduates into a company of its own.",
    accent: "#7c4a52",
  },
] as const;

export const model = {
  label: "Model",
  heading: "Structured like a holding company. Built like a studio.",
  paragraphs: [
    "Each product we build is its own company in miniature: its own name, its own identity, its own roadmap. Yantrava is the structure behind them, deliberately invisible to the people who actually use the products.",
    "What the ventures share is infrastructure, capital discipline, and a way of building: small teams using AI as leverage to ship real products faster than their size suggests.",
    "Risk is contained by design. A venture carrying clinical or regulatory exposure is ring-fenced from day one and spins out as it matures, so one bet can never sink the others.",
  ],
} as const;

// NOTE (content gap flagged in review): bios are honest but role-led, not
// "past-first". Before launch, Manav & Rounnak should each add 1–2 verifiable
// prior facts (company, role, credential, shipped outcome). Set `linkedin` to a
// real URL — links only render when this is not "#".
export const founders = [
  {
    name: "Manav Jain",
    role: "Co-founder & CEO",
    bio: "A founder-engineer who lives inside the product, carrying strategy, roadmap, and engineering in one seat so a small team ships fast with nothing lost between roles. He started Yantrava to build the kind of applications people keep open for years.",
    image: "/founders/manav.jpg",
    linkedin: "#",
  },
  {
    name: "Rounnak Goho",
    role: "Co-founder & COO",
    bio: "The operator who turns builds into businesses. Rounnak runs go-to-market and operations across the portfolio and protects the studio's focus when the easy move is always to do more.",
    image: "/founders/rounnak.jpg",
    linkedin: "#",
  },
] as const;

// Positioning ticker — meta tokens, not a testimonial carousel (the cliché).
// Two rows scroll in opposite directions.
export const marquee = {
  rowA: [
    "Trust over metrics",
    "Years, not quarters",
    "One product at a time",
    "Built to last",
    "A house of brands",
  ],
  rowB: [
    "Minimal data, maximum care",
    "Retention over reach",
    "Independent by design",
    "Decades over demos",
    "Care at the core",
  ],
} as const;

export const contact = {
  heading: "Build with us.",
  body: "For investors, partners, press, and people who measure in decades, not launches.",
} as const;

export const nav = [
  { label: "Model", href: "#model" },
  { label: "Ventures", href: "#ventures" },
  { label: "Founders", href: "#founders" },
  { label: "Contact", href: "#contact" },
] as const;
