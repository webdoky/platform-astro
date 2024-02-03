import registry from './registry.js';

export default function hasPage(slug: string): boolean {
  if (registry.size === 0) {
    throw new Error('Registry is not initialized');
  }
  return registry.has(slug);
}
