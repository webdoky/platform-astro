import type { Root } from 'mdast';
import { EXIT, visit } from 'unist-util-visit';

import type { AstroFile } from '../../../validate-astro-file.js';
import type { AbstractMacroParentNode, MacroNode } from '../../types.js';

import generalLinks from './general-links.ts';
import quickLinksSections from './quick-links-sections.ts';
import referenceSections from './reference-sections.ts';
import referenceTitleLinks from './reference-title-links.ts';

function macro(tree: Root, file: AstroFile) {
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

export default function jsSidebar(tree: Root, file: AstroFile) {
  visit(
    tree,
    'macro',
    (node: MacroNode, index, parent: AbstractMacroParentNode) => {
      if (node.name !== 'jsSidebar') return;
      macro(tree, file);
      if (!parent) throw new Error('Parent is undefined');
      if (index === undefined) throw new Error('Index is undefined');
      parent.children.splice(index, 1);
      return [EXIT];
    },
  );
}
