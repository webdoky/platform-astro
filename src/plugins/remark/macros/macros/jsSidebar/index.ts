import type { Root } from 'mdast';
import { EXIT } from 'unist-util-visit';

import type { AstroFile } from '../../../validate-astro-file.ts';
import createMacro from '../../create-macro.ts';

import generalLinks from './general-links.ts';
import quickLinksSections from './quick-links-sections.ts';
import referenceSections from './reference-sections.ts';
import referenceTitleLinks from './reference-title-links.ts';

function macro(tree: Root, file: AstroFile) {
  if (file.data.astro.frontmatter.sidebar) {
    console.log(
      'file.data.astro.frontmatter.sidebar',
      file.data.astro.frontmatter.sidebar,
    );
    throw new Error('Sidebar already exists');
  }
  file.data.astro.frontmatter.sidebar = [
    {
      links: generalLinks(tree, file),
      sections: quickLinksSections(tree, file),
    },
    {
      links: referenceTitleLinks(tree, file),
      sections: referenceSections(tree, file),
    },
  ];
}

const jsSidebar = createMacro(
  'jsSidebar',
  (_node, index, parent, tree, file) => {
    macro(tree, file);
    parent.children.splice(index, 1);
    return [EXIT];
  },
);

export default jsSidebar;
