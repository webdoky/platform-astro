import type { Root } from 'mdast';
import type { Node } from 'unist';
import type { BuildVisitor } from 'unist-util-visit';

import type { AstroFile } from '../validate-astro-file.ts';

export interface MacroNode extends Node {
  name: string;
  parameters: string[];
  type: 'macro';
}

export interface BrokenMacroNode extends Node {
  code: string;
  error: string;
  type: 'brokenMacro';
}

export interface AbstractMacroParentNode extends Node {
  children: MacroTreeNode[];
}

export type MacroTreeNode =
  | Node
  | AbstractMacroParentNode
  | MacroNode
  | BrokenMacroNode;

export type MacroFunction = (
  node: MacroNode,
  index: number,
  parent: AbstractMacroParentNode,
  tree: Root,
  file: AstroFile,
) => ReturnType<BuildVisitor<Root, 'macro'>>;
