// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://ono-international.com',
  base: '/',
  output: 'static',
  
  redirects: {
    '/lp-teamdragon': '/',
  },

  redirects: {
    '/lp-teamdragon': '/',
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [sitemap()],
});
