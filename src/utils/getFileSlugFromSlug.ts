export default function getFileSlugFromSlug(slug: string) {
    return slug.toLowerCase().replace(':', '_colon_').replace('::', '_doublecolon_');
}