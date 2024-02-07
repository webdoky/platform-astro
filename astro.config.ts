import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import astroSitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import astroCritters from 'astro-critters';
import { defineConfig } from 'astro/config';
import astroServiceWorker from 'astrojs-service-worker';
import { config as dotenvConfig } from 'dotenv';

import rehypePlugins from './src/plugins/rehype/index.ts';
import remarkPlugins from './src/plugins/remark/index.ts';
dotenvConfig();

// https://astro.build/config
export default defineConfig({
  // compressHTML: false,
  integrations: [
    import.meta.env.MODE === 'production' ? astroServiceWorker() : undefined,
    astroSitemap(),
    astroCritters({
      Logger: 1,
    }),
    react(),
    tailwind(),
    partytown({
      config: {
        forward: ['dataLayer.push'],
      },
    }),
  ],
  markdown: {
    rehypePlugins: rehypePlugins,
    remarkPlugins: remarkPlugins,
    syntaxHighlight: 'prism',
  },
  prefetch: true,
  site: process.env.BASE_PATH,
});
