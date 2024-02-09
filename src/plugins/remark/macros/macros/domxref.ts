import type { Html } from 'mdast';
import { SKIP } from 'unist-util-visit';
import { z } from 'zod';

import createMacro from '../create-macro.ts';
import type { MacroNode } from '../types.ts';
import { wrappedStringSchema } from '../validation.ts';

function parseArguments(
  value: string[],
): [string, string | undefined, string, boolean] {
  console.log(value);
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
  const [apiName, displayName, anchor = '', dontWrapInCode = false] =
    parseArguments(node.parameters);
  let api = apiName;
  let content = `${displayName || apiName}${anchor ? `.${anchor}` : ''}`;
  api = api
    .replaceAll(' ', '_')
    .replaceAll('()', '')
    .replaceAll('.prototype.', '.')
    .replaceAll('.', '/');

  // Ensure Interfaces are always uppercased in links
  api = api.charAt(0).toUpperCase() + api.slice(1);

  const hash = anchor ? `#${anchor}` : '';

  if (!dontWrapInCode) {
    content = `<code>${content}</code>`;
  }

  const basePath = `/${targetLocale}/docs/Web/API/`;

  return {
    type: 'html',
    value: `<a href="${basePath + api + hash}"${
      displayName ? ` title="${displayName}"` : ''
    }>${content}</a>`,
  };
}

const domxref = createMacro('domxref', (node, index, parent) => {
  const replacement = macro(node);
  parent.children[index] = replacement;
  return [SKIP, index];
});

export default domxref;
