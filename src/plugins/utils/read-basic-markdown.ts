import remarkParse from 'remark-parse';
import { readSync } from 'to-vfile';
import { unified } from 'unified';

const basicProcessor = unified().use(remarkParse);

export default function readBasicMarkdown(filePath: string) {
  const sourceFile = readSync(filePath);
  return basicProcessor.parse(sourceFile);
}
