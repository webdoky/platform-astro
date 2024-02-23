import partytown from '@astrojs/partytown';
import react from '@astrojs/react';
import astroSitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import type { AstroIntegration } from 'astro';
import astroCritters from 'astro-critters';
import icon from 'astro-icon';
import webmanifest from 'astro-webmanifest';
import { defineConfig } from 'astro/config';
import astroServiceWorker from 'astrojs-service-worker';
import { config as dotenvConfig } from 'dotenv';

import { initAnchorsRegistry } from './src/plugins/registry/has-anchor.ts';
import initOriginalRegistry from './src/plugins/registry/init-original-registry.ts';
import initTranslatedRegistry from './src/plugins/registry/init-translated-registry.ts';
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
    {
      hooks: {
        'astro:config:done': async () => {
          await initTranslatedRegistry();
          await initOriginalRegistry();
          await initAnchorsRegistry();
        },
      },
      name: 'init',
    } satisfies AstroIntegration,
  ],
  markdown: {
    rehypePlugins: rehypePlugins,
    remarkPlugins: remarkPlugins,
    smartypants: false,
    syntaxHighlight: 'prism',
  },
  prefetch: true,
  site: process.env.BASE_PATH,
});
