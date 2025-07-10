/* global WebImporter */
export default function parse(element, { document }) {
  // Block header for carousel37
  const cells = [
    ['Carousel (carousel37)'],
  ];

  // Find the main grid with content and images
  const grid = element.querySelector('.grid-layout');
  if (!grid) return;
  const gridChildren = grid.querySelectorAll(':scope > div');
  if (gridChildren.length < 2) return;

  // Left column: text content (heading, paragraph, buttons)
  const textCol = gridChildren[0];
  // Right column: images
  const imagesCol = gridChildren[1];

  // Extract text elements
  const textEls = [];
  const heading = textCol.querySelector('h1, h2, h3, h4, h5, h6');
  if (heading) textEls.push(heading);
  const desc = textCol.querySelector('p');
  if (desc) textEls.push(desc);
  const buttons = textCol.querySelector('.button-group');
  if (buttons) textEls.push(buttons);

  // Find all images inside the nested grid in imagesCol
  const imagesGrid = imagesCol.querySelector('.grid-layout');
  if (!imagesGrid) return;
  const imgEls = imagesGrid.querySelectorAll('img');
  if (!imgEls.length) return;

  // For the carousel: first image gets text, others get blank cell
  imgEls.forEach((img, i) => {
    if (i === 0 && textEls.length) {
      cells.push([img, textEls]);
    } else {
      cells.push([img, '']);
    }
  });

  // Create and replace with the carousel table block
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
