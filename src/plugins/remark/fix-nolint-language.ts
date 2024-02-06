import type { Root } from 'mdast';
import { visit } from 'unist-util-visit';

export default function fixNolintLanguage(tree: Root) {
  visit(tree, 'code', (node) => {
    if (!node.lang) {
      return;
    }
    node.lang = node.lang.replace('-nolint', '');
  });
}

export function fixNolintLanguagePlugin() {
  return fixNolintLanguage;
}
