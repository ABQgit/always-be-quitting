// Contact form endpoint — sends via Resend (https://resend.com).
// Requires env vars (set in Vercel project settings + .env locally):
//   RESEND_API_KEY  — from the Resend dashboard
//   CONTACT_TO      — where messages go (default jon@alwaysbequitting.com)
//   CONTACT_FROM    — verified sender (default onboarding@resend.dev until the
//                     alwaysbequitting.com domain is verified in Resend)
export const prerender = false;

import type { APIRoute } from 'astro';

/** Astro exposes PUBLIC_ vars via import.meta.env; secrets can land in either
 *  import.meta.env or process.env depending on runtime. Check both. */
function env(name: string): string | undefined {
  return (import.meta.env as Record<string, string | undefined>)[name]
    ?? (typeof process !== 'undefined' ? process.env?.[name] : undefined);
}


export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();

  // Honeypot: real users never fill this hidden field
  if ((form.get('company') as string)?.length) {
    return redirect('/contact?sent=1', 303);
  }

  const name = ((form.get('name') as string) || '').slice(0, 200).trim();
  const email = ((form.get('email') as string) || '').slice(0, 200).trim();
  const reason = ((form.get('reason') as string) || '').slice(0, 100).trim();
  const message = ((form.get('message') as string) || '').slice(0, 5000).trim();

  // ALL fields are mandatory (Jon, 2026-08-14) - enforced here as well as in the
  // browser, since client-side `required` can be bypassed.
  if (!name || !email || !reason || !message || !email.includes('@')) {
    return redirect('/contact?error=missing', 303);
  }

  // Google reCAPTCHA v2. Skipped entirely until RECAPTCHA_SECRET_KEY is set, so
  // the form keeps working before setup. Once set, a failed check blocks send.
  const recaptchaSecret = env('RECAPTCHA_SECRET_KEY');
  if (recaptchaSecret) {
    const token = (form.get('g-recaptcha-response') as string) || '';
    if (!token) {
      return redirect('/contact?error=captcha', 303);
    }
    const verify = await fetch('https://www.google.com/recaptcha/api/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ secret: recaptchaSecret, response: token }),
    });
    const result = (await verify.json()) as { success?: boolean };
    if (!result.success) {
      return redirect('/contact?error=captcha', 303);
    }
  }

  const apiKey = env('RESEND_API_KEY');
  if (!apiKey) {
    console.error('RESEND_API_KEY is not set');
    return redirect('/contact?error=config', 303);
  }

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: env('CONTACT_FROM') || 'ABQ Website <onboarding@resend.dev>',
      to: [env('CONTACT_TO') || 'jon@alwaysbequitting.com'],
      reply_to: email,
      subject: `[ABQ Contact] ${reason || 'General'} - ${name}`,
      text: `From: ${name} <${email}>\nReason for contact: ${reason || '(not specified)'}\n\n${message}`,
    }),
  });

  if (!res.ok) {
    console.error('Resend error:', res.status, await res.text());
    return redirect('/contact?error=send', 303);
  }

  // ---- Auto-confirmation to the sender -------------------------------------
  // Doubles as a soft marketing touch. DELIBERATELY ONE LINK ONLY: multiple
  // links in an automated reply is a strong spam signal, and this message has
  // to survive the filter to be worth sending at all (Jon, 2026-08-14).
  //
  // DELIVERABILITY: until alwaysbequitting.com is verified in Resend, this
  // sends from onboarding@resend.dev and will often land in spam or bounce.
  // See SETUP.md. Set CONFIRMATION_ENABLED=false to switch it off.
  // OFF unless explicitly switched on. It sends from no-reply@alwaysbequitting.com,
  // which Resend rejects until the domain is verified, so the safe default is
  // silence rather than a failed send on every submission. Set
  // CONFIRMATION_ENABLED=true once the domain is verified.
  const confirmationEnabled = env('CONFIRMATION_ENABLED') === 'true';
  if (confirmationEnabled) {
    const firstName = name.split(' ')[0] || name;
    const confirmationText = `Hi ${firstName},

This confirms that we got your message. I read everything that comes in and I'll get back to you personally, usually within 1-2 business days.

In the meantime, here's a little about us.

Always Be Quitting helps people quit smoking and vaping for the last time, through private 1:1 coaching and an online community of people quitting alongside each other. I'm a CTTS and NCNTT certified tobacco treatment specialist and I've spent 25 years helping people who thought they could never quit.

There's also a YouTube channel with around 50 videos on withdrawal, cravings, relapse, and the mindset side of quitting. It's free, and it's a good place to start if you're not ready to talk to anyone yet.

The community runs live group calls with me most weeks, plus 24/7 access to other people going through it. You don't have to be ready to quit to join.

You can find all of it at AlwaysBeQuitting.com

Talk soon,
Jon

Always Be Quitting
Motivation and Mindset Studios, LLC

This is an automated confirmation sent from an unmonitored address, so please don't reply to it. Your message is in my inbox and I'll come back to you personally.`;

    const confirmRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        // Sent FROM no-reply, and deliberately NO reply_to: Jon's personal
        // address is never exposed, and replies to the auto-confirmation don't
        // reach his inbox chasing an early answer (Jon, 2026-08-14).
        from: env('CONFIRMATION_FROM') || 'Always Be Quitting <no-reply@alwaysbequitting.com>',
        to: [email],
        subject: 'We got your message - Always Be Quitting',
        text: confirmationText,
      }),
    });

    // A failed confirmation must NEVER fail the submission - Jon already has
    // the message at this point. Log and carry on.
    if (!confirmRes.ok) {
      console.error('Confirmation email failed:', confirmRes.status, await confirmRes.text());
    }
  }

  return redirect('/contact?sent=1', 303);
};
