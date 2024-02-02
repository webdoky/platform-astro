import type { Element } from 'hast';
import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';
import type { Html, Root } from 'mdast';
import { SKIP, visit } from 'unist-util-visit';

import stringifyMdastToHtml from './definition-list/stringify-mdast-to-html.js';

function injectLinkClassesIntoHtml(node: Html) {
  const htmlTree = fromHtml(node.value);
  visit(
    htmlTree,
    // (node) => node.type === 'element' && node.tagName === 'a',
    'element',
    (node: Element) => {
      if (node.tagName !== 'a') return;
      const url = node.properties?.href;
      if (typeof url !== 'string') return;
      const isInternal = url.startsWith('/');
      if (!isInternal) {
        node.properties.target = '_blank';
        node.properties.rel = 'noopener noreferrer';
        node.properties.class = ['wd-external'];
      }
    },
  );
  node.value = toHtml(htmlTree);
}

export default function injectLinkClasses(tree: Root) {
  visit(tree, 'html', injectLinkClassesIntoHtml);

  visit(tree, 'link', (node, index, parent) => {
    if (node.url && !node.url.startsWith('/')) {
      if (!parent) throw new Error('Parent not found');
      if (index === undefined) throw new Error('Index not found');
      const replacement: Html = {
        type: 'html',
        value: `<a href="${node.url}" target="_blank" rel="noopener noreferrer" class="wd-external">${node.children.map((child) => stringifyMdastToHtml(child)).join('')}</a>`,
      };
      parent.children.splice(index, 1, replacement);
      return [SKIP, index];
    }
    return;
  });
}

export function injectLinkClassesPlugin() {
  return injectLinkClasses;
}
