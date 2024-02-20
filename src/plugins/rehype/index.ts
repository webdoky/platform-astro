import type { RehypePlugins } from 'astro';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeRaw from 'rehype-raw';

import { checkReferencedAnchorsPlugin } from './check-referenced-anchors.ts';
import { injectDtIdsPlugin } from './inject-dt-ids.ts';
import { injectHeadingSlugsPlugin } from './inject-heading-slugs.ts';
import { injectLinkClassesPlugin } from './inject-link-classes.ts';

const rehypePlugins: RehypePlugins = [
  injectHeadingSlugsPlugin,
  [rehypeAutolinkHeadings, { behavior: 'append' }],
  rehypeRaw,
  injectLinkClassesPlugin,
  injectDtIdsPlugin,
  checkReferencedAnchorsPlugin,
];

export default rehypePlugins;
