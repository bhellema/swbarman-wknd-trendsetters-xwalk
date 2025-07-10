/* global WebImporter */
export default function parse(element, { document }) {
  // Prepare rows for block table
  const rows = [];
  // Header row (matches exactly per instruction)
  rows.push(['Hero (hero36)']);

  // Second row: background image cell (optional, none present in HTML)
  rows.push(['']);

  // Third row: grab title, subheading, CTA
  // Find the main grid containing the content
  const grid = element.querySelector('.grid-layout');
  let title, subheading, cta;
  if (grid) {
    // Children of the grid: usually left = heading/subheading, right = button
    const gridChildren = grid.querySelectorAll(':scope > *');
    // Text block
    if (gridChildren.length > 0) {
      const textBlock = gridChildren[0];
      title = textBlock.querySelector('h1, h2, h3, h4, h5, h6');
      subheading = textBlock.querySelector('p');
    }
    // CTA block
    if (gridChildren.length > 1) {
      const ctaBlock = gridChildren[1];
      // Use the block directly if it is a link/button, otherwise search inside
      if (/^a|button$/.test(ctaBlock.tagName.toLowerCase())) {
        cta = ctaBlock;
      } else {
        cta = ctaBlock.querySelector('a,button');
      }
    }
  }

  // Compose contents for the third row cell
  const cellContents = [];
  if (title) cellContents.push(title);
  if (subheading) cellContents.push(subheading);
  if (cta) cellContents.push(cta);

  rows.push([cellContents]);

  // Create and replace
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
