import { z } from 'astro:content';

const processedFrontmatterSchema = z.object({
  cover: z.string().optional(),
  coverAlt: z.string().optional(),
  description: z.string(),
  section: z.string(),
});

export default processedFrontmatterSchema;

export type ProcessedFrontmatter = z.infer<typeof processedFrontmatterSchema>;
