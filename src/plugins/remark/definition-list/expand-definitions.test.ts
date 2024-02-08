import { describe, expect, test } from 'vitest';

import richInput from './expand-definitions.input.json' assert { type: 'json' };
import expandDefinitions from './expand-definitions.js';
import data from './test-ast-parsed.json' assert { type: 'json' };
import expectedData from './test-ast-processed.json' assert { type: 'json' };

describe('parseDefinitions', () => {
  test('works with a single definition', () => {
    expandDefinitions(data as any);
    expect(data).toEqual(expectedData);
  });

  test('works with multiple definitions', () => {
    expandDefinitions(richInput as any);
    expect(richInput).toMatchSnapshot();
  });
});
