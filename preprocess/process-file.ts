import { read, write } from 'to-vfile';

import processor from './processor.js';
// import transform from './transformations/transform.js';

export default async function processFile(
  filePath: string,
  outFilePath: string,
) {
  // Read file contents
  // const fileContents = readFileSync(filePath, 'utf8');
  const file = await read(filePath, 'utf8');
  file.path = outFilePath;
  // Parse file contents
  // const parsedFile = processor.parse(fileContents);
  const processedFile = await processor.process(file);

  // transform(parsedFile);

  // const output = processor.stringify(parsedFile);

  // writeFileSync(outFilePath, output);
  await write(processedFile);
}
