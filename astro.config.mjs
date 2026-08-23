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
