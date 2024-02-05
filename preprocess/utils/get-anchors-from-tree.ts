import type { Root } from 'hast';
import { visit } from 'unist-util-visit';

export default function getAnchorsFromTree(tree: Root): Set<string> {
  const anchors = new Set<string>();
  visit(tree, 'element', (node) => {
    if (!node.properties?.id) return;
    anchors.add(`${node.properties.id}`);
  });
  return anchors;
}
