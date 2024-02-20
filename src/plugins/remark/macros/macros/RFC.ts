import type { Html } from 'mdast';
import { SKIP } from 'unist-util-visit';

import localize from '../localize.ts';
import type { MacroFunction, MacroNode } from '../types.ts';
import { wrappedNumberSchema, wrappedStringSchema } from '../validation.ts';

function parseArguments(
  value: string[],
): [number, string | undefined, string | undefined] {
  if (value.length === 0 || !value[0]) {
    throw new Error('No arguments provided');
  }
  return [
    wrappedNumberSchema.parse(value[0]),
    value[1] ? wrappedStringSchema.parse(value[1]) : undefined,
    value[2] ? wrappedStringSchema.parse(value[2]) : undefined,
  ];
}

function macro(node: MacroNode): Html {
  let arguments_ = parseArguments(node.parameters);

  let link = 'https://datatracker.ietf.org/doc/html/rfc' + arguments_[0];
  let text = '';

  if (arguments_[1]) {
    text = ': ' + arguments_[1];
  }

  if (arguments_[2]) {
    link = link + '#section-' + arguments_[2];
    text =
      ', ' + localize('L10n-Common', 'section') + ' ' + arguments_[2] + text;
  }

  return {
    type: 'html',
    value: `<a href="${link}">RFC ${text}</a>`,
  };
}

const RFC: MacroFunction = (node, index, parent) => {
  const replacement = macro(node);
  parent.children[index] = replacement;
  return [SKIP, index];
};

export default RFC;
