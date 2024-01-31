import type { Root } from 'mdast';
import { SKIP, visit } from 'unist-util-visit';

import brokenMacroToHtml from './broken-macro-to-html.js';
import macroToHtml from './macro-to-html.js';
import type {
  AbstractMacroParentNode,
  BrokenMacroNode,
  MacroNode,
} from './types.js';

export default function unmakeMacroTree(tree: Root) {
  visit(
    tree,
    'macro',
    (node: MacroNode, index, parent: AbstractMacroParentNode) => {
      //   console.log("macro", node);
      if (!parent?.children) {
        throw new Error("Parent or parent's children are undefined");
      }
      if (index === undefined) {
        throw new Error('Index is undefined');
      }
      const replacementNode = macroToHtml(node);
      parent.children.splice(index, 1, replacementNode);
      return [SKIP, index + 1];
    },
  );

  visit(
    tree,
    'brokenMacro',
    (node: BrokenMacroNode, index, parent: AbstractMacroParentNode) => {
      //   console.log("brokenMacro", node);
      if (!parent?.children) {
        throw new Error("Parent or parent's children are undefined");
      }
      if (index === undefined) {
        throw new Error('Index is undefined');
      }
      const replacementNode = brokenMacroToHtml(node);
      parent.children.splice(index, 1, replacementNode);
      return [SKIP, index + 1];
    },
  );
}
