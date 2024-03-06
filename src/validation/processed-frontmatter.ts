import { z } from 'astro:content';

export const sidebarLinkSchema = z.object({
  hasTranslation: z.boolean(),
  isCurrent: z.boolean(),
  path: z.string().min(1),
  title: z.string().min(1),
});
export type SidebarLink = z.infer<typeof sidebarLinkSchema>;
export const sidebarSchema = z.array(
  z.object({
    links: z.array(sidebarLinkSchema),
    sections: z.array(
      z.object({
        expanded: z.boolean(),
        items: z.array(sidebarLinkSchema),
        title: z.string().min(1),
      }),
    ),
  }),
);
export type SidebarData = z.infer<typeof sidebarSchema>;
const processedFrontmatterSchema = z.object({
  authors: z.array(z.string()),
  'browser-compat': z.union([z.string(), z.array(z.string())]).optional(),
  cover: z.string().optional(),
  coverAlt: z.string().optional(),
  description: z.string(),
  modifiedTime: z.string().transform((value) => new Date(value)),
  publishedTime: z.string().transform((value) => new Date(value)),
  section: z.string(),
  sidebar: sidebarSchema.optional(),
  'spec-urls': z.union([z.string(), z.array(z.string())]).optional(),
});

export default processedFrontmatterSchema;

export type ProcessedFrontmatter = z.infer<typeof processedFrontmatterSchema>;
