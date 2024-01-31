import type { Root } from 'mdast';

import fixNolintLanguage from './fix-nolint-language.js';
import expandMacros from './macros/expand.js';

export default function transform(tree: Root) {
  expandMacros(tree);
  fixNolintLanguage(tree);
}
