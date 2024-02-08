import { describe, expect, test } from 'vitest';

import parseDefinitions from './parse-definitions.js';
import expectedData from './test-ast-parsed.json' assert { type: 'json' };
import data from './test-ast-raw.json' assert { type: 'json' };

describe('parseDefinitions', () => {
  test('works with a single definition', () => {
    parseDefinitions(data as any);
    expect(data).toEqual(expectedData);
  });
});
