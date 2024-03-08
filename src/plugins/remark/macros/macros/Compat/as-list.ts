export default function asList<T>(a: T | T[]): T[] {
  return Array.isArray(a) ? a : [a];
}
