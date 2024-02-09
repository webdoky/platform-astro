import getAll from './get-all.ts';

export default function getChildren(parentSlug: string) {
  const allPages = getAll();
  return allPages.filter(({ slug }) => slug.startsWith(`${parentSlug}/`));
}
