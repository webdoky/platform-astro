export default function getSectionFromSlug(slug: string): string {
  const slugParts = slug.split('/');
  let section = slugParts[0];
  if (section === 'Web' && slugParts.length > 1) {
    section = slugParts[1];
  }
  if (!section) {
    throw new Error(`No section found for slug "${slug}"`);
  }
  return section.toLowerCase();
}
