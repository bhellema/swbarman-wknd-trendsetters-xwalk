/* global WebImporter */
export default function parse(element, { document }) {
  // Header row exactly as required
  const headerRow = ['Columns'];

  // Get top-level columns (should be two for each row)
  const mainRows = Array.from(element.querySelectorAll(':scope > div'));
  // Guard against missing or malformed columns
  if (mainRows.length < 2) {
    // Not enough rows for a columns block, do nothing
    return;
  }

  // For each main row, get its children (columns)
  const rowCells = mainRows.map(row => {
    // Only consider immediate children
    return Array.from(row.querySelectorAll(':scope > div'));
  });

  // Validate each row has the same number of columns as the first
  const colCount = rowCells[0].length;
  if (colCount < 1) return;

  // Only include rows that have the correct number of columns
  const validRows = rowCells.filter(cells => cells.length === colCount);
  if (validRows.length < 1) return;

  // Compose cells: header, then each row as a row of cells
  const cells = [headerRow, ...validRows];

  // Create and replace with the new block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
