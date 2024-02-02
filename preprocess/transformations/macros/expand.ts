import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

import brokenMacroToHtml from './broken-macro-to-html.js';
import processHtml from './in-html/process.js';
import macroToHtml from './macro-to-html.js';
import makeMacroTree from './make-macro-tree.js';
import unmakeMacroTree from './unmake-macro-tree.js';

export default function expandMacros(tree: Root) {
  visit(tree, 'html', (node) => {
    node.value = processHtml(node);
  });
  makeMacroTree(tree);

  unmakeMacroTree(tree, macroToHtml, brokenMacroToHtml);
}
