# ABQ — Tech Stack & Integrations (decided 2026-07-10)

---

## Stack (DECIDED)

- **Framework: Astro** (static-first, near-zero JS, React islands where interactivity is needed: forms, FAQ accordions, pricing toggle). Quiz app, if ever built, is a separate stack much later — not a factor here.
- **Styling: Tailwind CSS with fully custom design tokens** from the design phase. NO off-the-shelf component kits, no default fonts. The bespoke design system (typography, palette, components, motion) is the anti-"AI-generated-look" strategy; performance (instant loads, 100 Lighthouse) is part of the credibility signal.
- **Hosting: Vercel.** Static pages + a few serverless functions.
- **Site is static except:** (1) subscribe endpoint → systeme.io API, (2) Stripe webhook receiver, (3) possibly a contact-form endpoint.

## Payments Map (DECIDED)

| Offer | Processor | Mechanism |
|---|---|---|
| $97 intro session | Cal.com + Stripe | **Keep exactly as today** (fix the `-copy` event slug; verify $97 + intake attached). EMBEDDED inline on /coaching — booking happens on-domain. |
| 1:1 Program ($1,200) | **Stripe Payment Link** | After purchase, Jon personally sends a private/hidden Cal.com event link for the 6 sessions. Stripe webhook adds buyer to systeme.io list. |
| Program session scheduling | Cal.com (hidden event type, clients only) | Zoom/Meet/Cal Video links auto-generated. Session count tracked manually — neither Cal.com nor systeme.io has native package/credit counting (verified 2026-07, incl. systeme.io's own assistant). Jon is the enforcement at current volume; same for the one-$97-per-person rule. |
| Alumni add-on sessions (~$150) | Cal.com paid event + Stripe | Pay + pick slot in one step |
| Community (3×$97 or $250 → $47/mo) | Mighty Networks | External checkout (verify MN supports the pricing shape; else revisit) |

**FINAL 2026-07-10 (supersedes same-day systeme.io-bookings decision — Jon chose simplicity):** Cal.com + Stripe handle all 1:1 booking/payments; it already works and embeds inline on the new site (no off-domain bounce, keeps bespoke design). systeme.io does ONLY email (list, automations, opt-in via API). Mighty Networks does only community. Nothing new configured in systeme.io. Revisit consolidation only if client volume ever makes manual tracking painful — a good problem.

## Email (as clarified)

- **ABQ Tips list lives on systeme.io** — the email system continues running there after the site moves off systeme.io's site builder.
- New site's opt-in forms POST to a Vercel serverless function → **systeme.io API** (create contact + tag → triggers existing automations). API key server-side only.
- Build-phase task: verify systeme.io API endpoints/limits for contact creation + tagging.

## systeme.io MCP — Claude-assisted email funnels (ADDED TO BACKLOG 2026-08-22)

**Scope decision (Jon, 2026-08-22): MCP is for EMAIL FUNNELS and standalone landing pages ONLY. It is NOT to be used to revise the ABQ website.** The rebuilt site is Astro/Tailwind/Vercel and stays hand-built; nothing in the systeme.io site builder gets touched via MCP.

systeme.io ships an official remote MCP server (`https://mcp.systeme.io/mcp?mcpKey=YOURKEY`, added in Claude as a custom connector). What it can do today:

- **Email (the point of this):** create/update newsletters; create/update/delete campaigns and campaign steps; list/retrieve both. Sending uses default sender settings; scheduling/activation still has to be done by hand in the UI.
- **Contacts/CRM:** create, update, delete, list, filter contacts; create/assign/remove tags; read custom fields.
- **Automation rules:** create rules — but only three triggers (tag added, tag removed, funnel form subscribed) — and list existing ones.
- **Funnels:** create a funnel and an opt-in step; list/retrieve funnels. **Editing and deleting funnels is NOT supported**, and page-level design/copy editing is not exposed at all. So MCP can scaffold a landing/opt-in funnel; the actual page still gets built in the systeme.io editor.
- Also: price plans, coupons, digital products, read-only SMS templates and booking events.

Known limits: initial release, no OAuth; MCP keys max 90-day validity, two active keys at a time; newsletters can't be deleted via MCP.

**Guardrail:** the MCP key is scoped to the whole live systeme.io account — the same account that currently hosts www.alwaysbequitting.com's pages and the live ABQ Tips list. Writes are real and immediate. Before enabling: set the connector to "Needs approval" (not "Always allow"), and do all first work against a throwaway test funnel/tag/campaign, never the live ABQ Tips sequence.

**Open question this depends on:** open-questions.md #6 (Ed Lawrence weekly 4:1 nurture vs. Amanda's 5-email conversion sequence). Decide the sequence architecture first; MCP is a build accelerator, not a substitute for that decision.

## Open Tech Items

1. **Analytics:** choice pending (candidates: Plausible/Fathom for simple privacy-friendly funnels + Stripe webhook for purchase events; GA4 if ad platforms demand it). Define funnel events: opt-in, book-session, program-purchase, community-click-through.
2. **Redirect map:** old systeme.io URLs → new (e.g., /community-8-25 → /community, /premium-coaching → /coaching, /hsdzywqq + /tqbeytfj retired, /abq_tips → /free-guide). Assemble at build time from current-site.md page map.
3. **Domain cutover:** registrar/DNS details needed from Jon; www.alwaysbequitting.com moves from systeme.io to Vercel; systeme.io keeps sending email (SPF/DKIM records must survive the DNS change — CRITICAL checklist item).
4. **Asset collection:** photos/testimonial headshots off systeme.io CDN before cutover.
5. **abq-landing-v2.vercel.app** → becomes/redirects into the new site's 1:1 page.
6. **systeme.io MCP connector setup (email funnels only — see section above).** Generate an MCP key in systeme.io, add it in Claude as a custom connector, set permission to "Needs approval", and pilot on a test funnel + test campaign before touching ABQ Tips. Explicitly out of scope: any use of MCP to revise the ABQ website.
