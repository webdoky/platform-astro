import type { List, ListItem, Literal, Parent, Root } from 'mdast';
import { SKIP, visit } from 'unist-util-visit';
export const DEFINITION_PREFIX = ': ';

import isDefinitionList from '../../../utils/is-definition-list.js';

import type {
  DefinitionDataNode,
  DefinitionListNode,
  DefinitionTermNode,
} from './types.js';

export default function parseDefinitions(tree: Root) {
  visit(tree, 'list', (node: List, index, parent) => {
    if (!parent || !parent.children) {
      throw new Error('Parent node is not defined');
    }
    if (index === undefined) {
      throw new Error('Index is not defined');
    }
    if (!isDefinitionList(node)) {
      return;
    }
    const children = node.children.flatMap<
      DefinitionTermNode | DefinitionDataNode,
      undefined
    >((listItem: ListItem) => {
      if (listItem.children.length === 0) {
        return [];
      }
      const terms = listItem.children.slice(0, -1);
      const definition = (listItem.children.at(-1) as List).children[0];
      if (!definition) {
        throw new Error('Definition is not defined');
      }
      const [paragraph, ...rest]: Parent[] = definition.children as Parent[];
      if (!paragraph || paragraph.type !== 'paragraph') {
        throw new Error('Definition term is not a paragraph');
      }
      (paragraph.children[0] as Literal).value = (
        paragraph.children[0] as Literal
      ).value.slice(DEFINITION_PREFIX.length);

      return [
        {
          type: 'definitionTerm',
          children:
            terms.length > 0 && terms[0] && terms[0].type == 'paragraph'
              ? terms[0].children
              : terms,
        },
        {
          type: 'definitionData',
          children: [paragraph, ...rest],
        },
      ];
    });
    const replacementNode: DefinitionListNode = {
      type: 'definitionList',
      children,
    };
    parent.children[index] = replacementNode as unknown as List;
    return [SKIP, index + 1];
  });
}
