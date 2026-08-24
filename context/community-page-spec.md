# ABQ — Community Page Spec (decisions as of 2026-07-10)

*Revision of /community-8-25. Bones stay; pricing model and its framing are rebuilt around the 3-month commitment.*

---

## Pricing (DECIDED)

**H1 (Jon, 2026-08-23): "Join the Quit Smoking and Vaping Community."** A deliberate divergence from the live site's "Join the AlwaysBeQuitting Community," which carried the brand name and none of the terms people search. Approved by Jon — do not "restore" the live-site version.

**REVISED 2026-08-21 — this section supersedes the original model in full. Built and live on the page.**

- **Lead framing: "$291 for 3 months — $97/month, paid up front."** ONE option. No monthly billing, no one-pay alternative, no "save $41." **Always pair "$97/month" with "paid up front"** — Jon: *"I don't want it to look like they can sub by the month."*
- **$291 = 3 × $97 deliberately**, to preserve the homepage device ("Either way, you start for $97") where community and the 1:1 session share an entry price. Do not change one without the other.
- **After 3 months: it ENDS.** Nothing auto-continues; there is nothing to cancel. Members who want to stay opt in to **$37/month**, set up by hand against their saved card, only after an explicit yes. The reward framing survives ("the longer you stay, the cheaper it gets — the opposite of every program that's burned you"); the automatic renewal does not.
- 📌 **PENDING COPY (Jon, 2026-08-23) — a second reason for the 3 months, not yet written.** The rationale on the page is currently about the individual: *"a commitment to yourself and to the process of quitting."* Jon wants the **group** argument added too: a three-month commitment means the room is full of people who are committed to transformation, rather than lurkers and trial members.

  Note the page already carries *"Positive, committed community (no lurkers or trial members)"* as a benefit bullet. The missing piece is the **causal link** — that the commitment is what produces that room — not a restatement. Write it as a benefit to the member ("you'll be among people who mean it"), never as gatekeeping.

  Candidate homes: the ticket terms line, and/or the "How long should I stay" FAQ. Jon to approve wording.

- **Commitment rationale wording is constrained.** Use *"Three months is a commitment to yourself and to the process of quitting, which takes time."* **Never** *"because that's how long transformation actually takes"* — Jon rejected it as an implied promise, and it violates PRD rule 3.
- **No refunds; commitment stands.** The $291 is non-refundable. Consistent with existing no-refunds philosophy ("an easy out encourages giving up"). Stated plainly.
- **No strikethrough pricing, ever.** Specials are Stripe coupon codes applied at checkout. There is no discounted community tier — the low-cost door is the $97 1:1 session.
- **Kill entirely:** discount codes (ABC26/NOW97), $147 "regular price," launch-pricing-lock language.

## Framing Rules

- The commitment is the headline feature, clinically justified: "We ask for 3 months because that's how long transformation actually takes." The page's existing 3–6-month FAQ argument now matches the product.
- "No lurkers or trial members" — keep; now literally true.
- The $47 tail is presented as a benefit, not fine print.

## Structure (mostly keep)

1. Hero: name + promise + pricing lead + join CTA
2. What You Get (live calls, recordings, 24/7 community, accountability, build-your-own-plan) — sharpen with concrete deliverables per the deliverables-not-nouns rule

   **CALL SCHEDULE CHANGED (Jon, 2026-08-14) — site-wide.** The old "every Tuesday at 8 PM ET" is retired and must not be reintroduced anywhere. Current wording: *"Community Support Calls are scheduled at the beginning of the month. There is usually one per week, sometimes more."* and *"We try to choose different times of the day so that both US and international members have a chance to attend. We publish the schedule at the beginning of each month."* Note `context/business.md` line 82 and `context/current-site.md` line 52 still record the old Tuesday 8 PM schedule — `current-site.md` is a historical record of the OLD site and is correct as-is; `business.md` is stale and should be updated.
3. Four-stage self-qualifier — KEEP (job here = "community fits your stage"; homepage's four cards route between doors — different jobs, both stay)
4. StoryBrand truth line + pricing box (new model)
5. "Just Start" value close ("antidote to those companies") — keep
6. Testimonials — keep trio for now; FLAG: all three are 1:1 clients. Replace progressively with community-member testimonials as they accumulate.
7. FAQ — keep, with rewrites: subscription/cancel policy (**UPDATED 2026-08-21: one payment of $291, membership ENDS after 3 months, opt-in continuation at $37/month, no refunds** — the old "month-4 auto-continue at $47" is gone and there is no cancellation mechanic because there is no subscription), "how long should I stay" (now answered by the structure itself), who-can-join, confidentiality, medical disclaimer all stay. **The medical disclaimer FAQ is verbatim from the live site and contains a self-harm / mental-health-crisis clause the footer version lacks — never edit or "de-duplicate" it.**
8. Final CTA

## OPEN ITEMS — found comparing staging vs live, 2026-08-14 (unresolved, revisit)

Found by diffing `/community` staging against live `/community-8-25`. **None of these have been changed.**

1. ~~**Medical disclaimer condensed**~~ — **RESOLVED 2026-08-14 (Jon): restored VERBATIM from the live site.** A condensed rewrite had dropped roughly two-thirds of the text, including the entire **Medication Discussions** and **Our Commitment to You** sections, "We are not doctors, therapists, or medical professionals," and the Terms reference to liability limitations and legal protections. The live version has **six labelled sections** (What We Provide / What We Don't Provide / Your Responsibility / When to Seek Medical Care / Medication Discussions / Our Commitment to You) plus an unlabelled opening and closing. **This text is now verbatim and must not be edited, shortened, or tidied.** Still open, separately: `/coaching` has no page-level disclaimer at all, and the site footer version lacks the self-harm/crisis clause.
2. **All three testimonials truncated**, no record of approval. Katherine lost the "constantly at war with myself… he acted as my biggest supporter" middle; Kait lost "He helped break the all-or-nothing thinking for me"; Ashley lost her middle sentence. **Live has photos of all three; staging has none.**
3. **Business line dropped** from "Who can join": *"If you're interested in our training methods for professional purposes, we offer separate consulting and training services. Feel free to contact us directly to discuss those options."*
4. **Subscription/cancellation FAQ still unapproved** — the page literally renders the marker *"[DIFF — rewritten for the new pricing model; Jon to approve]"*. Must be approved and the marker removed before launch.
5. **Confidentiality FAQ** lost its closing Terms and Conditions link.
6. **Assets:** community video is a placeholder; live uses laptop mockups showing the actual community, staging replaced them with abstract SVG icons that show nothing.

## Tech Notes (for PRD build phase)

- ~~**BLOCKER**~~ **RESOLVED 2026-08-21: Jon was right — Mighty Networks could not express it.** Their Installments feature handles a 3 × $97 commitment and a one-pay, but cannot roll into $47/mo afterwards, and a defaulted installment removes access permanently (unacceptable mid-quit). Checkout moved to **Stripe** entirely; Jon invites members into MN by hand. All four spots have been rewritten. Original note below for context.
- **Original blocker (Jon, 2026-08-14): "I don't think Mighty Networks allows this kind of pricing."** The whole 3-month-commitment model may be unsellable on the current platform. This is not just a checkout detail — **four places on `/community` describe these terms**: the hero pricing ticket, the full pricing section, the "Join the Community" button target, and the two pricing FAQs. If MN can't express `3 × $97 → $47/mo` (or `$250/3mo → $47/mo`), all four need rewriting together, not patching one at a time.
  - The two pricing FAQs ("How long should I stay", "subscription/cancellation/refund") are **deliberately left as-is pending this**, including the visible `[DIFF — Jon to approve]` marker. Do not tidy them; the marker is the reminder.
  - Current checkout link is a pre-existing MN plan (`/plans/1948481`) built for the OLD launch pricing — it does not implement the new model.
  - Options if unsupported: Stripe checkout on the new site → MN access provisioning; or approximate within MN's plan structure; or revisit the pricing model itself.
- Page URL on rebuild: /community (retire /community-8-25 with redirect).
