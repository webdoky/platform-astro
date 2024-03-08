import type { Html } from 'mdast';
import { SKIP } from 'unist-util-visit';

import {
  originalContentRegistry,
  translatedContentRegistry,
} from '../../../registry/index.ts';
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
  let arguments_ = parseArguments(node.parameters);
  let url = '';
  let urlWithoutAnchor = '';
  let displayName = arguments_[1] || arguments_[0];

  // Deal with CSS data types by removing <>
  let slug = arguments_[0].replaceAll(/<(.*)>/g, '$1');

  // Special case <color>, <flex>, and <position>
  switch (arguments_[0]) {
    case '<color>': {
      slug = 'color_value';
      break;
    }

    case '<flex>': {
      slug = 'flex_value';
      break;
    }

    case '<position>': {
      slug = 'position_value';
      break;
    }
  }

  const basePath = `/${targetLocale}/docs/Web/CSS/`;
  urlWithoutAnchor = basePath + slug;
  url = urlWithoutAnchor + arguments_[2];

  const thisPage =
    translatedContentRegistry.get(`Web/CSS/${slug}`) ||
    originalContentRegistry.get(`Web/CSS/${slug}`);

  if (!thisPage) {
    throw new Error(`No page found for ${slug}`);
  }

  if (!arguments_[1]) {
    // Append parameter brackets to CSS functions
    if (
      thisPage['page-type'] === 'css-function' &&
      !displayName.endsWith('()')
    ) {
      displayName += '()';
    }
    // Enclose CSS data types in arrow brackets
    if (
      thisPage['page-type'] === 'css-type' &&
      !/^&lt;.+&gt;$/.test(displayName)
    ) {
      displayName = '&lt;' + displayName + '&gt;';
    }
  }

  return {
    type: 'html',
    value: `<a href="${url}" title="${thisPage?.title}"><code>${displayName}</code></a>`,
  };
}

const cssxref: MacroFunction = (node, index, parent) => {
  const replacement = macro(node);
  parent.children[index] = replacement;
  return [SKIP, index];
};

export default cssxref;
