import type { Html } from 'mdast';
import { SKIP } from 'unist-util-visit';
import { z } from 'zod';

import type { MacroFunction, MacroNode } from '../types.ts';
import { wrappedStringSchema } from '../validation.ts';

function parseArguments(
  value: string[],
): [string, string | undefined, string, boolean] {
  if (value.length === 0 || !value[0]) {
    throw new Error('No arguments provided');
  }
  return [
    wrappedStringSchema.parse(value[0]),
    value[1] ? wrappedStringSchema.parse(value[1]) : undefined,
    value[2] ? wrappedStringSchema.parse(value[2]) : '',
    value[3]
      ? z
          .number()
          .transform((value_) => !!value_)
          .parse(JSON.parse(value[3]))
      : false,
  ];
}

function macro(node: MacroNode): Html {
  const targetLocale = process.env.TARGET_LOCALE;
  const arguments_ = parseArguments(node.parameters);
  let header = arguments_[0];
  let string_ = arguments_[1] || arguments_[0];
  let URL = '/' + targetLocale + '/docs/Web/HTTP/Headers/' + header;
  let anch = '';

  if (arguments_[2]) {
    string_ = string_ + '.' + arguments_[2];
    anch = '#' + arguments_[2];
  }

  let code = '';
  let endcode = '';
  if (!arguments_[3]) {
    code = '<code>';
    endcode = '</code>';
  }

  return {
    type: 'html',
    value: `<a href="${URL + anch}">${code}${string_}${endcode}</a>`,
  };
}

const HTTPHeader: MacroFunction = (node, index, parent) => {
  const replacement = macro(node);
  parent.children[index] = replacement;
  return [SKIP, index];
};

export default HTTPHeader;
