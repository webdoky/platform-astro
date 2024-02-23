export default async function sequentialAsyncMap<T, U>(
  array: T[],
  callback: (item: T) => Promise<U>,
): Promise<U[]> {
  const results: U[] = [];
  for (const item of array) {
    results.push(await callback(item));
  }
  return results;
}
