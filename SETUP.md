# ABQ — Setup & Integrations

Practical, non-code steps to make the site's live features work. Code is already built; this is the configuration that turns it on.

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

---

## Email list opt-in → systeme.io (M3, not built yet)

The Quick-Start Guide opt-in forms post to `/api/subscribe`, which will call the systeme.io API to add the subscriber to the ABQ Tips list. Env var reserved: `SYSTEME_API_KEY`. This endpoint is a Milestone 3 task and isn't wired up yet.

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
