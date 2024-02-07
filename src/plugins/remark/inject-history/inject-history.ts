import type { Root } from 'mdast';

import getHistoryData from '../../utils/get-history-data.ts';
import type { AstroFile } from '../validate-astro-file.ts';

import getSubmodulePath from './get-submodule-path.ts';

export default function injectHistory(_tree: Root, file: AstroFile) {
  if (!file.path.includes('src/content/processed-content')) {
    // Only for translation files
    return;
  }
  const submodulePath = getSubmodulePath(file.path);
  if (!process.env.PATH_TO_LOCALIZED_CONTENT) {
    throw new Error('PATH_TO_LOCALIZED_CONTENT is not defined');
  }
  const { authors, modifiedTime, publishedTime } = getHistoryData(
    process.env.PATH_TO_LOCALIZED_CONTENT,
    submodulePath,
  );
  file.data.astro.frontmatter.authors = authors
    .toReversed()
    .filter((author, index, collection) => collection.indexOf(author) === index)
    .toReversed();
  file.data.astro.frontmatter.modifiedTime = modifiedTime;
  file.data.astro.frontmatter.publishedTime = publishedTime;
}
