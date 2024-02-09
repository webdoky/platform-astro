import type { Root } from 'mdast';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

import GlossarySidebar from './GlossarySidebar.ts';

vi.mock('../../../registry/get-children.ts', () => ({
  default: vi.fn().mockReturnValue([
    {
      title: 'Хибні значення',
      slug: 'Glossary/Falsy',
    },
    {
      hasLocalizedContent: true,
      title: 'Істинні значення',
      slug: 'Glossary/Truthy',
    },
    {
      title: 'Undefined',
      slug: 'Glossary/Undefined',
    },
    {
      title: 'Null',
      slug: 'Glossary/Null',
    },
    {
      title: 'NaN',
      slug: 'Glossary/NaN',
    },
    {
      title: 'Primitive',
      slug: 'Glossary/Primitive',
    },
    {
      title: 'Object',
      slug: 'Glossary/Object',
    },
    {
      title: 'Array',
      slug: 'Glossary/Array',
    },
    {
      title: 'Function',
      slug: 'Glossary/Function',
    },
    {
      title: 'Operator',
      slug: 'Glossary/Operator',
    },
    {
      title: 'Statement',
      slug: 'Glossary/Statement',
    },
    {
      title: 'Expression',
      slug: 'Glossary/Expression',
    },
    {
      title: 'Keyword',
      slug: 'Glossary/Keyword',
    },
    {
      title: 'Property',
      slug: 'Glossary/Property',
    },
    {
      title: 'Event',
      slug: 'Glossary/Event',
    },
    {
      title: 'Method',
      slug: 'Glossary/Method',
    },
    {
      title: 'Interface',
      slug: 'Glossary/Interface',
    },
  ]),
}));

describe('GlossarySidebar', () => {
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
  it('should throw an error if the sidebar already exists', () => {
    expect(() => {
      const tree = {
        type: 'root',
        children: [
          {
            type: 'macro',
            name: 'GlossarySidebar',
            parameters: [],
          },
        ],
      };
      const file = {
        data: {
          astro: {
            frontmatter: {
              sidebar: [],
              'page-type': '',
              title: '',
              slug: 'Glossary/Undefined',
            },
          },
        },
      } as any;
      GlossarySidebar(tree as Root, file);
    }).toThrowError('Sidebar already exists');
  });
  it('should add a sidebar to the frontmatter', () => {
    const tree = {
      type: 'root',
      children: [
        {
          type: 'macro',
          name: 'GlossarySidebar',
          parameters: [],
        },
      ],
    };
    const file = {
      data: {
        astro: {
          frontmatter: {},
        },
      },
    } as any;
    GlossarySidebar(tree as Root, file);
    expect(file.data.astro.frontmatter.sidebar).toMatchSnapshot();
  });
});
