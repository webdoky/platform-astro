import cyrillicToTranslit from 'cyrillic-to-translit-js';
import type GithubSlugger from 'github-slugger';

const CYRILLIC_REGEXP = /[ІЇА-яії]/;
const ukrainianCyrillicToTranslit = (cyrillicToTranslit as any)({
  preset: 'uk',
});

function hasUkrainianCyrillic(text: string) {
  return CYRILLIC_REGEXP.test(text);
}

export default function getIdFromText(text: string, slugger: GithubSlugger) {
  let latinText = hasUkrainianCyrillic(text)
    ? ukrainianCyrillicToTranslit.transform(text)
    : text;
  return slugger.slug(latinText);
}
