const tocHeading = document.querySelector('#toc-heading');
if (tocHeading) {
  const icon = tocHeading.querySelector('svg');
  if (!icon) {
    throw new Error('No TOC icon found');
  }
  tocHeading.role = 'button';
  const collapsible = tocHeading.nextElementSibling;
  if (!collapsible) {
    throw new Error('No TOC found');
  }
  tocHeading.addEventListener('click', () => {
    icon.classList.toggle('rotate-180');
    collapsible.classList.toggle('max-h-0');
  });
}
