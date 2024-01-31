import type { Root } from 'mdast';

import makeMacroTree from './make-macro-tree.js';
import unmakeMacroTree from './unmake-macro-tree.js';

export default function expandMacros(tree: Root) {
  makeMacroTree(tree);

  unmakeMacroTree(tree);
}
