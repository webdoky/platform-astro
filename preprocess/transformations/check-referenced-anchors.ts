import type { Root } from 'hast';
import { visit } from 'unist-util-visit';
import type { VFile } from 'vfile';
import { z } from 'zod';

import hasAnchor, { initAnchorsRegistry } from '../registry/has-anchor.js';
import hasPage from '../registry/has-page.js';
import { initRegistry } from '../registry/registry.js';
import getAnchorsFromTree from '../utils/get-anchors-from-tree.js';

import getSlugFromUrl from './utils/get-slug-from-url.js';

const stringSchema = z.optional(z.string());

export default async function checkReferencedAnchors(tree: Root, file: VFile) {
  await initRegistry();
  await initAnchorsRegistry();
  console.log('checkReferencedAnchors');
  const currentPageSlugs = getAnchorsFromTree(tree);
  const BASE_PATH = process.env.BASE_PATH;
  if (!BASE_PATH) {
    throw new Error('BASE_PATH is not defined');
  }
  visit(tree, 'element', (node) => {
    if (node.tagName !== 'a') return;
    const url = stringSchema.parse(node.properties?.href);
    if (
      !url ||
      !url.includes('#') ||
      (url.startsWith('http') && !url.startsWith(BASE_PATH))
    ) {
      return;
    }
    const [baseUrl, anchor] = url.split('#');
    if (baseUrl) {
      const slug = getSlugFromUrl(baseUrl);
      if (slug && hasPage(slug) && !hasAnchor(slug, anchor)) {
        console.warn(
          `Referenced anchor "${anchor}" not found in slug "${slug}"`,
        );
      }
    } else {
      if (!currentPageSlugs.has(anchor)) {
        console.warn(`Referenced anchor "${anchor}" not found on ${file.cwd}`);
      }
    }
  });
}

export function checkReferencedAnchorsPlugin() {
  return checkReferencedAnchors;
}
