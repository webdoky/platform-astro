import type { RemarkPlugins } from 'astro';

import processDefinitionsPlugin from './definition-list/plugin.ts';
import { extractCoverPlugin } from './extract-cover.ts';
import { extractDescriptionPlugin } from './extract-description.ts';
import { extractSectionPlugin } from './extract-section.ts';
import { fixLocalImagesPlugin } from './fix-local-images.ts';
import { fixNolintLanguagePlugin } from './fix-nolint-language.ts';
import injectHistoryPlugin from './inject-history/index.ts';
import { injectLinkClassesPlugin } from './inject-link-classes.ts';
import expandMacrosPlugin from './macros/plugin.ts';
const remarkPlugins: RemarkPlugins = [
  // headings,
  // remarkFrontmatter,
  extractSectionPlugin,
  extractDescriptionPlugin,
  expandMacrosPlugin,
  injectLinkClassesPlugin,
  fixLocalImagesPlugin,
  extractCoverPlugin,
  fixNolintLanguagePlugin,
  processDefinitionsPlugin,
  injectHistoryPlugin,
];

export default remarkPlugins;
