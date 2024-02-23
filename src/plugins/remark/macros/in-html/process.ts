import { fromHtml } from 'hast-util-from-html';
import { toHtml } from 'hast-util-to-html';
import type { Html, Root } from 'mdast';
import { SKIP, visit } from 'unist-util-visit';

import type { AstroFile } from '../../validate-astro-file.ts';
import MACROS from '../macros/index.ts';
import makeMacroTree from '../make-macro-tree.js';
import type {
  AbstractMacroParentNode,
  BrokenMacroNode,
  MacroNode,
} from '../types.ts';
import unmakeMacroTree from '../unmake-macro-tree.js';

import brokenMacroToHast from './broken-macro-to-hast.js';
import macroToHast from './macro-to-hast.js';

export default function processHtml(node: Html, file: AstroFile) {
  const htmlTree = fromHtml(node.value);
  makeMacroTree(htmlTree);

  visit(
    htmlTree,
    'macro',
    (node: MacroNode, index: number, parent: AbstractMacroParentNode) => {
      try {
        // console.log('macro', node.name);
        const macro = MACROS[node.name.toLowerCase()];
        if (macro) {
          return macro(node, index, parent, htmlTree as Root, file);
        } else {
          console.warn(`Unknown macro: ${node.name}`);
        }
      } catch (error) {
        console.error(error);
        parent.children[index] = {
          code: `${node.name}(${node.parameters.join(', ')})`,
          error: `${error}`,
          type: 'brokenMacro',
        } satisfies BrokenMacroNode;
        return [SKIP, index];
      }
    },
  );

  unmakeMacroTree(htmlTree, macroToHast, brokenMacroToHast);

  // Trick to fix html nodes in html tree
  visit(htmlTree, 'html', (node: Html, index, parent) => {
    if (!parent || !(parent as any).children) {
      throw new Error('Parent node is not defined');
    }
    if (index === undefined) {
      throw new Error('Index is not defined');
    }
    const replacement = fromHtml(node.value).children;
    (parent as any).children.splice(index, 1, ...replacement);
    return [SKIP, index];
  });

  return toHtml(htmlTree);
}
