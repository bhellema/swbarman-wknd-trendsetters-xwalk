/* global WebImporter */
export default function parse(element, { document }) {
  // Get all immediate direct children of the grid (these are the columns)
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Compose the table rows: first header, then array of columns as the second row
  const tableCells = [
    ['Columns (columns39)'],
    columns
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(tableCells, document);

  // Replace element in DOM
  element.replaceWith(block);
}
