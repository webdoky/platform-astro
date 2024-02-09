import type { Html } from 'mdast';
import { SKIP } from 'unist-util-visit';
import { z } from 'zod';

import createMacro from '../create-macro.ts';
import type { MacroNode } from '../types.ts';
import { wrappedStringSchema } from '../validation.ts';
const initialSlug = 'Global_Objects';
const referenceContentSections = new Set([
  'about',
  'classes',
  'deprecated_and_obsolete_features',
  'errors',
  'functions',
  'global_objects',
  'iteration_protocols',
  'lexical_grammar',
  'operators',
  'statements',
  'strict_mode',
  'template_literals',
  'trailing_commas',
]);

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
  const [termName, displayName, anchor, dontWrapInCode] = parseArguments(
    node.parameters,
  );
  const referenceBasePath = `/${targetLocale}/docs/Web/JavaScript/Reference/`;
  let basePath = referenceBasePath;

  const possibleReferenceSectionName = termName.split('/')[0];
  if (!possibleReferenceSectionName) {
    throw new Error('No arguments provided');
  }
  const slug = referenceContentSections.has(
    possibleReferenceSectionName.toLowerCase(),
  )
    ? ''
    : initialSlug;

  const addressWithoutSection = termName
    .replace('()', '')
    .replace('.prototype.', '.');
  const address = `${slug ? `${slug}/` : ''}${addressWithoutSection}`;

  basePath =
    !address.includes('..') && address.includes('.')
      ? `${basePath}${address.replace('.', '/')}`
      : `${basePath}${decodeURIComponent(address)}`;

  let encodedAnchor = anchor;
  if (anchor && anchor[0] !== '#') {
    encodedAnchor = `#${anchor}`;
  }

  let content = displayName || termName;
  if (!dontWrapInCode) {
    content = `<code>${content}</code>`;
  }

  return {
    type: 'html',
    value: `<a href="${basePath + encodedAnchor}">${content}</a>`,
  };
}

const jsxref = createMacro('jsxref', (node, index, parent) => {
  const replacement = macro(node);
  parent.children[index] = replacement;
  return [SKIP, index];
});

export default jsxref;
