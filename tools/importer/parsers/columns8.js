/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main grid containing the columns
  let grid = element.querySelector('.w-layout-grid.grid-layout');
  let contentRow = [];

  if (grid) {
    // Each direct child of the grid is a column (reference original element, not clone)
    contentRow = Array.from(grid.children);
  } else {
    // Fallback: treat the whole element as a single column
    contentRow = [element];
  }

  // Create table manually to add colspan to the header if needed
  const table = document.createElement('table');

  // Header row: one column, with colspan if more than 1 content column
  const headerTr = document.createElement('tr');
  const th = document.createElement('th');
  th.textContent = 'Columns (columns8)';
  if (contentRow.length > 1) {
    th.setAttribute('colspan', String(contentRow.length));
  }
  headerTr.appendChild(th);
  table.appendChild(headerTr);

  // Content row: one <td> per column
  const contentTr = document.createElement('tr');
  contentRow.forEach(col => {
    const td = document.createElement('td');
    td.appendChild(col);
    contentTr.appendChild(td);
  });
  table.appendChild(contentTr);

  element.replaceWith(table);
}
