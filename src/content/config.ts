import { z, defineCollection } from 'astro:content';

const internalContent = defineCollection({
  type: 'content',
  schema: z.object({
    description: z.string(),
    next: z.optional(z.string()),
    prev: z.optional(z.string()),
    title: z.string(),
  }),
});

const content = defineCollection({
  type: 'content',
  //({ image }) =>
  schema: z.object({
    'browser-compat': z.optional(z.union([z.string(), z.array(z.string())])),
    // cover: z.optional(image()),
    // coverAlt: z.optional(z.string()),
    // description: z.string().min(1),
    'page-type': z.string().default('unknown'),
    // section: z.string().min(1),
    'spec-urls': z.optional(z.union([z.string(), z.array(z.string())])),
    status: z.optional(
      z.array(z.enum(['deprecated', 'experimental', 'non-standard'])),
    ),
    title: z.string().min(1),
  }),
});

// eslint-disable-next-line import/prefer-default-export
export const collections = {
  'internal-content': internalContent,
  // 'original-content': content,
  'processed-content': content,
};
