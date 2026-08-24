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

### Site-wide

- **Portrait treatment.** `.guide__photo` is a bordered card with a hard gold offset shadow. Inherited from the v1 skin, never revisited.

- **Fonts are loaded from Google.** `Base.astro` notes self-hosting as a pre-launch hardening task.

---

## Resolved

- ~~6a offer cards had no CSS at all~~ — fixed 2026-08-23. `.offer` had zero rules, so its `h3` fell back to the browser default and read at the same weight as the body text under it. Sized to match `.door h3` since 6a and 6b are parallel sections.
- ~~Three sections had no vertical padding~~ — fixed 2026-08-23. `.optin-band`, `.offers`, `.stakes`. Values copied from sibling sections rather than chosen.
