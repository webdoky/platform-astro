import GithubSlugger from 'github-slugger';
import type { Root } from 'hast';
import { headingRank } from 'hast-util-heading-rank';
import { toString } from 'hast-util-to-string';
import { visit } from 'unist-util-visit';

import getIdFromText from '../../utils/get-id-from-text.js';

const slugger = new GithubSlugger();

export default function injectHeadingSlugs(tree: Root) {
  // console.log('injectHeadingSlugs');
  slugger.reset();

  visit(tree, 'element', function (node) {
    if (headingRank(node) && !node.properties.id) {
      let text = toString(node);
      node.properties.id = getIdFromText(text, slugger);
    }
  });
}

export function injectHeadingSlugsPlugin() {
  return injectHeadingSlugs;
}
