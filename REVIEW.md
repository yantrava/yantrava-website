# Review Guidelines

Guidance for AI reviewers reading pull requests in yantrava-website, the public marketing site of Yantrava Labs
(Next.js App Router, Tailwind CSS v4, deployed on Vercel). Project context is in `CLAUDE.md`.

Review priority, highest first: secrets and PII, health and regulatory claims, runtime writes to machine
config, skipped permission prompts, then everything else.

## High-scrutiny areas

- **Secrets and PII, in every file.** This repository is public, so anything committed is published. No
  credentials, tokens, keys or `.env` values (including `_authToken` lines in `.npmrc`), no personal data beyond
  what the site deliberately shows (founder names and photos, the support address), and no private business
  detail (cap table, legal drafts, internal hostnames or IDs) in code, content, comments, fixtures, docs or
  commit messages, and none written to a log or an error message. A secret-shaped string is Important.
- **No runtime writes to machine config.** Flag a change to a script, a `package.json` lifecycle hook
  (`preinstall`, `postinstall`, `prepare`), `.npmrc` or a tooling file that makes it write `~/.claude`,
  `~/.claude.json`, another agent's config, an rc file, a LaunchAgent or global git config while it runs.
- **No skipped permission prompts.** Flag any change that starts Claude with prompts skipped
  (`--dangerously-skip-permissions`, `--permission-mode bypassPermissions`), or another agent CLI with its
  approvals or sandbox off (`--dangerously-bypass-approvals-and-sandbox`, `--yolo`).

These three checks cover every file in the PR, upstream code included: nothing under "Do not flag" or
"Ignore during review" exempts a file from them.

Also high scrutiny in this repo:

- **Health and regulatory claims.** CardioGuard is pre-clinical: no efficacy, safety or "clinical-grade" claims
  about it in copy, metadata or JSON-LD. The copy rules sit at the top of `src/lib/site.ts`.

## Do not flag

- Lockfiles (`package-lock.json`).
- Generated files and build output (`.next/`, `next-env.d.ts`, `*.tsbuildinfo`).

## Ignore during review

- `graphify-out/` and `tasks/`.

Structure adapted from cloudflare/cloudflare-os `REVIEW.md` (Apache-2.0); the text is ours.
