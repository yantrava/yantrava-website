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
  email: "hello@yantrava.com",
  location: "India",
  year: 2026,
} as const;

export const hero = {
  label: "Holding company · Built in India",
  // The position, not a description. One <em> word rendered in editorial serif.
  headline: ["We build software that", "earns", "long-term trust."],
  emphasis: "earns",
  sub: "Yantrava Labs is a holding company building independent product brands — one at a time.",
} as const;

export const manifesto = {
  // Word-by-word reveal on scroll. Reads as a stance.
  lead: "Most software is built to capture attention.",
  body: "We build software that earns trust — and keeps it. Small teams, AI as leverage, real products in people's hands. One at a time.",
} as const;

export const values = [
  {
    index: "01",
    title: "Build",
    body: "We are builders. We ship products people use — not roadmaps, not decks.",
  },
  {
    index: "02",
    title: "Earn it",
    body: "Trust is earned, never assumed. We ask for the least data and give the most care.",
  },
  {
    index: "03",
    title: "Think in decades",
    body: "We optimise for the tenth year, not the launch week. Retention over reach.",
  },
  {
    index: "04",
    title: "One at a time",
    body: "Focus is the strategy. Each venture earns our full attention before the next begins.",
  },
] as const;

export const ventures = [
  {
    id: "rooted",
    name: "Rooted",
    domain: "Consumer",
    stage: "Closed beta",
    tagline: "Plant care, made precise.",
    body: "A plant-care companion that turns anxious guesswork into confident, science-backed care. Warm, precise, and built to be trusted with the things you're keeping alive.",
    accent: "#4f7a5b",
  },
  {
    id: "cardioguard",
    name: "CardioGuard",
    domain: "Health-tech",
    stage: "Pre-clinical · ring-fenced",
    tagline: "An early-warning system for cardiac care.",
    body: "An AICD alert and monitoring system in development for cardiac patients and their clinicians. Ring-fenced from the rest of the portfolio from day one — it spins out into its own company on first clinical deployment.",
    accent: "#7c4a52",
  },
] as const;

export const model = {
  label: "The model",
  heading: "Structured like a holding company. Built like a studio.",
  paragraphs: [
    "Yantrava follows Alphabet's logic at an early stage: each product is its own brand, with its own identity and roadmap, and the parent stays invisible to the people who use it.",
    "What the ventures share is infrastructure, capital discipline, and a way of building — small teams using AI as leverage to ship real products faster than their size suggests.",
    "Risk is contained by design. CardioGuard's clinical exposure is ring-fenced from the rest of the portfolio, and spins out the moment it reaches patients.",
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
    bio: "A founder-engineer who works hands-on across product, design, and strategy, using AI as a force multiplier to ship real software. Started Yantrava to build a portfolio of products that earn their users' trust.",
    image: "/founders/manav.jpg",
    linkedin: "#",
  },
  {
    name: "Rounnak Goho",
    role: "Co-founder & COO",
    bio: "An operator who runs go-to-market and operations across the portfolio, turning early products into businesses — and keeping the studio disciplined enough to build one thing at a time.",
    image: "/founders/rounnak.jpg",
    linkedin: "#",
  },
] as const;

export const contact = {
  heading: "Build with us.",
  body: "For investors, partners, press, and people who want to build things that last.",
} as const;

export const nav = [
  { label: "Ventures", href: "#ventures" },
  { label: "The model", href: "#model" },
  { label: "Founders", href: "#founders" },
  { label: "Contact", href: "#contact" },
] as const;
