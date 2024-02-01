import { toString } from 'mdast-util-to-string';
import { readingTime } from 'reading-time-estimator';

export default function remarkReadingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const result = readingTime(textOnPage);
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    data.astro.frontmatter.minutesRead = 'Хвилин читання: ' + result.minutes;
  };
}
