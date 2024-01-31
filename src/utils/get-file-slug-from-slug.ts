export default function getFileSlugFromId(id: string) {
  return id
    .slice(0, Math.max(0, id.length - '/index.md'.length))
    .replace(/^uk\//, '')
    .replace('-_colon_', '_colon_')
    .replace('-_doublecolon_', '_doublecolon_');
}
