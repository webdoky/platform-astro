import type { Props as AstroSeoProperties } from 'astro-seo';

import appleTouchIcon from '../assets/apple-touch-icon.png';
import favicon16 from '../assets/favicon-16x16.png';
import favicon32 from '../assets/favicon-32x32.png';
import safariPinnedTab from '../assets/safari-pinned-tab.svg';

const defaultMeta: AstroSeoProperties['extend'] = {
  link: [
    {
      rel: 'apple-touch-icon',
      sizes: ['180x180'] as any,
      href: appleTouchIcon.src,
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: ['32x32'] as any,
      href: favicon32.src,
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: ['16x16'] as any,
      href: favicon16.src,
    },
    {
      rel: 'manifest',
      href: '/site.webmanifest',
    },
    {
      rel: 'mask-icon',
      href: safariPinnedTab.src,
      color: '#5bbad5',
    } as any,
  ],
  meta: [
    {
      name: 'msapplication-TileColor',
      content: '#da532c',
    },
    {
      name: 'theme-color',
      content: '#ffffff',
    },
  ],
};

export default defaultMeta;
