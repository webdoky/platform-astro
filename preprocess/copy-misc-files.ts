import { copyFile, readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

export default async function copyMiscFiles(
  folder: string,
  outputPath: string,
) {
  // console.log(`Copying misc files from ${folder} to ${outputPath}`);
  for (const f of await readdir(folder)) {
    if (!f.endsWith('index.md')) {
      const fStat = await stat(join(folder, f));
      if (fStat.isFile()) {
        const source = join(folder, f);
        const destination = join(outputPath, f);
        console.log(`Copying ${source} to ${destination}`);
        await copyFile(source, destination);
      }
    }
  }
}
