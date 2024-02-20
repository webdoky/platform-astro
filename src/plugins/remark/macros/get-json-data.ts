import { readFileSync } from 'node:fs';
import { join } from 'node:path';

const registry = new Map<string, unknown>();

export default function getJsonData(name: string) {
  if (registry.has(name)) {
    return registry.get(name);
  }
  const PATH_TO_LOCALIZED_CONTENT = process.env.PATH_TO_LOCALIZED_CONTENT;
  if (!PATH_TO_LOCALIZED_CONTENT) {
    throw new Error('PATH_TO_LOCALIZED_CONTENT is not defined');
  }
  const targetLocale = process.env.TARGET_LOCALE;
  if (!targetLocale) {
    throw new Error('TARGET_LOCALE is not defined');
  }
  const json = readFileSync(
    join(PATH_TO_LOCALIZED_CONTENT, 'files', 'jsondata', `${name}.json`),
    'utf8',
  );
  const data = JSON.parse(json);
  registry.set(name, data);
  return data;
}
