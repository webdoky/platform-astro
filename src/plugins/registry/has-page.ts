import { translatedContentRegistry } from './index.ts';

export default function hasPage(slug: string): boolean {
  if (!slug) {
    throw new Error('Slug is required');
  }
  if (translatedContentRegistry.size === 0) {
    throw new Error('Registry is not initialized');
  }
  return translatedContentRegistry.has(slug);
}
