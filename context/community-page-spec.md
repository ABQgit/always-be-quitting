# ABQ — Community Page Spec (decisions as of 2026-07-10)

*Revision of /community-8-25. Bones stay; pricing model and its framing are rebuilt around the 3-month commitment.*

---

## Pricing (DECIDED)

- **Lead framing: "$97/month with a 3-month commitment."** One-pay option: **$250 for all 3 months (save $41)**.
- **After 3 months: auto-continues at $47/month** unless canceled. Disclosed clearly at purchase; sold as the reward ("the longer you stay, the cheaper it gets — the opposite of every program that's burned you").
- **No refunds; commitment stands.** All 3 payments are owed / one-pay non-refundable. Consistent with existing no-refunds philosophy ("an easy out encourages giving up"). Stated plainly.
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
7. FAQ — keep, with rewrites: subscription/cancel policy (commitment mechanics, month-4 auto-continue at $47, no refunds), "how long should I stay" (now answered by the structure itself), who-can-join, confidentiality, medical disclaimer all stay.
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

- **BLOCKER (Jon, 2026-08-14): "I don't think Mighty Networks allows this kind of pricing."** The whole 3-month-commitment model may be unsellable on the current platform. This is not just a checkout detail — **four places on `/community` describe these terms**: the hero pricing ticket, the full pricing section, the "Join the Community" button target, and the two pricing FAQs. If MN can't express `3 × $97 → $47/mo` (or `$250/3mo → $47/mo`), all four need rewriting together, not patching one at a time.
  - The two pricing FAQs ("How long should I stay", "subscription/cancellation/refund") are **deliberately left as-is pending this**, including the visible `[DIFF — Jon to approve]` marker. Do not tidy them; the marker is the reminder.
  - Current checkout link is a pre-existing MN plan (`/plans/1948481`) built for the OLD launch pricing — it does not implement the new model.
  - Options if unsupported: Stripe checkout on the new site → MN access provisioning; or approximate within MN's plan structure; or revisit the pricing model itself.
- Page URL on rebuild: /community (retire /community-8-25 with redirect).
