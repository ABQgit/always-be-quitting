# ABQ — Homepage Spec (decisions as of 2026-07-10)

*Agreed in PRD discussion. Copy drafting comes later; this is structure + section jobs. Design benchmark: abq-landing-v2.vercel.app (typography, card style, italic-emphasis headlines, price transparency).*

---

## Agreed Section Spine

1. **Announcement bar** — repurposed for real sale windows / "now booking" status. Never stale pricing.
2. **Hero** — keep "Make This Your Last Attempt to Quit Smoking or Vaping, Not Just Your Next One" + "You've tried before. It didn't last." Free Quick-Start Guide opt-in stays above the fold (cold-traffic capture). Compressed trust line near CTA. **TYPE-LED, NO PORTRAIT (Jon, 2026-07-11): customer is the hero — no photo of Jon in the hero, ever. The guide appears after the problem: Jon's portrait lives in section 4 (guide section) only. (The $97 landing page keeps its hero portrait — there, a session with Jon IS the product.)**
3. **Recognition section (MERGED, replaces the old cycle + 5 shame bullets):** two-line cycle lead-in ("You try to quit. It doesn't last. Months later you try again — and the cycle repeats.") then **four** recognition cards in landing-page card style: can't start / struggling to stay quit / already quit, want it to last / relapsed, want to try again. Four stages on homepage (routes to both doors); the session landing page keeps its three. Empathy-first, no shame spiral.
4. **Transformation-not-abstinence section** — MOVED (Jon, 2026-07-11) to directly after recognition: breaks the visual monotony of back-to-back 4-card rows and improves the narrative (problem → insight → needs → guide). The brand's core idea: "Temporary abstinence isn't quitting — transformation is." Bridges to offers: transformation takes months → that's why community = 3-month commitment and the program = 12 weeks.
5. **"What Makes The Difference" bridge (restored 2026-07-11, Jon's copy verbatim):** four items — Expert Guidance / Real Accountability / Ongoing Motivation / Mindset Transformation, each with its qualifier line. It's the referent for the guide section's "exactly that kind of support."
6. **Guide / qualifications section** — immediately after the bridge; answers "why would this time be different?" Credentials prominent: 25 yrs CTTS & NCNTT, 3 decades workshops, 35 yrs behavior-change programs. Jon = guide, visitor = hero. **Portrait modest size — not oversized (Jon, 2026-07-11).** Hero is CENTERED, type-led.
6. **SPLIT INTO TWO BEATS (Jon, 2026-08-14).** The single "Start for $97" section was doing two jobs — announcing *what Jon offers* and *what it costs to begin* — so neither service registered and the page read as one product with two buttons. Both doors being $97 made this worse: the reader saw one price twice. Now:

   **6a — "Two ways to work with me."** Names the two levels of service, no prices (offer-architecture rule 1: visitors self-select their level of service).
   - **The ABQ Community** — weekly live Q&A calls with Jon, 24/7 access, your own pace, don't have to be ready to quit.
   - **1:1 Coaching** — "Working with me directly, one to one, over the months a real transformation takes." **Names that ongoing 1:1 work exists without naming or pricing the Program** — this resolves the conflict below.

   **6b — "Either way, you start for $97."** The entry point. Price lives here only.
   - **Community:** $97/mo × 3-month commitment ($250 one-pay option), then $47/mo.
   - **1:1 Session:** $97 one-time, once per person ever, credited toward the Program. "A focused 50-minute conversation, and where working together begins."
   - Closes with "$97 is less than most people spend in a single month on smoking or vaping."
   - The shared $97 is now deliberate and reads as generous, because 6a already did the distinguishing.

   **Resolved conflict:** this line previously said the 1:1 door introduces "Quit for the Last Time: The 1:1 Program" ($1,200 etc.) directly. PRD §5 (2026-07-12) overrode that — the homepage does NOT advertise the Program — but this spec was never updated, and that override is what made Jon's coaching practice invisible on the homepage. The 6a wording restores the *existence* of ongoing coaching without advertising the Program. **PRD 2026-07-12 stands; the Program is still not priced or sold on the homepage.**
7. **Proof** — testimonials (Katherine, Kait, Ashley). Consider placing nearest the doors.
8. ~~**Short FAQ (NEW)**~~ — **CUT ENTIRELY (Jon, 2026-08-14).** The homepage had enough text, and objection-handling belongs on `/community` and `/coaching` where the decision is actually made. "Community or 1:1 — how do I pick?" is now answered structurally by the 6a/6b split, so the question no longer needs asking. Nothing from the FAQ was relocated onto the homepage.

8b. **Stakes (NEW, Jon 2026-08-14)** — StoryBrand beat 7 (Failure), placed immediately before the final CTA so the stakes land while the buttons are in view. Jon's wording, verbatim. Contains a **recorded exception** to the voice.md "no medical-scare messaging" rule — see the note in `voice.md`. Do not flag in copy audits.
9. **Final CTA + tagline close** — "Always be quitting, until you've quit for the last time."
10. **Footer** — disclaimers, legal, secondary links (podcast lives here, not in nav).

## Nav (decided direction)

Community · 1:1 Coaching · Free Guide · About · Contact. Podcast → footer. Quiz OUT of nav entirely (off-domain bounce — violates site rule); dormant until rebuilt on-domain. One free funnel: Quick-Start Guide (lead magnet) → ABQ Tips (the list).

## Rules Carried From Analysis

- One job per section; one primary CTA per page zone.
- Concrete deliverables everywhere ("written quit plan in 24 hours" not "expert guidance").
- Price transparency at first glance for both doors.
- Compressed trust lines at every CTA.
- Honesty de-risk language (one-session limit, cancel terms) stated plainly.
- Results claims: DECIDED — no timeline promises site-wide. "Everybody quits at their own pace" is the message; process honesty replaces outcome claims (see open-questions #10 resolution). Trust lines use credentials + pace-honesty, e.g. "CTTS & NCNTT · 25 years · No one-size-fits-all programs."
