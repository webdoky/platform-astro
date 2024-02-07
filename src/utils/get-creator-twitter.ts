const CREATOR_MAPPING: Record<string, string> = {
  'Mykola Myslovskyi': '@adriandecita',
  'Vitalii Perehonchuk': '@negativo_ua',
};

export default function getCreatorTwitter(
  creatorName?: string,
): string | undefined {
  if (!creatorName) {
    return undefined;
  }
  return CREATOR_MAPPING[creatorName];
}
