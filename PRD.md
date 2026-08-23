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
2. **No off-domain links except checkout** (Mighty Networks, Cal.com/Stripe) **and the $97 session sales page** (abq-landing-v2.vercel.app — a recorded exception; it's a closing sales page treated as an extension of the site, to be ported on-domain later; see offer-architecture.md "Homepage & $97 Positioning"). The ScoreApp quiz is removed from nav and de-emphasized until rebuilt on-domain someday.
3. **No timeline promises.** Quitting is quitting an addiction; everybody quits at their own pace. Process honesty replaces outcome claims. (Resolved: open-questions #10.)
4. **Voice compliance:** all copy obeys `/context/voice.md` — empathy first, no shame spirals, no hype, handle-with-care language swaps, customer is the hero, Jon is the guide (never a former smoker).
5. **Concrete deliverables, not abstract nouns.** Price transparency at first glance. Compressed trust lines at every CTA.

5b. **EVERY PAGE IS AN ENTRY POINT (Jon, 2026-08-14).** Traffic does not flow homepage → sales page. People are sent directly to `/community` or `/coaching` from ads, YouTube, email, and referrals, and many never see the homepage at all. Consequences:
   - **Duplication between pages is expected and fine.** "We already said that on the homepage" is NOT a valid reason to cut copy from a sales page. Never trim a page on the assumption the reader arrived from another one.
   - **Redundancy *within* a single page is still a defect** — that's the test that applies.
   - **Each page stands alone for its *offer*:** present what it sells, why it works, and how to buy, without depending on another page.
   - **Jon's qualifications do NOT belong on every page (Jon, 2026-08-14).** Credentials live on the homepage. Anyone who wants Jon's background clicks through to it. **Do not add a guide/credentials section to `/community` or `/coaching`** — considered and rejected.
   - **Pages may differ structurally** where their jobs differ. Divergence is allowed, but it needs a stated reason recorded in that page's spec — not accident or drift.
6. **Copy policy — existing copy is canon.** Jon's copy was developed deliberately over a long time and transfers as written by default. NO generated generic coaching copy, ever. Changes are surgical, each traceable to a recorded decision (pricing/offer language, timeline-promise removals, banned-phrase swaps, typos, agreed restructuring). New sections with no existing copy (two doors, transformation section, Program block, About) are ASSEMBLED from Jon's own language (voice.md verbatim excerpts, signature phrases, paradoxes, landing-page FAQ) — not invented. During the build, all copy is presented to Jon as old-vs-proposed diffs, page by page; coaching and community page revisions are discussed live during their build milestone. Jon approves every diff.

## 3. Offer Architecture (decided — `/context/offer-architecture.md`)

| Offer | Price | Notes |
|---|---|---|
| Quick-Start Guide → ABQ Tips | Free | THE lead magnet feeding THE list (systeme.io) |
| ABQ Community | **$291 for 3 months** ($97/month, paid up front). One payment, not a subscription — it ends. Members who want to stay opt in to **$37/month** afterwards | **Stripe** Payment Link; Jon invites them into Mighty Networks by hand. No refunds; no strikethrough pricing — specials are Stripe coupon codes only |
| $97 Intro Session | $97 one-time, **once per person ever** | Cal.com + Stripe (as today), embedded on /coaching. **NOT credited toward the Program (reversed 2026-08-14)** — it stands alone as paid coaching time |
| **Quit for the Last Time: The 1:1 Program** | $1,200 list ($200/session std; sale floor $150/session) | 6 × 50-min over 12 weeks, email access to Jon between sessions. Stripe |
| Alumni add-on sessions | ~$150/session | Below package rate on purpose. "More time and support," never "because you didn't quit" |

Sale windows run on the real cessation calendar (New Year, World No Tobacco Day May 31, Great American Smokeout Nov). No perpetual strikethroughs.

## 4. Site Map & Redirects

| New URL | Page | Replaces |
|---|---|---|
| `/` | Homepage | current homepage |
| `/community` | Community sales page | `/community-8-25` (301) |
| `/coaching` | 1:1 **Program** sales page (for ready buyers; reached via nav, not pushed at cold homepage traffic) | `/premium-coaching` (301) |
| `/session` (later) | On-domain port of the $97 session sales page — identical look; direct-linkable from YouTube. Until then, abq-landing-v2.vercel.app stays live and is linked from the homepage (NOT 301'd into /coaching) | abq-landing-v2.vercel.app |
| `/free-guide` | Opt-in destination for ads/social | `/abq_tips` (301) |
| `/quick-start` | **Quick-Start Guide delivery page (added 2026-08-14).** Where the guide email sends subscribers. Video + copy; the old $48/QUICKSTART offer is CUT. | `/quick-start-video-landing` (301) — critical, guide emails already sent point at the old URL |
| ~~`/about`~~ | **CUT 2026-07-12 (Jon): no About page.** The whole site already carries Jon's story, qualifications, and videos — a separate About page was redundant. Removed from nav. | — |
| `/contact` | Contact | `/contact` |
| ~~`/podcast`~~ | **CUT 2026-08-21 (Jon). Never built; footer link removed.** *"im not pursuing podcasting for this business because people wont listen. those podcasts are basically long testimonials for my services."* Interviews go on YouTube instead. **Old `/podcasts/always-be-quitting` 301s to `/` at launch** — those episodes function as testimonials, so the homepage (which carries the proof section) is the right landing place. | `/podcasts/always-be-quitting` → `/` (301) |
| `/privacy`, `/terms` | Legal (terms rewritten for new offer rules) | current legal pages |

`/hsdzywqq`, `/tqbeytfj` (old checkouts) retire → 301 to `/coaching`.
**Nav:** Community · 1:1 Coaching · Free Guide · Contact. (About page cut 2026-07-12; Podcast cut 2026-08-21.) Legal in footer.

## 5. Page Requirements

Full section-by-section specs: `/context/homepage-spec.md`, `/context/one-on-one-page-spec.md`, `/context/community-page-spec.md`, `/context/supporting-pages-spec.md`. Summary of the load-bearing decisions:

- **Homepage:** hero (keep "Make This Your Last Attempt…" + guide opt-in above fold) → recognition section (2-line cycle lead-in + FOUR stage cards) → guide/qualifications → transformation-not-abstinence section → **the Two Doors ("Start for $97": community vs a $97 session with Jon)** → proof → short FAQ → final CTA/tagline. **(2026-07-12) The homepage does NOT advertise the $1,200 Program.** The 1:1 door sells only the $97 "just meet with Jon" session and links OUT to the standalone $97 sales page (Jon assesses fit and sells the Program in-session); the $97 fee is **NOT credited toward anything (reversed 2026-08-14)**. See offer-architecture.md "Homepage & $97 Positioning."
- **/coaching:** $97 intro session is the center of gravity (Jon's decision); landing-v2 structure and copy carried over; new "What comes after" Program section; FAQ updated for one-per-person rule, **no credit (reversed 2026-08-14)**, honest no-automatic-upsells framing.
- **/community:** bones stay (four-stage qualifier, FAQ, antidote close); pricing model replaced with 3-month commitment framing ("we ask for 3 months because that's how long transformation takes"); $47 tail sold as benefit; codes/regular-price apparatus deleted; cancel policy: no refunds, stop future billing, month-4 auto-continue disclosed plainly.
- **Testimonial rule:** current trio (Katherine, Kait, Ashley) OK at launch; community-member testimonials progressively replace 1:1 testimonials on /community.

## 6. Design (scope: `/context/design-direction.md`)

Full UI design, not just wireframes: palette, typography scale, spacing, components (cards, price badges, FAQ accordions, testimonial blocks, forms, nav/footer), high-fidelity designs for all pages, mobile-first responsiveness, accessibility for a 30–65 audience (font sizes, contrast, tap targets).

Seed: landing-v2's visual language (serif display + italic-emphasis device, cards, whitespace, price badges, portrait photography). Inputs still needed: `brand/colors-v1.md` + `design-brain/abq-tokens.md` from the Obsidian vault; photo assets collected off systeme.io CDN.

**DESIGN RESET (Jon, 2026-08-14).** The built v2 skin was reviewed and rejected as generic. Root cause: the structure was locked at the wireframe stage (a card grid), and the styling brief then restricted the designer to color/type/spacing. Full diagnosis, new hard rules (NO CREAM; yellow-highlighter device rejected), the solved hero device (full-bleed environmental photography), and the site-wide imagery system are recorded in `context/design-direction.md` → "Design Reset (Jon, 2026-08-14)". **That section supersedes conflicting design guidance in this PRD and in the earlier parts of design-direction.md.**

**Amendment to site rule 6 — copy is canon, STRUCTURE IS NOT.** Rule 6 governs wording and stands unchanged. It does not lock section count, order, grouping, or proportion; those belong to the design and may change. Handing a designer a fixed skeleton is what produced the rejected result.

**Anti-template mandate:** no default fonts (no Inter), no stock component kits, no shadcn look, custom everything. Performance is part of the brand (instant loads, Lighthouse ≥ 95 all categories).

## 7. Tech (decided — `/context/tech-stack.md`)

Astro + Tailwind (custom tokens) + React islands, hosted on Vercel. Static pages + serverless functions only for: subscribe → systeme.io API (key server-side), Stripe webhook (adds Program buyers to list), contact form. **Division of labor (FINAL 2026-07-10, simplicity over consolidation):** Cal.com + Stripe = all 1:1 booking/payments ($97 intro embedded inline on /coaching; Program via Stripe Payment Link + private Cal.com link; $150 add-ons as paid event). systeme.io = email only. Mighty Networks = community only. Session/package counting is manual at current volume. See `/context/tech-stack.md`.

## 8. Milestones

Each milestone ends with review/approval by Jon plus the listed agent test. **A milestone is not done until its tests pass and Jon signs off.**

**M0 — Foundations.** Repo, Astro scaffold, Tailwind token pipeline, Vercel project + staging URL, CI (build + link check). *Test: clean build/deploy; agent verifies scaffold conventions documented in CLAUDE.md.*

**SEQUENCE CHANGE (Jon, 2026-08-14): copy now comes BEFORE design.** M1 and M2 swap order. Rationale: design is a response to content — you cannot decide that one section is a full-bleed sentence and another a split with a photograph until you know what they say and how long they run. Designing against unknown content is what produced equal-sized boxes. Homepage FAQ copy is still literally placeholdered (`[Copy phase — assembled from Jon's language]`), so the previous order was designing around unknowns. **Photography selection/commissioning runs in parallel with copy** — it has lead time, and design must not begin against gray placeholders again.

**M1 (was M2) — Copy revision, all pages.** Copy revised and approved per the copy policy (site rule 6): existing copy is canon, surgical changes shown to Jon as old-vs-proposed diffs, new sections assembled from Jon's own language, remaining placeholders written. Output is *content*, explicitly NOT a section skeleton — no fixed section count or order (see the rule-6 amendment in §6). Coaching + community revisions discussed live. *Tests: copy-audit agent checks every page against voice.md rules + no-timeline-promises rule + handle-with-care list.*

**M2 (was M1) — Design system.** Built against finished copy and real photography. Tokens (color, type, spacing), core components, homepage hi-fi design first for approval, then remaining pages. **Layout must be tokenized this time** — the v2 build left layout hardcoded in `home.css` plus inline `style=` attributes, so token swaps could only re-skin, never redesign. *Test: design-review agent audits against design-direction.md — including the 2026-08-14 Design Reset — before Jon sees it.* Then pages implemented; layout QA agent checks responsive breakpoints.

**M3 — Integrations.** Subscribe endpoint → systeme.io (verified with real tag/automation), Stripe checkout for Program, Cal.com booking on /coaching, Stripe webhook, analytics events (opt-in, book-session, program-purchase, community-clickthrough), contact form. *Test: funnel-QA agent walks every CTA on every page to its terminal outcome (list join or payment page) and verifies analytics fire; integration tests with Stripe/systeme.io test modes.*

**M4 — Pre-launch hardening.** Legal rewrite pass (new offer terms), redirect map implemented, SEO basics (metas, OG, sitemap; noindex removed from pages that deserve indexing), performance pass, accessibility pass. *Tests: technical-QA agent — Lighthouse ≥95, zero broken links, all 301s resolve, a11y audit; independent full-site review agent does a cold "hire this guy?" assessment.*

### systeme.io opt-in wiring ✅ LIVE ON STAGING, VERIFIED END TO END (2026-08-14)

**Confirmed working on `always-be-quitting.vercel.app`:** form submitted → contact created in systeme.io → ABQ Tips tag applied → automation fired → **Quick-Start Guide email received.** The whole funnel, not just the parts we can see from the code.

⚠️ **Vercel env var gotcha, cost an hour:** pasting a multi-line block into a single Environment Variable field stores the whole block as that one value. `SYSTEME_API_KEY` ended up containing all three variables, names and `=` signs included, which made the `X-API-Key` header invalid and threw `TypeError: Headers.append: ... is an invalid header value`. **One value per field.** Vercel's bulk ".env paste" import is the only place multi-line text belongs.

Diagnosing it needed Vercel → Logs → the `subscribe endpoint error:` line. The browser only showed a generic failure; the exception text is what identified it in seconds.



The homepage and `/free-guide` opt-ins POST to `/api/subscribe`, which creates the contact in systeme.io and applies the **ABQ Tips** tag (`1956363`). Verified working end to end: contact created, `first_name` captured, tag applied, `unsubscribed`/`bounced`/`needsConfirmation` all false.

**Why a tag and not a form:** Jon's original automation triggers on *"Blog form subscribed"* and its actions are `Add tag ABQ Tips` → `Subscribe to campaign ABQ Tips Newsletter`. The tag is the rule's **output**, so applying it by API never reached the campaign. Fix (Jon, 2026-08-14): a second rule with trigger `Tag added → ABQ Tips`, action `Subscribe to campaign → ABQ Tips Newsletter`.

### 🚨 MISSING PAGE — the Quick-Start Guide delivery page (found 2026-08-14)

`alwaysbequitting.com/quick-start-video-landing` is where the Quick-Start Guide email sends every new subscriber. It is a **systeme.io page and is NOT in the site map above.** At DNS cutover it stops existing, and every guide email ever sent — including ones already in inboxes — points at a dead URL. This is the delivery end of the only free funnel and nobody wrote it down.

What's on it:
- The lead-magnet video: *"This Simple 5-Minute Technique Will Jumpstart Your Quitting Attempt"* — `Quick-Start_Guide_Video_AlwaysBeQuitting.mp4`, **658 MB, 5:46, 1080p, `preload="auto"`, no poster.** Third raw master found being served this way.
- **An offer that contradicts the new pricing model:** *"$48/month — locked in for as long as you stay subscribed. That's the regular $147/month at a huge discount and it will never go up. Promo Code = QUICKSTART."* `community-page-spec.md` requires killing all three: codes, the $147 regular price, and price-lock language.
- CTA links out to `always-be-quitting.mn.co`.

**DECIDED (Jon, 2026-08-14): port the page and the video onto the new site, and CUT the special-price offer.**

1. **New page `/quick-start`** — the guide-delivery page, rebuilt in Astro. Video + whatever copy Jon wants around it. Add to the site map above.
2. **Video** — encode the 658MB master the same way as the others (720p + 480p, faststart, poster, click-to-load `VideoEmbed`). Master goes in gitignored `video-source/`. Expect roughly 40MB at 720p for 5:46.
3. **REMOVE the special-price block entirely (Jon, 2026-08-14).** Everything from "I'd like to offer you a SPECIAL RATE…" through the "Get the Deal" button goes: the $48/month rate, the "locked in… will never go up" promise, the $147 regular price, and the QUICKSTART promo code. All four conflict with the 3-month model and with `community-page-spec.md`, which requires killing codes, the $147 anchor, and price-lock language. **Do not replace it with a different discount** — decide separately whether this page carries any offer at all.
4. **Redirect** `alwaysbequitting.com/quick-start-video-landing` → `/quick-start` at cutover, so guide emails already sitting in inboxes keep working. Add to the redirect map.
5. **Update the email** in the systeme.io campaign to point at the new URL for future sends.

~~**Still open:** grandfathering the "$48/month locked in forever" subscribers.~~ **CLOSED (Jon, 2026-08-14): nobody has ever joined the community, so there is no one to grandfather.** The old offer can be removed outright with no legacy obligation.

⚠️ **M5 CHECKLIST ITEM — disable the old "Blog form subscribed" automation rule at cutover.** Until then BOTH rules are live: a blog-form signup adds the tag (rule 1) which then fires rule 2, attempting the campaign subscription twice. Jon has accepted this interim risk. Once the systeme.io site retires, the tag rule is the only path and must not be deleted.

Note: `GET /api/automation/rules` does **not** list the blog-form rule — its trigger type isn't in the API's enum (`tag_added`, `tag_removed`, `form_subscribed`). An empty response from that endpoint does not mean no automations exist. Check the dashboard.

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
| 7 | ~~Mighty Networks supports 3×$97→$47/mo?~~ **RESOLVED 2026-08-21 — no. Community billing moves to Stripe, off-platform.** See "Community billing — DECIDED" below | — | — |
| 8 | Video on /coaching — keep? which? | Jon | M2 |
| 9 | Vault design tokens + photo assets transfer | Jon | M1 |
| 10 | Cal.com event cleanup (`-copy` slug; verify $97 charge + intake form attached) | Jon | M3 |
| 11 | **$97 landing page (abq-landing-v2.vercel.app) needs a review pass — SEPARATE CODEBASE, not this repo** | Jon | before launch |
| 12 | **Resend: verify `alwaysbequitting.com` so the contact confirmation email can send** (blocked on DNS) | Jon | M5 launch |
| 13 | **Google reCAPTCHA keys for the contact form** (can likely reuse the existing site key) | Jon | before launch |
| 14 | **Program checkout** — create the $1,200 Stripe Payment Link and paste its URL into `PROGRAM_URL` in `src/pages/coaching.astro`. Step-by-step in `SETUP.md` | Jon | M3 |
| 15 | **Move video files OUT of git and onto Cloudflare R2** | Jon + build | before launch |
| 16 | **Stripe sandbox → live checklist** — sandbox settings do NOT carry over. Terms-of-service URL in live Public details was **deliberately deferred** (Jon, 2026-08-18) and must not be forgotten. Full checklist in `SETUP.md` → "Going live" | Jon | before launch |

### Community billing — DECIDED (Jon, 2026-08-21)

**Community payments run through Stripe off-platform, NOT through Mighty Networks plans.** Jon grants and revokes MN access by hand: *"at this point i can grant subs access by hand. i dont have many yet."*

**Why Mighty Networks couldn't do it.** Researched against their host docs 2026-08-21:

- ✅ 3 × $97 as a hard commitment — their **Installments** feature (*"members commit to completing all payments and cannot cancel or reschedule"*)
- ✅ $250 one-pay — One-Time Payment
- ✅ Both side by side — their **Combine Offers** feature
- ❌ **Automatic roll into $47/mo — not supported.** Installments are a split one-time purchase with no rollover, and *"moving is only supported for subscription plans but not for one-time or interval plans."* The $47 tail would be a manual re-sell to every member at month 3, not a renewal.

Also rejected on care grounds: with MN installments, a failed payment retried for 7 days ends in access being removed automatically, and *"a defaulted installment plan cannot be resumed."* An expired card would strip someone's community access mid-quit with no way back. Unacceptable for a cessation community.

**The setup — FINAL (Jon, 2026-08-21). Supersedes the subscription drafts below it in this document's history.**

- **One Stripe product: `ABQ Community — 3 Months`, $291 one-time.** NOT a subscription. Sold via a Payment Link, self-serve from `/community`.
- **$291 = 3 × $97 deliberately.** It preserves the homepage device ("Either way, you start for $97") where community and the 1:1 session share an entry price. Changing one price requires changing the other.
- **Always pair "$97/month" with "paid up front."** Jon: *"I don't want it to look like they can sub by the month."*
- **It ends.** Nothing renews. Members who want to stay opt in to **$37/month**, which Jon sets up by hand against their saved card. Never charge without an explicit yes in writing.
- **"Save payment details for future use" is ON** on the Payment Link — deliberately. It forces Stripe to create a real Customer (one-time payments otherwise create guest customers with no reusable card), which is what makes the month-4 continuation frictionless.
- **No strikethrough pricing, ever.** $291 is the price. Specials are **Stripe coupon codes applied at checkout**. There is no discounted community tier — Jon: *"the discounted price is an individual meeting with me at 97. If they are not willing to spend money, they are not clients of mine."*
- Rejected along the way, do not revive: a $97/mo subscription with a step-down (needs an API-only subscription schedule); a $249 one-time (breaks the $97 homepage symmetry); a one-time + 90-day-trial combo (Stripe renders it as "Try… / 90 days free / Pay and start trial", which reads as a free sample); a separate $37 trial link emailed later (a loophole — it grants 90 free days to anyone holding the URL).

🚨 **Two things nothing is tracking.**

1. **Stripe holds no record of the 3-month term.** A one-time payment has no duration, no end date, no expiry. Mighty doesn't know either — the invite doesn't lapse. Every member's end date lives only in Jon's own records, so a reminder (week 10, to allow the continuation conversation before access lapses) and a written list are load-bearing, not optional.
2. **MN access must be revoked by hand** when a term ends or a continuation lapses. Fails silently; they simply keep free access.

### Pricing & discount policy — DECIDED (Jon, 2026-08-18)

Settled so it stops being re-litigated. Full reasoning in `offer-architecture.md` open item 6.

1. **Legacy codes are dead.** `ABC26`, `NOW97`, the `$147` "regular" community price and the `$48` subscriber price do not exist. They survive only in `current-site.md` and `conversion-analysis.md`, which are historical records of the OLD site and are correct as-is — do not clean those.
2. **"Heavily discounted from my normal hourly rate" STAYS** on `/coaching` (the $97 card and the FAQ). It's true, Jon approved the wording, and it does real work explaining why the session is offered once per person. It is not a coupon.
3. ~~**The community's `$250 one-pay (save $41)` STAYS**~~ **SUPERSEDED 2026-08-21.** Community is now a flat $291 for 3 months with no alternative option and no discount framing. See "Community billing — DECIDED".
4. **Real sales run during the year** on the cessation calendar. No perpetual strikethrough: a struck price must map to a sale with a real end date. Between sales the page shows list price only.

**How sales are run** depends on the checkout, which is now Calendly — see the next section. Sale pricing is never hardcoded into page copy.

### Program checkout — DECIDED (Jon, 2026-08-18)

**Stripe Payment Link for the money, Cal.com Private Link for the booking, Jon connects them by hand.** Calendly Meeting Packages were evaluated and **rejected** — Jon is staying on Cal.com. Do not re-propose Calendly.

**The flow:**

1. `/coaching` CTAs → **Stripe Payment Link, $1,200**, created with **"Allow promotion codes" enabled**.
2. Stripe's post-payment confirmation shows a custom message: booking link arrives by email within one business day. (Stripe setting, not a page we build.)
3. Jon gets the Stripe notification, opens the Program event type in Cal.com → Advanced → Add Private Link, sets **6 uses** and **expiry = purchase date + 12 weeks**, emails it.
4. The link enforces the package by itself: session 7 has nowhere to go, week 13 returns 404.

**Naming — DECIDED (Jon, 2026-08-18): the two names deliberately differ. Leave them.** The site sells **"Quit for the Last Time: The 1:1 Program"**; the Stripe product is **"1:1 Coaching with Jon - 6 Sessions."** This is not an inconsistency to fix — the site name carries the brand promise, the checkout name says plainly what is being bought. Do not "reconcile" them.

**The one thing that actually bites:**

- **The Program event type in Cal.com must have NO Stripe payment attached.** The $97 event has one. If the Program event is made by duplicating it, clients get charged $97 six more times on top of the $1,200. Make it fresh, or remove the payment app from the copy.

**CORRECTION (2026-08-18).** An earlier draft of this section claimed "Allow promotion codes" must be enabled at creation because it cannot be retrofitted. **That was wrong and was not checked before being written down.** `allow_promotion_codes` is an updatable parameter on `POST /v1/payment_links/{id}`, and Stripe's Dashboard docs consistently say "create **or edit** a payment link." It can be turned on at any time. Enable it at creation anyway so it's simply done — but nothing is lost if it's forgotten.

**Also verify:** whether Private Links with usage/expiry caps are available on Jon's Cal.com plan. The help doc phrases the gear-icon options as *"**Number of allowed uses**, or **Expiry date**"* — the "or" may mean the UI allows only one. The API accepts both together (`maxUsageCount` + `expiresAt` on `POST /v2/event-types/{eventTypeId}/private-links`), so if the UI forces a choice, prefer **6 uses** and track the 12 weeks by hand.

**Deliberately NOT built** (premature at zero clients, per Jon): Stripe webhook, Cal.com API integration, `/program-welcome` page, automatic link minting. Revisit when the manual step actually hurts.

**Jon's stance:** *"i may not get many clients and can just sell 1200 for 6 sessions and manually deal with them."*

### Open decision #15 detail — video hosting on R2 (added 2026-08-14)

**Current state:** encoded video sits in `public/video/` and is committed to git, so Vercel serves it. Works, but not where it should end up.

| | Source (live on systeme.io today) | Encoded |
|---|---|---|
| Size | **732 MB** | **44 MB** (720p) / **15 MB** (480p) |
| Bitrate | 15.1 Mbps | 954 kbps / ~310 kbps |
| Length | 6:26.8 | unchanged |

**Why move to R2:**

1. **Git.** 59MB of binaries committed to the repo live in its history permanently. Every clone pulls them forever, and they can't be removed without rewriting every commit. This gets worse with each video added.
2. **Bandwidth.** R2 has **zero egress fees**, so views cost nothing and don't consume the Vercel allowance. On Vercel Pro's 1TB, 44MB works out to ~23,000 views/month before overage.
3. **Cost.** Storage is $0.015/GB/month; 59MB is a fraction of a cent, and there's a 10GB free tier.

**Steps:** create an R2 bucket → upload the encoded files → enable public access or a custom domain → change the URL in `VideoEmbed` → delete the files from `public/video/` and gitignore the directory.

**Masters never enter the repo.** `video-source/` is gitignored; the 699MB `.mov` stays local only.

**Also fixed by the rebuild:** the live systeme.io page serves the 732MB master with `preload="auto"` and **no poster**, so every visitor starts downloading it before clicking anything, and sees a black box with a spinner meanwhile. The new player loads nothing until clicked.

### Open decision #12 detail — Resend domain verification (added 2026-08-14)

The `/contact` form sends **two** emails: the notification to Jon, and an auto-confirmation to the person who wrote in. The confirmation doubles as a soft marketing touch (short blurb on coaching, YouTube, community; **exactly one link** on purpose, since multiple links in an automated reply is a strong spam signal).

**Current state: the confirmation cannot send.** It goes from `no-reply@alwaysbequitting.com` (Jon's decision — his personal address is never exposed and replies can't chase him), and Resend refuses to send from an unverified domain.

**Until verification is done, `CONFIRMATION_ENABLED=false` must be set in Vercel**, otherwise every submission logs a failed send. Jon's own notification email is unaffected and keeps working.

Steps: Resend → Domains → Add Domain → add the DNS records → remove `CONFIRMATION_ENABLED=false`.

⚠️ **DNS currently lives with systeme.io and carries the live email SPF/DKIM records. Coordinate at M5 cutover — checklist item #1 in the M5 milestone — or systeme.io email deliverability breaks.**

Knock-on: the `/contact` page tells people *"If you do not get confirmation of your submission, please check your spam/junk mailbox."* That line only makes sense once this is live. Either finish verification before launch or soften the line.

### Open decision #11 detail — the $97 landing page (added 2026-08-14)

`abq-landing-v2.vercel.app` is the live sales page for the $97 meeting, treated by site rule 2 as an extension of the site. It lives in its own Vercel project, **not in this repo**, and per `CLAUDE.md` is not to be edited from here. It has drifted from current decisions and needs its own pass:

1. **Timeline promise, twice.** The hero trust line reads "CTTS & NCNTT Certified · 25 yrs specialist · **Most clients quit within 3 weeks**", and it recurs lower down. Violates PRD rule 3 and the site-wide ban recorded in `business.md`. **Highest priority — it's the first line a buyer reads.**
2. **Check the FAQ for $97 credit language.** The accordions were not opened, so this is unverified. `current-site.md` records the old policy as "late cancel = credit toward a multi-session package." The credit was **reversed 2026-08-14** and must not be promised anywhere. Likely locations: "What if I need to reschedule?" and "Is this the same thing as the community or premium coaching?"
3. **Scroll-reveal bug.** Testimonials render as invisible ghosts when scrolled past (observed 2026-08-14). Content that never appears is a conversion defect, not an effect.
4. **Footer links** point at old systeme.io destinations ("Premium 1:1 Coaching", "Free Assessment") and need remapping at launch.
5. **Offer naming** predates "Quit for the Last Time: The 1:1 Program".

Eventually ports on-domain to `/session` (see §4 site map).

## 11. Success Metrics

Baseline is effectively zero instrumentation today, so M3 analytics establish the baseline. Targets to review 60–90 days post-launch: email opt-in rate (site-wide visitors → subscribers), $97 session bookings/month, session → Program conversion rate, community joins/month, and qualitative: does the site read as "hire this guy" to cold visitors. No vanity metrics; the two-outcomes rule is the measurement frame.
