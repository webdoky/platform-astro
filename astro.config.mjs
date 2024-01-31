import react from '@astrojs/react';
import astroSitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import { defineConfig } from 'astro/config';
// import astroCompress from 'astro-compress';
import astroCritters from 'astro-critters';
import astroServiceWorker from 'astrojs-service-worker';

// https://astro.build/config
export default defineConfig({
  compressHTML: false,
  integrations: [
    import.meta.env.MODE === 'production' ? astroServiceWorker : undefined,
    astroSitemap(),
    astroCritters({ Logger: 1 }),
    // astroCompress({ Logger: 1 }),
    react(),
    tailwind(),
  ],
  markdown: {
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
