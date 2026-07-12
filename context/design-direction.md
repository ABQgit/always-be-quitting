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
