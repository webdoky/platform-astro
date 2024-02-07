import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import astroSitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import astroCritters from 'astro-critters';
import icon from 'astro-icon';
import webmanifest from 'astro-webmanifest';
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
    webmanifest({
      /**
       * required
       **/
      name: 'WebDoky',

      /**
       * optional
       **/
      icon: 'assets/logo.png', // source for favicon & icons

      description: 'Ресурси та документація. Від розробників — для розробників',
      start_url: '/',
      theme_color: '#FFFFFF',
      background_color: '#FFFFFF',
      display: 'standalone',
      lang: 'uk-UA',
      categories: ['education'],
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
