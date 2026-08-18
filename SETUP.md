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
