/* global WebImporter */
export default function parse(element, { document }) {
  // Find the grid that contains the footer columns
  const grid = element.querySelector('.w-layout-grid.grid-layout');
  if (!grid) return;
  
  // Get all direct children of the grid; each is a column
  const columns = Array.from(grid.children);

  // If there are no columns, don't process
  if (columns.length === 0) return;

  // Prepare the header as specified in the guidelines
  const headerRow = ['Columns (columns11)'];

  // The next row contains each column's DOM node, preserving all its structure and semantics
  const contentRow = columns;

  // Build the block table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    contentRow
  ], document);

  // Replace the original footer element with the new table
  element.replaceWith(table);
}
