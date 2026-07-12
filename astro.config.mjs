// @ts-check
import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://www.alwaysbequitting.com',
  // Static by default; individual API endpoints opt out with `export const prerender = false`
  output: 'static',
  adapter: vercel(),
  vite: {
    plugins: [tailwindcss()],
  },
});
