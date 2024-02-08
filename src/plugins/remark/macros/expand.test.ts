import type { Root } from 'mdast';
import { describe, expect, test } from 'vitest';

import expandMacros from './expand.js';

describe('expandMacros', () => {
  test('expands macros', () => {
    const tree: Root = {
      type: 'root',
      children: [
        {
          type: 'text',
          value: `Докладно про стандартні вбудовані об'єкти: {{jsxref("Array")}}, {{jsxref("Boolean")}}, {{jsxref("Date")}}, {{jsxref("Error")}}, {{jsxref("Function")}}, {{jsxref("JSON")}}, {{jsxref("Math")}}, {{jsxref("Number")}}, {{jsxref("Object")}}, {{jsxref("RegExp")}}, {{jsxref("String")}}, {{jsxref("Map")}}, {{jsxref("Set")}}, {{jsxref("WeakMap")}}, {{jsxref("WeakSet")}}, та інші.`,
        },
      ],
    };
    expandMacros(tree);

    expect(tree).toMatchSnapshot();
  });
});
