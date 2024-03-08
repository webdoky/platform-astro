export default function getFirst<T>(a: T | T[]): T | undefined {
  return Array.isArray(a) ? a[0] : a;
}
