
import { getEntryBySlug } from "astro:content";
const presentSlugs = new Map();

export default async function hasPage(slug: string): Promise<boolean> {
  if (presentSlugs.has(slug)) {
    return presentSlugs.get(slug);
  }
  const value = !!(await getEntryBySlug('translatedContent', slug));
    presentSlugs.set(slug, value);
    return value;
}