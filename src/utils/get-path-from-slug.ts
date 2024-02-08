export default function getPathFromSlug(slug: string) {
  if (slug.includes('docs')) {
    // Internal content
    return `/${slug}/`;
  }
  return `/${import.meta.env.TARGET_LOCALE}/docs/${slug}/`;
}
