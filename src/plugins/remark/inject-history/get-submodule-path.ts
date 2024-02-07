import { join } from 'node:path';

export default function getSubmodulePath(filePath: string) {
  if (!process.env.PATH_TO_LOCALIZED_CONTENT) {
    throw new Error('PATH_TO_LOCALIZED_CONTENT is not defined');
  }
  if (!process.env.TARGET_LOCALE) {
    throw new Error('TARGET_LOCALE is not defined');
  }
  const innerPath = filePath.split('src/content/processed-content/')[1];
  if (!innerPath) {
    throw new Error('File not in processed-content directory');
  }
  return join(
    'files',
    process.env.TARGET_LOCALE,
    innerPath
      .replace('-_colon_', '_colon_')
      .replace('-_doublecolon_', '_doublecolon_'),
  );
}
