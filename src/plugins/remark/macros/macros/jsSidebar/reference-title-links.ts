import type { Root } from 'mdast';

import hasPage from '../../../../registry/has-page.ts';
import type { AstroFile } from '../../../validate-astro-file.ts';

import labels from './labels.js';

export default function referenceTitleLinks(_tree: Root, file: AstroFile) {
  const targetLocale = process.env.TARGET_LOCALE;
  return [
    {
      slug: `Web/JavaScript/Reference`,
      title: labels.Reference,
    },
  ].map(({ slug, ...otherAttributes }) => ({
    ...otherAttributes,
    hasTranslation: hasPage(slug),
    path: `/${targetLocale}/docs/${slug}`,
    isCurrent: slug === file.data.astro.frontmatter.slug,
  }));
}
