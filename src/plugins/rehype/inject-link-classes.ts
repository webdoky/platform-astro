import type { Element } from 'hast';
import type { Root } from 'hast';
import { visit } from 'unist-util-visit';

import hasPage from '../registry/has-page.js';
import { initRegistry } from '../registry/registry.js';
import getSlugFromUrl from '../utils/get-slug-from-url.js';

const EXTERNAL_LINK_CLASS = 'wd-external';
const MISSING_LINK_CLASS = 'wd-nav-link-not-translated';

function getClassesByUrl(url: string): string[] {
  if (url.startsWith('#')) {
    return [];
  }
  if (url.startsWith('http')) {
    return [EXTERNAL_LINK_CLASS];
  }
  const slug = getSlugFromUrl(url);
  if (slug === '') {
    // Link to the root
    return [];
  }
  const isPresent = hasPage(slug);
  if (!isPresent) {
    return [MISSING_LINK_CLASS];
  }
  return [];
}

export default async function injectLinkClasses(tree: Root) {
  await initRegistry();

  visit(tree, 'element', (node: Element) => {
    if (node.tagName !== 'a') return;
    const url = node.properties?.href;
    if (typeof url !== 'string') return;
    const classes = getClassesByUrl(url);
    node.properties.class = classes.join(' ');
    if (classes.includes(EXTERNAL_LINK_CLASS)) {
      node.properties.target = '_blank';
      node.properties.rel = 'noopener noreferrer';
      node.properties['data-astro-prefetch'] = 'false';
    }
  });
}

export function injectLinkClassesPlugin() {
  return injectLinkClasses;
}
