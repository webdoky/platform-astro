import { getCollection, type CollectionKey } from 'astro:content';

export interface HierarchyEntry {
  title: string;
  slug: string;
  children: HierarchyEntry[];
}

function getDepth(slug: string) {
  return slug.split('/').length;
}

function getKin(slug: string) {
  return slug.split('/').map((_, index, parts) => {
    return parts.slice(0, index + 1).join('/');
  });
}

function findParent(
  potentialParent: HierarchyEntry,
  parentSlug: string,
): HierarchyEntry | undefined {
  if (potentialParent.slug === parentSlug) {
    return potentialParent;
  }
  for (let child of potentialParent.children) {
    const found = findParent(child, parentSlug);
    if (found) {
      return found;
    }
  }
  return;
}

function processRecursively(
  hierarchyEntry: HierarchyEntry,
  callback: (entry: HierarchyEntry) => void,
) {
  callback(hierarchyEntry);
  for (let child of hierarchyEntry.children) {
    processRecursively(child, callback);
  }
}

export default async function getHierarchy(
  collectionName: CollectionKey,
  // maxDepth: number = 2,
) {
  const entries = await getCollection(collectionName);
  const hierarchy: HierarchyEntry[] = [];
  entries.sort((entryA, entryB) => {
    const byDepth = getDepth(entryA.slug) - getDepth(entryB.slug);
    if (byDepth !== 0) return byDepth;
    return entryA.slug < entryB.slug ? -1 : 1;
  });
  for (let entry of entries) {
    // if (getDepth(entry.slug) > maxDepth || entry.slug.includes('Glossary/')) {
    //   continue;
    // }
    const kin = getKin(entry.slug);
    if (kin.length === 1) {
      hierarchy.push({
        title: entry.data.title,
        slug: entry.slug,
        children: [],
      });
    } else {
      const parentSlug = kin.at(-2);
      if (!parentSlug) {
        throw new Error('No parent found for ' + entry.slug);
      }
      for (let potentialParent of hierarchy) {
        const parent = findParent(potentialParent, parentSlug);
        if (parent) {
          parent.children.push({
            title: entry.data.title,
            slug: entry.slug,
            children: [],
          });
          break;
        } else {
          console.warn('No parent found for', entry.slug);
        }
      }
    }
  }
  hierarchy.sort((entryA, entryB) => {
    return entryA.title.localeCompare(entryB.title, process.env.TARGET_LOCALE);
  });

  for (let entry of hierarchy) {
    processRecursively(entry, (entry) => {
      entry.children.sort((entryA, entryB) => {
        return entryA.title.localeCompare(
          entryB.title,
          process.env.TARGET_LOCALE,
        );
      });
    });
  }

  return hierarchy;
}
