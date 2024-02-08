const header = document.querySelector('header');
function scrollToHash(hash: string) {
  const target = document.querySelector(hash);
  if (!target) {
    return;
  }
  if (!header) {
    throw new Error('Header not found');
  }
  const headerHeight = header.getBoundingClientRect().height;
  const targetY =
    target.getBoundingClientRect().top + window.scrollY - headerHeight;
  window.scrollTo({ top: targetY, behavior: 'smooth' });
  history.pushState(undefined, '', hash);
}
function handleAnchorClick(event: MouseEvent) {
  event.preventDefault();
  if (!event.target) {
    throw new Error('Event target not found');
  }
  scrollToHash((event.target as HTMLAnchorElement).hash);
}
window.addEventListener('popstate', (event) => {
  if (
    event.state &&
    typeof event.state === 'string' &&
    event.state.startsWith('#')
  ) {
    scrollToHash(event.state);
  } else {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
});
for (const tocLink of document.querySelectorAll('aside.toc a')) {
  tocLink.addEventListener('click', handleAnchorClick as EventListener);
}
if (window.location.hash) {
  scrollToHash(window.location.hash);
}
