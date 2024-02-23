import { readdir, stat } from 'node:fs/promises';
import { join } from 'node:path';

// import sequentialAsyncMap from './sequential-async-map.ts';

// const LIMIT = 10;
// class WorkerPool<T> {
//   counter = 0;
//   tasks: Array<
//     [() => Promise<T>, (value: T) => void, (reason: unknown) => void]
//   > = [];

//   async process(task: () => Promise<T>) {
//     return new Promise<T>((resolve, reject) => {
//       this.tasks.push([task, resolve, reject]);
//     });
//   }
// }

// walk through all the Markdown files in the localized content directory
// export default async function walk(
//   directory: string,
//   callback: (path: string) => Promise<void>,
// ) {
//   const files = await readdir(directory);
//   await sequentialAsyncMap(files, async (f) => {
//     const fPath = join(directory, f);
//     const fStat = await stat(fPath);
//     const isDirectory = fStat.isDirectory();
//     await (isDirectory ? walk(fPath, callback) : callback(fPath));
//   });
// }

export default async function walk(
  directory: string,
  callback: (path: string) => Promise<void>,
) {
  const files = await readdir(directory);
  await Promise.all(
    files.map(async (f) => {
      const fPath = join(directory, f);
      const fStat = await stat(fPath);
      const isDirectory = fStat.isDirectory();
      await (isDirectory ? walk(fPath, callback) : callback(fPath));
    }),
  );
}
