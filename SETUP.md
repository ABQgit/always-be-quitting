# ABQ — Setup & Integrations

Practical, non-code steps to make the site's live features work. Code is already built; this is the configuration that turns it on.

**Live staging URL:** https://always-be-quitting.vercel.app/ — the current build of the rebuild, auto-deployed from GitHub (`ABQgit/always-be-quitting`) via Vercel. This is where you preview the new site. The production domain (alwaysbequitting.com) stays on systeme.io until launch (M5).

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

The $1,200 Program (**Quit for the Last Time: The 1:1 Program**) sells through a Stripe Payment Link. You then issue the client a Cal.com Private Link by hand. Decided 2026-08-18 — see PRD "Program checkout — DECIDED" for why Calendly Meeting Packages were rejected.

### 1. Do it in test mode first

Top-left of the Stripe Dashboard, flip to **Test mode**. Build it there, pay yourself with card `4242 4242 4242 4242` (any future expiry, any CVC), confirm the flow works, then rebuild in live mode.

The **product** doesn't have to be built twice — its details page has a **Copy to live mode** button in the top right, and the price copies with it. The **payment link** does have to be recreated in live mode; a test link never takes real money.

### 2. Create the product first

A payment link needs a product to sell, and Stripe's newer dashboard generally routes you through the catalog rather than letting you invent one inline. Do this first and the link step gets easy.

1. Go to **More → Product catalog**, then click **+Add product**.
2. **Name:** `Quit for the Last Time: The 1:1 Program`
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

  ⚠️ **This setting is per-environment — set it TWICE, once in the sandbox and once in live.** Stripe's sandbox docs state that Public details are not copied from the live account (*"Stripe adds placeholder domains to enable payments in a sandbox"*) and that *"we don't synchronize settings and capabilities."* If the terms checkbox is **greyed out** in the payment link editor, this is almost always why: the URL was set in the other environment. Set it in the one you're currently working in, then hard-refresh the editor.
- **Limit the number of payments** — leave off. That caps total sales of the Program, not sessions per client.
- **Collect tax automatically** — see the tax note below before enabling.

**Sales tax (Virginia).** *Not tax advice — confirm with an accountant.* Virginia's rule is [23VAC10-210-4040](https://law.lis.virginia.gov/admincode/title23/agency10/chapter210/section4040/): *"Charges for services generally are exempt from the retail sales and use tax. However, services provided in connection with sales of tangible personal property are taxable."* The same section gives a directly analogous example: *"Charges for training programs which include charges for required workbooks and tapes are exempt from the tax as charges for services since the object is to obtain the training services. However, separately stated charges for workbooks and tapes are subject to the tax."*

So six coaching sessions with no physical goods reads as an exempt service. **The risk is over-collecting, not under-collecting:** Stripe Tax calculates from the product's tax code, and new products often default to a tangible-goods code — which would add sales tax to an exempt service and charge clients money that shouldn't be collected. Either untick **Collect tax automatically**, or set the product's tax code to a services code in the catalog.

Watch item: Virginia's 2026 session has bills (HB 900, HB 978) that would broaden the base to some currently-exempt personal services. Not law as of this writing.

### 5. After the payment

Click **After the payment**. Under **Confirmation page**, replace the default with a custom message. Something like:

> **You're in.** I'll email your personal booking link within one business day — it lets you schedule all six sessions whenever suits you. Check your spam folder if it hasn't arrived; if you sort your mail into categories, it could be anywhere. — Jon

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

⚠️ **Receipts carry required compliance fields:** legal business name, customer support address, **customer support email**, and privacy policy URL. The support email appears on every receipt and must be an address that actually reaches Jon — `no-reply@` is not suitable. Decide this deliberately; it is the one place a working contact address is unavoidable, given the no-published-email rule everywhere else on the site.

### 🚨 Going live — the sandbox→live checklist

Sandbox settings do **not** carry over. Everything below has to be redone in live mode, and skipping one is silent — the link just quietly behaves differently than the one you tested.

- [ ] **Terms of service URL** — **Settings → Business → Public details**, in LIVE mode. *(Deferred in the sandbox on purpose, Jon 2026-08-18 — this is the one most likely to be forgotten.)* Confirm `https://alwaysbequitting.com/terms` actually resolves before using it; until M5 that domain is still served by systeme.io, not the rebuild.
- [ ] **Privacy policy URL** in the same place, so Stripe links it at checkout.
- [ ] **Product** — use **Copy to live mode** on the sandbox product's details page rather than retyping it. Price copies too.
- [ ] **Tax** — confirm "Collect tax automatically" is OFF in live (see the tax note above), or that the product carries a services tax code.
- [ ] **Create the live payment link** — sandbox links never take real money, so this is a fresh link with a new URL.
- [ ] Tick **promotion codes**, **collect customer names**, and **terms of service** on the live link.
- [ ] **Check the payment methods** enabled in live (Affirm / Klarna / Cash App were on in the sandbox).
- [ ] **Set the After-the-payment confirmation message** again — it's a property of the link, so the live link starts with Stripe's default.
- [ ] **Turn on customer receipts** — Settings → Business → Customer emails → "Successful payments." Off by default, and never fires in test mode, so live is the first place you can confirm it. Set the customer support email first (see Receipts above).
- [ ] **Turn on payment notifications for yourself** — Settings → Personal details → Notifications.
- [ ] **Paste the live URL into `PROGRAM_URL`** in `src/pages/coaching.astro`, then commit and push.
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
