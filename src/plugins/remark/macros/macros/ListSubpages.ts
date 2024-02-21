import { SKIP } from 'unist-util-visit';

import getChildren from '../../../registry/get-children.ts';
import type { RawPage } from '../../../registry/validation.ts';
import getSlugFromUrl from '../../../utils/get-slug-from-url.ts';
import sortBySlug from '../../../utils/sort-by-slug.ts';
import type { AstroFile } from '../../validate-astro-file.ts';
import type { MacroFunction, MacroNode } from '../types.ts';
import {
  wrappedBooleanSchema,
  wrappedNumberSchema,
  wrappedStringSchema,
} from '../validation.ts';

function parseArguments(value: string[]): [string, number, boolean] {
  if (value.length === 0 || !value[0]) {
    throw new Error('No arguments provided');
  }
  return [
    wrappedStringSchema.parse(value[0]),
    wrappedNumberSchema.parse(value[1]),
    wrappedBooleanSchema.parse(value[2]),
  ];
}

function macro(node: MacroNode, file: AstroFile) {
  if (file.data.astro.frontmatter.sidebar) {
    throw new Error('Sidebar already exists');
  }
  const [path, depth, reverse] = parseArguments(node.parameters);
  const slug = path ? getSlugFromUrl(path) : file.data.astro.frontmatter.slug;
  const targetLocale = process.env.TARGET_LOCALE;
  const glossaryPages = getChildren(slug, depth);

  const pageToNavItem = ({ slug, title }: RawPage, currentSlug: string) => ({
    title,
    path: `/${targetLocale}/docs/${slug}/`,
    hasTranslation: true,
    isCurrent: slug === currentSlug,
  });
  // TODO: we definitely need it typed at some point
  file.data.astro.frontmatter.sidebar = [
    {
      links: [],
      sections: [
        {
          expanded: true,
          items: glossaryPages
            .map((item) =>
              pageToNavItem(item, file.data.astro.frontmatter.slug),
            )
            .sort(sortBySlug),
          title: file.data.astro.frontmatter.title,
        },
      ],
    },
  ];
}

const ListSubpages: MacroFunction = (node, index, parent, _tree, file) => {
  macro(node, file);
  console.log('ListSubpages');
  parent.children.splice(index, 1);
  return [SKIP, index];
};

export default ListSubpages;
