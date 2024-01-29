export default function getFileSlugFromId(id: string) {
    return id.substring(0, id.length - '/index.md'.length);
}