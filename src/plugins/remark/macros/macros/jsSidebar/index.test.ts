import type { Root } from 'mdast';
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';

import type { AstroFile } from '../../../validate-astro-file.ts';
import type { AbstractMacroParentNode } from '../../types.ts';

import jsSidebar from './index.ts';

vi.mock('../../../../registry/get-all.ts', () => ({
  default: vi.fn().mockReturnValue([]),
}));
vi.mock('../../../../registry/has-page.ts', () => ({
  default: vi.fn().mockReturnValue(true),
}));

describe('jsSidebar', () => {
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
            name: 'jsSidebar',
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
              slug: '',
            },
          },
        },
      } as any;
      jsSidebar(tree as Root, file as AstroFile);
    }).toThrowError('Sidebar already exists');
  });
  it('should add a sidebar to the frontmatter', () => {
    const tree: AbstractMacroParentNode = {
      type: 'root',
      children: [
        {
          type: 'macro',
          name: 'jsSidebar',
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
    } as AstroFile;
    jsSidebar(tree as Root, file);
    expect(file.data.astro.frontmatter.sidebar).toMatchSnapshot();
  });
});
