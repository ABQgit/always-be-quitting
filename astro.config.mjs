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
  // Sources: the live systeme.io sitemaps, fetched 2026-08-25 -
  //   /sitemap.xml -> one blog sitemap + two funnel sitemaps, 16 URLs total.
  // Jon's initial read was "no funnels, and if there are I won't miss them",
  // which held for the junk slugs but not for the named pages below - each is
  // linked from the nav of every page on the old site, so each is indexed.
  //
  // DELIBERATELY NOT REDIRECTED, left to 404: /hsdzywqq, /tqbeytfj, /cf8688fd,
  // /thank-you-contact-1, /thank-you-6a5873e06d9d5, /search. Generated slugs
  // and thank-you pages with no inbound value. Redirecting them would only add
  // noise to the config and to Search Console.
  redirects: {
    // Legal. On every Stripe receipt already emailed to paying customers.
    '/terms-and-conditions': { status: 301, destination: '/terms' },
    '/privacy-policy': { status: 301, destination: '/privacy' },

    // Old funnel pages -> their rebuild equivalents.
    '/premium-coaching': { status: 301, destination: '/coaching' },
    '/community-8-25': { status: 301, destination: '/community' },
    '/opt-in': { status: 301, destination: '/free-guide' },
    '/4-critical-mistakes-01': { status: 301, destination: '/free-guide' },
    '/quick-start-video-landing': { status: 301, destination: '/free-guide' },

    // Podcast. The rebuild has no podcast section - it was removed on purpose -
    // but two real episodes exist on the old site with hosted audio and full
    // show notes: Katherine on quitting vaping slowly, and Kait on smoking
    // within addiction recovery. Both are interviews with women whose
    // testimonials appear on the new site, and both target exactly the
    // long-tail queries this site can realistically win.
    //
    // Jon chose /coaching (2026-08-25) over letting them 404 or rebuilding a
    // podcast section. Both episodes are about working with a coach, so it is
    // the closest live page.
    //
    // ⚠️ WATCH THIS IN SEARCH CONSOLE. A 301 from an article to a sales page
    // can be treated as a soft 404 and dropped rather than credited. If these
    // lose their rankings, the content itself is still recoverable from the
    // old pages and rebuilding a minimal /podcast becomes worth reconsidering.
    '/2149055586': { status: 301, destination: '/coaching' },
    '/2149078008': { status: 301, destination: '/coaching' },
    '/podcasts/always-be-quitting': { status: 301, destination: '/coaching' },
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
