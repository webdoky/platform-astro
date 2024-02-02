import react from '@astrojs/react';
import astroSitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import headings from '@sveltinio/remark-headings';
import astroCritters from 'astro-critters';
import { defineConfig } from 'astro/config';
import astroServiceWorker from 'astrojs-service-worker';
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

// https://astro.build/config
export default defineConfig({
  // compressHTML: false,
  integrations: [
    import.meta.env.MODE === 'production' ? astroServiceWorker() : undefined,
    astroSitemap(),
    astroCritters({ Logger: 1 }),
    react(),
    tailwind(),
  ],
  markdown: {
    remarkPlugins: [headings],
    syntaxHighlight: 'prism',
  },
  prefetch: true,
  site: process.env.BASE_PATH,
  vite: {
    resolve: {
      preserveSymlinks: true,
    },
  },
});
