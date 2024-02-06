import type { Node } from 'unist';
import { SKIP, visit } from 'unist-util-visit';

import type { BrokenMacroNode, MacroNode, MacroTreeNode } from './types.js';

export default function unmakeMacroTree<
  T extends { children: MacroTreeNode[] } & Node,
>(
  tree: T,
  renderMacroNode: (node: MacroNode) => Node,
  renderBrokenMacroNode: (node: BrokenMacroNode) => Node,
) {
  visit(tree, 'macro', (node: MacroNode, index, parent) => {
    //   console.log("macro", node);
    if (!parent?.children) {
      throw new Error("Parent or parent's children are undefined");
    }
    if (index === undefined) {
      throw new Error('Index is undefined');
    }
    parent.children.splice(index, 1, renderMacroNode(node));
    return [SKIP, index + 1];
  });

  visit(tree, 'brokenMacro', (node: BrokenMacroNode, index, parent) => {
    //   console.log("brokenMacro", node);
    if (!parent?.children) {
      throw new Error("Parent or parent's children are undefined");
    }
    if (index === undefined) {
      throw new Error('Index is undefined');
    }
    parent.children.splice(index, 1, renderBrokenMacroNode(node));
    return [SKIP, index + 1];
  });
}
