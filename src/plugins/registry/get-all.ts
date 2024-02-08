import registry from './registry.ts';

export default function getAll() {
  if (registry.size === 0) {
    throw new Error('Registry is not initialized');
  }
  return [...registry.values()];
}
