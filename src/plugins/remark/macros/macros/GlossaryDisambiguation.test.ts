import type { Root } from 'mdast';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

import GlossaryDisambiguation from './GlossaryDisambiguation.ts';

vi.mock('../../../utils/read-basic-markdown.ts', () => ({
  default: vi.fn().mockReturnValue({
    children: [
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: '{{SomeMacro}}',
          },
        ],
      },
      {
        type: 'paragraph',
        children: [
          {
            type: 'text',
            value: 'Це опис',
          },
        ],
      },
    ],
  }),
}));

vi.mock('../../../registry/get-children.ts', () => ({
  default: vi.fn().mockReturnValue([
    {
      filePath: 'src/pages/uk/docs/Glossary/Baseline/Typography.md',
      slug: 'Glossary/Baseline/Typography',
      title: 'Базова лінія',
    },
    {
      filePath: 'src/pages/uk/docs/Glossary/Baseline/Compatibility.md',
      slug: 'Glossary/Baseline/Compatibility',
      title: 'База',
    },
  ]),
}));

describe('GlossaryDisambiguation', () => {
  const OLD_ENV = process.env;

  beforeEach(() => {
    vi.resetModules(); // Most important - it clears the cache
    process.env = {
      TARGET_LOCALE: 'uk',
    };
  });

  afterAll(() => {
    process.env = OLD_ENV; // Restore old environment
  });
  it('should replace the node with an HTML element', async () => {
    const tree = {
      type: 'root',
      children: [
        {
          type: 'macro',
          name: 'GlossaryDisambiguation',
          parameters: [],
        },
      ],
    };
    const file = {
      data: {
        astro: {
          frontmatter: {
            slug: 'Glossary/Baseline',
          },
        },
      },
    } as any;
    GlossaryDisambiguation(tree as Root, file);
    expect(tree).toMatchSnapshot();
  });
});
