/* global WebImporter */
export default function parse(element, { document }) {
  // Get the main grid that defines the columns
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);
  // Prepare to identify content blocks
  let leftContent = null;
  let rightBlocks = [];
  // The left content is typically the <div> with h2, h3, p. The others are contact list <ul> and image <img>.
  for (const child of gridChildren) {
    // Identify the left content
    if (
      child.matches('div') &&
      (child.querySelector('h2') || child.querySelector('h3'))
    ) {
      leftContent = child;
    } else {
      rightBlocks.push(child);
    }
  }
  // The right column should include both contact list (ul) and image (img), stacked
  const rightCol = document.createElement('div');
  rightBlocks.forEach((block) => {
    rightCol.appendChild(block);
  });
  // Compose table cells for columns block
  const cells = [
    ['Columns (columns19)'],
    [leftContent, rightCol]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
