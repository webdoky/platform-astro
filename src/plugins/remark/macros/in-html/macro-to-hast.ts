import type { Element } from 'hast';

import type { MacroNode } from '../types.js';

export default function macroToHast(macro: MacroNode): Element {
  return {
    type: 'element',
    children: [
      {
        type: 'text',
        value: `{{${macro.name}(${macro.parameters.join(', ')})}}`,
      },
    ],
    tagName: 'span',
    properties: {
      class: 'macro missing',
      'data-macro-name': macro.name,
      'data-macro-parameters': macro.parameters.join(', '),
    },
  };
}
