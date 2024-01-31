import type { BrokenMacroNode, MacroNode } from '../../types.js';

export default function parseMacro(
  macroCode: string,
): MacroNode | BrokenMacroNode {
  try {
    if (macroCode.includes('}}') || macroCode.includes('{{')) {
      throw new Error('Unbalanced number of {{}} parenthesis');
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
      throw new Error('Unbalanced number of () parenthesis');
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
  } catch (error) {
    return {
      type: 'brokenMacro',
      code: macroCode,
      error: `${error}`,
    };
  }
}
