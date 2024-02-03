import type { Root, Yaml } from 'mdast';
import { EXIT, visit } from 'unist-util-visit';

import setFrontmatterField from './utils/set-frontmatter-field.js';

export default function extractCover(tree: Root) {
  const frontmatterNode = tree.children.find(
    (node) => node.type === 'yaml',
  ) as Yaml;
  if (!frontmatterNode) {
    console.warn('No frontmatter found');
    return;
  }

  visit(tree, 'image', (node) => {
    const source = node.url;
    const alt = node.alt;
    if (source) {
      setFrontmatterField(frontmatterNode, 'cover', source);
      if (alt) {
        setFrontmatterField(frontmatterNode, 'coverAlt', alt);
      }
      return [EXIT];
    }
    return;
  });
}

export function extractCoverPlugin() {
  return extractCover;
}
