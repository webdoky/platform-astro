import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

// walk through all the Markdown files in the localized content directory
export default async function walk(
  directory: string,
  callback: (path: string) => Promise<void>,
) {
  for (const f of await readdir(directory)) {
    const fPath = join(directory, f);
    const fStat = await stat(fPath);
    const isDirectory = fStat.isDirectory();
    await (isDirectory ? walk(fPath, callback) : callback(fPath));
  }
}
