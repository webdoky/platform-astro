import type { Html } from 'mdast';
import { SKIP } from 'unist-util-visit';

import type { MacroFunction, MacroNode } from '../types.ts';
import { wrappedStringSchema } from '../validation.ts';

function parseArguments(value: string[]): [string, string | undefined] {
  if (value.length === 0 || !value[0]) {
    throw new Error('No arguments provided');
  }
  return [
    wrappedStringSchema.parse(value[0]),
    value[1] ? wrappedStringSchema.parse(value[1]) : undefined,
  ];
}

function macro(node: MacroNode): Html {
  const targetLocale = process.env.TARGET_LOCALE;
  let arguments_ = parseArguments(node.parameters);
  let string_ = arguments_[1] || arguments_[0];

  const basePath = `/${targetLocale}/docs/Glossary/`;
  const subPath = arguments_[0].replaceAll(/\s+/g, '_');

  return {
    type: 'html',
    value: `<a href="${basePath + subPath}">${string_}</a>`,
  };
}

const glossary: MacroFunction = (node, index, parent) => {
  const replacement = macro(node);
  parent.children[index] = replacement;
  return [SKIP, index];
};

export default glossary;
