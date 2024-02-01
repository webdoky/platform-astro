import { z, defineCollection } from 'astro:content';

const processedContent = defineCollection({
  type: 'content',
  schema: z.object({
    'browser-compat': z.optional(z.union([z.string(), z.array(z.string())])),
    // slug: z.string(),
    'page-type': z.string().default('unknown'),
    'spec-urls': z.optional(z.union([z.string(), z.array(z.string())])),
    status: z.optional(
      z.array(z.enum(['deprecated', 'experimental', 'non-standard'])),
    ),
    title: z.string(),
  }),
});

// eslint-disable-next-line import/prefer-default-export
export const collections = {
  'processed-content': processedContent,
};
