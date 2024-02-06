import { readFileSync } from 'node:fs';

import type { Html } from 'mdast';
import Mustache from 'mustache';

import type { MacroNode } from './types.js';

const templateCode = readFileSync(
  './src/plugins/remark/macros/macro-html.mustache',
  'utf8',
);
Mustache.parse(templateCode);

export default function macroToHtml(macro: MacroNode): Html {
  return {
    type: 'html',
    value: Mustache.render(templateCode, {
      class: 'macro missing',
      name: macro.name,
      parameters: macro.parameters.join(', '),
    }),
  };
}
