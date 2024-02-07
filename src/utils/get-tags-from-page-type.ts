const SECTION_MAPPING: Record<string, string> = {
  css: 'CSS',
  html: 'HTML',
  javascript: 'JavaScript',
  svg: 'SVG',
  glossary: 'Глосарій',
  guide: 'Посібник',
};

const PAGE_TYPE_MAPPING: Record<string, string> = {
  'css-at-rule': 'Директива CSS',
  'css-function': 'Функція CSS',
  'css-media-feature': 'Медійна ознака CSS',
  'css-module': 'Модуль CSS',
  'css-property': 'Властивість CSS',
  'css-pseudo-class': 'Псевдоклас CSS',
  'css-pseudo-element': 'Псевдоелемент CSS',
  'css-selector': 'Селектор CSS',
  'css-shorthand-property': 'Властивість-скорочення CSS',
  'css-type': 'Тип CSS',
  'glossary-definition': 'Визначення глосарія',
  'glossary-disambiguation': 'Уточнення глосарія',
  guide: 'Посібник',
  'html-attribute': 'Атрибут HTML',
  'html-attribute-value': 'Значення атрибуту HTML',
  'html-element': 'Елемент HTML',
  'javascript-class': 'Клас JavaScript',
  'javascript-constructor': 'Конструктор JavaScript',
  'javascript-error': 'Помилка JavaScript',
  'javascript-function': 'Функція JavaScript',
  'javascript-global-property': 'Глобальна властивість JavaScript',
  'javascript-instance-accessor-property':
    'Аксесорна властивість примірника JavaScript',
  'javascript-instance-data-property':
    'Властивість даних примірника JavaScript',
  'javascript-instance-method': 'Метод примірника JavaScript',
  'javascript-language-feature': 'Можливість мови JavaScript',
  'javascript-namespace': 'Простір імен JavaScript',
  'javascript-operator': 'Оператор JavaScript',
  'javascript-statement': 'Інструкція JavaScript',
  'javascript-static-data-property': 'Статична властивість даних JavaScript',
  'javascript-static-method': 'Статичний метод JavaScript',
  'landing-page': 'Цільова сторінка',
  'svg-attribute': 'Атрибут SVG',
  'svg-element': 'Елемент SVG',
};

export default function getTagsFromPageType({
  'page-type': pageType,
  section,
}: {
  'page-type': string;
  section: string;
}) {
  const tags = [];
  const prettyName = PAGE_TYPE_MAPPING[pageType];
  if (prettyName) {
    tags.push(prettyName);
  } else {
    console.warn(`No pretty name for page type: ${pageType}`);
    tags.push(pageType);
  }
  const sectionPrettyName = SECTION_MAPPING[section];
  if (sectionPrettyName) {
    tags.push(sectionPrettyName);
  } else {
    console.warn(`No pretty name for section: ${section}`);
    tags.push(section);
  }
  return tags;
}
