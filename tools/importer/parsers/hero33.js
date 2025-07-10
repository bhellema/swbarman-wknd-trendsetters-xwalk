/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as specified
  const headerRow = ['Hero (hero33)'];

  // Get main grid layout
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = Array.from(grid.children);

  // The first child is the image; the second is the content
  let imgEl = null;
  let contentEl = null;
  for (const child of gridChildren) {
    if (child.tagName === 'IMG') {
      imgEl = child;
    } else {
      contentEl = child;
    }
  }

  // Row 2: background image (if present)
  const rowImg = [imgEl ? imgEl : ''];

  // Row 3: headline, subheading, call-to-action, and all accompanying content
  const rowContent = [contentEl ? contentEl : ''];

  // Compose block table
  const cells = [
    headerRow,
    rowImg,
    rowContent
  ];

  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
