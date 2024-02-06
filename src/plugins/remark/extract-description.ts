import type { Root } from 'mdast';
import { toString } from 'mdast-util-to-string';
import { EXIT, visit } from 'unist-util-visit';

import stripMacros from '../utils/strip-macros.js';

import createRemarkPlugin from './create-plugin.js';
import type { AstroFile } from './validate-astro-file.ts';

export default function extractDescription(tree: Root, file: AstroFile) {
  visit(tree, 'paragraph', (node) => {
    let text = toString(node).trim();
    // strip HTML from the text
    text = text.replaceAll(/<[^>]*>/g, '');
    // strip macros from the text
    text = stripMacros(text);
    if (text && !text.startsWith('<') && !text.startsWith('{{')) {
      file.data.astro.frontmatter.description = text;
      return [EXIT];
    }
    return;
  });
}

export const extractDescriptionPlugin = createRemarkPlugin(extractDescription);
