import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync } from 'node:fs';

export function saveData(
  place: string,
  kind: string,
  data: unknown,
  identity: string,
) {
  const json = JSON.stringify(data, undefined, 2);
  const hash = createHash('sha256').update(identity).digest('hex');
  const filename = `${hash}-${kind}.json`;
  mkdirSync(place, { recursive: true });
  writeFileSync(`${place}/${filename}`, json);
}
