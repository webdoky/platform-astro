import { originalContentRegistry } from './index.ts';
import { initRegistry } from './registry.ts';

export default async function initOriginalRegistry() {
  const PATH_TO_ORIGINAL_CONTENT = process.env.PATH_TO_ORIGINAL_CONTENT;
  if (!PATH_TO_ORIGINAL_CONTENT) {
    throw new Error('process.env.PATH_TO_ORIGINAL_CONTENT is not defined');
  }
  await initRegistry(
    originalContentRegistry,
    PATH_TO_ORIGINAL_CONTENT,
    'en-us',
  );
}
