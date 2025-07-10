/* global WebImporter */
export default function parse(element, { document }) {
  // The block header is always 'Hero (hero3)'
  const headerRow = ['Hero (hero3)'];
  // No background image in the provided HTML, so empty row
  const bgRow = [''];

  // Get the grid-layout container (should always exist in this block)
  const grid = element.querySelector('.grid-layout');
  let contentCell = '';
  if (grid) {
    // The first grid child contains the heading and subheading
    const textDiv = grid.children[0];
    // The second grid child contains the call-to-action buttons
    const ctaDiv = grid.children[1];
    // Gather contents
    const items = [];
    // Heading (h2)
    const h2 = textDiv ? textDiv.querySelector('h2') : null;
    if (h2) items.push(h2);
    // Subheading (p)
    const subheading = textDiv ? textDiv.querySelector('p') : null;
    if (subheading) items.push(subheading);
    // CTA links (put in a vertical group)
    if (ctaDiv) {
      // Grab all immediate <a> children
      const ctas = Array.from(ctaDiv.querySelectorAll('a'));
      if (ctas.length) {
        // Keep them together in a div to keep visual grouping
        const btnGroup = document.createElement('div');
        btnGroup.append(...ctas);
        items.push(btnGroup);
      }
    }
    // Only set the content cell if there's something to show
    if (items.length > 0) {
      contentCell = items;
    }
  }
  // Compose the table array
  const cells = [
    headerRow,
    bgRow,
    [contentCell]
  ];
  // Create table and replace the original element
  const block = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(block);
}
