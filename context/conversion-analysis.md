# ABQ — Conversion Analysis of Current Site (2026-07-10)

*Everything here is judged against one standard: does it increase conversion, business, and sales? Feeds the PRD. Analysis only — nothing built.*

---

## Addendum: $97 Landing Page Review (abq-landing-v2.vercel.app)

**This is the strongest page in the ABQ ecosystem.** One offer, one CTA repeated at every scroll depth, three entry states that mirror the member stages, concrete deliverables (written plan, restart playbook, follow-up) that make $97 feel underpriced, and a FAQ that pre-handles the exact objections (not ready, relapsed again, commitment fear). Voice-guide compliant. It should be treated as the design and copy benchmark for the whole rebuild — and it's already on Vercel, so it can seed the new stack.

**Issues found:**

1. **Per-session price anchoring is inconsistent across the ecosystem.** $97 here vs. effectively ~$249/session (4-week, $997) and ~$214/session (8-week, $1,497) on the main site. The footer links journeys together, so buyers WILL see both. Needs a deliberate story: e.g., "$97 intro session, credited toward a package" — the FAQ's reschedule-credit line already gestures at this. PRD decision.
2. **"No upsells. No subscriptions."** vs. footer links to subscriptions and FAQ mention of packages. The honest framing ("if ongoing support would help, I'll tell you, and you decide") is better — use that consistently and drop the absolute claim, or scope it to "no automatic upsells."
3. **Cal.com event slug ends in `-copy`** — verify it's the intended event and that payment collection is configured on it (a duplicated event can silently lack the $97 charge or the intake form).
4. **"Most clients quit within 3 weeks"** repeated here — same substantiation question as the main site (open-questions #10).
5. Off-brand domain (`abq-landing-v2.vercel.app`) — fine for testing; production should live on alwaysbequitting.com or a branded subdomain (affects trust and ad quality scores).

---

## What's Working — Keep These

- **Hero headline.** "Make This Your Last Attempt… Not Just Your Next One" is the StoryBrand promise in one line. Strong.
- **Lead magnet above the fold.** Low-friction free offer before any paid ask matches where most visitors are (not ready to buy).
- **The four member-stage self-qualifier** on the community page. Lets every visitor type self-identify and hear "join now." Rare and good.
- **Real long-form testimonials** (Katherine especially — she names the objections: shame, fear of withdrawal, doubt about coaching investment — and resolves them).
- **Honest FAQ** (no refunds with reasoning, not-confidential disclosure). Builds trust; keep in rebuild.
- **Empathy-first voice** largely holds across pages — consistent with voice.md.
- **Value reframe close** ("you're already spending the money… we are the antidote to those companies").

## Critical Fixes — Do Now on Systeme.io (don't wait for rebuild)

1. **Checkout price conflict.** `/hsdzywqq` shows $388, $997, and $1,297 on the same page; cart charges $997. A buyer at the moment of maximum skepticism sees three prices. This alone can zero out high-ticket conversion. Fix the stray $388 (leftover test discount?) today.
2. **Discount code ambiguity.** Community page says "CODE ABC26"; the nurture email says NOW97. If the Mighty Networks link already applies launch pricing, remove code language entirely (codes add friction); if a code is required, use one code everywhere.
3. **Typos on money pages.** "this this", "a proven coaching techniques", "you chose", "eachother", "$1k, $2k, 3k, 4k". Typos on a $1,497 sales page directly undercut the "25-year expert" positioning.
4. **`/abq_tips` button copy mismatch** — form promises "that guide" but the page offers a newsletter. Broken-promise micro-moment at the exact point of conversion.
5. **Raw systeme.io links on checkout** (`8974-jon.systeme.io/contact`, terms, privacy) — off-brand domain at the trust-critical step.

## Structural Conversion Problems — Solve in the Rebuild (PRD items)

### 1. The offer architecture is split-brained
The main site sells 1:1 coaching **only** as $997/$1,497 packages. The separate landing page sells a **$97 single session**. These never reference each other. Options for the PRD (decide, then build one coherent ladder):

- **A. $97 session as public entry offer:** Free (guide/quiz) → $97 community/mo → **$97 intro session** → $997/$1,497 package upsell (session fee credited). Classic tripwire-to-core ladder; likely strongest for a validation-stage business because it maximizes the number of people who experience Jon 1:1.
- **B. $97 session as ad-only offer:** keep it off the main site deliberately (paid-traffic landing page), main site stays package-first. Requires discipline: the two worlds must never cross in a buyer's journey or price anchoring breaks ($97 vs $997 for "a session with Jon" looks arbitrary).
- **C. Kill one of them.** Simplest of all.

The PRD must pick one. The current accidental version is the worst of all worlds.

### 2. Too many competing CTAs, no designed journey
Homepage/nav offers six paths: guide opt-in, community, coaching, podcast, quiz, contact — three of which are *different free offers* (guide, tips, quiz). StoryBrand rule: one direct CTA (buy) + one transitional CTA (opt in). Rebuild should define, per page: primary CTA, transitional CTA, and nothing else in the hot zones. Podcast (a thin, noindexed page) does not deserve prime nav space on a conversion site — move to footer or content hub.

### 3. The quiz dead-ends
The ScoreApp readiness quiz is arguably the best cold-traffic converter on the site (low friction, personalized, self-qualifying — and it maps 1:1 to the four member stages). But it lives on a third-party subdomain, shows "© 2025," and its results email is the last touch — no visible bridge into community or coaching. In the rebuild: bring the quiz experience on-domain (or at least skin + bridge it), and route each readiness-score band to a stage-matched next step. This is the path-based funnel the vault already proposed (acquisition-system).

### 4. No About page
Jon's authority (25 years, university teaching, certifications) is ABQ's #1 differentiator vs. apps and patches, and his story is compressed into one homepage block. A dedicated About/Why-ABQ page is a standard mid-funnel trust asset for high-ticket coaching. (Customer stays the hero; the page is structured as "why this guide.")

### 5. Fragmented platforms = no funnel visibility
systeme.io (site, email, coaching checkout) + Mighty Networks (community checkout) + ScoreApp (quiz) means no unified analytics: you cannot currently answer "which page/message produces paying members." The rebuild (Vercel) must specify: analytics/event plan, UTM discipline, and where each conversion is recorded. Conversion optimization without measurement is guessing.

### 6. Community vs. coaching priority is undecided on-page
The announcement bar, nav order, and homepage order all push community first; but coaching is the high-ticket validated-ish offer (pilot client, testimonials are all 1:1 clients). Note: **both testimonial sets describe 1:1 coaching results but are used to sell the community** — a subtle mismatch. PRD needs an explicit primary-revenue decision to drive page hierarchy.

## Copy & Compliance Flags

- **"Stop being a slave to nicotine use"** (coaching page) — explicitly on voice.md's banned list ("feel controlled by smoking/vaping" is the approved swap).
- **"Most of my clients stop smoking within 3 weeks…"** — unsubstantiated outcome claim; open-questions.md #10 already flags compliance sensitivity. Decide the defensible version before rebuild copy is written.
- **"99.9% of the smokers and vapers on the planet"** (community page) — invented statistic; the brand's credibility rests on clinical accuracy. Jon's real stat (97% cold-turkey failure) is stronger *because* it's real.
- Testimonial results (quit outcomes) may need an "individual results vary" treatment consistent with the medical disclaimer.

## Quick-Reference: Priority Order

| Priority | Item | Where |
|---|---|---|
| P0 — today | Fix $388/$997/$1,297 checkout conflict | systeme.io |
| P0 — today | Unify or remove discount codes | community page/emails |
| P1 — this week | Fix typos + banned phrase on money pages | systeme.io |
| P1 — this week | Fix /abq_tips button copy | systeme.io |
| PRD | One offer ladder (the $97-session decision) | rebuild |
| PRD | One CTA per page; nav redesign | rebuild |
| PRD | Quiz on-domain + stage-routed follow-up | rebuild |
| PRD | About page | rebuild |
| PRD | Analytics/event plan | rebuild |
| PRD | Substantiate or soften results claims | rebuild copy |
