# Claude Design Brief — ABQ Design System + Homepage

*Jon: create a project called "ABQ Website" at claude.ai/design, attach `context/design-direction.md` and `context/homepage-spec.md` from this repo, use the web-capture tool on https://abq-landing-v2.vercel.app/ to pull its visual language, then paste the prompt below. When the vault color tokens (`colors-v1.md`, `abq-tokens.md`) come over from the Mac Mini, attach those too.*

---

## PASTE-READY PROMPT

I'm rebuilding alwaysbequitting.com — my smoking/vaping cessation coaching business. I need two things, in order: (1) a design system, (2) a homepage design built with it. Start with a wireframe/layout pass for the homepage so we agree on structure before styling.

**Who this is for:** adults 30–65 who have tried to quit smoking or vaping repeatedly and failed. They arrive discouraged, skeptical of hype, often ashamed. The site must feel calm, credible, warm, and professional — like a trusted specialist's practice, not a marketing funnel. They skew older: comfortable font sizes, high contrast, generous tap targets, mobile-first.

**Hard rule — no template look:** nothing that reads as AI-generated or off-the-shelf. No Inter, no stock component kits, no purple gradients, no generic SaaS cards. I've attached a capture of my hand-built landing page — its visual language is the seed: serif display headlines with italic-emphasis phrases, card-based sections, generous whitespace, plain price badges, real portrait photography. Systematize that language; don't replace it.

**Important — branding is provisional:** I haven't committed to my existing brand colors and may change them. Build the design system so the palette is fully swappable (token-based). Use a calm neutral base for now and show me 2–3 palette directions I can react to. Same for imagery: use correctly-sized placeholders for photos, video, icons, and testimonial avatars — real assets come later and must drop in without layout changes.

**Design system deliverables:** color palette (calm/credible/warm — provisional, see above), typography scale (serif display + readable body pairing), spacing scale, and components: nav, footer, buttons, recognition cards, price badges, offer panels, testimonial blocks, FAQ accordion, email opt-in form, compressed trust line (small credentials strip that sits under CTAs).

**Homepage structure (fixed — this is decided, design it, don't redesign it):**
1. Announcement bar (status/sale messages)
2. Hero: headline "Make This Your Last Attempt to Quit Smoking or Vaping, Not Just Your Next One" / subhead "You've tried before. It didn't last." / free "Quick-Start Guide" email opt-in above the fold / trust line: "CTTS & NCNTT certified · 25 years · No one-size-fits-all programs" / Jon's portrait
3. Recognition section: lead-in "You try to quit. It doesn't last. Months later you try again — and the cycle repeats." then FOUR cards: "You can't seem to start" / "You're struggling to stay quit" / "You've already quit and want it to last" / "You've relapsed and want to try again" — style like the landing page's three-card version
4. Guide section: Jon + credentials (25 years CTTS/NCNTT · 3 decades workshops · 35 years behavior-change programs)
5. Transformation section: "Temporary abstinence isn't quitting — transformation is." Stopping is fast; staying quit takes months; everybody quits at their own pace
6. THE TWO DOORS (conversion core): "Start for $97" — two side-by-side panels: ABQ Community ($97/month, 3-month commitment, then $47/month — weekly live calls with Jon, 24/7 community, quit at your pace) vs. 1:1 Intro Session ($97 one-time, once per person, 50 minutes, credited toward the full program). The 1:1 panel also introduces "Quit for the Last Time: The 1:1 Program" (6 sessions / 12 weeks / $1,200). Prices displayed plainly — transparency is a trust device
7. Testimonials: three (Katherine, Kait, Ashley — portraits + quotes)
8. Short FAQ (accordion, 4–5 items)
9. Final CTA + tagline: "Always be quitting, until you've quit for the last time"
10. Footer (disclaimer, legal, podcast link)

**Copy:** use the real copy above where given — no lorem ipsum, no invented marketing copy. Where filler is unavoidable, keep it plain and neutral; final copy comes from my existing site verbatim.

**Never do:** timeline promises ("quit in X weeks"), fear/death imagery, shame language, hype ("this changes everything"), cigarette/ashtray stock photos. Imagery is people, warmth, forward motion — or clean typography with no imagery at all.

Show me 2–3 layout variations for the hero and the two-doors section; single direction is fine elsewhere.

---

## After approval in Claude Design

Export → handoff to coding agent (or standalone HTML) → back into this repo. Claude implements it in Astro per `PRD.md` M1–M2. Design-review agent audits against `context/design-direction.md` before Jon's final sign-off.
