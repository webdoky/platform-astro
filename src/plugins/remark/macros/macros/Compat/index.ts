import GithubSlugger from 'github-slugger';
import { SKIP } from 'unist-util-visit';

import type { MacroFunction } from '../../types.js';

import macro from './macro.ts';
const slugger = new GithubSlugger();

const Compat: MacroFunction = (node, index, parent, tree, file) => {
  slugger.reset();
  const replacement = macro(node, tree, file);
  parent.children[index] = replacement;
  return [SKIP, index];
};

export default Compat;
