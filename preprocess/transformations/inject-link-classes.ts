import type { Element } from 'hast';
import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';
import type { Html, Root } from 'mdast';
import { SKIP, visit } from 'unist-util-visit';

import hasPage from '../registry/has-page.js';
import { initRegistry } from '../registry/registry.js';

import stringifyMdastToHtml from './definition-list/stringify-mdast-to-html.js';
import getSlugFromUrl from './utils/get-slug-from-url.js';

const EXTERNAL_LINK_CLASS = 'wd-external';
const MISSING_LINK_CLASS = 'wd-nav-link-not-translated';

function getClassesByUrl(url: string): string[] {
  console.log('getClassesByUrl', url);
  if (url.startsWith('#')) {
    return [];
  }
  if (url.startsWith('http')) {
    console.log('external');
    return [EXTERNAL_LINK_CLASS];
  }
  const slug = getSlugFromUrl(url);
  console.log(slug);
  const isPresent = hasPage(slug);
  if (!isPresent) {
    console.log('missing');
    return [MISSING_LINK_CLASS];
  }
  return [];
}

function injectLinkClassesIntoHtml(node: Html) {
  const htmlTree = fromHtml(node.value);
  visit(htmlTree, 'element', (node: Element) => {
    if (node.tagName !== 'a') return;
    const url = node.properties?.href;
    if (typeof url !== 'string') return;
    const classes = getClassesByUrl(url);
    node.properties.class = classes.join(' ');
    if (classes.includes(EXTERNAL_LINK_CLASS)) {
      node.properties.target = '_blank';
      node.properties.rel = 'noopener noreferrer';
    }
  });
  node.value = toHtml(htmlTree);
}

export default async function injectLinkClasses(tree: Root) {
  await initRegistry();
  visit(tree, 'html', injectLinkClassesIntoHtml);

  visit(tree, 'link', (node, index, parent) => {
    if (!node.url) {
      return;
    }
    if (!parent) throw new Error('Parent not found');
    if (index === undefined) throw new Error('Index not found');
    const classes = getClassesByUrl(node.url);
    const replacement: Html = {
      type: 'html',
      value: `<a href="${node.url}"${classes.includes(EXTERNAL_LINK_CLASS) ? ' target="_blank"' : ''}${classes.includes(EXTERNAL_LINK_CLASS) ? ' rel="noopener noreferrer"' : ''} class="${classes.join(' ')}">${node.children.map((child) => stringifyMdastToHtml(child)).join('')}</a>`,
    };
    parent.children.splice(index, 1, replacement);
    return [SKIP, index];
  });
  // process.exit(0);
}

export function injectLinkClassesPlugin() {
  return injectLinkClasses;
}
