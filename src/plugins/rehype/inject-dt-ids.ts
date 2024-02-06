import GithubSlugger from 'github-slugger';
import type { Root } from 'hast';
import { toString } from 'hast-util-to-string';
import { visit } from 'unist-util-visit';

import getIdFromText from '../../utils/get-id-from-text.ts';
const slugger = new GithubSlugger();

export default function injectDtIds(tree: Root) {
  console.log('injectDtIds');
  slugger.reset();
  visit(tree, 'element', function (node) {
    if (node.tagName !== 'dt') {
      return;
    }
    const text = toString(node);
    const id = getIdFromText(text, slugger);
    node.properties.id = id;
  });
}

export function injectDtIdsPlugin() {
  return injectDtIds;
}
