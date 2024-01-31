import { readFileSync } from 'node:fs';

import type { Html } from 'mdast';
import Mustache from 'mustache';

import { BrokenMacroNode } from './types.js';

const templateCode = readFileSync(
  './preprocess/transformations/macros/broken-macro-html.mustache',
  'utf8',
);
Mustache.parse(templateCode);

export default function brokenMacroToHtml(macro: BrokenMacroNode): Html {
  return {
    type: 'html',
    value: Mustache.render(templateCode, {
      code: macro.code,
      error: macro.error,
    }),
  };
}
