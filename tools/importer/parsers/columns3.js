/* global WebImporter */
export default function parse(element, { document }) {
  // Find the actual columns block inside the wrapper
  let columnsBlock = element;
  if (!columnsBlock.classList.contains('columns')) {
    const found = columnsBlock.querySelector('.columns.block');
    if (found) columnsBlock = found;
  }

  // Get all top-level rows (each 'div' child of columns block)
  const rows = Array.from(columnsBlock.children).filter(
    (row) => row.tagName === 'DIV'
  );

  // Prepare table rows
  const cells = [];
  // Header row must be a SINGLE cell, regardless of column count
  cells.push(['Columns']);

  // Each row of the columns block is a flex/grid row, each child is a column
  rows.forEach((row) => {
    // For this HTML, each row is two columns (divs)
    const cols = Array.from(row.children).filter(
      (col) => col.tagName === 'DIV'
    );
    // Each content row must be an array of columns (cells) as-is
    cells.push(cols);
  });

  // Create the block table
  const table = WebImporter.DOMUtils.createTable(cells, document);
  // Replace the original element with the new table
  element.replaceWith(table);
}
