import { SKIP } from 'unist-util-visit';

import type { MacroFunction } from '../types.ts';

function macro() {
  return {
    type: 'html',
    value: `<abbr class="status-icon deprecated" title="Нерекомендоване. Не для використання в нових вебсайтах">
    <span class="visually-hidden">Нерекомендоване</span>
  </abbr>`,
  };
}

const deprecated_inline: MacroFunction = (_node, index, parent) => {
  const replacement = macro();
  parent.children[index] = replacement;
  return [SKIP, index];
};

export default deprecated_inline;
