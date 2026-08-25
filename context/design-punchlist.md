# Design Punchlist

Running list of **look** problems, collected during the copy phase so the design phase starts from a real brief instead of memory.

**How this file works.** During the copy phase we fix only what prevents Jon evaluating the page — genuine absences like a section with no padding, or a heading falling back to the browser default. Anything that is a *choice* — how big, what colour, what rhythm, how prominent — gets logged here and left alone.

**Why the discipline matters.** The v2 skin went generic because nobody decided the look; it accumulated. Structure was frozen at wireframe stage before a designer touched it, so later changes could only re-skin. Accreting styling section by section during a copy pass is the same failure in slower motion. See `design-direction.md` → "Design Reset".

---

## Open items

### Homepage

- **Hero second line has no styling.** `.kicker--under` is used on *"You've tried before. It didn't last."* but the rule was never written, so it falls back to `.kicker` — 0.78rem, uppercase, letter-spaced, pale grey. Label styling on one of the most important lines on the site. The source comment states the intent: *"'You've tried before' needs statement weight, not kicker size."* **Decision needed: how much weight.**

- **Adjacent bands with no colour break.** After the recent changes the sequence is mist · paper · paper · teal · white · mist · paper · white · paper · white · white · navy. Two seams have identical neighbours: the opt-in running into recognition, and proof running into stakes.

- **Authority band colour is provisional.** The 25 Years / 3 Decades / 35 Years section was set to `band--paper` purely so it stops merging into the offers section below. The separation is the point; the tint is a placeholder.

- **6b card asymmetry.** The community card has no description line, the session card has one. Deliberate — the community is fully described in 6a and repeating it was the original defect — but it may read lopsided with one card shorter than the other.

- **`$97` appears five times in section 6b** — the mega-number, twice in the heading, and once on each card. May read as emphatic or as drumming. Judge on screen.

- **`.door__terms` is unstyled.** "3 months, $291 paid up front" and "One per person" render as plain body text where they are qualifiers and probably want to be smaller or muted.

- **Guide statement sizing.** `.guide__statement` is set a shade below `display-lg` because at full size the sentence wraps to five or six lines and stops reading as a statement. The specific size is a guess.

- **Proof section layout can't carry full-length testimonials.** The three are now verbatim from the live site — roughly 110, 95 and 65 words — sitting in a three-column card grid. On desktop that's three walls of text; on mobile it's a long scroll between the offer and the final CTA.

  **The copy is not the variable — the layout is.** Jon: length is deliberate, because a long paragraph with a face and a name reads as a real person whether or not it's read, while a tidy one-liner reads as marketing. Options for the design phase: one featured full testimonial with two shorter, a carousel, stacked full-width rows, or expandable quotes. Do not solve this by trimming the quotes.

- **Kait's testimonial photo is framed wider than the other two.** Katherine's and Ashley's are studio headshots with the face filling the circle; Kait's is a still from video, so her face reads smaller at the same size. Could be cropped tighter, at the cost of some softening (806px source) and losing the necklace.

- **Testimonial photo size and shape.** Currently 56px circles inline with the attribution. The live site shows them at 150px. Both the size and the circle are placeholders — the circle is currently *functional* (it clips Katherine's baked-in white corners), so changing the shape has a dependency, see below.

  ⚠️ **Katherine's source is constrained.** Her photo is pre-cropped to a circle with **solid white corners, no transparency** — the corners are gone from the file, not hidden. Squares or rounded rectangles would show a white box around a circle. Kait's is a plain photo and Ashley's is a transparent circle, so only Katherine blocks a shape change. **Needs a fresh export from her original photo if the shape changes.**

- **The band directly above the footer needs a different background (Jon, 2026-08-23).** The final CTA section is `band--navy` and the footer is `--teal-deep` — two dark surfaces meeting, so the page has no visual close and the footer doesn't read as a separate zone.

  Related, and probably the same fix: the two bands before it are **both white** (proof, then stakes), so the run into the footer is white · white · navy · teal-deep. Three of those four seams have no contrast.

### /community — whole-page banding (surveyed 2026-08-23)

Sequence is: teal · white · white · alt · white · alt · mist · **teal** · white · paper · white · mist · **teal** → teal-deep footer.

- **Thirteen bands alternating at one constant rhythm, so nothing signals hierarchy.** The hero, a single feature row and the pricing ticket all read as "one band." A reader cannot tell where one idea ends and the next begins.

- **Width pinch in the middle.** Sections 1–7 run at the standard 1320 wrap, then transformation / pricing / "Just Start." drop to an inline `max-width:820px`, then it widens again for testimonials onward. The page squeezes and releases for no reason a visitor can perceive. **This one reads as a mistake rather than a choice.**

- **Dark-on-dark at the end.** Final CTA is `band--teal` and the footer is `--teal-deep`, so the page has no visual close. Same seam as the homepage — likely one fix for both.

- **Teal carries three unrelated jobs** — hero, transformation, final CTA — so it stops meaning anything.

- **Bands 2 and 3 are both white**, so the "What You Get" heading runs straight into the first feature row with nothing grouping them.

- **Band 2 is a heading and nothing else** — an entire section containing one line of text.

- **Four feature rows in a row** alternating white/alt, three with photos and one without. Rhythmic but monotonous.

### Site-wide

- **Portrait treatment.** `.guide__photo` is a bordered card with a hard gold offset shadow. Inherited from the v1 skin, never revisited.

- **Fonts are loaded from Google.** `Base.astro` notes self-hosting as a pre-launch hardening task.

---

## Resolved

- ~~6a offer cards had no CSS at all~~ — fixed 2026-08-23. `.offer` had zero rules, so its `h3` fell back to the browser default and read at the same weight as the body text under it. Sized to match `.door h3` since 6a and 6b are parallel sections.
- ~~Three sections had no vertical padding~~ — fixed 2026-08-23. `.optin-band`, `.offers`, `.stakes`. Values copied from sibling sections rather than chosen.
