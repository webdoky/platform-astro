import { join } from 'node:path';

import { read } from 'to-vfile';
import { matter } from 'vfile-matter';

import walk from '../utils/walk-async.js';

import { rawPageSchema, type RawPage } from './validation.js';

const registry = new Map<string, RawPage>();

export default registry;

export async function initRegistry() {
  if (registry.size > 0) {
    return;
  }
  const PATH_TO_LOCALIZED_CONTENT = process.env.PATH_TO_LOCALIZED_CONTENT;
  if (!PATH_TO_LOCALIZED_CONTENT) {
    throw new Error('process.env.PATH_TO_LOCALIZED_CONTENT is not defined');
  }
  if (!process.env.TARGET_LOCALE) {
    throw new Error('process.env.TARGET_LOCALE is not defined');
  }
  await walk(
    join(PATH_TO_LOCALIZED_CONTENT, 'files', process.env.TARGET_LOCALE),
    async (filePath) => {
      if (!filePath.endsWith('/index.md')) {
        return;
      }
      // console.log(filePath);
      const markdownFile = await read(filePath);

      // console.log(markdownFile);
      matter(markdownFile);
      // console.log(markdownFile.data.matter);
      const data = {
        ...rawPageSchema.parse(markdownFile.data.matter),
        filePath: filePath,
      };
      registry.set(data.slug, data);
    },
  );
}
