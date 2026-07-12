# Claude Design Brief — Styling Round (structure locked)

*Jon: in your Claude Design project, attach `design-briefs/abq-homepage-wireframe.html` (the approved wireframe — self-contained HTML). Optionally attach screenshots of 1–3 REAL sites whose look you admire (any industry — calm, credible, professional). Do NOT attach the old abq-landing-v2 page — it was AI-built and seeding from it risks the template look (decided 2026-07-11); its good devices are already written into the prompt as constraints. Design system picker: your new "ABQ" system if you created one, otherwise none — NOT the org default.*

---

## PASTE-READY PROMPT

Attached is the approved wireframe for my homepage (HTML file — read the markup). If reference screenshots are attached, treat them as mood/quality references only — not layouts to copy.

**The structure, section order, and every word of copy in the wireframe are FINAL. Do not change, add, remove, reorder, or rewrite anything. Your only job is visual design.**

Apply visual design to the wireframe: typography, color, spacing, card/button/form treatments, section backgrounds, visual rhythm.

Constraints:
- Brand signatures to keep: serif display headlines with selective italic-emphasis phrases, generous whitespace, card-based sections, plain price badges
- Audience is 30–65, discouraged, skeptical of hype: calm, credible, warm — a trusted specialist's practice, not a marketing funnel
- Comfortable font sizes, high contrast, generous tap targets; must work beautifully on mobile
- Palette is provisional — I haven't committed to brand colors. Keep it token-consistent so colors can be swapped later
- Anti-template mandate: no Inter, no stock component kits, no purple gradients, no generic AI/SaaS look
- No imagery of cigarettes/vapes/ashtrays; photo slots stay as neutral placeholders at the sizes shown

First: show me **2–3 distinct visual directions applied ONLY to the hero and the "Start for $97" two-doors sections.** After I pick a direction, apply it to the full page.

---

## After Jon picks a direction and full page is styled

Export → "Handoff to Claude Code / send to local coding agent" or "Export as standalone HTML" → bring the export back to the Cowork session. Claude translates it into the Astro components + `tokens.css` (design values become tokens), then the design-review agent audits against `context/design-direction.md`.
