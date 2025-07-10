/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Table header must exactly match the block name and variant
  const headerRow = ['Carousel (carousel17)'];

  // 2. Find the main grid, which houses each slide
  const grid = element.querySelector('.grid-layout');
  if (!grid) return; // Defensive: if not found, do nothing

  // 3. Each slide is a direct child of the grid
  const slides = Array.from(grid.children);
  // Defensive: If no slides, stop
  if (!slides.length) return;

  // 4. Process each slide
  const rows = slides.map(slide => {
    // Find the first img descendant for the image cell
    const img = slide.querySelector('img');
    // Only reference the existing element: if not found, cell is empty
    return [img || '', '']; // No text content in provided HTML
  });

  // 5. Assemble table data
  const cells = [headerRow, ...rows];

  // 6. Create block table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
