import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import astroSitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import astroCritters from 'astro-critters';
import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import astroServiceWorker from 'astrojs-service-worker';
import { config as dotenvConfig } from 'dotenv';

import rehypePlugins from './src/plugins/rehype/index.ts';
import remarkPlugins from './src/plugins/remark/index.ts';
import serializeSitemapItem from './src/plugins/sitemap.ts';
dotenvConfig();

// https://astro.build/config
export default defineConfig({
  // compressHTML: false,
  integrations: [
    import.meta.env.MODE === 'production' ? astroServiceWorker() : undefined,
    astroSitemap({
      serialize: serializeSitemapItem,
    }),
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
    icon(),
  ],
  markdown: {
    rehypePlugins: rehypePlugins,
    remarkPlugins: remarkPlugins,
    syntaxHighlight: 'prism',
  },
  prefetch: true,
  site: process.env.BASE_PATH,
});
