# ABQ — SEO and AI-Search Brief

Starting point for the SEO thread. **Read `CLAUDE.md`, `PRD.md` and `context/voice.md` first** — the voice and honesty rules bind SEO work exactly as they bind copy.

---

## What is already in place (as of 2026-08-25)

| Thing | State |
|---|---|
| **Google Search Console** | ✅ Verified 2026-08-25 via DNS TXT, **Domain** property (covers www + apex + subdomains) |
| **Sitemap** | Generated at `/sitemap-index.xml`, 7 URLs, `/quick-start` excluded. ⏳ **Not yet submitted** — waits for the Vercel cutover |
| **Vercel Web Analytics** | ✅ Live and confirmed firing. Cookieless |
| **Open Graph / Twitter cards** | ✅ Every indexable page. `og-default.png` is a placeholder card |
| **schema.org JSON-LD** | ✅ In `Base.astro` — Organization / Person / WebSite graph with `knowsAbout` |
| **robots.txt** | Dynamic; allows crawling only on the production hostname, declares the sitemap |
| **Canonical tags** | On every page, pointing at `www.alwaysbequitting.com` |
| **301 redirects** | 10 old systeme.io URLs mapped to rebuild equivalents |
| **Google Fonts** | ⏳ Still loaded from Google. Self-hosting is a pending task |

**No data exists yet.** Search Console backfills nothing — it started collecting on 2026-08-25. Expect the first usable read around **2026-09-08**, and note it will describe the *old* systeme.io site until the cutover.

---

## Hard constraints — these are not negotiable for rankings

From `CLAUDE.md`, `context/voice.md` and decisions already recorded:

- **No keyword stuffing.** Rejected explicitly. Search-engine-first text violates Google's own spam policies anyway.
- **"Cessation" is banned.** Jon: *"not a term that real people search for."* Use *quit smoking, stop smoking, quit vaping, stop vaping, quitting*.
- **No timeline promises** about quitting outcomes, anywhere, for any reason.
- **No local SEO.** Jon does not compete locally. Blacksburg was removed deliberately.
- **Jon was never a smoker.** Never imply otherwise. Customer is the hero, Jon is the guide.
- **Every page converts to email signup or purchase.** No off-domain links except checkout.
- **Copy is Jon's and deliberate until proven otherwise.** Do not rewrite for keywords without asking.

---

## The honest ceiling

Head terms — "quit smoking", "stop vaping" — are held by CDC, NHS, Mayo Clinic and the cancer societies, with authority a solo coach cannot match. **Any plan that promises to outrank them is wasting money.**

What is realistically winnable is **long-tail intent**: the specific questions the FAQs already answer, and the situations the `/community` A/B/C/D options describe. "I relapsed and want to get back on track" is a real search intent with a real page behind it.

---

## Assets that exist but are not being used for search

- **A YouTube channel, roughly 50 videos** on withdrawal, cravings, relapse and mindset. Referenced in the contact auto-confirmation. Not surfaced on the site — Jon: *"they aren't going to buy anything on youtube."* That reasoning was about outbound links, and does not settle whether the content itself could work on-site.
- **Two full podcast episodes** with hosted audio and detailed show notes — Katherine on quitting vaping slowly, Kait on smoking within addiction recovery. Both interview women whose testimonials appear on the site. **The rebuild has no podcast**, so both are being 301'd to `/coaching`. ⚠️ Article-to-sales-page redirects are often treated as soft 404s, so this content may lose its rankings entirely. If Search Console shows that happening, rebuilding a minimal `/podcast` is worth reconsidering.
- **Katherine's and Kait's long-form testimonials**, already on the site.

---

## Open questions for the SEO thread

1. **AI search / LLM visibility.** What actually influences whether ChatGPT, Claude, Perplexity and AI Overviews cite or recommend ABQ? The JSON-LD is a start. What else is real, and what is snake oil?
2. **Is the content strategy question actually a content question?** Seven pages, no blog, no podcast. Long-tail wins usually need pages that answer specific questions — the site currently has none beyond the FAQs.
3. **What to do with the YouTube library** given the no-off-domain-links rule.
4. **Whether the podcast redirect was right**, judged on Search Console data after the cutover.
5. **Measurement cadence.** SEO feedback takes weeks; an agent changing things continuously cannot tell what worked. Monthly review of Search Console is the proposed rhythm — possibly a scheduled task.
6. **How much of this should be automated**, and what a human-in-the-loop review looks like. The working model so far: agent edits repo → Jon reads the diff → Jon pushes. Dashboard access has been deliberately avoided.

---

## Where things stand overall

The rebuild is **not yet live on the real domain.** `alwaysbequitting.com` still serves systeme.io. The DNS cutover is ready and unblocked; the sitemap submission and a few other items wait on it. See `SETUP.md`.
