import { readFileSync, writeFileSync } from 'node:fs';

import makeMacroTree from './make-macro-tree.js';
import processor from './processor.js';
import unmakeMacroTree from './unmake-macro-tree.js';

export default function processFile(filePath: string, outFilePath: string) {
  // Read file contents
  const fileContents = readFileSync(filePath, 'utf8');
  // Parse file contents
  const parsedFile = processor.parse(fileContents);

  makeMacroTree(parsedFile);

  unmakeMacroTree(parsedFile);

  const output = processor.stringify(parsedFile);

  writeFileSync(outFilePath, output);
}
