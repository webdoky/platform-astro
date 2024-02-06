const REGEXP =
  /{{[\w-_]+(?:\(["']([^"'),]*)["'](?:, ?["']([^"'),]*)["'])?(?:, ?["']?[^"'),]*["']?)*\))?}}/g;

export default function stripMacros(text: string) {
  return text.replaceAll(REGEXP, (_match, p1, p2) => p2 || p1 || '');
}
