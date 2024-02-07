import { OGImageRoute } from 'astro-og-canvas';
import { getCollection, getEntry, z } from 'astro:content';

import processedFrontmatterSchema from '../../validation/processed-frontmatter.ts';

const pageSchema = z.object({
  data: z.object({
    title: z.string().min(1),
  }),
  render: z
    .function()
    .returns(
      z.promise(
        z.object({ remarkPluginFrontmatter: processedFrontmatterSchema }),
      ),
    ),
  slug: z.string().min(1),
});
const stringSchema = z.string().min(1);

const collectionEntries = await getCollection('processed-content');

function escapeSlug(slug: string) {
  return slug.replace('...', '_ellipsis_');
}

// function unescapeSlug(slug: string) {
//   return slug.replace('_ellipsis_', '...');
// }

const pages = Object.fromEntries(
  collectionEntries.map(({ slug }) => [escapeSlug(slug), slug]),
);

export const { getStaticPaths, GET } = OGImageRoute({
  pages: pages,
  param: 'slug',

  getImageOptions: async (_path: unknown, record: unknown) => {
    const slug = stringSchema.parse(record);
    const entry = await getEntry('processed-content', slug);
    const processedPage = pageSchema.parse(entry);
    const { remarkPluginFrontmatter } = await processedPage.render();
    return {
      bgGradient: [[255, 255, 255]],
      description: remarkPluginFrontmatter.description,
      font: {
        title: {
          color: [0, 0, 0],
          families: ['Roboto'],
          size: 90,
          weight: 'Bold',
        },
        description: { color: [0, 0, 0], families: ['Roboto'] },
      },
      fonts: [
        './assets/fonts/Roboto-Bold.ttf',
        './assets/fonts/Roboto-Regular.ttf',
      ],
      logo: {
        path: './assets/logo.png',
        size: [100],
      },
      slug: processedPage.slug,
      title: processedPage.data.title,
      // There are a bunch more options you can use here!
    };
  },
});
