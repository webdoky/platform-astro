import GithubSlugger from 'github-slugger';
const slugger = new GithubSlugger();

export default function liveSampleUrl(
  sampleId: string,
  pagePath: string,
  currentPath: string,
) {
  slugger.reset();
  const samplePath = `${pagePath || currentPath}/_sample_.${slugger.slug(
    decodeURIComponent(sampleId),
  )}.html`;

  return samplePath;
}
