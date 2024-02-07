import { z } from 'astro:content';

const processedFrontmatterSchema = z.object({
  authors: z.array(z.string()),
  cover: z.string().optional(),
  coverAlt: z.string().optional(),
  description: z.string(),
  modifiedTime: z.string().transform((value) => new Date(value)),
  publishedTime: z.string().transform((value) => new Date(value)),
  section: z.string(),
});

export default processedFrontmatterSchema;

export type ProcessedFrontmatter = z.infer<typeof processedFrontmatterSchema>;
