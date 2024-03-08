export default function icon({ name }: { name: string }) {
  return `<abbr class="only-icon" title="${name}">
      <span>${name}</span>
      <i class="icon icon-${name}" />
    </abbr>`;
}
