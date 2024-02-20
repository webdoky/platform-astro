import { translatedContentRegistry } from './index.ts';
import { initRegistry } from './registry.ts';

export default async function initTranslatedRegistry() {
  const PATH_TO_LOCALIZED_CONTENT = process.env.PATH_TO_LOCALIZED_CONTENT;
  if (!PATH_TO_LOCALIZED_CONTENT) {
    throw new Error('process.env.PATH_TO_LOCALIZED_CONTENT is not defined');
  }
  const TARGET_LOCALE = process.env.TARGET_LOCALE;
  if (!TARGET_LOCALE) {
    throw new Error('process.env.TARGET_LOCALE is not defined');
  }
  await initRegistry(
    translatedContentRegistry,
    PATH_TO_LOCALIZED_CONTENT,
    TARGET_LOCALE,
  );
}
