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

export interface AbstractParentNode extends Node {
  children: CustomNode[];
}

export type CustomNode =
  | Node
  | AbstractParentNode
  | MacroNode
  | BrokenMacroNode;
