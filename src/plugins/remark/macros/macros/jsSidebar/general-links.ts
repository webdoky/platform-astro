import type { Root } from 'mdast';

import hasPage from '../../../../registry/has-page.ts';
import type { AstroFile } from '../../../validate-astro-file.ts';

import labels from './labels.ts';

export default function generalLinks(_tree: Root, file: AstroFile) {
  const targetLocale = process.env.TARGET_LOCALE;
  const currentPath = `/${targetLocale}/docs/${file.data.astro.frontmatter.slug}`;
  return [
    {
      slug: `Web/JavaScript`,
      title: labels.JavaScript,
    },
    {
      slug: `Web/JavaScript/Tutorials`,
      title: labels.Tutorials,
    },
  ].map(({ slug, ...otherAttributes }) => {
    const path = `/${targetLocale}/docs/${slug}`;
    return {
      ...otherAttributes,
      path: path,
      hasTranslation: hasPage(slug),
      isCurrent: path === currentPath,
    };
  });
}
