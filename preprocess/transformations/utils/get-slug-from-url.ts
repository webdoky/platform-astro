export default function getSlugFromUrl(url: string) {
  const [urlWithoutAnchor] = url.split('#');
  if (!process.env.TARGET_LOCALE) {
    throw new Error('process.env.TARGET_LOCALE is not defined');
  }
  const [, slug] = urlWithoutAnchor.split(
    `/${process.env.TARGET_LOCALE}/docs/`,
  );
  return slug;
}
