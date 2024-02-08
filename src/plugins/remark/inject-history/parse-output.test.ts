import { describe, expect, it } from 'vitest';

import parseOutput from './parse-output.ts';

describe('parseOutput', () => {
  it('should parse the output correctly', () => {
    const output = `1627401600 author1
1627401600 author2
1630488000 author 3`;
    expect(parseOutput(output)).toEqual({
      publishedTime: new Date(1_627_401_600 * 1000),
      modifiedTime: new Date(1_630_488_000 * 1000),
      authors: ['author1', 'author2', 'author 3'],
    });
  });

  it('should throw an error if there is no history', () => {
    expect(() => parseOutput('')).toThrow('No history found');
  });
});
