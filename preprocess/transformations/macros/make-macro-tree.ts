import type { Literal, Parent } from 'unist';
import { SKIP, visit } from 'unist-util-visit';

import extractMacrosFromText from './extract-macros-from-text.js';
import type { MacroTreeNode } from './types.js';

export default function makeMacroTree<T extends Parent>(tree: T) {
  visit<MacroTreeNode, (node: MacroTreeNode) => boolean>(
    tree,
    (node: MacroTreeNode) => {
      if (node.type === 'text') {
        return `${(node as Literal).value}`.includes('{{');
      }
      return false;
    },
    (node, index, parent) => {
      if (!parent?.children) {
        throw new Error("Parent or parent's children are undefined");
      }
      if (index === undefined) {
        throw new Error('No index for replacement');
      }
      //   console.log("parse", node);
      const nodeLiteral = node as Literal;
      const replacementNodes = extractMacrosFromText(`${nodeLiteral.value}`);
      // console.log(replacementNodes);
      parent.children.splice(index, 1, ...replacementNodes);
      return [SKIP, index + replacementNodes.length];
    },
  );
}
