import type { Node } from 'mdast';

export interface DefinitionDataNode extends Node {
  children: Node[];
  type: 'definitionData';
}
export interface DefinitionTermNode extends Node {
  children: Node[];
  type: 'definitionTerm';
}

export interface DefinitionListNode<
  T extends Node = DefinitionDataNode | DefinitionTermNode,
> extends Node {
  children: T[];
}

export interface AbstractDefinitionParentNode extends Node {
  children: DefinitionTreeNode[];
}

export type DefinitionTreeNode =
  | Node
  | AbstractDefinitionParentNode
  | DefinitionDataNode
  | DefinitionTermNode
  | DefinitionListNode;
