import { join } from 'node:path';

import { read } from 'to-vfile';
import { matter } from 'vfile-matter';

import walk from '../utils/walk-async.js';

import { rawPageSchema, type RawPage } from './validation.js';

export async function initRegistry(
  registry: Map<string, RawPage>,
  pathToContent: string,
  locale: string,
) {
  if (registry.size > 0) {
    return;
  }
  await walk(join(pathToContent, 'files', locale), async (filePath) => {
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
  });
}
