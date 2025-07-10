/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: exactly one cell, with the block name as specified
  const headerRow = ['Columns (columns30)'];

  // Second row: as many cells as there are immediate child columns
  const columns = Array.from(element.querySelectorAll(':scope > div'));
  const contentRow = columns.map(col => col);

  // Table structure: header row (1 cell), then content row (n cells)
  const cells = [
    headerRow,
    contentRow
  ];

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);

  // Replace the original element with the table
  element.replaceWith(table);
}