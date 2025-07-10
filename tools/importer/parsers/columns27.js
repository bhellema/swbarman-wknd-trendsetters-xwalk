/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main .container
  const container = element.querySelector('.container');
  if (!container) return;

  // Find the main grid layout with the columns structure
  // It's usually the first .grid-layout inside the container
  const grid = container.querySelector('.grid-layout');
  if (!grid) return;

  // Get all direct children of the grid
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // Prepare the columns block table
  const headerRow = ['Columns (columns27)'];
  const columnsRow = columns;
  const cells = [headerRow, columnsRow];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
