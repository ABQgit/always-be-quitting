// robots.txt, generated per-request so staging and production behave differently.
//
// WHY THIS IS AN ENDPOINT AND NOT A STATIC FILE:
// The same build is deployed to both always-be-quitting.vercel.app (staging) and
// alwaysbequitting.com (production, from M5). A static robots.txt would have to
// pick one behaviour and would be wrong on the other deployment - either staging
// gets indexed as a duplicate of the real site, or production launches blocked
// from search engines, which is the worse of the two and easy not to notice.
//
// So: allow crawling ONLY on the production hostname. Everything else - staging,
// preview deploys, branch URLs - is fully disallowed.
//
// Canonical tags already point at www.alwaysbequitting.com everywhere, which
// mitigates duplicate-content indexing, but canonicals are a hint and Disallow
// is a directive. Belt and braces.
export const prerender = false;

import type { APIRoute } from 'astro';

/** Hostnames allowed to be crawled. Add the apex + www so either resolves. */
const PRODUCTION_HOSTS = new Set(['alwaysbequitting.com', 'www.alwaysbequitting.com']);

export const GET: APIRoute = ({ url, request }) => {
  // Vercel serves behind a proxy; the forwarded host is the one the visitor used.
  const forwarded = request.headers.get('x-forwarded-host');
  const host = (forwarded ?? url.hostname).split(':')[0].toLowerCase();

  const isProduction = PRODUCTION_HOSTS.has(host);

  const body = isProduction
    ? [
        'User-agent: *',
        'Allow: /',
        '',
        '# /quick-start is the guide-delivery page. It is unlisted and carries a',
        '# noindex meta tag; excluded here too so it never surfaces in search.',
        'Disallow: /quick-start',
        '',
        '# API endpoints have nothing to index.',
        'Disallow: /api/',
        '',
        'Sitemap: https://www.alwaysbequitting.com/sitemap-index.xml',
        '',
      ].join('\n')
    : [
        '# Non-production deployment - do not index.',
        'User-agent: *',
        'Disallow: /',
        '',
      ].join('\n');

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      // Short cache: the answer depends on hostname, and we want a fast fix if wrong.
      'Cache-Control': 'public, max-age=300',
    },
  });
};
