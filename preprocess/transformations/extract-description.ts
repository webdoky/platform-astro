import type { Root, Yaml } from 'mdast';
import { toString } from 'mdast-util-to-string';
import { EXIT, visit } from 'unist-util-visit';

import setFrontmatterField from './utils/set-frontmatter-field.js';
import stripMacros from './utils/strip-macros.js';

export default function extractDescription(tree: Root) {
  const frontmatterNode = tree.children.find(
    (node) => node.type === 'yaml',
  ) as Yaml;
  if (!frontmatterNode) {
    console.warn('No frontmatter found');
    return;
  }

  visit(tree, 'paragraph', (node) => {
    let text = toString(node).trim();
    // strip HTML from the text
    text = text.replaceAll(/<[^>]*>/g, '');
    // strip macros from the text
    text = stripMacros(text);
    if (text && !text.startsWith('<') && !text.startsWith('{{')) {
      setFrontmatterField(frontmatterNode, 'description', text);
      return [EXIT];
    }
    return;
  });
}

export function extractDescriptionPlugin() {
  return extractDescription;
}
