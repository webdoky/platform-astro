import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

import { initRegistry } from '../../registry/registry.ts';
import { type AstroFile } from '../validate-astro-file.ts';

import brokenMacroToHtml from './broken-macro-to-html.js';
import processHtml from './in-html/process.js';
import macroToHtml from './macro-to-html.js';
import jsSidebar from './macros/jsSidebar/jsSidebar.ts';
import makeMacroTree from './make-macro-tree.js';
import unmakeMacroTree from './unmake-macro-tree.js';

export default async function expandMacros(tree: Root, file: AstroFile) {
  await initRegistry();
  visit(tree, 'html', (node) => {
    node.value = processHtml(node);
  });
  makeMacroTree(tree);

  jsSidebar(tree, file);

  unmakeMacroTree(tree, macroToHtml, brokenMacroToHtml);
}
