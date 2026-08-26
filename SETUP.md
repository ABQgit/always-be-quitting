# ABQ — Setup & Integrations

Practical, non-code steps to make the site's live features work. Code is already built; this is the configuration that turns it on.

**Live staging URL:** https://always-be-quitting.vercel.app/ — the current build of the rebuild, auto-deployed from GitHub (`ABQgit/always-be-quitting`) via Vercel. This is where you preview the new site. The production domain (alwaysbequitting.com) stays on systeme.io until launch (M5).

---

## DNS, domain and email (surveyed 2026-08-25)

**The split Jon wants, and it is what is already built:** systeme.io keeps the list, the CRM and all newsletters. Vercel serves the website. Signup forms live on the Vercel site and write into systeme.io over their API (`/api/subscribe`). The contact form runs on Vercel and emails Jon via Resend.

### 🚨 Read this before worrying about the cutover: email and web hosting are separate

This caused real confusion on 2026-08-25 and the wording below is deliberately blunt.

| | Governed by | Changes at cutover? |
|---|---|---|
| **Newsletters, and emailing clients** | `MX`, `SPF`, `DKIM`, `DMARC` | **No. Nothing. Untouched.** |
| **Web pages** | `A`, `CNAME` | Yes — these two records, and only these |

**Newsletters do NOT need a subdomain and require no action at cutover.** systeme.io can send as `@alwaysbequitting.com` because the SPF record authorises them, and that authorisation has nothing to do with where the domain serves web pages. The site could move to Vercel this afternoon and the next newsletter would go out unchanged.

**The subdomain warning further down applies only to web PAGES that systeme.io serves** — a funnel, an order form, a members area. Those are `A`/`CNAME` things and they break when the apex moves. If none exist, there is nothing to do.

### Sender authentication status (checked 2026-08-25)

- ✅ **Google Workspace DKIM is published** at `google._domainkey`. Mail Jon sends from his own inbox passes DMARC via DKIM alignment. This is why `p=reject` has not been causing problems.
- ❓ **systeme.io DKIM is unconfirmed.** Their selector could not be determined by guessing, and a failed guess proves nothing. **Verify empirically:** open a newsletter systeme.io sent, view original, and look for `dkim=pass` / `dmarc=pass`. The DMARC record already sends aggregate reports to `jon@alwaysbequitting.com`, and those name every sender and its result.

  Why it matters: under `p=reject`, a systeme.io DKIM failure means strict receivers **refuse** the newsletters outright. It would present as poor open rates, not as an error.
- ❌ **Resend is not verified yet.** See the DMARC section below.

### What is there now

| Record | Value | Who that is |
|---|---|---|
| **NS** | `ns09.domaincontrol.com`, `ns10.domaincontrol.com` | **GoDaddy** — DNS is hosted there and Jon controls it |
| **A** (apex) | `3.33.251.168`, `15.197.225.128` | AWS anycast |
| **CNAME** (`www`) | `dgtb6mhv7ir6.cloudfront.net` | **AWS CloudFront** — systeme.io sits behind it |
| **MX** | `aspmx.l.google.com` + 4 alts | Google Workspace |
| **TXT** (SPF) | `v=spf1 include:_spf.google.com include:systeme.io ~all` | Google and systeme.io may send as the domain |
| **TXT** (`_dmarc`) | `v=DMARC1; p=reject; pct=100; rua=mailto:jon@…` | 🚨 see below |

**It is CloudFront, not Cloudflare.** Easy to mix up, and the distinction matters: systeme.io does not hold the nameservers, so Jon can repoint the site himself.

**Why systeme.io had to be contacted to set the domain up originally:** pointing a custom domain at them is not only a DNS change. Their CloudFront distribution has to be told the hostname belongs to it and a TLS certificate issued on their side. Neither is doable from GoDaddy. It was never about who owns DNS.

### 🚨 DMARC is `p=reject`. This is the constraint everything else bends around.

Not `none`, not `quarantine` — **reject**. Any mail claiming to be from `@alwaysbequitting.com` that fails DMARC alignment is **refused by the receiving server**, not sent to spam. It vanishes, and the sender gets a bounce.

Consequences:

- **`no-reply@alwaysbequitting.com` cannot send through Resend until the domain is verified there.** This is exactly why `CONFIRMATION_ENABLED` defaults to false. Do not switch it on early — every submission would generate a hard bounce.
- The main notification email is safe: it goes **to** Jon, `from` whatever `CONTACT_FROM` is set to, with `reply_to` set to the visitor. It never claims to be from the visitor's domain, which would fail their DMARC.

**Correction to earlier advice in this project:** it was said that Resend has to be merged into the existing SPF record, and that a second `v=spf1` line would break Google and systeme.io. The second half is true — **a domain may only ever have one SPF record.** The first half is not. **DMARC passes on SPF alignment *or* DKIM alignment, so adding Resend's DKIM record is sufficient on its own.** The safest path is therefore:

1. Verify `alwaysbequitting.com` in Resend and add **only the DKIM record** it gives you.
2. **Leave the existing SPF line completely alone.** Google and systeme.io keep working, untouched.
3. Confirm a real send passes DMARC before setting `CONFIRMATION_ENABLED=true`.

### 🚨 Prerequisite: Vercel must be on the Pro plan before launch

**Not because of the custom domain.** Hobby supports 50 domains per project, so the domain is not the issue. The issue is that [Vercel's Hobby plan](https://vercel.com/docs/plans/hobby) *"restricts users to non-commercial, personal use only"*, and this site takes real Stripe payments for a $1,200 program and a $291 membership. That is commercial use.

**Pro is $20 per developer seat / month.** Viewer seats are free.

**The risk of ignoring it is not a bill, it is a pause.** Vercel can suspend a deployment for a fair-use violation, which would take down the marketing site, both live checkout buttons and the contact form at the same time — with no warning tied to the launch date.

Do this **before** repointing DNS, so the domain never lands on a plan that is not allowed to serve it.

### The cutover to Vercel (M5)

Only two records change. Everything else — MX, SPF, DMARC, and therefore all mail and all newsletters — stays exactly as it is.

1. In Vercel, add `alwaysbequitting.com` and `www.alwaysbequitting.com` to the project. **Use the exact A and CNAME values Vercel shows you** — they publish current values in the dashboard and they have changed over time, so never paste an IP from memory or from an old guide.
2. Change those two records at GoDaddy. Vercel issues its own TLS certificate automatically; no ticket to anyone.
3. Afterwards, ask systeme.io to **release the domain from their CloudFront distribution**, so a stale certificate or cached mapping cannot cause intermittent oddities.
4. Put the 301s in place for the old paths (`/terms-and-conditions` → `/terms`, `/privacy-policy` → `/privacy`) **before** cutting over — those URLs appear on every Stripe receipt already sent.

⚠️ **If anything is still hosted ON systeme.io** — a funnel, an order form, a members area — it dies the moment the apex moves. Give each one a subdomain (`go.alwaysbequitting.com`) pointed at systeme.io *before* the cutover, not after. Audit this first; the $97 landing page is already on Vercel, so it may be nothing.

### Known gap, not yet decided

**The contact form does not create a systeme.io contact.** `/api/subscribe` creates and tags contacts; `/api/contact` only emails Jon. So somebody who fills in the contact form is in his inbox but not in his CRM, and cannot be mailed later. If systeme.io is the CRM of record, that is probably wrong — but adding people who wrote in to a marketing list has consent implications, so it is Jon's call, not a bug to quietly fix.

---

## Analytics, Search Console and social cards (built 2026-08-25)

Before this the site had **no analytics of any kind, no Search Console, and no Open Graph tags.** Three things went in; one still needs Jon.

### ✅ Vercel Web Analytics — built, needs switching on

`@vercel/analytics` renders from `Base.astro`, so it covers every page.

**Chosen over Google Analytics deliberately.** It is cookieless and stores no personal identifiers, so it needs **no consent banner** and adds nothing to the privacy policy's disclosure burden. GA4 sets cookies and drags both of those in behind it.

👉 **Jon:** turn it on at **Vercel → the project → Analytics → Enable.** Until then the script 404s harmlessly and collects nothing.

### ✅ Open Graph / Twitter cards — built and shipping

Every indexable page emits `og:title`, `og:description`, `og:url`, `og:image` (1200×630 absolute URL), `og:site_name`, `og:locale` and a `summary_large_image` Twitter card. `noindex` pages deliberately emit none — they are reached by direct link and have nothing to advertise.

Per-page art is supported: pass `ogImage="/img/og-community.png"` to `Base`. Nothing does yet; everything falls back to the site card.

⚠️ **`public/img/og-default.png` is a functional placeholder, not designed work.** Teal field, Jon's headshot in a circle, no type — because the site's real fonts (Source Serif 4, Public Sans) were not available to render into an image, and inventing typography would have broken the copy-phase rule. It works because every platform renders `og:title` and `og:description` as text beneath the image. Logged on the design punchlist.

### ✅ Google Search Console — domain verified 2026-08-25, sitemap still pending

**DNS verification record is live** and confirmed in an uncached lookup:

```
google-site-verification=bjb0k6gBFZo4R4ypH6p118h2Fh-sp6rQCZrbMSB3Y4w
v=spf1 include:_spf.google.com include:systeme.io ~all
```

Two separate TXT records at `@`, exactly one `v=spf1` — the SPF line was not disturbed, so Google and systeme.io mail authentication is intact.

⏳ **Still to do: submit `sitemap-index.xml` AFTER the Vercel cutover.** It does not exist on the systeme.io site currently serving the domain.

*Original instructions kept below for reference.*

### Google Search Console — setup steps (completed, kept for reference)

**This is the gap that blocks all SEO work.** Vercel Analytics shows what people do once they arrive; only Search Console shows **which queries put you in front of them, at what position, and what got clicked.** Without it, any SEO effort is guesswork.

**Preferred route — DNS TXT at GoDaddy.** Verifies the whole domain including subdomains, and survives a hosting change:

1. [search.google.com/search-console](https://search.google.com/search-console) → **Add property** → choose **Domain** (not URL prefix) → enter `alwaysbequitting.com`, no scheme, no `www`. A Domain property covers www and non-www, http and https, and all subdomains in one place.
2. Copy the `google-site-verification=…` string it shows.
3. GoDaddy → **My Products** → `alwaysbequitting.com` → **DNS** → **Add New Record**. Type `TXT`, Name `@`, Value = the whole string, TTL default.

   🚩 **Use Add New Record — do not edit the TXT record already sitting at `@`.** That one is the SPF line (`v=spf1 include:_spf.google.com include:systeme.io ~all`) and it looks like "the" TXT record, which is exactly the trap. Multiple TXT records at `@` are normal and fine; **two records starting `v=spf1` are not**, and would break mail authentication for Google and systeme.io simultaneously.
4. Back in Search Console, click **Verify**. Usually instant, occasionally up to an hour. If it fails, wait and retry — do not add a second record.

**⏱️ Sequencing: do steps 1–4 NOW, before the Vercel cutover. Submit the sitemap AFTER.**

Verification is proof of domain ownership, not of hosting, so it survives the move — and Google starts collecting query data for the current systeme.io site immediately, which gives a real before/after baseline for the relaunch. But `sitemap-index.xml` is generated by the rebuild and does not exist on the systeme.io site, so submitting it before the cutover just 404s. Once live on Vercel: **Sitemaps** → submit `sitemap-index.xml`.

**Fallback — meta tag.** If DNS is awkward, set `PUBLIC_GOOGLE_SITE_VERIFICATION` in Vercel to the token and `Base.astro` emits the meta tag. Unset, nothing is emitted. This only verifies the URL prefix, not the domain.

### Google Analytics and Facebook Pixel — recommendation: neither, for now

**GA4:** Vercel Analytics plus Search Console already answers what Jon needs — where visitors come from, what they read, what they searched. GA4 adds depth he has no use for yet, and brings cookie consent with it. If an old GA tag exists on the systeme.io site it dies at cutover; nothing is lost.

**Facebook Pixel: do not add it unless and until real ad spend starts.** With no ads running it is pure cost — consent obligations and privacy exposure for zero benefit.

🚨 **And weigh this even when ads do start.** A pixel here transmits to Meta that a specific person visited a smoking-and-vaping-cessation site. That is an inference about a health behaviour, and health-adjacent pixel data has been the subject of regulatory action and litigation against other operators. It is a heavier decision than a pixel on a shop, and it belongs with Jon and, if it goes ahead, someone qualified — not a default install.

### What the privacy policy already says (checked 2026-08-25 — NOT edited)

The ported policy is **broader than what the site actually does**, so Vercel Analytics needs no change to it. Verbatim from `privacy.astro`:

- *"we may use automatic data collection technologies **including Google Analytics** to collect certain information about your equipment, browsing actions, and patterns"*
- *"**USE OF COOKIES AND PIXELS** … our Services utilize a standard technology called 'cookies' and server logs"*
- *"We reserve the right to use technological equivalents of cookies, **including social media pixels**"*
- *"**THIRD PARTY USE OF COOKIES** … These third parties may use cookies alone or in conjunction with web beacons or other tracking technologies"*

Two consequences:

1. **Vercel Analytics requires no policy change.** It is cookieless and less invasive than what is already disclosed.
2. 🚩 **The policy names Google Analytics, and the rebuilt site does not use it.** That is a factual inaccuracy pointing the wrong way — claiming collection that does not happen. Worth correcting, **but legal text is never edited on a judgment call** (see `CLAUDE.md`). Surfaced for Jon to decide, ideally with whoever drafted it.

A Facebook Pixel would arguably fall under the existing "social media pixels" language, but *arguably* is not a standard to launch on — confirm rather than assume.

---

## 🚩 Verifying the domain in Resend — step by step (written 2026-08-25, not yet done)

### ✅ Tested 2026-08-25 — the form already works unverified

A real submission on staging returned `?sent=1` with the honeypot empty, and **the email arrived in Jon's inbox.** So:

- `RESEND_API_KEY` **is** set in Vercel.
- The endpoint, honeypot, reCAPTCHA bypass and on-page success message all work.
- Mail sends from `onboarding@resend.dev` (Resend's shared domain), which delivers because `CONTACT_TO` is the same address as Jon's Resend account.

**This means verification does NOT block the DNS cutover** — the earlier note here said it did, on the assumption the form was broken. It isn't.

**What verification still buys, and why it is worth doing soon rather than never:**

1. **Deliverability that does not depend on a shared domain.** `onboarding@resend.dev` is used by every unverified Resend account, so its reputation is not Jon's to control. A message that arrives today can be filtered tomorrow — and the failure is silent in both directions: the visitor sees "Message sent" and Jon simply never receives it.
2. **The auto-confirmation cannot be switched on at all until then.** It sends from `no-reply@alwaysbequitting.com`, and under `p=reject` that hard bounces. Visitors currently get the on-page message and no email.
3. **Sending from the business's own domain** rather than a generic transactional address.

### Root domain or subdomain?

Resend **recommends a subdomain** (`notifications.alwaysbequitting.com`) to isolate sending reputation. **Use the root domain anyway**, for this site:

- Resend's volume here is tiny and transactional — contact-form notifications and an auto-confirmation. All bulk mail goes through systeme.io, so there is little reputation to isolate.
- The visitor-facing From address is nicer: `no-reply@alwaysbequitting.com` beats `no-reply@notifications.alwaysbequitting.com`.
- The code already defaults `CONFIRMATION_FROM` to `no-reply@alwaysbequitting.com`.

If a subdomain is chosen instead, `CONTACT_FROM` **and** `CONFIRMATION_FROM` must both be changed to match, or every send fails.

### 1. Add the domain in Resend

[resend.com/domains](https://resend.com/domains) → **Add Domain** → `alwaysbequitting.com` → pick the region closest to most recipients (US). Leave the Return-Path custom field alone; it defaults to `send.alwaysbequitting.com`.

### 2. Add the DNS records at GoDaddy

Resend's **Records** tab will show a **DKIM `TXT`**, an **SPF `TXT`**, and an **`MX`**. Copy-paste each value exactly.

🚩 **The GoDaddy trap: the Name field is relative, not absolute.** GoDaddy appends the domain automatically. If Resend says the host is `send.alwaysbequitting.com`, enter **`send`** — pasting the full hostname produces `send.alwaysbequitting.com.alwaysbequitting.com` and verification silently never completes.

| Resend shows | Type | GoDaddy **Name** | Notes |
|---|---|---|---|
| `resend._domainkey.alwaysbequitting.com` | TXT | `resend._domainkey` | the DKIM public key, a long string |
| `send.alwaysbequitting.com` | TXT | `send` | SPF for the Return-Path subdomain |
| `send.alwaysbequitting.com` | MX | `send` | GoDaddy will also ask for **Priority** — use the number Resend shows, normally `10` |

✅ **None of these touch the existing root SPF line.** Resend's SPF lives on the `send` subdomain because that is the Return-Path domain. The root `v=spf1 include:_spf.google.com include:systeme.io ~all` record stays exactly as it is. **Do not add Resend to it.**

### 3. Verify

Usually completes within 15 minutes; DNS can take up to 72 hours. Resend's [dns.email](https://dns.email/) tool checks whether the records are publicly visible. If it stalls past 72 hours, use **Restart verification** in the dashboard — do not add duplicate records.

### 4. Set the Vercel environment variables

⚠️ **Verifying the domain alone changes nothing.** The code falls back to `onboarding@resend.dev` until `CONTACT_FROM` is set. Vercel → project → **Settings → Environment Variables**:

| Variable | Value | Notes |
|---|---|---|
| `RESEND_API_KEY` | from the Resend dashboard | check whether it is already set |
| `CONTACT_FROM` | `ABQ Website <website@alwaysbequitting.com>` | must be on the verified domain |
| `CONTACT_TO` | `jon@alwaysbequitting.com` | already the default; set it explicitly anyway |
| `CONFIRMATION_ENABLED` | leave unset for now | see step 6 |

Redeploy afterwards.

### 5. Test the live form before cutting over

Submit the real form on the staging URL and confirm the mail arrives in Jon's inbox — **and check the spam folder**, since that is the symptom of a half-finished setup rather than a broken one.

### 6. Only then switch on the auto-confirmation

🚨 **DMARC is `p=reject`.** The auto-confirmation sends from `no-reply@alwaysbequitting.com`, so until the domain is verified every send **hard bounces** — it is not spam-foldered, it is refused. That is precisely why `CONFIRMATION_ENABLED` defaults to false. Set it to `true` only after step 5 passes, then submit the form once more and confirm the confirmation email actually arrives.

---

## Contact form → your inbox (Resend)

The contact form (`/contact`) posts to `src/pages/api/contact.ts`, which emails each message to you via [Resend](https://resend.com). Reply-to is set to the visitor's address, so replying goes straight back to them. Spam honeypot + validation are already built in.

**To turn it on:**

1. Sign up at [resend.com](https://resend.com) and create an **API key** (Dashboard → API Keys).
2. In your **Vercel** project → **Settings → Environment Variables**, add:

   | Name | Value |
   |---|---|
   | `RESEND_API_KEY` | your Resend API key |
   | `CONTACT_TO` | `jon@alwaysbequitting.com` |
   | `CONTACT_FROM` | `ABQ Website <onboarding@resend.dev>` |

3. **Redeploy** (env vars only apply on the next deploy — push any commit, or hit "Redeploy" in Vercel).
4. Test: submit the form on the live site and confirm the email lands in your inbox.

**Sender address:** For now, emails come from Resend's shared `onboarding@resend.dev`. That's fine — they reach you and you can reply. To send *from* `@alwaysbequitting.com`, verify the domain in Resend (adds DNS records). ⚠️ Your DNS currently lives with systeme.io and carries your email SPF/DKIM records — **coordinate any DNS changes at launch (M5)** so you don't disrupt systeme.io email deliverability. Not needed to start receiving messages.

**Local testing (optional):** copy `.env.example` to `.env`, fill in `RESEND_API_KEY`, and run `npm run dev`.

### Spam protection: Google reCAPTCHA (optional, recommended)

The contact form has a hidden honeypot field that already stops basic bots. For real protection, add Google reCAPTCHA v2 ("I'm not a robot" checkbox). **The form works fine without it** — both the widget and the server-side check stay switched off until the keys exist, so nothing breaks if you skip this.

1. Go to [google.com/recaptcha/admin](https://www.google.com/recaptcha/admin) and register a site.
2. Choose **reCAPTCHA v2 → "I'm not a robot" Checkbox**.
3. Add these domains: `always-be-quitting.vercel.app` and `alwaysbequitting.com` (plus `localhost` if you want it working in `npm run dev`).
4. You'll get two keys. In **Vercel → Settings → Environment Variables**, add:

   | Name | Value |
   |---|---|
   | `PUBLIC_RECAPTCHA_SITE_KEY` | the **site key** (this one is public, it appears in the page) |
   | `RECAPTCHA_SECRET_KEY` | the **secret key** (server-side only, never shared) |

5. **Redeploy.** The checkbox appears on the form and submissions are verified.

⚠️ The `PUBLIC_` prefix matters — Astro only exposes variables to the browser when they start with `PUBLIC_`. The secret key must NOT have it.

### Auto-confirmation email to the sender

When someone submits the form they now get an automated confirmation that doubles as a soft introduction: it confirms receipt, gives a short blurb on coaching, the YouTube channel and the community, and points at alwaysbequitting.com. **It contains exactly one link on purpose** — multiple links in an automated reply is a strong spam signal.

It sends **from `no-reply@alwaysbequitting.com` with no reply-to**, so your personal address is never exposed and nobody can reply to the auto-confirmation chasing an early answer. The email says so explicitly. You still reply normally from your own inbox when you're ready.

🚨 **THIS WILL NOT SEND UNTIL THE DOMAIN IS VERIFIED IN RESEND.** Resend refuses to send from a domain it hasn't verified, so `no-reply@alwaysbequitting.com` is rejected until you complete verification.

**It is OFF by default — you don't need to do anything.** The confirmation only sends when `CONFIRMATION_ENABLED` is set to exactly `true`. Leave it unset and nothing is attempted. (Your own notification email is unaffected and keeps arriving.)

To turn it on:

1. Verify `alwaysbequitting.com` in Resend (Domains → Add Domain). This adds DNS records.
2. **Your DNS lives with systeme.io and carries your email SPF/DKIM — coordinate this at launch (M5) so you don't break systeme.io deliverability.**
3. Set `CONFIRMATION_ENABLED=true` (in Vercel and in `.env`).

Optional override: `CONFIRMATION_FROM` changes the sender if you want something other than `Always Be Quitting <no-reply@alwaysbequitting.com>`.

If a confirmation fails for any reason, the submission still succeeds and you still get the message. The failure is logged only.

Note: the on-page copy says *"If you do not get confirmation of your submission, please check your spam/junk mailbox."* That line only makes sense while this feature is on.

### Reason For Contact

The form has a required **Reason For Contact** dropdown: General Comment, **Trouble With Checkout Or Payment**, Question About Services, Business Inquiry, Media Inquiry, Speaking or Keynotes, Trainings, Other. The selection is put in the email subject line (`[ABQ Contact] Speaking or Keynotes - Jane Smith`), so you can filter and prioritise straight from your inbox.

**Watch for "Trouble With Checkout Or Payment."** It's second in the list deliberately — that's someone trying to pay you and failing, so it's the one to answer first. Worth an inbox rule that flags it.

---

## Email list opt-in → systeme.io ✅ BUILT AND TESTED (2026-08-14)

The Quick-Start Guide forms on the homepage and `/free-guide` post to `/api/subscribe`, which creates the contact in systeme.io and applies the **ABQ Tips** tag. That tag triggers your automation, which subscribes them to the ABQ Tips Newsletter campaign and sends the guide.

Verified end to end: contact created, first name captured, correct tag applied, guide email received.

**To make it work on the deployed site**, add these in **Vercel → Settings → Environment Variables**, then redeploy:

| Name | Value |
|---|---|
| `SYSTEME_API_KEY` | your key (systeme.io → avatar → Settings → Public API keys) |
| `SYSTEME_TAG_ID` | `1956363` (ABQ Tips). Accepts a comma-separated list if you ever need more |

Without them the form returns an error rather than pretending it worked.

⚠️ **One value per field.** Paste ONLY the value — no variable name, no `=`, no other lines. Pasting a multi-line block into a single field stores the whole block as that value and produces `TypeError: Headers.append: ... is an invalid header value`. (Vercel's bulk ".env paste" import is the exception; that one expects the full format.) Tick all three environments — Production, Preview, Development — or it works on some builds and not others.

**When something fails:** Vercel → **Logs**, submit the form, look for `subscribe endpoint error:`. The browser shows only a generic message; the log line has the actual exception.

✅ **Verified end to end on staging 2026-08-14:** contact created, tagged, automation fired, guide email received.

**Your tag IDs:** ABQ Tips `1956363` · Quick-Start Guide `1961444` · General List `1961442` · Smoker `1961448` · Vaper `1961451` · Smoker+Vaper `1961449` · RTQ Quiz `1961446` · TTS `1961450` · Non User `1961443` · Friend `1961440`

⚠️ **The automation that matters is "Tag added → ABQ Tips → Subscribe to campaign."** Your original rule triggers on *"Blog form subscribed"* and *adds* the ABQ Tips tag as an action — so applying the tag via the API never reached the campaign. That's why the second rule exists. **At launch, disable the old blog-form rule**, or a single signup fires both.

---

## Program checkout → Stripe Payment Link

The $1,200 Program (**The 1:1 Program** on the site) sells through a Stripe Payment Link. You then issue the client a Cal.com Private Link by hand. Decided 2026-08-18 — see PRD "Program checkout — DECIDED" for why Calendly Meeting Packages were rejected.

### 1. Do it in test mode first

Top-left of the Stripe Dashboard, flip to **Test mode**. Build it there, pay yourself with card `4242 4242 4242 4242` (any future expiry, any CVC), confirm the flow works, then rebuild in live mode.

The **product** doesn't have to be built twice — its details page has a **Copy to live mode** button in the top right, and the price copies with it. The **payment link** does have to be recreated in live mode; a test link never takes real money.

### 2. Create the product first

A payment link needs a product to sell, and Stripe's newer dashboard generally routes you through the catalog rather than letting you invent one inline. Do this first and the link step gets easy.

1. Go to **More → Product catalog**, then click **+Add product**.
2. **Name:** `1:1 Coaching with Jon - 6 Sessions` — deliberately not the site name; the checkout says plainly what is being bought. See PRD "Naming".
3. **Description** — this shows at checkout, so it does two jobs: confirm what they're buying, and state the 12-week window before they pay rather than after. Suggested:

   > Six private 50-minute coaching sessions with Jon, one-on-one, to be used within 12 weeks of purchase. Direct email access to Jon between every session. A quit strategy built around your life, expert withdrawal and behavior-change coaching, and progress tracking the whole way. Your booking link arrives by email within one business day.

   Shorter variant if the field feels cramped:

   > Six private 50-minute 1:1 sessions with Jon, to be used within 12 weeks of purchase. Includes direct email access to Jon between sessions. Your booking link arrives by email within one business day.

   Keep the 12-week line and the booking-link line whatever else changes: the first is a term of the sale, the second stops "did my payment work?" emails.
4. **Pricing model:** Flat-rate → **One time**. (Not Recurring. Recurring would bill them $1,200 again.)
5. **Price:** `1200.00` USD.
6. Click **Add product**.

Stripe won't save a product without at least one price attached, so fill the price in on this same screen.

### 3. Create the payment link

1. Go to **Payment Links → +New** ([dashboard.stripe.com/payment-links/create](https://dashboard.stripe.com/payment-links/create)).
2. Choose **Products or subscriptions**, then select the Program product you just made.

### 4. Settings that matter

**To change any of these on a link you already made:** **Payment Links** → click the link → **overflow menu (⋯)** → **Edit**. The URL does not change, so nothing needs re-pasting into the site. Everything below is editable after the fact — the only edit that alters your URL is **submit type**, which moves the hostname between `buy.` / `book.` / `donate.stripe.com`, so leave that one alone.


- **Add promotion codes** — turn on. Lets you run real sale windows later. *(This can also be switched on after the fact; it is not a one-shot decision.)*
- **Collect customer names** — turn on. You need to know who paid in order to send their booking link.
- **Require customers to accept your terms of service** — worth doing for a $1,200 purchase. It only appears as an option once you set your terms URL under **Settings → Business → Public details**; point it at `https://alwaysbequitting.com/terms`. Stripe then also links your privacy policy if that URL is set.

  🚨 **Use the URLs that actually work today, not the rebuild's paths.** Verified 2026-08-21: `alwaysbequitting.com/terms` **404s**. The live systeme.io pages are at:

  | Setting | Use NOW | Change to at launch (M5) |
  |---|---|---|
  | Terms of service | `https://www.alwaysbequitting.com/terms-and-conditions` | `https://www.alwaysbequitting.com/terms` |
  | Privacy policy | `https://www.alwaysbequitting.com/privacy-policy` | `https://www.alwaysbequitting.com/privacy` |

  Getting this wrong points a $1,200 checkout's terms checkbox at a dead page, and the privacy URL appears on **every receipt** as a required compliance field. The rebuild must also 301 the old paths — see PRD site map.

  ⚠️ **This setting is per-environment — set it TWICE, once in the sandbox and once in live.** Stripe's sandbox docs state that Public details are not copied from the live account (*"Stripe adds placeholder domains to enable payments in a sandbox"*) and that *"we don't synchronize settings and capabilities."* If the terms checkbox is **greyed out** in the payment link editor, this is almost always why: the URL was set in the other environment. Set it in the one you're currently working in, then hard-refresh the editor.
- **Limit the number of payments** — **leave OFF, and verify it.** This caps total sales of the Program, not sessions per client. If it is set to 1, the link takes one payment and then permanently deactivates itself.

  🚨 **This bit us in the sandbox (2026-08-18):** after a single test payment the link reported "no longer active." **On the live link this is a silent revenue-killer** — your first customer buys, the link dies, and every visitor afterwards sees a deactivated-link page with no alert to you. Confirm it is off before launch and again after the first real sale.

  Two things deactivate a link: this limit, and **archiving the product** the link sells (archiving auto-deactivates every link using that product). To bring one back: Payment Links → the link → overflow menu (⋯) → activate; or unarchive the product from the **Archived** tab in the catalog.
- **Collect tax automatically** — see the tax note below before enabling.

**Sales tax (Virginia).** *Not tax advice — confirm with an accountant.* Virginia's rule is [23VAC10-210-4040](https://law.lis.virginia.gov/admincode/title23/agency10/chapter210/section4040/): *"Charges for services generally are exempt from the retail sales and use tax. However, services provided in connection with sales of tangible personal property are taxable."* The same section gives a directly analogous example: *"Charges for training programs which include charges for required workbooks and tapes are exempt from the tax as charges for services since the object is to obtain the training services. However, separately stated charges for workbooks and tapes are subject to the tax."*

So six coaching sessions with no physical goods reads as an exempt service. **The risk is over-collecting, not under-collecting:** Stripe Tax calculates from the product's tax code, and new products often default to a tangible-goods code — which would add sales tax to an exempt service and charge clients money that shouldn't be collected. Either untick **Collect tax automatically**, or set the product's tax code to a services code in the catalog.

Watch item: Virginia's 2026 session has bills (HB 900, HB 978) that would broaden the base to some currently-exempt personal services. Not law as of this writing.

### 5. After the payment

Click **After the payment**. Under **Confirmation page**, replace the default with a custom message. Something like:

> **You're in.** I'll email your personal booking link within one business day — it lets you schedule all six sessions whenever suits you. Check your spam folder if it hasn't arrived; if you sort your mail into categories, it could be anywhere. — Jon

⚠️ **Three places state this promise and they must agree.** Added 2026-08-25, when the `/coaching` FAQ gained a "What happens right after I pay?" item:

| Where | What it promises |
|---|---|
| This confirmation message | booking link within one business day, schedules all six |
| The product description (§2 above) | same, plus "used within 12 weeks of purchase" |
| `/coaching` FAQ → *What happens right after I pay?* | mirrors both, and adds where to look if it doesn't arrive |

**Change one, change all three.** A buyer sees the checkout description before paying, the confirmation message the second they pay, and the FAQ before they ever decide to. If the fulfilment promise slips to two days, the FAQ is the one that gets missed, because it is the only one not in Stripe.

Do **not** use the redirect option. A redirect would need a page we haven't built, and the custom message needs no code.

### 6. Copy the URL into the site

Copy the link (`https://buy.stripe.com/...`) and paste it into `PROGRAM_URL` at the top of `src/pages/coaching.astro`. Both Program CTAs read from that one constant. **While it's empty they fall back to `/contact`**, so nobody hits a dead link in the meantime.

### 7. Per client, after each sale

1. Stripe emails you. (If you don't get emails for every payment, turn that on under **Settings → Personal details → Notifications**.)
2. Cal.com → the **Program** event type → **Advanced** → **Add Private Link** → gear icon → set **6 uses** and **expiry = purchase date + 12 weeks** → save the link config, then save the event type.
3. Email them the link.

The link then enforces the package on its own: after six bookings it stops working, and after 12 weeks it 404s.

⚠️ **The Program event type must have NO Stripe payment attached.** The $97 event does. If you create the Program event by duplicating it, clients get charged $97 six more times on top of the $1,200. Build it fresh, or delete the Stripe app from the duplicate.

⚠️ **Check whether the private-link gear lets you set uses AND expiry together.** Cal.com's help page phrases it as *"Number of allowed uses, **or** Expiry date."* The API accepts both at once, so if the UI forces a choice, take the **6-use cap** and track the 12 weeks yourself — an unused session is a smaller problem than a seventh free one.

### Receipts (customer) and notifications (Jon)

**Neither is on by default.** Verified in the sandbox 2026-08-18: a completed test payment produced no email to the buyer.

- **Customer receipts** — **Settings → Business → Customer emails → Payments → "Successful payments."** Stripe does **not** auto-send receipts for test payments at all (*"If you need to send a receipt for a test payment, send a manual receipt"*), so you can only really confirm this in live. Someone paying $1,200 and receiving no receipt is alarming — do not launch without this on.
- **Jon's own notifications** — **Settings → Personal details → Notifications.** Stripe emails you after your *first* payment automatically; every payment after that needs this setting.

🚨 **This is the single most fragile point in the whole manual flow.** Nothing else tells Jon a sale happened, and nothing else triggers fulfillment. If that email is filtered, spam-foldered, or arrives while Jon is away, a client has paid $1,200 and is waiting for a booking link that will never arrive — with no recourse but the contact form. **Add a second channel that can't be filtered: install the Stripe dashboard mobile app and enable push notifications for payments.** Free, two minutes, and it fails differently than email does.

**Note on test mode:** Stripe suppresses emails in sandbox by default — customer receipts *and* merchant notifications. A silent test payment is expected behaviour, not a misconfiguration. Neither can be verified until live. (Resend is not involved in any of this; it is wired only to the contact form.)

⚠️ **Receipts carry required compliance fields:** legal business name, customer support address, **customer support email**, and privacy policy URL. The support email appears on every receipt and must be an address that actually reaches Jon — `no-reply@` is not suitable.

**DECIDED (Jon, 2026-08-18): use Jon's real email on receipts.** His reasoning: *"if someone is paying me, they probably deserve to know my email address. This is unlike a contact form where any spammer would get my real email address."*

**This does not conflict with the no-published-email rule** on `/contact` and elsewhere — that rule exists to stop address harvesting from public pages. A receipt goes only to someone who has completed a purchase. The two are scoped differently on purpose; do not "fix" either one to match the other.

---

## Community checkout → Stripe Payment Link

**$291 for 3 months** ($97/month, paid up front). A **one-time payment, not a subscription** — it ends, and members who want to stay opt in to $37/month, which Jon sets up by hand. Mighty Networks is no longer the checkout; Jon invites members in manually. See PRD "Community billing — DECIDED".

**Product** — **More → Product catalog → +Add product**

- **Name:** `ABQ Community — 3 Months`
- **Pricing model:** Flat rate → **One time** · **$291.00** USD
- **Include tax in price:** **No** (exclusive — $291 stays $291)
- **Description** (shows at checkout):

> Three months in the ABQ Community — weekly live coaching calls with Jon, call recordings, and 24/7 access to people quitting alongside you. One payment of $291, which is $97 a month paid up front. After your three months, you can continue at $37/month if you wish.

**Payment Link** — select that product, add nothing else.

- Promotion codes **ON** — this is the only way specials run; there is no discounted community tier
- Collect customer names **ON** — you need to know who to invite
- Terms of service **ON**
- Collect tax automatically **OFF**
- Limit the number of payments **OFF**
- **Save payment details for future use — ON.** Deliberate: it forces Stripe to create a real Customer rather than a guest, which is what lets you start the $37 subscription later without them re-entering a card. Only ever charge it after an explicit yes in writing.

**Confirmation message:**

> **You're in — and I'm glad you're here.**
>
> I'll email your invitation to the ABQ Community within one business day. Check your spam or junk folder if it hasn't turned up; if you sort your mail into categories, it could be anywhere :)
>
> Happy Quitting, Jon

⚠️ **Nothing tracks the 3-month term.** Stripe records a payment with no duration; a Mighty invite never lapses. Use `ABQ-member-tracker.xlsx` and set the week-10 reminder when you grant access.

---

### Where to edit a confirmation message

**Payment Links → click the link → overflow menu (⋯) → Edit → After the payment → Confirmation page → replace the default message.** The URL doesn't change when you edit, so nothing needs re-pasting into the site.

Note it's a property of the *link*, not the product — so a live link starts with Stripe's generic default and needs setting again.

### 🚨 Pre-launch: check what our notes are exposing

**Run this before launch, every time.** On 2026-08-21 we found 54 internal notes being served to browsers, crawlers and AI scrapers — including `<!-- honeypot: real people never fill this -->` beside the spam-trap field, Jon's verbatim quotes on all seven pages, and a note stating both the withheld $1,200 price and the strategy of withholding it.

The rule: in `.astro` templates, **`<!-- -->` ships to the browser; `{/* */}` does not.** Astro comments are compile-time only. It is easy to forget, so verify rather than trust.

```bash
cd ~/Projects/always-be-quitting && npm run build
# every number below must be 0
for f in dist/client/**/index.html dist/client/index.html; do
  echo "$(grep -c '<!--' "$f" 2>/dev/null || echo 0)  $f"
done
```

Then read what a stranger would see, on the deployed site rather than the build:

```bash
curl -s https://alwaysbequitting.com | grep -o '<!--.*?-->'
```

Also worth checking: no `TODO`, no internal file paths, no PRD issue numbers, no pricing you intended to withhold, no admissions about earlier drafts.

### Live payment links — ✅ WIRED INTO THE SITE 2026-08-25

**Both `PROGRAM_URL` and `JOIN_URL` now hold these live URLs.** Staging and production both take real money: test cards are declined, and any completed checkout is a real charge carrying a real Stripe fee.

⚠️ **The staging URL is now a live checkout.** `always-be-quitting.vercel.app` is reachable by anyone who has the link, and its buttons charge real cards. It is `noindex` and excluded from the sitemap, so it will not be crawled, but it is not private. If the site is going to sit unfinished for a while, consider reverting to the sandbox links until launch.

| Offer | Live URL | Status |
|---|---|---|
| **1:1 Program — $1,200** | `https://buy.stripe.com/14A6oAf6Rddje5w9mR2oE00` | Created 2026-08-21. Verified: live (no Sandbox badge), $1,200, correct description, promo codes on, no tax row. **Terms checkbox not yet confirmed** — Stripe Link intercepted the payment panel; check via "Pay without Link". |
| **ABQ Community — $291** | `https://buy.stripe.com/6oU5kw2k51uBd1scz32oE01` | Created 2026-08-21. **Fully verified** via "Pay without Link": $291, correct description, promo codes, no tax row, name collection on, consent checkbox linking **both** Terms of Service → `/terms-and-conditions` and Privacy Policy → `/privacy-policy` (the working URLs), and the "future payments" authorisation confirming payment details are saved. |

These are in `PROGRAM_URL` (`src/pages/coaching.astro`) and `JOIN_URL` (`src/pages/community.astro`) as of 2026-08-25. The build guard still fires if a `test_` link is ever wired back in.

🚨 **Still outstanding on the $1,200 link:** the terms-of-service checkbox was never confirmed, because Stripe Link intercepted the payment panel during verification. Check it via **"Pay without Link"**. The community link was fully verified; this one was not — and it is now live on the site.

### 🚨 Going live — the sandbox→live checklist

Sandbox settings do **not** carry over. Everything below has to be redone in live mode, and skipping one is silent — the link just quietly behaves differently than the one you tested.

- [ ] **Terms of service URL** — **Settings → Business → Public details**, in LIVE mode. *(Deferred in the sandbox on purpose, Jon 2026-08-18 — this is the one most likely to be forgotten.)* Confirm `https://alwaysbequitting.com/terms` actually resolves before using it; until M5 that domain is still served by systeme.io, not the rebuild.
- [ ] **Privacy policy URL** in the same place, so Stripe links it at checkout.
- [ ] **Product** — use **Copy to live mode** on the sandbox product's details page rather than retyping it. Price copies too.
- [ ] **Tax** — confirm "Collect tax automatically" is OFF in live (see the tax note above), or that the product carries a services tax code.
- [ ] **Create the live payment link** — sandbox links never take real money, so this is a fresh link with a new URL.
- [ ] Tick **promotion codes**, **collect customer names**, and **terms of service** on the live link.
- [ ] 🚨 **Confirm "Limit the number of payments" is OFF.** If it's set to 1, your first customer's purchase permanently deactivates the link and nobody else can buy — with no warning to you. This actually happened in the sandbox.
- [ ] **Check the payment methods** enabled in live (Affirm / Klarna / Cash App were on in the sandbox).
- [ ] **Set the After-the-payment confirmation message** again — it's a property of the link, so the live link starts with Stripe's default.
- [ ] **Turn on customer receipts** — Settings → Business → Customer emails → "Successful payments." Off by default, and never fires in test mode, so live is the first place you can confirm it. Set the customer support email first (see Receipts above).
- [ ] **Turn on payment notifications for yourself** — Settings → Personal details → Notifications. Stripe only auto-emails after the *first* payment.
- [ ] **Install the Stripe mobile app and enable payment push notifications.** Second channel, can't be filtered. Missing a sale notification means a paying client never gets their booking link.
- [ ] **Paste the live URLs into `PROGRAM_URL`** (`src/pages/coaching.astro`) and **`JOIN_URL`** (`src/pages/community.astro`), then commit and push. The build prints a warning while either still holds a `test_` link.
- [ ] **Run the "check what our notes are exposing" block above.** Must be 0 comments on every page.
- [ ] **Repoint the legal URLs** in Stripe → Settings → Business → Public details, from `/terms-and-conditions` and `/privacy-policy` to `/terms` and `/privacy` — and confirm the 301s are in place first, so the old URLs on already-sent receipts keep working.
- [ ] **Test the live path with a $1 link, not the $1,200 one.** Create a throwaway live product at $1.00, make a payment link for it, and buy it with your own card. Costs about 33¢ and exercises the whole real pipeline: money movement, your notification email, the receipt, the confirmation message. Archive the throwaway product and link afterwards.

  ⚠️ **Do NOT test by buying the $1,200 link and refunding it.** [Stripe does not return the processing fee on a refund](https://docs.stripe.com/refunds) — the 2.9% + 30¢ is gone either way, so that test costs about **$35** and proves nothing the $1 version doesn't. (An earlier version of this checklist suggested exactly that. It was wrong.) For the same reason, don't bother refunding the $1 — refunding it costs you the fee regardless.

### Costs

Stripe takes **2.9% + 30¢** on US cards — about **$35.10** on $1,200, so you net roughly **$1,164.90**. No monthly fee.

### Running a sale later

Create a coupon at **Dashboard → Coupons → +New**, then turn it into a customer-facing **promotion code**. Give it a hard expiry date, and a redemption limit if the sale is capped. Never bake sale pricing into page copy — the code is the mechanism, so the page always shows $1,200. You can prefill a code in a link with `?prefilled_promo_code=CODENAME`.

---

## Deploying (how changes go live)

Changes reach the site by pushing to GitHub — Vercel auto-builds on push.

```
cd ~/Projects/always-be-quitting
rm -f .git/index.lock
git add -A
git commit -m "your message"
git push
```

This deploys to the **staging** site. The production domain (alwaysbequitting.com) stays on systeme.io until the launch milestone (M5).

---

## Local development

```
cd ~/Projects/always-be-quitting
npm run dev      # local preview at the printed localhost URL — works offline
npm run build    # production build; must pass before committing
```
