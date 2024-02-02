export default function normalizeUrl(url: string) {
  return url.endsWith('/') ? url : `${url}/`;
}
