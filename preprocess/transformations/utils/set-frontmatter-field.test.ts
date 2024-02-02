import type { Yaml } from 'mdast';

import setFrontmatterField from './set-frontmatter-field.js';

describe('setFrontmatterField', () => {
  test('sets a field in the frontmatter', () => {
    const frontmatterNode: Yaml = {
      type: 'yaml',
      value: 'key: value\n',
    };
    setFrontmatterField(frontmatterNode, 'newKey', 'newValue');
    expect(frontmatterNode.value).toBe('key: value\nnewKey: newValue\n');
  });
});
