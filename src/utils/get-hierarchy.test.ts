import { describe, expect, it, vi } from 'vitest';

import getHierarchy from './get-hierarchy.ts';

vi.mock('astro:content', () => ({
  getCollection: vi.fn().mockResolvedValue([
    { data: { title: 'A' }, slug: 'a' },
    { data: { title: 'B' }, slug: 'a/b' },
    { data: { title: 'C' }, slug: 'a/b/c' },

    { data: { title: 'D' }, slug: 'd' },
    { data: { title: 'E' }, slug: 'd/e' },
    { data: { title: 'F' }, slug: 'd/e/f' },

    { data: { title: 'G' }, slug: 'g' },
  ]),
}));

describe('getHierarchy', () => {
  it('should return the correct hierarchy', async () => {
    const hierarchy = await getHierarchy('processed-content');
    expect(hierarchy).toEqual([
      {
        title: 'A',
        slug: 'a',
        children: [
          {
            title: 'B',
            slug: 'a/b',
            children: [
              {
                title: 'C',
                slug: 'a/b/c',
                children: [],
              },
            ],
          },
        ],
      },
      {
        title: 'D',
        slug: 'd',
        children: [
          {
            title: 'E',
            slug: 'd/e',
            children: [
              {
                title: 'F',
                slug: 'd/e/f',
                children: [],
              },
            ],
          },
        ],
      },
      {
        title: 'G',
        slug: 'g',
        children: [],
      },
    ]);
  });
});
