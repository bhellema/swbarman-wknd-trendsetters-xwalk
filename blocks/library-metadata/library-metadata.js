export default async function decorate(block) {
  Array.from(block.children).forEach((row, i) => {
    row.querySelector('div:first-child').remove();
    if (i === 0) {
      const bold = document.createElement('h1');
      const div = row.children[0];
      bold.append(...div.children);
      div.append(bold);
    }
  });
}
