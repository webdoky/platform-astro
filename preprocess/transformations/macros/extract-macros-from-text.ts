import type { Literal } from 'mdast';

import type { BrokenMacroNode, MacroNode } from '../../types.js';

import parseMacro from './parse-macro.js';

export default function extractMacrosFromText(
  text: string,
): (Literal | MacroNode | BrokenMacroNode)[] {
  let macroStartIndex = text.indexOf('{{');
  if (macroStartIndex === -1) {
    console.warn('No macros found');
    return [
      {
        type: 'text',
        value: text,
      },
    ];
  }
  let macroEndIndex = text.indexOf('}}', macroStartIndex);
  const extractedNodes: (Literal | MacroNode | BrokenMacroNode)[] = [];
  const beforeAllMacros = text.slice(0, macroStartIndex);
  if (beforeAllMacros.length > 0) {
    extractedNodes.push({
      type: 'text',
      value: beforeAllMacros,
    });
  }
  while (macroStartIndex !== -1 && macroEndIndex !== -1) {
    const macroCode = text.slice(macroStartIndex + '{{'.length, macroEndIndex);
    const macro = parseMacro(macroCode.trim());
    extractedNodes.push(macro);
    macroStartIndex = text.indexOf('{{', macroEndIndex + '}}'.length);
    macroEndIndex = text.indexOf('}}', macroStartIndex + '{{'.length);
  }
  const afterAllMacros = text.slice(macroEndIndex + '}}'.length);
  if (afterAllMacros.length > 0) {
    extractedNodes.push({
      type: 'text',
      value: afterAllMacros,
    });
  }
  return extractedNodes;
}
