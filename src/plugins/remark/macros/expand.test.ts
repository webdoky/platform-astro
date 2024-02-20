import type { Root } from 'mdast';
import { afterAll, beforeEach, describe, expect, test, vi } from 'vitest';

import expandMacros from './expand.js';

vi.mock('../../registry/registry.ts', () => ({
  initRegistry: vi.fn(async () => {}),
}));

describe('expandMacros', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    vi.resetModules(); // Most important - it clears the cache
    process.env = {
      PATH_TO_LOCALIZED_CONTENT: 'path/to/localized/content',
      PATH_TO_ORIGINAL_CONTENT: 'path/to/original/content',
      TARGET_LOCALE: 'uk',
    };
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });
  test('expands macros', async () => {
    const tree: Root = {
      type: 'root',
      children: [
        {
          type: 'text',
          value: `Докладно про стандартні вбудовані об'єкти: {{jsxref("Array")}}, {{jsxref("Boolean")}}, {{jsxref("Date")}}, {{jsxref("Error")}}, {{jsxref("Function")}}, {{jsxref("JSON")}}, {{jsxref("Math")}}, {{jsxref("Number")}}, {{jsxref("Object")}}, {{jsxref("RegExp")}}, {{jsxref("String")}}, {{jsxref("Map")}}, {{jsxref("Set")}}, {{jsxref("WeakMap")}}, {{jsxref("WeakSet")}}, та інші.`,
        },
      ],
    };
    await expandMacros(tree, {} as any);

    expect(tree).toMatchSnapshot();
  });
});
