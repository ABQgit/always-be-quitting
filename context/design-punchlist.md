# Design Punchlist

Running list of **look** problems, collected during the copy phase so the design phase starts from a real brief instead of memory.

**How this file works.** During the copy phase we fix only what prevents Jon evaluating the page — genuine absences like a section with no padding, or a heading falling back to the browser default. Anything that is a *choice* — how big, what colour, what rhythm, how prominent — gets logged here and left alone.

**Why the discipline matters.** The v2 skin went generic because nobody decided the look; it accumulated. Structure was frozen at wireframe stage before a designer touched it, so later changes could only re-skin. Accreting styling section by section during a copy pass is the same failure in slower motion. See `design-direction.md` → "Design Reset".

---

## 🚀 THE SITE IS LIVE (2026-08-26)

`www.alwaysbequitting.com` serves this build. It is public, indexed, and both checkout buttons take real money.

**So design work is production work.** Put it on a branch, review the Vercel preview URL, merge to `master` only when approved. If something ships broken: Vercel → Deployments → promote an earlier one (Instant Rollback), then fix in git. Restore point: git tag `pre-design-2026-08-26`.

## Where the copy phase got to (2026-08-25)

Design starts from here. **Four surfaces had a full copy pass:** the homepage, the footer, `/community`, and `/coaching`. Those are settled enough to design against.

**Three pages have had no copy pass at all** — `/contact`, `/terms`, `/privacy` — and `/free-guide` and `/quick-start` have had only incidental changes. Terms and privacy were ported verbatim on purpose and are not copy problems. But **`/contact` and `/free-guide` have never been reviewed the way the other four were**, so treat any design decision that depends on their content as provisional.

**Not design, but do not let it get lost in the switch:** both checkout links in source are still Stripe **sandbox** links (`PROGRAM_URL` in `coaching.astro`, `JOIN_URL` in `community.astro`). They cannot take real money. The build prints a warning on every run while that's true. See `SETUP.md` → "Going live".

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

- **The A/B/C/D choices are now collapsed (2026-08-25), which leaves two look items.**

  **The `+` is tiny next to the badge.** The disclosure marker is 1.6rem sitting beside a 3.2rem letter, so it reads as an afterthought and is easy to miss. Its values were copied wholesale from `.faq summary` rather than chosen, which is why it doesn't relate to this card's scale. **Decision needed: how the affordance should look here** — the FAQ's `+` was sized for a flex row of body text, not for a card with display-size type in it.

  **Closed cards are now slightly ragged.** With `align-items: start`, cards size to their own content, so a two-line headline (223px) sits beside a one-line headline (193px). Previously all four were a uniform 223px, but only because the row stretched — which is what produced the empty-box bug when one opened. The 30px step is the cost of the fix. A `min-height` on the summary would even them up; that's a chosen value, so it's a design call.

### /coaching (surveyed 2026-08-25, after the copy pass)

- **The "What to Expect" cards are the reason Jon raised this page.** His words: *"It is just boring to look at… It is supposed to be scannable and it's just not really even worth looking at the way it's done."*

  **The copy half is fixed and shipped** — all eight titles were rewritten to carry claims instead of category labels, because scanning means reading titles and the old ones ("Fluid quit plan", "Advanced mindset focus") returned a taxonomy with every reason to buy buried in the body.

  **The visual half is untouched and still exactly as he described it.** Eight identical white rounded cards, two columns, and the `h3` sits at nearly the same size and weight as the `<p>` beneath it — so the titles now say something but still don't *look* like titles. **Decision needed: how much separation between card heading and card body.** This is the single most-cited complaint on the page.

- **Icons on the cards — open question, and unresearched.** Jon: *"I'm not sure if it needs [icons] at the top, sort of like I have in other places on the live always be quitting site."* ⚠️ **`current-site.md` contains no record of icon usage anywhere** — the live page needs looking at before anyone advises on this.

  **Constraint if they go in:** PRD bans template and stock-component looks. Eight icons pulled from a set (Lucide, Heroicons, etc.) is the fastest possible route to exactly that, and generic icons on abstract concepts tend to carry no meaning. Bespoke marks could work; a grab-bag would actively hurt.

- **Checkmarks were considered and rejected for this grid.** They signal "list of things included", which is why they work in *Pays for Itself*. These cards are heading-plus-explanation, so a check in front of a heading that already has a paragraph under it reads as clutter. Recorded so it isn't re-proposed.

- **Card lengths are uneven and it shows.** Cards 7 and 8 run roughly three times the height of card 1, so the bottom row is visibly deeper than the rest. Copy is not the variable — all eight bodies are Jon's verbatim live-site bullets. Layout or truncation is the lever.

- **`.checks--ink` is dead code in this file.** Defined in `coaching.astro`'s `<style>` with a comment saying it's used in the $97 card; it isn't anymore. Only `/community` uses it. Trivial cleanup, noted so the next reader doesn't trust the comment.

- **Eight cards is a lot, and nothing groups them.** No sub-grouping, no ordering logic a reader can perceive. Whether that matters is a layout call, not a copy one.

### Site-wide

- **Display type and reading type want different containers (Jon, 2026-08-23).** *"When we have one large line in a section by itself, it looks better to be in a wider column container."* Correct, and worth stating as a rule because it will come up repeatedly: **measure is characters per line, not pixels.** At body size, `--wrap-read` (800px) gives a comfortable ~70 characters. At `display-lg` the same 800px gives ~25–30, which chops a sentence into fragments.

  So the three widths are not a size ladder — they are a *measure* ladder, and which one a section gets depends on its type size, not on how important it feels. A section holding one display-size line has no reading measure to protect and should not sit in the reading container.

  **Still a choice:** whether a lone statement belongs at `--wrap-full` (1320, what the homepage does and what `/coaching` now matches) or wants a fourth token between media and full. Deferred — 1320 is at least *consistent* now, which it wasn't.

  Two sections are unresolved under this rule and were left alone:

  - **`/community` "Just Start."** — at `--wrap-read`. It is a heading plus two paragraphs, not one line, so the rule doesn't cleanly apply; the large paragraph inside it may still be pinched.
  - **`/community` pricing ticket** — also at `--wrap-read`, and it is a price card rather than prose. Part of the width-pinch item above.

- **The social share card is a placeholder (2026-08-25).** `public/img/og-default.png` — 1200×630, flat teal, Jon's headshot in a circle with a mist ring, **no typography at all**. It was generated rather than designed: the site's real fonts (Source Serif 4, Public Sans) weren't available to render into an image, and inventing substitute typography would have been a styling call during the copy phase.

  It is genuinely serviceable — every platform renders `og:title` and `og:description` as text beneath the image, so the card doesn't have to carry words. But this is the image that represents the whole business every time anyone shares a link, so it deserves real attention. **Per-page cards are already supported**: pass `ogImage="/img/og-community.png"` to `Base`.

- **Portrait treatment.** `.guide__photo` is a bordered card with a hard gold offset shadow. Inherited from the v1 skin, never revisited.

- **Fonts are loaded from Google.** `Base.astro` notes self-hosting as a pre-launch hardening task.

---

## Resolved

- ~~6a offer cards had no CSS at all~~ — fixed 2026-08-23. `.offer` had zero rules, so its `h3` fell back to the browser default and read at the same weight as the body text under it. Sized to match `.door h3` since 6a and 6b are parallel sections.
- ~~`/coaching` stakes line was narrower than the identical line on the homepage~~ — fixed 2026-08-23. The section carried an inline `max-width:820px` that the width collapse mapped to `--wrap-read` (800px), so the same three sentences ran at 800 on `/coaching` and 1320 on `/`. Moved to the default wrap to match. Not a styling call — a mis-assignment introduced by the collapse the same afternoon.
- ~~Three sections had no vertical padding~~ — fixed 2026-08-23. `.optin-band`, `.offers`, `.stakes`. Values copied from sibling sections rather than chosen.
