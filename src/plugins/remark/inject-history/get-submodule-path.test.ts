import getSubmodulePath from './get-submodule-path.ts';

describe('get-submodule-path', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    jest.resetModules(); // Most important - it clears the cache
    process.env = {
      PATH_TO_LOCALIZED_CONTENT: 'path/to/localized/content',
      TARGET_LOCALE: 'uk',
    };
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });
  it('should return the correct path for relative paths', () => {
    expect(
      getSubmodulePath('src/content/processed-content/web/guide/index.md'),
    ).toBe('files/uk/web/guide/index.md');
  });
  it('should return the correct path for absolute paths', () => {
    expect(
      getSubmodulePath(
        '/fake/path/src/content/processed-content/web/guide/index.md',
      ),
    ).toBe('files/uk/web/guide/index.md');
  });
});
