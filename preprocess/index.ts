import { mkdir } from 'node:fs/promises';
import { join, resolve } from 'node:path';

import { config as dotenvConfig } from 'dotenv';

import adjustOutputFolder from './adjust-output-folder.js';
import copyMiscFiles from './copy-misc-files.js';
import processFile from './process-file.js';
import walk from './walk-async.js';

dotenvConfig();

const { PATH_TO_LOCALIZED_CONTENT } = process.env;

const OUTPUT_FOLDER = 'src/content/processed-content';

if (!PATH_TO_LOCALIZED_CONTENT) {
  throw new Error('PATH_TO_LOCALIZED_CONTENT is not defined');
}
await walk(
  join(PATH_TO_LOCALIZED_CONTENT, 'files'),
  async (filePath: string) => {
    if (!filePath.endsWith('.md')) {
      return;
    }
    console.log(filePath);
    const folder = filePath.split('/').slice(0, -1).join('/');
    const outputPath = adjustOutputFolder(
      filePath.replace(
        join(PATH_TO_LOCALIZED_CONTENT, 'files'),
        resolve(OUTPUT_FOLDER),
      ),
    );
    if (outputPath === filePath) {
      throw new Error('outputPath is the same as filePath');
    }
    await mkdir(
      resolve(
        adjustOutputFolder(
          folder.replace(
            join(PATH_TO_LOCALIZED_CONTENT, 'files'),
            resolve(OUTPUT_FOLDER),
          ),
        ),
      ),
      { recursive: true },
    );
    // processFile(filePath, outputPath);
    await processFile(filePath, outputPath);

    await copyMiscFiles(folder, outputPath.slice(0, -'/index.md'.length));
  },
);
