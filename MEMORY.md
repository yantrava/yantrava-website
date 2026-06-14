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

## Planned routes (not built)
- `/`, `/about`, `/ventures` (+ `/ventures/rooted`, `/ventures/cardioguard`), `/team`,
  `/careers`, `/contact`, `/privacy`, `/terms`.

## Log
- 2026-06-15 — Repo scaffolded (create-next-app), `gsap` + `motion` installed, git initialized,
  onboarded into Yantrava foundation (graphify hook + graph, serena project, routa codebase,
  gitleaks gate). Working branch: `chore/scaffold-and-onboard`. No site content yet — build
  starts next session.
