import { copyFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

export default function copyMiscFiles(folder: string, outputPath: string) {
  // console.log(`Copying misc files from ${folder} to ${outputPath}`);
  const miscFiles = readdirSync(folder).filter(
    (fileName) =>
      !fileName.endsWith('index.md') &&
      !statSync(join(folder, fileName)).isDirectory(),
  );
  for (const f of miscFiles) {
    // console.log(f);
    const source = join(folder, f);
    const destination = join(outputPath, f);
    console.log(`Copying ${source} to ${destination}`);
    copyFileSync(source, destination);
  }
}
