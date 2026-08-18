// Email opt-in endpoint -> systeme.io Public API.
//
// The ABQ Tips list lives on systeme.io and stays there after the site moves off
// their page builder (tech-stack.md). This creates the contact and applies the
// tag that triggers Jon's existing automation (the Quick-Start Guide sequence).
//
// API shape verified against developer.systeme.io, 2026-08-14:
//   POST /api/contacts            { email, locale, fields:[{slug,value}] } -> 201
//   GET  /api/contacts?email=...  exact-match filter, to find an existing contact
//   POST /api/contacts/{id}/tags  { tagId }                                -> 204
//   Auth: X-API-Key header. 429 + Retry-After when rate limited.
//
// systeme.io's own docs warn that calling this from a public page exposes the
// key, so it stays server-side only. That is the entire reason this file exists.
//
// Env (Vercel + .env):
//   SYSTEME_API_KEY  - required. Profile settings -> Public API keys.
//   SYSTEME_TAG_ID   - optional. Numeric tag id that fires the guide automation.
//                      Without it the contact is still created, just untagged.
export const prerender = false;

import type { APIRoute } from 'astro';

/** Astro exposes PUBLIC_ vars via import.meta.env; secrets can land in either
 *  import.meta.env or process.env depending on runtime. Check both. */
function env(name: string): string | undefined {
  return (import.meta.env as Record<string, string | undefined>)[name]
    ?? (typeof process !== 'undefined' ? process.env?.[name] : undefined);
}


const API = 'https://api.systeme.io/api';

/** Only allow redirects back to our own paths - never to an attacker's URL. */
function safeReturn(raw: FormDataEntryValue | null): string {
  const v = typeof raw === 'string' ? raw : '';
  return /^\/[a-z0-9/-]*$/i.test(v) ? v : '/';
}

export const POST: APIRoute = async ({ request, redirect }) => {
  const form = await request.formData();

  // Honeypot: real people never fill a hidden field.
  if ((form.get('company') as string)?.length) {
    return redirect(`${safeReturn(form.get('return'))}?subscribed=1`, 303);
  }

  const back = safeReturn(form.get('return'));
  const email = ((form.get('email') as string) || '').trim().slice(0, 200);
  const firstName = ((form.get('first_name') as string) || '').trim().slice(0, 100);

  if (!email || !email.includes('@')) {
    return redirect(`${back}?suberror=email`, 303);
  }

  const key = env('SYSTEME_API_KEY');
  if (!key) {
    console.error('SYSTEME_API_KEY is not set');
    return redirect(`${back}?suberror=config`, 303);
  }

  const headers = { 'X-API-Key': key, 'Content-Type': 'application/json' };

  try {
    // ---- 1. create the contact -------------------------------------------
    const fields = firstName ? [{ slug: 'first_name', value: firstName }] : [];
    let contactId: number | null = null;

    const create = await fetch(`${API}/contacts`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ email, locale: 'en', fields }),
    });

    if (create.status === 429) {
      console.error('systeme.io rate limited. Retry-After:', create.headers.get('retry-after'));
      return redirect(`${back}?suberror=busy`, 303);
    }

    if (create.ok) {
      const body = await create.json().catch(() => null);
      contactId = body?.id ?? null;
    } else {
      // 422 is the expected response for an address already on the list. That's
      // a success from the visitor's point of view - look them up and re-tag so
      // the automation fires again.
      const detail = await create.text().catch(() => '');
      if (create.status !== 422 && create.status !== 400) {
        console.error('systeme.io create failed:', create.status, detail);
        return redirect(`${back}?suberror=send`, 303);
      }
      const found = await fetch(`${API}/contacts?email=${encodeURIComponent(email)}&limit=10`, {
        headers,
      });
      if (found.ok) {
        const body = await found.json().catch(() => null);
        contactId = body?.items?.[0]?.id ?? null;
      }
      if (!contactId) {
        console.error('systeme.io: contact not created and not found:', create.status, detail);
        return redirect(`${back}?suberror=send`, 303);
      }
    }

    // ---- 2. tag them, which triggers Jon's automation ---------------------
    // SYSTEME_TAG_ID accepts one id or a comma-separated list, e.g. "1961444,1956363"
    // (Quick-Start Guide + ABQ Tips). Applied one at a time - the API takes a
    // single tagId per call.
    const tagIds = (env('SYSTEME_TAG_ID') || '')
      .split(',')
      .map((s) => s.trim())
      .filter((s) => /^\d+$/.test(s));

    if (tagIds.length && contactId) {
      for (const id of tagIds) {
        const tag = await fetch(`${API}/contacts/${contactId}/tags`, {
          method: 'POST',
          headers,
          body: JSON.stringify({ tagId: Number(id) }),
        });
        // A failed tag must not fail the signup - they're on the list either way.
        if (!tag.ok) {
          console.error(`systeme.io tag ${id} failed:`, tag.status, await tag.text().catch(() => ''));
        }
      }
    } else if (!tagIds.length) {
      console.warn('SYSTEME_TAG_ID not set - contact created but not tagged, so the guide automation will not fire.');
    }

    return redirect(`${back}?subscribed=1`, 303);
  } catch (err) {
    console.error('subscribe endpoint error:', err);
    return redirect(`${back}?suberror=send`, 303);
  }
};
