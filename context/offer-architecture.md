# ABQ — Offer Architecture (decided 2026-07-10)

*Decisions made by Jon in PRD discussion. This supersedes conflicting offer descriptions in business.md and the live site. Open items at bottom.*

---

## The Ladder

| Level | Offer | Price | Role |
|---|---|---|---|
| Free | Quick-Start Guide, ABQ Tips, readiness quiz | $0 | Capture + nurture |
| Group | **ABQ Community** | **3-month commitment: 3 × $97/mo ($291) or $250 one-pay (save $41) → then $47/mo ongoing** | For people who won't buy 1:1 (preference or budget). Weekly calls + 24/7 support. Standalone product — NOT bundled with packages. 3-month structure matches "transformation takes 3–6 months." Replaces $97-launch/$147-regular/discount-code apparatus entirely. |
| 1:1 entry | **$97 Intro Session** | $97 one-time | 50-min session. Onboarding vehicle toward the package. **Strictly one per person, lifetime.** |
| Core | **One core coaching package** | 6 × 50-min sessions at $150–175/session (list ~$1,050; sale floor ~$900) | THE offer. Commitment + accountability + "Jon in your corner." Replaces the current 4-week/$997 and 8-week/$1,497 pair. |
| Extension | **Add-on sessions** (package alumni only) | ~$150/session (below the $175 package rate) | For clients who want more time/support after the package. Loyalty-priced, not premium-priced. |

## Decided Rules

1. **Homepage presents multiple offers** — visitors self-select their level of service (community vs. 1:1). Not a single-offer page.
2. **Package is buyable directly** — the intro session is optional, not a required gate. Ready buyers go straight to the package.
3. **$97 is credited toward the package with a deadline** (length TBD — e.g., buy package within 14 days of your session and the $97 comes off). This is the anchor-resolver and the post-session close.
4. **One core package, not two.** Add tiers later from real demand. Kills choice paralysis and the Sprint-vs-Complete confusion.
5. **Community stays separate** from packages. No bundling. (Package grads may be invited to join community as a next step — that's a CTA, not a bundle.)
6. **One $97 session per person, ever.** It's an onboarding mechanism; repeat cheap sessions would cannibalize the package.

## What This Fixes

- $97 vs ~$249/session anchoring → reframed as "risk-free first step, credited if you continue."
- Two-package confusion (unclear choice criterion, "4-week" running 5 weeks, "up to X sessions" anxiety) → one clear offer.
- Perpetual strikethrough pricing ($1,297→$997 forever) → to be replaced by honest pricing (open item).
- "No upsells. No subscriptions." absolute claim on landing page → becomes "one session, no automatic anything; if ongoing support fits, Jon will say so and you decide."

## Package Decisions (2026-07-10, second pass)

- **6 × 50-minute sessions over 12 weeks** — deliberately roomy window; life happens, no forced pace.
- **Standard rate $200/session → list price $1,200.** Set high enough to allow real discounting at defined times of year (cessation calendar: New Year, World No Tobacco Day May 31, Great American Smokeout in November). Sale levels available: $175/session ($1,050) or $150/session ($900).
- **Between-session support: email access to Jon.** (Simple, sustainable, no platform dependency.)
- **$97 intro credit: always applies, no deadline.** Anyone who did the intro session gets $97 off the package whenever they buy.
- **Add-on sessions for package alumni at ~$150** — deliberately BELOW the package rate. Continuing gets rewarded, never penalized. (Copy rule: frame as "more time and support," never "because you didn't quit.")
- **Program name (decided): "Quit for the Last Time: The 1:1 Program"** — uses the tagline verbatim. Short form for UI/nav where needed: "Quit for the Last Time" or "the 1:1 Program."
- **Strategic north star:** community is the scale engine (better economics than 1:1); coaching is the depth/proof/cash engine. Long-term goal is a large community. Homepage hierarchy should reflect this.

## Open Items (next discussions)

1. **Official sale windows + sale depth** (which holidays, which price level).
2. **Add-on session rate confirmation** at the new $200 standard ($150 as set, or $175?).
3. ~~$97 collision~~ **RESOLVED: accepted, and potentially an asset.** Jon is fine with both being $97. Can be leveraged as a deliberate framing: "Start for $97" — your first month of community OR a one-time 1:1 session; pick your path. Two doors, one entry price. **NOTE (2026-07-12): the two $97s are entirely separate products — the 1:1 session fee is NEVER credited toward community; see "Homepage & $97 Positioning" below.**
4. **Enforcement of one-$97-per-person:** policy copy + practical enforcement (Cal.com booking limits are weak for lifetime-per-email; real enforcement likely lands in the rebuild's booking flow / Stripe customer check). Also decide the polite refusal path for someone who wants a second cheap session (answer: community or package).
5. ~~**Homepage presentation:** likely two panels — Community ($97/mo) and 1:1 Coaching (package…).~~ **RESOLVED 2026-07-12 — see "Homepage & $97 Positioning" below. Homepage sells the $97 session, not the package.**
6. **Strikethrough/launch pricing policy** across all offers — what's real, what expires, what codes (ABC26/NOW97) survive.

---

## Homepage & $97 Positioning (decided 2026-07-12, Jon)

Four decisions, superseding conflicting homepage/landing-page language above and in the PRD:

1. **The homepage does NOT advertise the $1,200 program.** No package name, no package price, no "leads to the Program" line anywhere on `/`. The package is not a cold-visitor offer.

2. **The $97 session is marketed as "just meet with Jon"** — the abq-landing-v2 framing: "schedule a personal conversation and get yourself moving forward… the simplest way to work with me directly." It's a low-commitment invitation to meet, nothing more. Jon assesses fit *in the session* and sells the Program in person if it's a match. If it isn't, the $97 session stands alone as a complete, valuable thing. The homepage never pre-sells the package to get someone into the session.

3. **The $97 session sells via the standalone landing page, not `/coaching`.** The homepage's 1:1 door links OUT to the $97 sales page (abq-landing-v2.vercel.app for now). Rationale (Jon): the page is a closing sales page whose only job is booking the $97 meeting — it pushes momentum *forward*. This is the opposite of the ScoreApp quiz, which pushes people *backward* (a low "are you ready?" score can convince someone not to come back). So the $97 door closes; the quiz is not the entry. The landing page stays live at its Vercel URL; **later it gets ported ON-domain as an identical-looking page at a clean slug (e.g. `/session`)** so Jon can drop a direct link into YouTube descriptions (viewer lands on the sales page, never the homepage/nav). Keeping it live now costs nothing to rewire; the port is a follow-up, not a blocker. This is a deliberate, recorded exception to PRD site-rule 2 ("no off-domain links except checkout") — the $97 sales page is treated as an extension of the site.

4. **`/coaching` stays the Program's sales page** — it does NOT become a $97 page. It exists for people ready to consider the package and must sell/market it properly. Reached via nav, not pushed at cold homepage traffic.

5. **The $97 session fee is credited toward the Program ONLY — never toward community.** If someone does a $97 session and then joins the community instead of buying the Program, the $97 does not transfer. Two separate products. Homepage copy must not imply otherwise (and, per #1, shouldn't mention the credit at all — credit language lives on the landing page and `/coaching`).
