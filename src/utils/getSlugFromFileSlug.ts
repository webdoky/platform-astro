export default function getSlugFromFileSlug(pathSlug: string) {
    return pathSlug.replace('_colon_', ':').replace('_doublecolon_', '::');
}