# ABQ — Design Phase Scope & Direction (2026-07-10)

*Jon's directive: the design phase is FULL visual design, not just wireframes. Claude designs the colors, typography, UI components, and page layouts.*

---

## Claude Design Workflow (M1 — how this actually runs)

Claude Design (claude.ai/design, or Claude Desktop sidebar; Anthropic Labs, on Jon's plan) is the design tool. Division of labor:

1. **Claude (this repo) prepares brief packages** per page: ready-to-paste prompt + attachments (this doc, the page spec, landing-page screenshots, vault color tokens, photography).
2. **Jon drives Claude Design:** create an "ABQ Website" project → attach the package → wireframe pass first → iterate (chat = structural, inline comments = targeted, canvas = quick edits; ask for 2–3 variations when unsure).
3. **Order:** design system/tokens → homepage → remaining pages inherit the system.
4. **Handoff:** export to coding agent / standalone HTML → into this repo → implemented in Astro against specs → agent QA. No rebuilding from screenshots.
5. Specs come from this repo; Claude Design consumes specs, produces visuals; Jon approves.

Note: Claude Design usage shares plan limits — specific briefs up front, fewer iterations.

## Scope of the Design Phase

1. Wireframes (structure per page specs) — first pass
2. **Full UI design system:** color palette, typography scale, spacing, buttons, cards, forms, pricing components, testimonial blocks, FAQ accordions, nav/footer
3. High-fidelity page designs for: homepage, community page, 1:1 page, free-resources, about, contact
4. Responsive/mobile treatment (the old landing-v2 briefs specifically worked mobile readability — carry that concern forward)

## Starting Points

- **abq-landing-v2.vercel.app: DEMOTED as visual seed (Jon, 2026-07-11)** — the page was AI-built and reads slightly template-ish; do NOT attach it as a design reference. What survives from it are three named devices, applied as written constraints: serif display headlines with selective italic-emphasis, generous whitespace + card sections, plain price badges/transparency. (It remains the benchmark for COPY mechanisms — entry states, FAQ voice, deliverables framing.) Preferred visual references: real sites Jon admires, attached as mood references only.
- **Branding is PROVISIONAL (Jon, 2026-07-11):** existing brand colors may change; palette must be token-swappable; design proceeds on a neutral base with palette options. Vault token files (`brand/colors-v1.md`, `design-brain/abq-tokens.md`, on the Mac Mini) are now optional reference, not required input. Photos/videos/icons/avatars arrive later — build with correctly-sized placeholders that swap without layout changes.
- Existing photography: Jon portrait/headshot, testimonial headshots (currently on systeme.io CDN — must be collected before migration).

## Jon's v1 Design Critique (2026-07-11) — the QA checklist for every skin

v1 (first Claude Design output) rejected as weak: flat / two-dimensional / lacks contrast / cards visually mushy / sections not full-width where they should be / no dynamic scrolling / boring, looks AI-made. Every future design pass must answer ALL of these:

1. **Depth:** layering, shadows with intent, overlap between sections — not flat planes
2. **Contrast:** strong dark/light section rhythm; big type-scale jumps
3. **Crisp cards:** defined edges, deliberate shadows, hover behavior — never soft gray mush
4. **Full-bleed:** color bands span the full viewport; content constrained inside
5. **Dynamic scrolling:** scroll-driven reveals/motion (CSS scroll-timeline, graceful degradation, reduced-motion respected)
6. **Not-AI test:** would a designer believe a human art-directed this?
7. **BLACK IS DEATH (Jon, hard rule):** no black or near-black backgrounds on ANY section, ever. This audience associates darkness with the death/fear messaging the voice guide bans. Darkest allowed surface: deep teal (--teal-deep). The brand is light, warm, alive; contrast comes from color saturation + type scale, not darkness.
8. **Card fatigue (Jon, 2026-07-11 v2 critique):** too many card-grid blocks back to back. Vary section treatments: numbered steps, icon rows, checklists, split layouts, prose statements, timelines — a card grid at most once or twice per page.
9. **Icons & visual interest:** sections need iconography/illustration, not text-only boxes. Custom-feeling SVG icons (consistent stroke style), not emoji or stock icon-font defaults. General creativity bar is currently too low — the dedicated design round must address this with reference sites + design-agent review.

External review: Jon has an AI design agent to review once staging is on the web (needs GitHub + Vercel hookup).

---

## Design Reset (Jon, 2026-08-14) — v2 skin REJECTED, sequence changed

Jon reviewed the built staging site and rejected it as generic. This section supersedes conflicting guidance above.

### Root cause (diagnosed, not guessed)

The v2 result was determined **before any designer touched it**:

1. **Structure was locked at the wireframe stage.** `design-briefs/abq-homepage-wireframe.html` is, in order: a card, a row of 4 cards, a row of 4 cards, a 2-up, a row of 3, a 2-up, a row of 3 — 19 elements with class `card`. Every content section was a row of boxes.
2. **The styling brief then said the structure was FINAL** ("your only job is visual design"), leaving only color, type, and spacing as instruments. No palette or typeface rescues a card grid.
3. **Two further lines removed the remaining levers:** "photo slots stay as neutral placeholders" (no imagery as a design element) and "palette is provisional, keep it swappable" (effectively: do not commit to a color).
4. **Layout was never tokenized.** `home.css` runs 120 layout-bearing properties to 77 color/font ones, plus 10 inline `style=` overrides in `index.astro`, 20 in `coaching.astro`, 22 in `community.astro`. Token swaps deliver a re-skin, never a redesign.

**The lesson, and the new rule: COPY IS CANON, STRUCTURE IS NOT.** Wording does not get rewritten to fit a layout (PRD rule 6 stands). But section count, order, grouping, and proportion are the designer's to change — merging four cards into one sentence plus a photograph, letting one line own a screen, cutting a section. Never again hand a designer a locked skeleton.

### New hard rules

- **NO CREAM (Jon, 2026-08-14, hard rule).** No cream, sand, beige, or warm-off-white grounds, anywhere, ever. Sits alongside BLACK IS DEATH as an absolute surface rule.
- **BLACK IS DEATH** stands unchanged.
- **The yellow-highlighter emphasis device is REJECTED.** The italic-emphasis signature stays, but rendered as **colored italic** (as on abq-landing-v2), not a yellow marker slab. The highlighter was the loud, cheap version of Jon's own idea, and it out-shouted the CTA — the brightest element on the page was decoration, not the action.

### Hero — solved (Jon, 2026-08-14)

**Full-bleed environmental/nature photography, headline set on a translucent scrim over the image.** Modeled on the current live site's sunflower hero, which is the one device on the old site doing real work.

This satisfies every existing constraint simultaneously: no Jon in the hero (NO-PORTRAIT rule, `homepage-spec.md`), no cigarettes/vapes/ashtrays, light/warm/alive, and it gives the hero the depth and layering the v1 critique demanded.

Carry over the *device*; fix three things in the execution:

1. **Make it genuinely full-bleed.** On the live site the photo is boxed inside a ~1150px column with white margins — it reads as an inserted picture, not a hero.
2. **Scrim, not slab.** The live panels are flat rectangles in a muddy blue. Use a gradient scrim that holds type without looking pasted on.
3. **Protect the opt-in.** A tall photographic hero pushed the only cold-traffic capture below the fold on both the live and staging sites. Solve deliberately.

**Photo selection is where this becomes ownable or stays generic.** The sunflower shot is stock any wellness brand could run. Same layout with a particular, un-stocky photograph is the entire difference.

### Site-wide imagery system

Environmental/nature photography is now the answer for **every** section needing an image, not just the hero. This is what unblocks the design: previously no section had an imagery solution, so every section defaulted to a text-only box. **Commissioning/selecting photography starts now, in parallel with copy** — it has lead time, and design must never again be art-directed around gray placeholders.

### Landing page (abq-landing-v2) — demotion partially reversed

The 2026-07-11 demotion pointed the design brief away from the one thing Jon responds to. Jon confirmed 2026-08-14 that he likes much of its look. Its devices are now **approved visual references**:

- Colored-italic emphasis (the elegant form of the signature device)
- Letterspaced mono labels (`ALWAYS BE QUITTING`, `1:1 WITH JON · CTTS & NCNTT CERTIFIED`) — real character, absent from staging
- Spec chips (`50 min session` / `$97 USD` / `Video or phone`) — reads as transparent practice, not funnel
- Pill CTAs in a warm saturated accent
- Asymmetric splits over centered stacks

**Not transferable:** its hero portrait. Per `homepage-spec.md`, the landing page keeps a portrait because there *a session with Jon IS the product*; the homepage never does. Also not transferable: its large dead vertical gaps, its scroll-reveal animations (testimonials rendered as invisible ghosts on scroll — a conversion bug, not an effect), and its "Most clients quit within 3 weeks" trust line (violates PRD rule 3, no timeline promises).

### Rejected in this round

- `design-briefs/REJECTED-hero-direction-v3-cream.html` — a cream/sand direction test. Rejected on the cream rule. Kept only as a record.
- Reference sites reviewed and NOT adopted: Monument, Alma, Parsley Health, Two Chairs, Ophelia, The School of Life. Useful only for one extracted principle — *none of them are card grids, and each commits to one dominant color.*

### Video player — DECIDED (Jon, 2026-08-14)

**Self-hosted MP4 with the browser's native controls. No player library, no brand styling.** Jon: "I don't care about the brand colors on the player, just use the easiest thing."

- **Do NOT add Plyr, Vidstack, Video.js or any other player library.** Considered and rejected. Native controls cost zero JavaScript and zero maintenance.
- **Do NOT use YouTube.** Rejected: their branding, their related-video suggestions, and an exit from the page sitting next to a buy button.
- The one styled part is the poster and play-button overlay before click, which is ours (`src/components/VideoEmbed.astro`). After the click it's the browser's own player, and that's fine.
- Controls look slightly different across browsers. That is accepted.

Encoding is where the effort goes, not appearance: the 732MB / 15.1 Mbps master became 44MB / 954 kbps at 720p (94% smaller), plus a 15MB 480p file that phones get automatically. Nothing loads until the visitor clicks; the page ships only a 26KB WebP poster.

### Still open

- **Base surface.** Cream is out and black is out. White vs. cool light tint vs. color-dominant is undecided.
- **Palette size.** The 13-color palette is suspected of being a cause of the mush (nothing dominates, so nothing feels owned). Reducing to one dominant plus a small support set is PROPOSED, not decided.
- **Typography.** Fonts remain provisional. Source Serif 4 / Public Sans is the current stack and has not been evaluated against the reset.

## Color Roles (locked 2026-07-11 — the 13-color palette in tokens.css IS the brand guide, per Jon; fonts still provisional)

- **teal / teal-deep:** brand surfaces, statement bands, offset shadows
- **navy (+blue blend):** second dark surface — community door, final CTA band. Two darks may share a screen; they must differ.
- **blue:** interactive — links, hovers, kickers on light bands
- **gold:** emphasis devices only (highlighter, sweep underline, kicker tick, announce bar)
- **cta orange (+cta-shadow):** purchase/submit actions ONLY — nothing else is orange
- **mist / alt / white:** the three light surfaces; must be visibly distinct; dot-grid texture available for light bands
- Every band change should change more than one thing (color + texture, or color + layout)

## Design Principles (from voice + audience)

- Audience is 30–65, discouraged, skeptical of hype: calm, credible, warm. No YouTuber energy, no medical-brochure sterility.
- Empathy-first hierarchy: the reader should feel seen before being sold (recognition cards before offers).
- Price transparency as a visual pattern (badges/cards, never buried).
- Accessibility: older-skewing audience → comfortable font sizes, high contrast, generous tap targets (mobile-readability brief already flagged this).
- Voice in typography: the italic-emphasis headline device from landing-v2 is a brand signature — systematize it.
