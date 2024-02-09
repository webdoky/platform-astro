import type { Root } from 'mdast';
import { visit, type BuildVisitor } from 'unist-util-visit';

import type { AstroFile } from '../validate-astro-file.ts';

import type { AbstractMacroParentNode, MacroNode } from './types.ts';

export default function createMacro(
  macroName: string,
  macro: (
    node: MacroNode,
    index: number,
    parent: AbstractMacroParentNode,
    tree: Root,
    file: AstroFile,
  ) => ReturnType<BuildVisitor<Root, 'macro'>>,
) {
  function applyMacro(tree: Root, file: AstroFile) {
    visit(
      tree,
      'macro',
      (node: MacroNode, index, parent: AbstractMacroParentNode) => {
        if (node.name !== macroName) return;
        if (!parent) throw new Error('Parent is undefined');
        if (index === undefined) throw new Error('Index is undefined');
        return macro(node, index, parent, tree, file);
      },
    );
  }
  return applyMacro;
}
