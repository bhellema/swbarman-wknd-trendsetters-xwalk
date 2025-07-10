/* global WebImporter */
export default function parse(element, { document }) {
  // Find the main two-column grid
  const mainGrid = element.querySelector('.w-layout-grid.grid-layout.tablet-1-column.grid-gap-lg');
  let leftCell = [];
  let rightCell = [];
  if (mainGrid) {
    const left = mainGrid.children[0];
    const right = mainGrid.children[1];
    if (left) leftCell = Array.from(left.childNodes);
    if (right) rightCell = Array.from(right.childNodes);
  }

  // Find the image grid for bottom row
  const imgGrid = element.querySelector('.w-layout-grid.grid-layout.mobile-portrait-1-column.grid-gap-md.utility-margin-top-8rem.y-top');
  let img1 = '';
  let img2 = '';
  if (imgGrid) {
    const imgs = imgGrid.querySelectorAll('img');
    if (imgs[0]) img1 = imgs[0];
    if (imgs[1]) img2 = imgs[1];
  }

  // Construct the rows
  const rows = [];
  rows.push(['Columns (columns16)']);
  rows.push([leftCell, rightCell]);
  rows.push([img1, img2]);

  // Create and replace with table
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
