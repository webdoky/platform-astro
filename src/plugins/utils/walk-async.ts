import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

export default async function walk(
  directory: string,
  callback: (path: string) => Promise<void>,
) {
  const files = await readdir(directory);
  await Promise.all(
    files.map(async (f) => {
      const fPath = join(directory, f);
      const fStat = await stat(fPath);
      const isDirectory = fStat.isDirectory();
      await (isDirectory ? walk(fPath, callback) : callback(fPath));
    }),
  );
}
