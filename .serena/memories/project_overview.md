# yantrava-website — project overview

**What:** Marketing website for **Yantrava Labs Private Limited** — an Alphabet-like holding
company that builds independent software product brands (consumer + health-tech), built in India.

**Critical framing:** This is a **corporate / holdco site** (audience: investors, recruits,
partners, press), NOT a product landing page. The parent brand "Yantrava Labs" is deliberately
invisible on consumer surfaces; it appears on investor/recruiting/regulatory/IP documents. The
site *showcases* the brands (Rooted, CardioGuard) but does not market them directly.

**Mission:** "Build software that earns long-term user trust — one product at a time."
**Values:** Build (ship, don't consult) · Earns (minimal data, clinical-grade care) ·
Long-term (retention over acquisition spikes) · One product at a time (focus).

**Brands showcased:**
- Rooted — plant-care app, closed beta; warm/precise/science-backed; has its OWN identity
  (phthalo green/cream, Playfair+Nunito, Material 3) — not the parent's.
- CardioGuard — AICD cardiac alert/monitoring; clinical, trustworthy, never alarmist;
  ring-fenced division, spins out to subsidiary on first clinical deployment.

**Founders shown:** Manav Jain (CEO), Rounnak Goho (COO). Akkshit omitted for now
(incubation-conditional).

## Stack
Next.js 15 (App Router) + React 19, TypeScript, Tailwind CSS v4, ESLint, `src/` dir,
import alias `@/*`, Turbopack. Animation: `gsap` + `motion` (Motion for React). Deploy: Vercel.

## Planned structure (NOT yet built)
/ (home), /about, /ventures (+ /ventures/rooted, /ventures/cardioguard), /team, /careers,
/contact, /privacy, /terms.

## Status (2026-06-15)
Repo scaffolded + onboarded only. NO site content/components/design built yet — that starts
next session. Parent brand has no finalized visual identity (logo/colors TBD) → use a tasteful
neutral premium default for now.

## Commands
`npm run dev` (Turbopack) · `npm run build` · `npm run lint`.
