import type { Html } from 'mdast';
import { SKIP } from 'unist-util-visit';

import type { MacroFunction, MacroNode } from '../types.ts';
import { wrappedStringSchema } from '../validation.ts';

function parseArguments(value: string[]): [string, string | undefined, string] {
  if (value.length === 0 || !value[0]) {
    throw new Error('No arguments provided');
  }
  return [
    wrappedStringSchema.parse(value[0]),
    value[1] ? wrappedStringSchema.parse(value[1]) : undefined,
    value[2] ? wrappedStringSchema.parse(value[2]) : '',
  ];
}

function macro(node: MacroNode): Html {
  const targetLocale = process.env.TARGET_LOCALE;
  const [elementName, defaultLinkText, anchor = ''] = parseArguments(
    node.parameters,
  );
  const normalizedElementName = elementName.toString().toLowerCase();
  let linkText = defaultLinkText || normalizedElementName;

  const url = `/${targetLocale}/docs/Web/HTML/Element/${normalizedElementName}${anchor}`;

  if (
    linkText === normalizedElementName &&
    !normalizedElementName.includes(' ')
  ) {
    linkText = `<code>&lt;${linkText}&gt;</code>`;
  }

  return {
    type: 'html',
    value: `<a href="${url}">${linkText}</a>`,
  };
}

const HTMLElement: MacroFunction = (node, index, parent) => {
  const replacement = macro(node);
  parent.children[index] = replacement;
  return [SKIP, index];
};

export default HTMLElement;
