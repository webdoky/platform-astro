import type { BrokenMacroNode, MacroNode } from './types.js';

export default function parseMacro(
  macroCode: string,
): MacroNode | BrokenMacroNode {
  if (macroCode.includes('}}') || macroCode.includes('{{')) {
    return {
      type: 'brokenMacro',
      code: macroCode,
      error: 'Unbalanced number of {{}} parenthesis',
    };
  }
  const parenthesisOpenIndex = macroCode.indexOf('(');
  if (parenthesisOpenIndex === -1) {
    return {
      type: 'macro',
      name: macroCode,
      parameters: [],
    };
  }
  const parenthesisCloseIndex = macroCode.indexOf(')', parenthesisOpenIndex);
  if (parenthesisCloseIndex === -1) {
    return {
      type: 'brokenMacro',
      code: macroCode,
      error: 'Unbalanced number of () parenthesis',
    };
  }
  const macroName = macroCode.slice(0, parenthesisOpenIndex);
  const macroParameters = macroCode
    .slice(parenthesisOpenIndex + '('.length, parenthesisCloseIndex)
    .split(',')
    .map((parameter) => parameter.trim());
  return {
    type: 'macro',
    name: macroName,
    parameters: macroParameters,
  };
}
