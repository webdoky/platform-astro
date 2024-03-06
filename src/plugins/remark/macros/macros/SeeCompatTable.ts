import type { Html } from 'mdast';
import { SKIP } from 'unist-util-visit';

import type { MacroFunction } from '../types.ts';

const BODY =
  '<strong>Це <a href="https://developer.mozilla.org/en-US/docs/MDN/Contribute/Guidelines/Conventions_definitions#experimental">експериментальна технологія</a></strong><br />Ретельно перевірте <a href="#sumisnist-iz-brauzeramy">таблицю сумісності з браузерами</a>, перш ніж використовувати її в роботі.';
const TITLE = 'Експериментальне';

function macro(): Html {
  return {
    type: 'html',
    value: `<div class="notecard experimental"><h4>${TITLE}</h4><p>${BODY}</p></div>`,
  };
}

const SeeCompatTable: MacroFunction = (_node, index, parent) => {
  const replacement = macro();
  parent.children[index] = replacement;
  return [SKIP, index];
};

export default SeeCompatTable;
