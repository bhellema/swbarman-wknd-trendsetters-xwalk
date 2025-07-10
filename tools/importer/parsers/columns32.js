/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid layout container
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;

  // Get all immediate children (columns) of the grid
  const columns = Array.from(grid.children);
  if (columns.length === 0) return;

  // The header row must be a single cell array
  const headerRow = ['Columns (columns32)'];
  // The second row: as many columns as found
  const contentRow = columns;

  // Build the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
