import type { Element } from 'hast';

import type { BrokenMacroNode } from '../types.js';

export default function brokenMacroToHast(macro: BrokenMacroNode): Element {
  return {
    type: 'element',
    children: [
      {
        type: 'text',
        value: macro.code,
      },
    ],
    tagName: 'span',
    properties: {
      class: 'macro broken',
      'data-error': `${macro.error}`,
    },
  };
}
