import { SKIP } from 'unist-util-visit';

import type { AstroFile } from '../../../validate-astro-file.ts';
import type { MacroFunction } from '../../types.ts';

import generalLinks from './general-links.ts';
import quickLinksSections from './quick-links-sections.ts';
import referenceSections from './reference-sections.ts';
import referenceTitleLinks from './reference-title-links.ts';

function macro(file: AstroFile) {
  if (file.data.astro.frontmatter.sidebar) {
    throw new Error('Sidebar already exists');
  }
  file.data.astro.frontmatter.sidebar = [
    {
      links: generalLinks(file),
      sections: quickLinksSections(file),
    },
    {
      links: referenceTitleLinks(file),
      sections: referenceSections(file),
    },
  ];
}

const jsSidebar: MacroFunction = (_node, index, parent, _tree, file) => {
  macro(file);
  parent.children.splice(index, 1);
  return [SKIP, index];
};

export default jsSidebar;
