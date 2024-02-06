export default function getSlugFromUrl(url: string): string {
  // console.log('getSlugFromUrl', url);
  const [urlWithoutAnchor] = url.split('#');
  if (!process.env.TARGET_LOCALE) {
    throw new Error('process.env.TARGET_LOCALE is not defined');
  }
  if (!urlWithoutAnchor) {
    throw new Error('urlWithoutAnchor is required');
  }
  const separator = urlWithoutAnchor.includes(
    `/${process.env.TARGET_LOCALE}/docs/`,
  )
    ? `/${process.env.TARGET_LOCALE}/docs/`
    : '/docs/';
  const [, slug] = urlWithoutAnchor.split(separator);
  if (!slug) {
    return urlWithoutAnchor.startsWith('/')
      ? urlWithoutAnchor.slice(1)
      : urlWithoutAnchor;
  }
  return slug;
}
