export default function getPathFromSlug(slug: string) {
  return `/${import.meta.env.TARGET_LOCALE}/docs/${slug}`;
}