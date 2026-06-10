// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import icon from 'astro-icon';

import mdx from '@astrojs/mdx';

// https://astro.build/config
export default defineConfig({
  site: 'https://bpcosta.com',
  integrations: [svelte(), sitemap(), icon(), mdx()],
  server: {
    host: '127.0.0.1',
  },

  vite: {
    plugins: [
      tailwindcss(),
    ],
  }
});
