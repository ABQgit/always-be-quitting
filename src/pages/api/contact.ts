// Contact form endpoint — sends via Resend (https://resend.com).
// Requires env vars (set in Vercel project settings + .env locally):
//   RESEND_API_KEY  — from the Resend dashboard
//   CONTACT_TO      — where messages go (default jon@alwaysbequitting.com)
//   CONTACT_FROM    — verified sender (default onboarding@resend.dev until the
//                     alwaysbequitting.com domain is verified in Resend)
export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();

  // Honeypot: real users never fill this hidden field
  if ((form.get('company') as string)?.length) {
    return redirect('/contact?sent=1', 303);
  }

  const name = ((form.get('name') as string) || '').slice(0, 200).trim();
  const email = ((form.get('email') as string) || '').slice(0, 200).trim();
  const message = ((form.get('message') as string) || '').slice(0, 5000).trim();

  if (!name || !email || !message || !email.includes('@')) {
    return redirect('/contact?error=missing', 303);
  }

  const apiKey = import.meta.env.RESEND_API_KEY;
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
      from: import.meta.env.CONTACT_FROM || 'ABQ Website <onboarding@resend.dev>',
      to: [import.meta.env.CONTACT_TO || 'jon@alwaysbequitting.com'],
      reply_to: email,
      subject: `[ABQ Contact] ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    }),
  });

  if (!res.ok) {
    console.error('Resend error:', res.status, await res.text());
    return redirect('/contact?error=send', 303);
  }

  return redirect('/contact?sent=1', 303);
};
