/* global WebImporter */
export default function parse(element, { document }) {
  // Table Header: must match exactly
  const headerRow = ['Hero (hero14)'];

  // Get top-level grid (layout container)
  const grid = element.querySelector('.w-layout-grid');

  // Defensive: grid may be missing (should not happen but handle)
  let bgImgEl = '';
  let contentEl = '';

  if (grid) {
    // Look for background image in first child (typically)
    const gridChildren = Array.from(grid.children);
    // The background image is an <img> inside a relatively positioned div (first child)
    for (const child of gridChildren) {
      if (!bgImgEl) {
        const img = child.querySelector('img');
        if (img) bgImgEl = img;
      }
      // Look for headline content (h1)
      if (!contentEl && child.querySelector('h1')) {
        contentEl = child;
      }
    }
  }

  // Row 2: background image (may be empty string if not found)
  const rowImage = [bgImgEl ? bgImgEl : ''];
  // Row 3: content (headline, subheadline, CTA, etc) - may be empty string if not found
  const rowContent = [contentEl ? contentEl : ''];

  const cells = [headerRow, rowImage, rowContent];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
