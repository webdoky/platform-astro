import { SKIP } from 'unist-util-visit';

import type { AstroFile } from '../../../validate-astro-file.ts';
import type { MacroFunction } from '../../types.ts';

import guidesSections from './guides-sections.ts';
import referenceSections from './reference-sections.ts';

function macro(file: AstroFile) {
  if (file.data.astro.frontmatter.sidebar) {
    throw new Error('Sidebar already exists');
  }
  file.data.astro.frontmatter.sidebar = [
    {
      links: [],
      sections: referenceSections(file),
    },
    {
      links: [],
      sections: guidesSections(file),
    },
  ];
}

// eslint-disable-next-line unicorn/prevent-abbreviations
const CSSRef: MacroFunction = (_node, index, parent, _tree, file) => {
  macro(file);
  parent.children.splice(index, 1);
  return [SKIP, index];
};

export default CSSRef;
