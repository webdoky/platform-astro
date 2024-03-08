import type { CompatStatement, Identifier } from '@mdn/browser-compat-data';

export interface Feature {
  compat?: CompatStatement;
  isRoot: boolean;
  name: string;
}

export default function listFeatures(
  identifier: Identifier,
  parentName = '',
  rootName = '',
) {
  const features: Feature[] = [];
  if (rootName && identifier.__compat) {
    features.push({
      name: rootName,
      compat: identifier.__compat,
      isRoot: true,
    });
  }

  for (const [subName, subIdentifier] of Object.entries(identifier)) {
    if (subName !== '__compat' && (subIdentifier as Identifier).__compat) {
      features.push(
        {
          name: parentName ? `${parentName}.${subName}` : subName,
          compat: (subIdentifier as Identifier).__compat,
          isRoot: parentName !== '',
        },
        ...listFeatures(subIdentifier as Identifier, subName),
      );
    }
  }
  return features;
}
