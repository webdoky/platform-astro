import { z } from 'zod';

import getJsonData from './get-json-data.ts';
export default function localize(packName: string, key: string) {
  const targetLocale = process.env.TARGET_LOCALE;
  if (!targetLocale) {
    throw new Error('TARGET_LOCALE is not defined');
  }
  const rawPack = getJsonData(packName);
  const pack = localizationPackSchema.parse(rawPack);
  return pack[key]![targetLocale];
}
const localizationPackSchema = z.record(z.record(z.string().min(1)));
