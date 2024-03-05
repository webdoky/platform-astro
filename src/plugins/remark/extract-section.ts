import type { Root } from 'mdast';
import { z } from 'zod';

import getSectionFromSlug from '../utils/get-section-from-slug.ts';

import createRemarkPlugin from './create-plugin.js';
import { type AstroFile } from './validate-astro-file.js';

const slugSchema = z.string().min(1);

export default function extractSection(_tree: Root, astroFile: AstroFile) {
  const slug = slugSchema.parse(astroFile.data.astro.frontmatter.slug);

  astroFile.data.astro.frontmatter.section = getSectionFromSlug(slug);
}

export const extractSectionPlugin = createRemarkPlugin(extractSection);
