// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.alwaysbequitting.com',
  // Static by default; individual API endpoints opt out with `export const prerender = false`
  output: 'static',
  adapter: vercel(),

  // Legacy URL redirects (added 2026-08-25, BEFORE the M5 cutover on purpose).
  //
  // 🚨 These are not tidiness. The systeme.io paths are printed on every Stripe
  // receipt already emailed to paying customers, and Stripe's Public details
  // still point at them. Without these, the first thing a $1,200 customer sees
  // when they click the terms link on their own receipt is a 404.
  //
  // 301 (permanent) rather than 302: the move is permanent, and 301 passes the
  // old URLs' accumulated search equity to the new paths. 302 would not.
  //
  // Must ship BEFORE DNS moves - a redirect that arrives after the cutover has
  // already failed the people it existed to protect. See SETUP.md "Going live".
  redirects: {
    '/terms-and-conditions': { status: 301, destination: '/terms' },
    '/privacy-policy': { status: 301, destination: '/privacy' },
  },
  integrations: [
    sitemap({
      // /quick-start is the guide-delivery page: unlisted, not linked from
      // anywhere, and noindex'd via Base.astro. It must stay out of the sitemap
      // or we would be handing search engines the one page we hid.
      // See PRD site map. robots.txt disallows it as well.
      filter: (page) => !page.includes('/quick-start'),
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
