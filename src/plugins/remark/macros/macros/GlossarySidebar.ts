import type { Root } from 'mdast';
import { SKIP } from 'unist-util-visit';

import getChildren from '../../../registry/get-children.ts';
import type { RawPage } from '../../../registry/validation.ts';
import type { AstroFile } from '../../validate-astro-file.ts';
import type { MacroFunction } from '../types.ts';

function macro(_tree: Root, file: AstroFile) {
  if (file.data.astro.frontmatter.sidebar) {
    throw new Error('Sidebar already exists');
  }
  const targetLocale = process.env.TARGET_LOCALE;
  const glossaryPages = getChildren('Glossary');
  function sortByTitle({ title: titleA = '' }, { title: titleB = '' }) {
    return titleA.localeCompare(titleB, targetLocale);
  }

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
            .sort(sortByTitle),
          title: 'Терміни глосарія',
        },
      ],
    },
  ];
}

const GlossarySidebar: MacroFunction = (_node, index, parent, tree, file) => {
  macro(tree, file);
  parent.children.splice(index, 1);
  return [SKIP, index];
};

export default GlossarySidebar;
