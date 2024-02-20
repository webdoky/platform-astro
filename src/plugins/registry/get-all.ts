import { translatedContentRegistry } from './index.ts';

export default function getAll() {
  if (translatedContentRegistry.size === 0) {
    throw new Error('Registry is not initialized');
  }
  return [...translatedContentRegistry.values()];
}
