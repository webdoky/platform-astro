import { describe, expect } from 'vitest';

import parseMacro from './parse-macro.ts';

describe('parseMacro', (it) => {
  it('should parse a macro with no parameters', () => {
    expect(parseMacro('GlossarySidebar')).toEqual({
      type: 'macro',
      name: 'GlossarySidebar',
      parameters: [],
    });
  });
  it('should parse a macro with parameters', () => {
    expect(parseMacro('domxref("API")')).toEqual({
      type: 'macro',
      name: 'domxref',
      parameters: ['"API"'],
    });
  });
  it('should parse a macro with many parameters', () => {
    expect(parseMacro('domxref("API", "displayName", "anchor", 1)')).toEqual({
      type: 'macro',
      name: 'domxref',
      parameters: ['"API"', '"displayName"', '"anchor"', '1'],
    });
  });
  it('should parse a macro whose parameter contains parenthesis', () => {
    expect(parseMacro('jsxref("Array.prototype.includes()")')).toEqual({
      type: 'macro',
      name: 'jsxref',
      parameters: ['"Array.prototype.includes()"'],
    });
  });
  it('should return a brokenMacro if there are unbalanced parenthesis', () => {
    expect(parseMacro('domxref("API"')).toEqual({
      type: 'brokenMacro',
      code: 'domxref("API"',
      error: 'Error: Unbalanced number of () parenthesis',
    });
  });
});
