import { z } from 'zod';

export const rawPageSchema = z.object({
  'browser-compat': z.optional(z.union([z.string(), z.array(z.string())])),
  'page-type': z.string().default('unknown'),
  'spec-urls': z.optional(z.union([z.string(), z.array(z.string())])),
  slug: z.string().min(1),
  status: z.optional(
    z.array(z.enum(['deprecated', 'experimental', 'non-standard'])),
  ),
  title: z.string().min(1),
});

export type RawPage = z.infer<typeof rawPageSchema>;
