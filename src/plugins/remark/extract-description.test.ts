import type { Root } from 'mdast';

import { extractDescriptionPlugin } from './extract-description.js';
import type { AstroFile } from './validate-astro-file.ts';

describe('extractDescription', () => {
  test('sets the description and sets it in the frontmatter', () => {
    const tree: Root = {
      type: 'root',
      children: [
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
    const file = {
      data: {
        astro: {
          frontmatter: {
            slug: 'slug',
            title: 'title',
          },
        },
      },
    };

    extractDescriptionPlugin()(tree, file as unknown as AstroFile);
    expect(file).toMatchSnapshot();
  });
});
