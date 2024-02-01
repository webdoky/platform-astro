import react from '@astrojs/react';
import astroSitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import astroCritters from 'astro-critters';
import { defineConfig } from 'astro/config';
import astroServiceWorker from 'astrojs-service-worker';

import remarkReadingTime from './reading-time.plugin.mjs';

// https://astro.build/config
export default defineConfig({
  compressHTML: false,
  integrations: [
    import.meta.env.MODE === 'production' ? astroServiceWorker() : undefined,
    astroSitemap(),
    astroCritters({ Logger: 1 }),
    react(),
    tailwind(),
  ],
  markdown: {
    remarkPlugins: [remarkReadingTime],
    syntaxHighlight: 'prism',
  },
  prefetch: true,
  site: 'https://webdoky4.surge.sh',
  vite: {
    resolve: {
      preserveSymlinks: true,
    },
  },
});
