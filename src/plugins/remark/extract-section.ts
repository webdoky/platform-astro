import type { Root } from 'mdast';
import { z } from 'zod';

import createRemarkPlugin from './create-plugin.js';
import { type AstroFile } from './validate-astro-file.js';

const slugSchema = z.string().min(1);

export default function extractSection(_tree: Root, astroFile: AstroFile) {
  const slug = slugSchema.parse(astroFile.data.astro.frontmatter.slug);
  const slugParts = slug.split('/');
  let section = slugParts[0];
  if (section === 'Web' && slugParts.length > 1) {
    section = slugParts[1];
  }
  if (!section) {
    throw new Error(`No section found for slug "${slug}"`);
  }
  section = section.toLowerCase();
  if (section) {
    astroFile.data.astro.frontmatter.section = section;
  }
}

export const extractSectionPlugin = createRemarkPlugin(extractSection);
