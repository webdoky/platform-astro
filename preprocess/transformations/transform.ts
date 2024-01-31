import type { Root } from 'mdast';

import processDefinitions from './definition-list/process-definitions.js';
import fixLocalImages from './fix-local-images.js';
import fixNolintLanguage from './fix-nolint-language.js';
import expandMacros from './macros/expand.js';

export default function transform(tree: Root) {
  fixLocalImages(tree);
  expandMacros(tree);
  fixNolintLanguage(tree);
  processDefinitions(tree);
}
