// import { createHash } from 'node:crypto';

import type { Html, Paragraph, Parent, Root } from 'mdast';
import { SKIP, visit } from 'unist-util-visit';

import stringifyMdastToHtml from './stringify-mdast-to-html.js';
import {
  AbstractDefinitionParentNode,
  DefinitionDataNode,
  DefinitionListNode,
  DefinitionTermNode,
} from './types.js';

export default function expandDefinitions(tree: Root) {
  // const data = JSON.stringify(tree, undefined, 2);
  // const identity = createHash('sha256').update(data).digest('hex');
  // saveData('expandDefinitions', 'input', tree, identity);
  visit<AbstractDefinitionParentNode, 'definitionData'>(
    tree,
    'definitionData',
    (node: DefinitionDataNode, index, parent) => {
      if (!parent || !parent.children) {
        throw new Error('Parent node is not defined');
      }
      if (index === undefined) {
        throw new Error('Index is not defined');
      }
      // console.log('definitionData', node);
      const replacementNode: Html = {
        type: 'html',
        value: `<dd>${node.children.map((child) => stringifyMdastToHtml(child as Paragraph)).join('')}</dd>`,
      };
      parent.children[index] = replacementNode;
      return [SKIP, index + 1];
    },
  );
  visit<AbstractDefinitionParentNode, 'definitionTerm'>(
    tree,
    'definitionTerm',
    (node: DefinitionTermNode, index, parent) => {
      if (!parent || !parent.children) {
        throw new Error('Parent node is not defined');
      }
      if (index === undefined) {
        throw new Error('Index is not defined');
      }
      // console.log('definitionTerm', node);
      const replacementNode: Html = {
        type: 'html',
        value: `<dt>${node.children.map((child) => stringifyMdastToHtml(child as Paragraph)).join('')}</dt>`,
      };
      parent.children[index] = replacementNode;
      return [SKIP, index + 1];
    },
  );

  visit<AbstractDefinitionParentNode, 'definitionList'>(
    tree,
    'definitionList',
    (node: DefinitionListNode<Html>, index, parent: Parent) => {
      if (!parent || !parent.children) {
        throw new Error('Parent node is not defined');
      }
      if (index === undefined) {
        throw new Error('Index is not defined');
      }
      // console.log('definitionList', node);
      const replacementNode: Html = {
        type: 'html',
        value: `<dl>${node.children.map((child) => child.value).join('')}</dl>`,
      };
      parent.children[index] = replacementNode;
      return [SKIP, index + 1];
    },
  );
}
