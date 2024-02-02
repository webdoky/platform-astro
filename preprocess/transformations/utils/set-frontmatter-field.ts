import type { Yaml } from 'mdast';
import { parseDocument } from 'yaml';

export default function setFrontmatterField(
  frontmatterNode: Yaml,
  key: string,
  value: unknown,
) {
  const frontmatter = parseDocument(frontmatterNode.value);
  frontmatter.set(key, value);
  frontmatterNode.value = String(frontmatter);
}
