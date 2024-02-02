import type { Root, Yaml } from 'mdast';
import { z } from 'zod';

import getFrontmatterField from './utils/get-frontmatter-field.js';
import setFrontmatterField from './utils/set-frontmatter-field.js';

const slugSchema = z.string().min(1);

export default function extractSection(tree: Root) {
  const frontmatterNode = tree.children.find(
    (node) => node.type === 'yaml',
  ) as Yaml;
  if (!frontmatterNode) {
    console.warn('No frontmatter found');
    return;
  }
  const slug = slugSchema.parse(getFrontmatterField(frontmatterNode, 'slug'));
  const slugParts = slug.split('/');
  let section = slugParts[0];
  if (section === 'Web' && slugParts.length > 1) {
    section = slugParts[1];
  }
  section = section.toLowerCase();
  if (section) {
    setFrontmatterField(frontmatterNode, 'section', section);
  }
}

export function extractSectionPlugin() {
  return extractSection;
}
