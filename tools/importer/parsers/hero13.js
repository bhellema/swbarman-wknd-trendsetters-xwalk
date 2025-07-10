/* global WebImporter */
export default function parse(element, { document }) {
  // Block header row
  const headerRow = ['Hero (hero13)'];

  // Get all direct grid children
  const grid = element.querySelector(':scope > .w-layout-grid');
  let bgImg = null;
  let mainContent = null;

  if (grid) {
    const gridItems = grid.querySelectorAll(':scope > div');

    // Background image: first .cover-image img in the first grid cell
    if (gridItems[0]) {
      bgImg = gridItems[0].querySelector('img.cover-image');
    }
    // Main content: card-body in the second grid cell
    if (gridItems[1]) {
      const cardBody = gridItems[1].querySelector('.card-body');
      // Card can have nested elements, but we should reference the cardBody
      if (cardBody) {
        mainContent = cardBody;
      } else {
        // Fallback to the content container if .card-body is missing
        mainContent = gridItems[1];
      }
    }
  }

  // Ensure we always give something for each row (null if missing)
  const secondRow = [bgImg || ''];
  const thirdRow = [mainContent || ''];

  // Compose the block table
  const cells = [headerRow, secondRow, thirdRow];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
