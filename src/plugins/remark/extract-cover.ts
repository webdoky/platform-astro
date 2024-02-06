import { resolve } from 'node:path';

import type { Root } from 'mdast';
import { EXIT, visit } from 'unist-util-visit';

import createRemarkPlugin from './create-plugin.js';
import { type AstroFile } from './validate-astro-file.js';

export default function extractCover(tree: Root, astroFile: AstroFile) {
  visit(tree, 'image', (node) => {
    if (!astroFile.dirname) {
      throw new Error('astroFile.dirname is required');
    }
    const source = resolve(astroFile.dirname, node.url);
    const alt = node.alt;
    // console.log(source, alt);
    if (source) {
      astroFile.data.astro.frontmatter.cover = source;
      if (alt) {
        astroFile.data.astro.frontmatter.coverAlt = alt;
      }
      return [EXIT];
    }
    return;
  });
}

export const extractCoverPlugin = createRemarkPlugin(extractCover);
