import type { MacroFunction } from '../types.ts';

import EmbedLiveSample from './EmbedLiveSample/index.ts';
import GlossaryDisambiguation from './GlossaryDisambiguation.ts';
import GlossarySidebar from './GlossarySidebar.ts';
import HTMLElement from './HTMLElement.ts';
import HTTPHeader from './HTTPHeader.ts';
import HTTPMethod from './HTTPMethod.ts';
import RFC from './RFC.ts';
import cssxref from './cssxref.ts';
import deprecated_inline from './deprecated_inline.ts';
import domxref from './domxref.ts';
import glossary from './glossary.ts';
import jsSidebar from './jsSidebar/index.ts';
import jsxref from './jsxref.ts';

const MACROS: Record<string, MacroFunction> = {
  cssxref,
  deprecated_inline,
  domxref,
  embedlivesample: EmbedLiveSample,
  glossary,
  glossarydisambiguation: GlossaryDisambiguation,
  glossarysidebar: GlossarySidebar,
  htmlelement: HTMLElement,
  httpheader: HTTPHeader,
  httpmethod: HTTPMethod,
  jssidebar: jsSidebar,
  jsxref,
  rfc: RFC,
};

export default MACROS;
