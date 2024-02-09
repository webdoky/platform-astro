import type { Root } from 'mdast';
import { visit, type BuildVisitor, SKIP } from 'unist-util-visit';

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
        try {
          return macro(node, index, parent, tree, file);
        } catch (error) {
          if (!parent?.children || index === undefined) {
            throw error;
          }
          parent.children[index] = {
            code: `{{${node.name}(${node.parameters})}}`,
            type: 'brokenMacro',
            error: `${error}`,
          };
          return [SKIP, index];
        }
      },
    );
  }
  return applyMacro;
}
