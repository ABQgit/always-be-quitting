# Always Be Quitting — Project Index

This repo is the rebuild of alwaysbequitting.com (Jon Fritsch's smoking/vaping cessation coaching business). **Before doing anything, read `PRD.md` and the `/context` folder — they are the source of truth.**

## Read in this order

1. `PRD.md` — the build contract: scope, rules, milestones, open decisions
2. `context/business.md` — what ABQ is, who Jon is, who it serves
3. `context/voice.md` — how ALL copy must sound (empathy-first, no hype, no shame, banned phrases, Jon is the guide and was NEVER a smoker)
4. `context/offer-architecture.md` — the decided offer ladder and pricing
5. Page specs: `context/homepage-spec.md`, `context/one-on-one-page-spec.md`, `context/community-page-spec.md`, `context/supporting-pages-spec.md`
6. `context/design-direction.md`, `context/tech-stack.md`
7. Reference: `context/current-site.md` (old site record), `context/conversion-analysis.md`, `context/content-inventory.md`, `context/open-questions.md`

## Dev conventions (M0, 2026-07-11)

- Stack: Astro 7 + Tailwind 4 (via `@tailwindcss/vite`) + `@astrojs/vercel`. Static output; API endpoints opt out per-file with `export const prerender = false`.
- **All colors/fonts come from `src/styles/tokens.css`** — the swappable token file (branding is provisional; palette changes = edit that file only). Never hardcode colors in components.
- Layouts in `src/layouts/`, pages in `src/pages/`, components in `src/components/`.
- `npm run dev` to preview locally; `npm run build` must pass before any commit.
- Sandbox note: `npm install` on the mounted folder is slow — build/install in a sandbox-local copy (e.g. `~/abq-build`), sync `package.json`/`package-lock.json` back. Long commands must finish within one bash call (background processes lose network when the call ends). Use `--prefer-offline` and chunked installs.

## Non-negotiable rules

- Every page converts to email list join or purchase; no off-domain links except checkout
- NO timeline promises for quitting outcomes — everybody quits at their own pace
- Voice compliance per `context/voice.md` (including the handle-with-care word swaps)
- Never imply Jon smoked or vaped; customer is the hero, Jon is the guide
- Bespoke design only — no template/AI-generated look, no default fonts, no stock component kits
- Do not touch the live site (systeme.io) or the live landing page; all work happens in this repo until the launch milestone
- Decisions get recorded in `/context` or `PRD.md` — if you and Jon decide something in chat, write it down here
