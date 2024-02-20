import type { Root } from 'mdast';
import { SKIP, visit } from 'unist-util-visit';

import { initRegistry } from '../../registry/registry.ts';
import { type AstroFile } from '../validate-astro-file.ts';

import brokenMacroToHtml from './broken-macro-to-html.js';
import processHtml from './in-html/process.js';
import macroToHtml from './macro-to-html.js';
import MACROS from './macros/index.ts';
import makeMacroTree from './make-macro-tree.js';
import type {
  AbstractMacroParentNode,
  BrokenMacroNode,
  MacroNode,
} from './types.ts';
import unmakeMacroTree from './unmake-macro-tree.js';

export default async function expandMacros(tree: Root, file: AstroFile) {
  await initRegistry();
  visit(tree, 'html', (node) => {
    node.value = processHtml(node);
  });
  makeMacroTree(tree);

  visit(
    tree,
    'macro',
    (node: MacroNode, index: number, parent: AbstractMacroParentNode) => {
      try {
        const macro = MACROS[node.name];
        if (macro) {
          return macro(node, index, parent, tree, file);
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

  unmakeMacroTree(tree, macroToHtml, brokenMacroToHtml);
}
