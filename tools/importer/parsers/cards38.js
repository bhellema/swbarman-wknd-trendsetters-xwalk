/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const cells = [['Cards (cards38)']];

  // Find the container holding the cards
  const container = element.querySelector('.container');
  if (!container) return;
  const mainGrid = container.querySelector('.w-layout-grid');
  if (!mainGrid) return;

  // Find all cards in the grid, including nested grids
  const cardElements = [];
  // Helper to gather <a> children of a grid
  function gatherCards(grid) {
    Array.from(grid.children).forEach(child => {
      if (child.tagName === 'A' && child.classList.contains('utility-link-content-block')) {
        cardElements.push(child);
      } else if (child.classList.contains('w-layout-grid')) {
        gatherCards(child);
      }
    });
  }
  gatherCards(mainGrid);

  // For each card, extract image and text content
  cardElements.forEach(card => {
    // IMAGE/ICON: always in a div with utility-aspect-* class, which contains an <img>
    let imageDiv = card.querySelector('.utility-aspect-2x3, .utility-aspect-1x1');
    let image = imageDiv ? imageDiv.querySelector('img, svg') : null;

    // TEXT: If there is a .utility-padding-all-2rem, use it. Else, use all children that are not the image/aspect wrappers.
    let textContent = card.querySelector('.utility-padding-all-2rem');
    if (!textContent) {
      // Some cards (smaller ones) have text directly as h3/h4 + p
      const div = document.createElement('div');
      Array.from(card.children).forEach(child => {
        if (
          !child.classList.contains('utility-aspect-2x3') &&
          !child.classList.contains('utility-aspect-1x1')
        ) {
          div.appendChild(child);
        }
      });
      textContent = div;
    }
    // If no image or no text, skip this card
    if (!image || !textContent) return;
    // Table row: [image, text]
    cells.push([image, textContent]);
  });

  // Only create the block if there are cards
  if (cells.length > 1) {
    const table = WebImporter.DOMUtils.createTable(cells, document);
    element.replaceWith(table);
  }
}
