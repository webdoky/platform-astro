export default function sortBySlug({ slug: slugA = '' }, { slug: slugB = '' }) {
  return slugA < slugB ? -1 : 1;
}
