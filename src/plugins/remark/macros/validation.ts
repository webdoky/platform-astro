import { z } from 'zod';

export const wrappedStringSchema = z.string().transform((value) => {
  // console.log('input', value);
  // console.log('input', value.replaceAll('“', '"').replaceAll('”', '"'));
  let transformed = value;
  if (transformed.startsWith("'")) {
    transformed = '"' + transformed.slice(1);
  }
  if (transformed.endsWith("'")) {
    transformed = transformed.slice(0, -1) + '"';
  }
  // transformed = transformed.replaceAll('“', '"').replaceAll('”', '"');
  // console.log('transformed', transformed);
  return z.string().parse(JSON.parse(transformed));
});

export const wrappedNumberSchema = z.preprocess(
  (value_) => Number.parseInt(`${value_}`, 10),
  z.number(),
);
