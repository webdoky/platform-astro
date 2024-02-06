const title =
  'Це посилання веде на сторінку, якої ще не існує. Ймовірно, ми її ще не переклали.';
document.addEventListener('DOMContentLoaded', () => {
  for (const element of document.querySelectorAll(
    '.wd-nav-link-not-translated',
  )) {
    element.setAttribute('title', title);
  }
});
