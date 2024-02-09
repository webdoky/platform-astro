import { z } from 'zod';

export const wrappedStringSchema = z.string().transform((value) => {
  // console.log('input', value.replaceAll('“', '"').replaceAll('”', '"'));
  return z
    .string()
    .parse(JSON.parse(value.replaceAll('“', '"').replaceAll('”', '"')));
});
