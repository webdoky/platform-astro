import type { MacroFunction } from '../types.ts';

import EmbedLiveSample from './EmbedLiveSample/index.ts';
import GlossaryDisambiguation from './GlossaryDisambiguation.ts';
import GlossarySidebar from './GlossarySidebar.ts';
import HTMLElement from './HTMLElement.ts';
import domxref from './domxref.ts';
import jsSidebar from './jsSidebar/index.ts';
import jsxref from './jsxref.ts';

const MACROS: Record<string, MacroFunction> = {
  EmbedLiveSample,
  GlossaryDisambiguation,
  GlossarySidebar,
  HTMLElement,
  domxref,
  jsSidebar,
  jsxref,
};

export default MACROS;
