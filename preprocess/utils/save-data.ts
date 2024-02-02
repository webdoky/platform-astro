import { createHash } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export default async function saveData(
  place: string,
  kind: string,
  data: unknown,
  identity: string,
) {
  const json = JSON.stringify(data, undefined, 2);
  const hash = createHash('sha256').update(identity).digest('hex');
  const filename = `${hash}-${kind}.json`;
  await mkdir(place, { recursive: true });
  await writeFile(join(place, filename), json);
}
