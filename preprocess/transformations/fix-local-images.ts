import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

export default function fixLocalImages(tree: Root) {
  visit(tree, 'image', (node) => {
    if (
      node.url.startsWith('/') ||
      node.url.startsWith('http') ||
      node.url.startsWith('./')
    ) {
      return;
    }
    node.url = `./${node.url}`;
  });
}
