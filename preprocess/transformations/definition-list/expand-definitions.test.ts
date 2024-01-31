import expandDefinitions from './expand-definitions.js';
import data from './test-ast-parsed.json' assert { type: 'json' };
import expectedData from './test-ast-processed.json' assert { type: 'json' };

describe('parseDefinitions', () => {
  test('works with a single definition', () => {
    expandDefinitions(data as any);
    expect(data).toEqual(expectedData);
  });
});
