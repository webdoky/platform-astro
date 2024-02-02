export default function getAbsoluteUrl(url: string) {
  const base = import.meta.env.BASE_PATH;
  return new URL(url, base).toString();
}
