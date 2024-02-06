import { toHtml } from 'hast-util-to-html';
import type { Nodes } from 'mdast';
import { toHast } from 'mdast-util-to-hast';

export default function stringifyMdastToHtml(tree: Nodes) {
  if (tree.type === 'html') {
    return tree.value;
  }
  const hast = toHast(tree, { allowDangerousHtml: true });
  return toHtml(hast, { allowDangerousHtml: true });
}
