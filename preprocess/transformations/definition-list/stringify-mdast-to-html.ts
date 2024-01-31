import { toHtml } from 'hast-util-to-html';
import type { Nodes } from 'mdast';
import { toHast } from 'mdast-util-to-hast';

export default function stringifyMdastToHtml(tree: Nodes) {
  const hast = toHast(tree);
  return toHtml(hast);
}
