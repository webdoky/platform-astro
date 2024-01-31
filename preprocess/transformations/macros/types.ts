import type { Node } from 'mdast';

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
