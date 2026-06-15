# MEMORY.md — yantrava-website

Per-repo running memory index. One line per durable fact; full context lives in `CLAUDE.md`,
the serena `project_overview` memory, and the plan at
`~/.claude/plans/you-re-building-the-yantrava-sorted-sloth.md`.

## Project
- **Corporate holdco site** for Yantrava Labs (investors/recruits/partners/press) — NOT a
  product landing page. Parent brand is invisible on consumer surfaces; it showcases the
  brands without marketing them.
- Mission: "Build software that earns long-term user trust — one product at a time."
- Brands showcased: Rooted (plant-care, closed beta), CardioGuard (AICD alerts, ring-fenced).
- Founders shown: Manav Jain (CEO), Rounnak Goho (COO). Akkshit omitted (incubation-conditional).
- Parent visual identity not finalized → neutral premium default for now.

## Stack
- Next.js 15 App Router + React 19, TypeScript, Tailwind v4, Turbopack, `src/`, alias `@/*`.
- Animation: `gsap` + `motion` (Motion for React).

## Architecture decision (2026-06-15, post-research)
- **v1 = single long-scroll page** (best practice for an early holdco; concentrates SEO,
  lets investors/press scan the whole story in one session). Nav = on-page anchors only —
  NO links to nonexistent pages.
- Section order (thesis-forward, per review): Hero → The Model → Ventures → Values →
  Founders → Contact + Footer.
- Multi-page routes (`/about`, `/ventures/rooted`, `/ventures/cardioguard`, `/team`,
  `/careers`) are **deferred** — add per-product sub-pages only once each product warrants
  its own SEO/brand presence.

## Open content gaps (need founders before launch)
- Founder credentials (past-first facts) + real LinkedIn URLs for Manav & Rounnak.
- Optional Rooted traction number (beta users / waitlist) for above-the-fold proof.
- Founder photos → `/public/founders/{manav,rounnak}.jpg` (~1200×1500). Duotone placeholders for now.
- CardioGuard copy is deliberately stage-honest (no efficacy/"clinical-grade" claims) — keep it that way.

## Log
- 2026-06-15 — Repo scaffolded (create-next-app), `gsap` + `motion` installed, git initialized,
  onboarded into Yantrava foundation (graphify hook + graph, serena project, routa codebase,
  gitleaks gate). Working branch: `chore/scaffold-and-onboard`. No site content yet — build
  starts next session.
