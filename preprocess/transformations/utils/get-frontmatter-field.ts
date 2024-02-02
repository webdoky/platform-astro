import type { Yaml } from 'mdast';
import { parseDocument } from 'yaml';

export default function getFrontmatterField(
  frontmatterNode: Yaml,
  key: string,
): unknown {
  const frontmatter = parseDocument(frontmatterNode.value);
  return frontmatter.get(key);
}
