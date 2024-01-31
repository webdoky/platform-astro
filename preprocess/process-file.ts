import { readFileSync, writeFileSync } from 'node:fs';

import processor from './processor.js';
import transform from './transformations/transform.js';

export default function processFile(filePath: string, outFilePath: string) {
  // Read file contents
  const fileContents = readFileSync(filePath, 'utf8');
  // Parse file contents
  const parsedFile = processor.parse(fileContents);

  transform(parsedFile);

  const output = processor.stringify(parsedFile);

  writeFileSync(outFilePath, output);
}
