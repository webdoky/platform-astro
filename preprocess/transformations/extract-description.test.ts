import type { Root, Yaml } from 'mdast';

import extractDescription from './extract-description.js';

describe('extractDescription', () => {
  test('sets the description and sets it in the frontmatter', () => {
    const tree: Root = {
      type: 'root',
      children: [
        {
          type: 'yaml',
          value: 'key: value\n',
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              value: 'description',
            },
          ],
        },
      ],
    };
    extractDescription(tree);
    expect((tree.children[0] as Yaml).value).toBe(
      'key: value\ndescription: description\n',
    );
  });
});
