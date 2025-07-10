/* global WebImporter */
export default function parse(element, { document }) {
  // Find the currently active tab pane
  const activePane = element.querySelector('.w-tab-pane.w--tab-active');
  if (!activePane) return;

  // Find the inner grid containing heading and image
  const grid = activePane.querySelector('.w-layout-grid');
  if (!grid) return;

  // Find the first image (for the image row)
  const image = grid.querySelector('img') || '';

  // Gather all non-image children for the content row (retain headings, paragraphs, etc)
  const contentElements = Array.from(grid.children).filter(el => el.tagName.toLowerCase() !== 'img');
  // If no non-image elements, set as empty string, else as array (or single element)
  let contentCell = '';
  if (contentElements.length === 1) {
    contentCell = contentElements[0];
  } else if (contentElements.length > 1) {
    contentCell = contentElements;
  }

  // Compose the table per the block definition and example
  const cells = [
    ['Hero (hero23)'],
    [image],
    [contentCell],
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
