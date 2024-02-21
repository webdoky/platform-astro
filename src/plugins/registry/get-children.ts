import getAll from './get-all.ts';

export default function getChildren(parentSlug: string, depth: number = 1) {
  const allPages = getAll();
  const initialDepth = parentSlug.split('/').length;
  return allPages
    .filter(({ slug }) => slug.startsWith(`${parentSlug}/`))
    .filter(({ slug }) => slug.split('/').length === initialDepth + depth);
}
