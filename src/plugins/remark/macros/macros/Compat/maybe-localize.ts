import LOCALIZATION from './localization.json';

const seenMisses = new Set<string>();

export default function maybeLocalize(
  name: string | unknown,
): string | unknown {
  if (typeof name !== 'string') {
    return name;
  }
  if (name in LOCALIZATION) {
    return (LOCALIZATION as Record<string, string>)[name];
  }
  if (!seenMisses.has(name)) {
    console.warn(`No localization for "${name}"`);
    seenMisses.add(name);
  }
  return name;
}
