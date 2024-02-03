import cyrillicToTranslit from 'cyrillic-to-translit-js/CyrillicToTranslit.js';
import GithubSlugger from 'github-slugger';
import type { Parent, Root } from 'hast';
import { headingRank } from 'hast-util-heading-rank';
import { toString } from 'hast-util-to-string';
import { visit } from 'unist-util-visit';

const slugger = new GithubSlugger();
const CYRILLIC_REGEXP = /[ІЇА-яії]/;
const ukrainianCyrillicToTranslit = (cyrillicToTranslit as any)({
  preset: 'uk',
});

function hasUkrainianCyrillic(text: string) {
  return CYRILLIC_REGEXP.test(text);
}

export default function injectHeadingSlugs(tree: Root) {
  slugger.reset();

  visit(tree, 'element', function (node) {
    if (headingRank(node) && !node.properties.id) {
      let text = toString(node);
      if (hasUkrainianCyrillic(text)) {
        text = ukrainianCyrillicToTranslit.transform(text);
      }
      node.properties.id = slugger.slug(text);
    }
  });
}

export function injectHeadingSlugsPlugin() {
  return injectHeadingSlugs;
}
