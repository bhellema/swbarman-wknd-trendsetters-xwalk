/* global WebImporter */
export default function parse(element, { document }) {
  // The block name for the header row
  const headerRow = ['Columns (columns12)'];

  // Find all direct child divs representing columns
  const columnDivs = Array.from(element.querySelectorAll(':scope > div'));

  // For each column, extract the main content (the aspect wrapper or its content)
  // We want the inner content (img or whatever is inside)
  const columnCells = columnDivs.map(col => {
    // If the column is a wrapper (e.g., .utility-aspect-1x1), extract its children
    // If it contains a single image, just use the image
    const img = col.querySelector('img');
    if (img && col.children.length === 1 && col.children[0].tagName === 'IMG') {
      return img; // Use the img element directly (not cloned)
    } else if (img) {
      return img; // Fallback: if there's an img, use it
    } else {
      // Fallback: use everything inside the column
      return Array.from(col.childNodes).filter(n => n.nodeType === 1 || (n.nodeType === 3 && n.textContent.trim()));
    }
  });

  // Construct the table cells
  const cells = [
    headerRow,
    columnCells
  ];

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
