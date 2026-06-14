@AGENTS.md

# CLAUDE.md — yantrava-website

Marketing website for **Yantrava Labs Private Limited**. This file layers on top of the
holdco umbrella context (`~/Yantrava/CLAUDE.md`) and the global rules in `~/.claude/`.

## What this site is

A **corporate / holdco website**, NOT a product marketing site. Yantrava Labs is an
Alphabet-like holding company that builds independent software product brands (consumer +
health-tech), built in India. The parent brand is deliberately **invisible on consumer
surfaces** — it appears on investor, recruiting, regulatory, and IP documents. So the
audience here is **investors, recruits, partners, and press**. The site *showcases* the
brands (Rooted, CardioGuard) but does not market them directly.

- **Mission:** "Build software that earns long-term user trust — one product at a time."
- **Values:** Build · Earns · Long-term · One product at a time.
- **Brands:** Rooted (plant-care app, closed beta — has its own identity, not the parent's);
  CardioGuard (AICD cardiac alert/monitoring — ring-fenced, clinical, spins out on first
  clinical deployment).
- **Founders shown:** Manav Jain (CEO), Rounnak Goho (COO). Akkshit is omitted for now
  (incubation-conditional).
- **Parent visual identity:** not finalized (logo/colors TBD) — use a tasteful, neutral,
  premium default for now and align to the final mark later.

## Stack

Next.js 15 (App Router) + React 19 · TypeScript · Tailwind CSS v4 · ESLint · `src/` dir ·
import alias `@/*` · Turbopack. Animation: **gsap** + **motion** (Motion for React).
Deploy target: Vercel.

## Commands

- `npm run dev` — dev server (Turbopack)
- `npm run build` — production build
- `npm run lint` — ESLint

## Status (2026-06-15)

Repo scaffolded + onboarded into the Yantrava foundation. **No site content/components/design
built yet** — that begins next session. See `MEMORY.md` for the running log and the serena
`project_overview` memory for the full brand brief.

## Conventions

- Branch discipline: feature branch → PR, never commit straight to `main`.
- Keep files focused (< 300 lines); split components early.
- No secrets in the repo (gitleaks pre-commit gate is installed).
