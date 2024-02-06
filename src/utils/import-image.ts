import { z } from 'zod';

const imageSchema = z.object({ src: z.string() });

export default async function importImage(path?: string) {
  if (!path) return;
  const { default: image } = await import(/* @vite-ignore */ path);
  return imageSchema.parse(image).src;
}
