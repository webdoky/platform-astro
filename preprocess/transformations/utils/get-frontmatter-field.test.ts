import type { Yaml } from 'mdast';

import getFrontmatterField from './get-frontmatter-field.js';

describe('getFrontmatterField', () => {
  test('gets a field from the frontmatter', () => {
    const frontmatterNode: Yaml = {
      type: 'yaml',
      value: 'key: value\n',
    };
    expect(getFrontmatterField(frontmatterNode, 'key')).toBe('value');
  });
});
