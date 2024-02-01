import { getEntry } from 'astro:content';

const presentSlugs = new Map<string, boolean>();

async function initPage(slug: string) {
  const value = !!(await getEntry('processed-content', slug));
  presentSlugs.set(slug, value);
  return value;
}

export default async function hasPage(slug: string): Promise<boolean> {
  return presentSlugs.get(slug) ?? (await initPage(slug));
}
