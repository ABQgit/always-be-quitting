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

## Verify before you assert (added 2026-08-14, after repeated failures)

**The most common failure mode on this project is confidently describing a file that wasn't read.** Real examples from a single session: the Claude Design brief was characterized as "almost all negatives" having read only the QA checklist; a hero portrait was recommended when `homepage-spec.md` banned it in writing; "What Makes The Difference" was called weak build-generated filler when it is Jon's verbatim copy, deliberately restored; and the `/community` medical disclaimer was recommended for deletion as a "duplicate" when it uniquely contains a self-harm and mental-health-crisis clause that the footer version lacks.

Rules that follow:

1. **Read in full before proposing removal or change to ANY copy, spec, or legal text.** Never propose a deletion based on a grep hit, a summary, a filename, or a memory of having seen it. Read the actual thing, all of it.
2. **Quote or don't claim.** Any assertion about what a document says must come with the quoted line. If it can't be quoted, it hasn't been read — say "let me check" instead of asserting.
3. **Read the page spec before editing that page.** `homepage-spec.md`, `community-page-spec.md`, `one-on-one-page-spec.md`, `supporting-pages-spec.md`. Most bad calls here were things already decided and written down.
4. **Assume existing copy is Jon's and deliberate until proven otherwise.** It usually is. "This looks like filler" is a hypothesis to check against `/context`, not a finding.
5. **Legal, medical, and disclaimer text is never touched on a judgment call.** Compare versions word by word, surface the differences to Jon, and let him decide. Terms and privacy pages were ported verbatim on purpose.
6. **Don't report an action as done without confirming it succeeded** — check the command's exit state, especially for git operations, which fail silently on this repo when lock files are present.

## Copy phase vs design phase (added 2026-08-23)

Copy is being revised before any design work. During this phase:

- **Fix only what prevents Jon evaluating the page** — genuine absences, like a section with no padding or a class used in markup with no CSS rule at all. Use values copied from sibling elements, never chosen.
- **Log everything that is a choice** — size, colour, rhythm, prominence — in `context/design-punchlist.md`. Do not act on it.
- **Why:** the v2 skin went generic because nobody decided the look, it accumulated. Making styling calls section by section during a copy pass is the same failure in slower motion. Jon: *"are we going down the rabbit hole of designing things."*

## Astro gotcha: inline tags swallow the preceding space

`compressHTML` strips the newline + indentation between a word and an inline element, so this:

```astro
and you can
<a href="...">book it here</a>
```

renders as **"and you canbook it here"**. Four instances shipped before this was noticed (2026-08-23). **Keep the word and the opening tag on the same source line** — applies to `<a>`, `<strong>`, `<em>`, `<b>`, `<span>`. To check the whole site:

```bash
grep -oE '[a-z]<(a|strong|em|b|span)\b[^>]*>[A-Za-z]' dist/client/**/index.html
```

## Dev and prod can differ — check the BUILT css (added 2026-08-26)

Found when Jon compared localhost to a branch preview: the gold sweep underline on the homepage was missing in production, and so was every `.reveal` scroll animation on every page. Dev was fine. **It had been broken on the live site since launch and nothing errored.**

Cause: lightningcss (Vite's default CSS minifier) folds `animation-timeline: view()` into the `animation` shorthand, producing `animation: 1ms linear both abq-rise view()`. The shorthand does not accept a timeline value — it *resets* `animation-timeline` — so browsers drop the whole declaration.

Fixed by `build.cssMinify: 'esbuild'` in `astro.config.mjs`. **Do not revert that without reading the comment there.**

The general rule: `npm run dev` does not minify, so anything the minifier mangles is invisible locally. For scroll-driven animations, `@supports`, `color-mix`, `:has()` and other newer CSS, verify against `dist/client/_astro/*.css`, not the source:

```bash
grep -o 'animation-timeline' dist/client/_astro/*.css   # must be > 0
```

## Non-negotiable rules

- Every page converts to email list join or purchase; no off-domain links except checkout
- NO timeline promises for quitting outcomes — everybody quits at their own pace
- Voice compliance per `context/voice.md` (including the handle-with-care word swaps)
- Never imply Jon smoked or vaped; customer is the hero, Jon is the guide
- Bespoke design only — no template/AI-generated look, no default fonts, no stock component kits
- Do not touch the live site (systeme.io) or the live landing page; all work happens in this repo until the launch milestone
- Decisions get recorded in `/context` or `PRD.md` — if you and Jon decide something in chat, write it down here
