import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

import GithubSlugger from 'github-slugger';
import type {
  Blockquote,
  FootnoteDefinition,
  Heading,
  ListItem,
  Root,
} from 'mdast';
import { toString } from 'mdast-util-to-string';
import Mustache from 'mustache';
import { EXIT, visit } from 'unist-util-visit';

import getIdFromText from '../../../../../utils/get-id-from-text.ts';

const templateCode = readFileSync(
  './src/plugins/remark/macros/macros/EmbedLiveSample/sample.mustache',
  'utf8',
);
const slugger = new GithubSlugger();

Mustache.parse(templateCode);

export default function extractSample(
  sampleId: string,
  tree: Root,
  slug: string,
) {
  slugger.reset();
  let targetHeadingNode: Heading | undefined;
  let targetHeadingParent:
    | Root
    | Blockquote
    | FootnoteDefinition
    | ListItem
    | undefined;
  let targetHeadingIndex: number | undefined;
  visit(tree, 'heading', (node, index, parent) => {
    const text = toString(node);
    const slug = getIdFromText(text, slugger);
    if (slug === sampleId) {
      targetHeadingNode = node;
      targetHeadingParent = parent;
      targetHeadingIndex = index;
      return [EXIT];
    }
    return;
  });
  if (
    !targetHeadingNode ||
    !targetHeadingParent ||
    targetHeadingIndex === undefined
  ) {
    throw new Error(`Heading with id ${sampleId} not found`);
  }
  if (targetHeadingIndex + 1 === targetHeadingParent.children.length) {
    throw new Error('Empty section');
  }
  const css: string[] = [],
    js: string[] = [],
    html: string[] = [];

  for (
    let index = targetHeadingIndex + 1;
    index < targetHeadingParent.children.length;
    index++
  ) {
    const node = targetHeadingParent.children[index];
    if (!node) {
      throw new Error('Unexpected undefined node');
    }
    if (node.type === 'heading' && node.depth <= targetHeadingNode.depth) {
      break;
    }
    if (node.type !== 'code') {
      continue;
    }
    let lang = node.lang;
    if (!lang) {
      continue;
    }
    if (lang.endsWith('-nolint')) {
      lang = lang.slice(0, -'-nolint'.length);
    }
    switch (lang) {
      case 'css': {
        css.push(node.value);

        break;
      }
      case 'html': {
        html.push(node.value);

        break;
      }
      case 'js': {
        js.push(node.value);

        break;
      }
      // No default
    }
  }
  if (html.length === 0) {
    throw new Error('No HTML code found');
  }
  const sampleHtml = Mustache.render(templateCode, {
    css,
    html,
    js,
  });
  const sampleFolder = join(
    process.env.PRODUCTION ? 'dist' : 'public',
    process.env.TARGET_LOCALE || 'uk',
    'docs',
    slug,
  );
  mkdirSync(sampleFolder, { recursive: true });
  const samplePath = join(sampleFolder, `_sample_.${sampleId}.html`);
  writeFileSync(samplePath, sampleHtml);
}
