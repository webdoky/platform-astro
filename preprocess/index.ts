import { mkdirSync, readdirSync, statSync } from 'node:fs';
import { join, resolve } from 'node:path';

import { config as dotenvConfig } from 'dotenv';

import adjustOutputFolder from './adjust-output-folder.js';
import copyMiscFiles from './copy-misc-files.js';
import processFile from './process-file.js';

dotenvConfig();

const { PATH_TO_LOCALIZED_CONTENT } = process.env;

const OUTPUT_FOLDER = 'src/content/processed-content';

// walk through all the Markdown files in the localized content directory
function walk(directory: string, callback: (path: string) => void) {
  for (const f of readdirSync(directory)) {
    const directoryPath = join(directory, f);
    const isDirectory = statSync(directoryPath).isDirectory();
    if (isDirectory) {
      walk(directoryPath, callback);
    } else {
      callback(join(directory, f));
    }
  }
}
if (!PATH_TO_LOCALIZED_CONTENT) {
  throw new Error('PATH_TO_LOCALIZED_CONTENT is not defined');
}
walk(join(PATH_TO_LOCALIZED_CONTENT, 'files'), (filePath: string) => {
  if (filePath.endsWith('.md')) {
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
    mkdirSync(
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
    processFile(filePath, outputPath);

    copyMiscFiles(folder, outputPath.slice(0, -'/index.md'.length));
  }
});
