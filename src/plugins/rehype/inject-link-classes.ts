import type { Element } from 'hast';
import type { Root } from 'hast';
import { visit } from 'unist-util-visit';

import hasPage from '../registry/has-page.js';
import initTranslatedRegistry from '../registry/init-translated-registry.ts';
import getSlugFromUrl from '../utils/get-slug-from-url.js';

const EXTERNAL_LINK_CLASS = 'wd-external';
const MISSING_LINK_CLASS = 'wd-nav-link-not-translated';

function getClassesByUrl(url: string): string[] {
  console.log('getClassesByUrl', url);
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
  await initTranslatedRegistry();

  visit(tree, 'element', (node: Element) => {
    if (node.tagName !== 'a') return;
    const url = node.properties?.href;
    if (typeof url !== 'string') return;
    console.log(node);
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
