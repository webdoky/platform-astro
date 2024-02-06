import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';
import type { Html } from 'mdast';

import makeMacroTree from '../make-macro-tree.js';
import unmakeMacroTree from '../unmake-macro-tree.js';

import brokenMacroToHast from './broken-macro-to-hast.js';
import macroToHast from './macro-to-hast.js';

export default function processHtml(node: Html) {
  const htmlTree = fromHtml(node.value);
  makeMacroTree(htmlTree);

  unmakeMacroTree(htmlTree, macroToHast, brokenMacroToHast);

  return toHtml(htmlTree);
}
