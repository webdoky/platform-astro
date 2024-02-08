import type { VFile } from 'vfile';
import { z } from 'zod';

export const sidebarLinkSchema = z.object({
  hasTranslation: z.boolean(),
  isCurrent: z.boolean(),
  path: z.string().min(1),
  title: z.string().min(1),
});

export const astroFileSchema = z.object({
  data: z.object({
    astro: z.object({
      frontmatter: z.object({
        authors: z.array(z.string()).optional(),
        'browser-compat': z.union([z.string(), z.array(z.string())]).optional(),
        cover: z.string().optional(),
        coverAlt: z.string().optional(),
        description: z.string().min(1).optional(),
        'page-type': z.string().default('unknown'),
        modifiedTime: z.date().optional(),
        publishedTime: z.date().optional(),
        section: z.string().min(1).optional(),
        sidebar: z
          .array(
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
          )
          .optional(),
        slug: z.string().min(1),
        'spec-urls': z.union([z.string(), z.array(z.string())]).optional(),
        status: z
          .array(z.enum(['deprecated', 'experimental', 'non-standard']))
          .optional(),
        title: z.string().min(1),
      }),
    }),
  }),
});

export type AstroFile = z.infer<typeof astroFileSchema> & VFile;
