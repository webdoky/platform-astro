import stripMacros from './strip-macros.js';

describe('stripMacros', () => {
  test('strips a macro with no arguments', () => {
    expect(stripMacros('{{macro}}')).toBe('');
  });

  test('strips a macro with one argument', () => {
    expect(stripMacros('{{macro("arg")}}')).toBe('arg');
  });

  test('strips a macro with two arguments', () => {
    expect(stripMacros('{{macro("arg1", "arg2")}}')).toBe('arg2');
  });

  test('ignores extra arguments', () => {
    expect(stripMacros('{{macro("arg1", "arg2", "arg3", 1)}}')).toBe('arg2');
  });
});
