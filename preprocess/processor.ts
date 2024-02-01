import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';

import processDefinitionsPlugin from './transformations/definition-list/plugin.js';
import { fixLocalImagesPlugin } from './transformations/fix-local-images.js';
import { fixNolintLanguagePlugin } from './transformations/fix-nolint-language.js';
import expandMacrosPlugin from './transformations/macros/plugin.js';

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(expandMacrosPlugin)
  .use(fixLocalImagesPlugin)
  .use(fixNolintLanguagePlugin)
  .use(processDefinitionsPlugin)
  .use(remarkStringify);

export default processor;
