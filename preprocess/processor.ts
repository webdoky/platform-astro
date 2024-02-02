import remarkFrontmatter from 'remark-frontmatter';
import remarkParse from 'remark-parse';
import remarkStringify from 'remark-stringify';
import { unified } from 'unified';

import processDefinitionsPlugin from './transformations/definition-list/plugin.js';
import { extractCoverPlugin } from './transformations/extract-cover.js';
import { extractDescriptionPlugin } from './transformations/extract-description.js';
import { extractSectionPlugin } from './transformations/extract-section.js';
import { fixLocalImagesPlugin } from './transformations/fix-local-images.js';
import { fixNolintLanguagePlugin } from './transformations/fix-nolint-language.js';
import expandMacrosPlugin from './transformations/macros/plugin.js';

const processor = unified()
  .use(remarkParse)
  .use(remarkFrontmatter)
  .use(extractSectionPlugin)
  .use(extractDescriptionPlugin)
  .use(expandMacrosPlugin)
  .use(fixLocalImagesPlugin)
  .use(extractCoverPlugin)
  .use(fixNolintLanguagePlugin)
  .use(processDefinitionsPlugin)
  .use(remarkStringify);

export default processor;
