# Task: Yantrava Labs marketing website (v1 — immersive home)

## Design direction
- Two-tone: pure black `#000` canvas, white text. Atmosphere = a faint WebGL shader glow
  (deep black → barely-there cool nebula) + film grain. Cinematic, editorial, AI-native.
- Type: `Geist` (grotesk, UI/body) + `Instrument Serif` italic (large editorial lines).
- Motion: Lenis smooth scroll + GSAP ScrollTrigger (pinned/reveal, ventures showcase,
  word-by-word manifesto) + Motion for micro-interactions + subtle blend cursor.
- Respect `prefers-reduced-motion`; lazy-load shader with static gradient fallback.
- Audience: investors, recruits, partners, press. Holdco — showcases brands, doesn't market them.

## Sections (single-page home)
1. Nav — minimal, wordmark + Ventures/About/Contact, scroll-aware, mobile menu
2. Hero — full viewport shader atmosphere + editorial headline + scroll cue
3. Manifesto — large mission statement, word-by-word scroll reveal
4. Values — Build · Earns · Long-term · One product at a time (pinned/sequenced)
5. Ventures — rauno-style showcase: Rooted (closed beta), CardioGuard (ring-fenced)
6. The Model — Alphabet-like holdco explanation, built in India
7. Founders — bynikistudio-style big duotone portraits: Manav Jain (CEO), Rounnak Goho (COO)
8. Contact + Footer — investor/partner/press, built in India

## Plan
- [ ] Deps: ogl, lenis, split-type, @gsap/react; fonts via next/font
- [ ] Design system: globals.css tokens, grain, layout shell, metadata/SEO
- [ ] Scroll infra: Lenis provider + GSAP ScrollTrigger + blend cursor
- [ ] Shader hero (ogl) + fallback + reduced-motion
- [ ] Copy (grounded in brand + research agent findings)
- [ ] Sections (8 components, each < 300 lines)
- [ ] Compose page, responsive + a11y + reduced-motion pass
- [ ] Verify build + dev preview

## Research (parallel)
- pam agent researching: holdco/AI-site structure, messaging, premium dark trends,
  motion/performance/a11y best practices. Fold findings into copy + structure before final polish.

## Review (v1 shipped 2026-06-15)
**What shipped:** Single-page immersive scroll site — Nav, shader-atmosphere Hero,
The Model (+ word-reveal manifesto), pinned horizontal Ventures showcase (Rooted,
CardioGuard), Values, Founders (duotone placeholders), Contact + Footer. Pure black/white
two-tone, Geist + Instrument Serif, Lenis + GSAP + Motion, raw-WebGL2 atmosphere.

**Research-grounded:** Pam web research → cross-checked by Jim (technical) + Dwight (strategy).
Applied: thesis-forward order, no AI-slop ban-list, legal-safe CardioGuard copy, incorporation
signal, lazy WebGL for LCP, mobile WebGL skip, reduced-motion paths.

**Verified:** lint clean, prod build passes (static prerender), zero console errors, all sections
QA'd desktop + mobile (no horizontal overflow), a11y/SEO audit (single h1, logical headings,
alt/aria, landmarks, AA contrast).

**Key fix:** dropped `ogl` (driver link-status bug on macOS) for a hand-rolled raw-WebGL2
fullscreen-shader renderer.

**Deferred / needs founders:**
- Founder credentials (past-first facts) + real LinkedIn URLs; founder photos
  → `/public/founders/{manav,rounnak}.jpg` (~1200×1500), swap into Founders placeholders.
- Optional Rooted traction number (beta users / waitlist) for above-the-fold proof.
- Minor: Ventures intro copy says "Scroll across" (desktop horizontal); reads slightly off on
  mobile where panels stack — make responsive later.
- Future: dedicated /ventures/* + /about pages once each product warrants its own SEO presence.

## E2E audit pass (2026-06-20)
Ran a 6-dimension static audit (workflow, adversarially verified) + a live runtime pass
(prod build served + Chrome CDP). **Runtime verdict: production-solid** — TSC/lint/build clean,
FCP ~100ms, full-page wheel scroll flat 60fps (0 frames >24ms), zero console errors.

**Fixed this pass:**
- Smoothness/robustness: ScrollTrigger now refreshes on `document.fonts.ready` (font-swap desync);
  removed persistent `will-change` from marquee; dropped dead `.will-reveal`/`js-ready` guard.
- Perf: `optimizePackageImports` for motion/gsap/@gsap/react; explicit font preload (sans+serif on,
  mono off); marquee.tsx → server component.
- A11y: global `:focus-visible` ring + skip-link; `--color-bone-faint` 0.38→0.52 (clears AA 4.9:1);
  founder portrait placeholder `role=img`+aria-label, decorative glyph/label aria-hidden; hamburger
  36→44px touch target; mobile menu Escape-to-close; fluid founder initials (clamp).
- SEO/share: OG share image (app/opengraph-image.tsx via next/og, static), robots.ts, sitemap.ts,
  canonical, Organization JSON-LD, openGraph locale, viewport-fit=cover.

**Deferred (non-blocking):**
- Founder photos (`public/founders/{manav,rounnak}.jpg`) + real LinkedIn URLs — needs founders.
- Web manifest + apple-touch-icon + real favicon — needs final logo/icon asset.
- Scroll-spy per-frame getBoundingClientRect micro-opt (scroll-index + site-nav) — 60fps measured, low priority.
- Mobile menu full focus-trap (Escape + body-lock shipped; trap deferred).
- Dead design tokens (`--color-ink-raised`, ease tokens), Ventures "· 02" eyebrow numbering — cosmetic.
- Audit flagged "Partners in Crime" eyebrow as off-register — **kept by explicit user choice.**
