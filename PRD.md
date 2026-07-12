# PRD — AlwaysBeQuitting.com Rebuild

**Version 1.0 · 2026-07-10 · Owner: Jon Fritsch**
**Status: APPROVED by Jon 2026-07-11. Build authorized per milestones below.**

Detailed decisions live in `/context/*.md`; this document is the build contract. Where this PRD and a context doc conflict, the more recent decision wins and both get updated.

---

## 1. What We're Doing and Why

Rebuild alwaysbequitting.com from systeme.io's site builder onto a custom Astro site on Vercel, with a redesigned offer architecture, a bespoke design system, and copy that reflects the current business. The existing hand-built landing page (abq-landing-v2.vercel.app) is the quality benchmark and merges into the new site.

**Objectives, in priority order:**
1. Increase conversion to the two revenue paths (community memberships, 1:1 coaching)
2. Grow the ABQ Tips email list (the main funnel)
3. Present a professional, credible brand that matches Jon's 25-year expertise — explicitly NOT a template/AI-generated look
4. Establish a codebase Jon controls end-to-end (no site-builder lock-in)

**Non-goals (explicitly out of scope):** native app, on-domain quiz app (separate stack, much later), membership platform replacement (community stays on Mighty Networks), CRM, content hub/blog, B2B pages.

## 2. Site Rules (apply to every page)

1. **Every page converts to one of two outcomes: email list join or purchase.** No page exists for any other reason.
2. **No off-domain links except checkout** (Mighty Networks, Cal.com/Stripe). The ScoreApp quiz is removed from nav and de-emphasized until rebuilt on-domain someday.
3. **No timeline promises.** Quitting is quitting an addiction; everybody quits at their own pace. Process honesty replaces outcome claims. (Resolved: open-questions #10.)
4. **Voice compliance:** all copy obeys `/context/voice.md` — empathy first, no shame spirals, no hype, handle-with-care language swaps, customer is the hero, Jon is the guide (never a former smoker).
5. **Concrete deliverables, not abstract nouns.** Price transparency at first glance. Compressed trust lines at every CTA.
6. **Copy policy — existing copy is canon.** Jon's copy was developed deliberately over a long time and transfers as written by default. NO generated generic coaching copy, ever. Changes are surgical, each traceable to a recorded decision (pricing/offer language, timeline-promise removals, banned-phrase swaps, typos, agreed restructuring). New sections with no existing copy (two doors, transformation section, Program block, About) are ASSEMBLED from Jon's own language (voice.md verbatim excerpts, signature phrases, paradoxes, landing-page FAQ) — not invented. During the build, all copy is presented to Jon as old-vs-proposed diffs, page by page; coaching and community page revisions are discussed live during their build milestone. Jon approves every diff.

## 3. Offer Architecture (decided — `/context/offer-architecture.md`)

| Offer | Price | Notes |
|---|---|---|
| Quick-Start Guide → ABQ Tips | Free | THE lead magnet feeding THE list (systeme.io) |
| ABQ Community | $97/mo × 3-month commitment, or $250 one-pay (save $41); auto-continues at $47/mo | Mighty Networks. No refunds; no codes; commitment framed as clinical feature |
| $97 Intro Session | $97 one-time, **once per person ever** | Cal.com + Stripe (as today), embedded on /coaching. Always credited toward the Program, no deadline |
| **Quit for the Last Time: The 1:1 Program** | $1,200 list ($200/session std; sale floor $150/session) | 6 × 50-min over 12 weeks, email access to Jon between sessions. Stripe |
| Alumni add-on sessions | ~$150/session | Below package rate on purpose. "More time and support," never "because you didn't quit" |

Sale windows run on the real cessation calendar (New Year, World No Tobacco Day May 31, Great American Smokeout Nov). No perpetual strikethroughs.

## 4. Site Map & Redirects

| New URL | Page | Replaces |
|---|---|---|
| `/` | Homepage | current homepage |
| `/community` | Community sales page | `/community-8-25` (301) |
| `/coaching` | 1:1 page (session-first + Program) | `/premium-coaching` AND abq-landing-v2.vercel.app (301s) |
| `/free-guide` | Opt-in destination for ads/social | `/abq_tips` (301) |
| `/about` | NEW — guide/trust page | — |
| `/contact` | Contact | `/contact` |
| `/podcast` | Simple hub (footer link only) | `/podcasts/always-be-quitting` (301) |
| `/privacy`, `/terms` | Legal (terms rewritten for new offer rules) | current legal pages |

`/hsdzywqq`, `/tqbeytfj` (old checkouts) retire → 301 to `/coaching`.
**Nav:** Community · 1:1 Coaching · Free Guide · About · Contact. Podcast and legal in footer.

## 5. Page Requirements

Full section-by-section specs: `/context/homepage-spec.md`, `/context/one-on-one-page-spec.md`, `/context/community-page-spec.md`, `/context/supporting-pages-spec.md`. Summary of the load-bearing decisions:

- **Homepage:** hero (keep "Make This Your Last Attempt…" + guide opt-in above fold) → recognition section (2-line cycle lead-in + FOUR stage cards) → guide/qualifications → transformation-not-abstinence section → **the Two Doors ("Start for $97": community vs 1:1 session)** → proof → short FAQ → final CTA/tagline.
- **/coaching:** $97 intro session is the center of gravity (Jon's decision); landing-v2 structure and copy carried over; new "What comes after" Program section; FAQ updated for one-per-person rule, permanent credit, honest no-automatic-upsells framing.
- **/community:** bones stay (four-stage qualifier, FAQ, antidote close); pricing model replaced with 3-month commitment framing ("we ask for 3 months because that's how long transformation takes"); $47 tail sold as benefit; codes/regular-price apparatus deleted; cancel policy: no refunds, stop future billing, month-4 auto-continue disclosed plainly.
- **Testimonial rule:** current trio (Katherine, Kait, Ashley) OK at launch; community-member testimonials progressively replace 1:1 testimonials on /community.

## 6. Design (scope: `/context/design-direction.md`)

Full UI design, not just wireframes: palette, typography scale, spacing, components (cards, price badges, FAQ accordions, testimonial blocks, forms, nav/footer), high-fidelity designs for all pages, mobile-first responsiveness, accessibility for a 30–65 audience (font sizes, contrast, tap targets).

Seed: landing-v2's visual language (serif display + italic-emphasis device, cards, whitespace, price badges, portrait photography). Inputs still needed: `brand/colors-v1.md` + `design-brain/abq-tokens.md` from the Obsidian vault; photo assets collected off systeme.io CDN.

**Anti-template mandate:** no default fonts (no Inter), no stock component kits, no shadcn look, custom everything. Performance is part of the brand (instant loads, Lighthouse ≥ 95 all categories).

## 7. Tech (decided — `/context/tech-stack.md`)

Astro + Tailwind (custom tokens) + React islands, hosted on Vercel. Static pages + serverless functions only for: subscribe → systeme.io API (key server-side), Stripe webhook (adds Program buyers to list), contact form. **Division of labor (FINAL 2026-07-10, simplicity over consolidation):** Cal.com + Stripe = all 1:1 booking/payments ($97 intro embedded inline on /coaching; Program via Stripe Payment Link + private Cal.com link; $150 add-ons as paid event). systeme.io = email only. Mighty Networks = community only. Session/package counting is manual at current volume. See `/context/tech-stack.md`.

## 8. Milestones

Each milestone ends with review/approval by Jon plus the listed agent test. **A milestone is not done until its tests pass and Jon signs off.**

**M0 — Foundations.** Repo, Astro scaffold, Tailwind token pipeline, Vercel project + staging URL, CI (build + link check). *Test: clean build/deploy; agent verifies scaffold conventions documented in CLAUDE.md.*

**M1 — Design system.** Tokens (color, type, spacing), core components, homepage hi-fi design first for approval, then remaining pages. *Test: design-review agent audits against design-direction.md (anti-template mandate, accessibility, brand seed) before Jon sees it.*

**M2 — Pages built.** All pages implemented per the copy policy (site rule 6): existing copy transferred as canon, surgical changes shown to Jon as old-vs-proposed diffs, new sections assembled from Jon's own language. Coaching + community revisions discussed live during this milestone. *Tests: copy-audit agent checks every page against voice.md rules + no-timeline-promises rule + handle-with-care list; layout QA agent checks responsive breakpoints.*

**M3 — Integrations.** Subscribe endpoint → systeme.io (verified with real tag/automation), Stripe checkout for Program, Cal.com booking on /coaching, Stripe webhook, analytics events (opt-in, book-session, program-purchase, community-clickthrough), contact form. *Test: funnel-QA agent walks every CTA on every page to its terminal outcome (list join or payment page) and verifies analytics fire; integration tests with Stripe/systeme.io test modes.*

**M4 — Pre-launch hardening.** Legal rewrite pass (new offer terms), redirect map implemented, SEO basics (metas, OG, sitemap; noindex removed from pages that deserve indexing), performance pass, accessibility pass. *Tests: technical-QA agent — Lighthouse ≥95, zero broken links, all 301s resolve, a11y audit; independent full-site review agent does a cold "hire this guy?" assessment.*

**M5 — Migration & launch.** Asset migration, DNS cutover (with **SPF/DKIM records preserved so systeme.io email keeps sending — checklist item #1**), Mighty Networks pricing updated, abq-landing-v2 redirected, post-launch monitoring (24–48h watch on forms, checkout, email deliverability). *Test: post-launch agent re-runs the M3 funnel walk + M4 technical audit against production.*

**Post-launch backlog (not in scope):** sale-window banner infra, community testimonial swaps, on-domain quiz (separate stack), ad-variant page for /coaching if paid traffic starts.

## 9. Agent Testing Model

Independent subagents (not the builder) run each milestone's audits: design review, copy/voice audit, funnel QA, technical QA, and the cold-eyes pre-launch review. Findings are filed as issues; builder fixes; auditor re-verifies. Jon is the final gate at every milestone.

## 10. Open Decisions (nothing here blocks M0–M1)

| # | Decision | Owner | Needed by |
|---|---|---|---|
| 1 | Sale windows + depth ($175 vs $150/session) | Jon | post-launch |
| 2 | Add-on rate confirm ($150) at $200 standard | Jon | M2 copy |
| 3 | Credential string — include "MS"? (open-questions #12) | Jon | M2 copy |
| 4 | About page emphasis/exclusions | Jon | M2 copy |
| 5 | Analytics choice (Plausible rec. vs GA4) | Jon | M3 |
| 6 | Domain registrar/DNS access details | Jon | M5 |
| 7 | Mighty Networks supports 3×$97→$47/mo? | Jon or build task | M3 |
| 8 | Video on /coaching — keep? which? | Jon | M2 |
| 9 | Vault design tokens + photo assets transfer | Jon | M1 |
| 10 | Cal.com event cleanup (`-copy` slug; verify $97 charge + intake form attached) | Jon | M3 |

## 11. Success Metrics

Baseline is effectively zero instrumentation today, so M3 analytics establish the baseline. Targets to review 60–90 days post-launch: email opt-in rate (site-wide visitors → subscribers), $97 session bookings/month, session → Program conversion rate, community joins/month, and qualitative: does the site read as "hire this guy" to cold visitors. No vanity metrics; the two-outcomes rule is the measurement frame.
