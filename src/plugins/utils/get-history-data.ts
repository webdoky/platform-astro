import { execSync } from 'node:child_process';

function parseOutput(output: string): {
  publishedTime: Date;
  modifiedTime: Date;
  authors: string[];
} {
  const lines = output.split('\n');
  const firstLine = lines[0];
  if (!firstLine) {
    throw new Error('No history found');
  }
  const lastLine = lines.at(-1);
  if (!lastLine) {
    throw new Error('No history found');
  }
  const [publishedTimeTimestamp] = firstLine.split(' ');
  const publishedTime = new Date(Number(publishedTimeTimestamp) * 1000);
  const [modifiedTimeTimestamp] = lastLine.split(' ');
  const modifiedTime = new Date(Number(modifiedTimeTimestamp) * 1000);
  const authors = lines.map((line) => {
    const firstSpaceIndex = line.indexOf(' ');
    return line.slice(firstSpaceIndex + 1);
  });
  return { publishedTime, modifiedTime, authors };
}

export default function getHistoryData(
  submodulePath: string,
  filePath: string,
): { publishedTime: Date; modifiedTime: Date; authors: string[] } {
  // Run git log on the submodulePath and parse the output to get the publishedTime, modifiedTime, and authors

  const output = execSync(`git log --pretty=format:"%at %an" ${filePath}`, {
    cwd: submodulePath,
  });
  return parseOutput(output.toString());
}
