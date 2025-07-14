/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Hero (hero13)'];

  // Get all direct grid children
  const grid = element.querySelector(':scope > .w-layout-grid');
  let bgImg = null;
  let mainContent = null;

  if (grid) {
    const gridItems = grid.querySelectorAll(':scope > div:nth-child(2)');
    bgImg = gridItems[0].querySelector('img');
    mainContent = gridItems[0].querySelector('div');
  }

  // Ensure we always give something for each row (null if missing)
  const secondRow = [bgImg || ''];
  const thirdRow = [mainContent || ''];

  // Compose the block table
  const cells = [headerRow, secondRow, thirdRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
