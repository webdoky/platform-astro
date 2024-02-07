import { join } from 'node:path';

import type { SitemapItem } from '@astrojs/sitemap';

import getHistoryData from './utils/get-history-data.ts';

function getSubmodulePath(slug: string) {
  if (!process.env.TARGET_LOCALE) {
    throw new Error('TARGET_LOCALE is not defined');
  }
  return join(
    'files',
    process.env.TARGET_LOCALE,
    slug
      .toLowerCase()
      .replace('::', '_doublecolon_')
      .replace(':', '_colon_')
      .replace('*', '_star_'),
    'index.md',
  );
}

export default function serializeSitemapItem(item: SitemapItem) {
  // item.url = item.url.replace('docs/docs', 'docs');
  console.log('serialize', item.url);
  if (!item.url.includes(`/${process.env.TARGET_LOCALE}/docs`)) {
    return item;
  }
  const [, slug] = item.url.split(`/${process.env.TARGET_LOCALE}/docs`);
  if (!slug) {
    throw new Error('slug not found');
  }
  const submodulePath = getSubmodulePath(slug);
  if (!process.env.PATH_TO_LOCALIZED_CONTENT) {
    throw new Error('PATH_TO_LOCALIZED_CONTENT is not defined');
  }
  const { modifiedTime } = getHistoryData(
    process.env.PATH_TO_LOCALIZED_CONTENT,
    submodulePath,
  );
  item.lastmod = modifiedTime.toISOString();
  return item;
}
