import registry from './registry.js';

export default function hasPage(slug: string): boolean {
  if (!slug) {
    throw new Error('Slug is required');
  }
  if (registry.size === 0) {
    throw new Error('Registry is not initialized');
  }
  return registry.has(slug);
}
