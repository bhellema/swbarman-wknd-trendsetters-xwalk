/* global WebImporter */
export default function parse(element, { document }) {
  // Get the inner container
  const container = element.querySelector('.container');
  if (!container) return;

  // Get the grid layout
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  const gridChildren = Array.from(grid.children);
  const img = gridChildren.find((el) => el.tagName === 'IMG');
  const contentDiv = gridChildren.find((el) => el.tagName === 'DIV');

  // Compose content for the content cell
  let contentElements = [];
  if (contentDiv) {
    // Only include element nodes (keep element order and semantics)
    contentElements = Array.from(contentDiv.childNodes).filter(
      (el) => el.nodeType === Node.ELEMENT_NODE
    );
  }

  // Build table rows
  const headerRow = ['Hero (hero29)'];
  const imageRow = [img ? img : ''];
  const contentRow = [contentElements.length ? contentElements : ''];

  const cells = [headerRow, imageRow, contentRow];

  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
