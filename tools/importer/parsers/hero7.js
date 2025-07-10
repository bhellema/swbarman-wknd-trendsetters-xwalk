/* global WebImporter */
export default function parse(element, { document }) {
  // Header row for the block - must match exactly
  const headerRow = ['Hero (hero7)'];
  // Background image row: no image in given HTML, place empty string
  const bgImageRow = [''];

  // Row 3: Main content (title, optional subheading, paragraph, CTA)
  // Structure: grid contains headline (h2) and a div with text & CTA
  let grid = element.querySelector('.w-layout-grid');
  if (!grid) grid = element;

  let headline = grid.querySelector('h2, h1');

  // Find the div that contains the text and CTA that's not the headline
  // Search direct children only
  const childDivs = Array.from(grid.querySelectorAll(':scope > div'));
  let contentDiv = childDivs.find(div => !div.contains(headline));
  // If there's only one div and no headline, fallback to the first div
  if (!contentDiv && childDivs.length > 0) {
    contentDiv = childDivs[0];
  }

  // Collect all content parts: headline, subheading/paragraph, CTA
  const contentParts = [];
  if (headline) contentParts.push(headline);
  if (contentDiv) {
    Array.from(contentDiv.children).forEach(child => {
      contentParts.push(child);
    });
  }
  // Defensive: if contentParts is empty, add empty string
  if (contentParts.length === 0) contentParts.push('');

  // Assemble table as per specification
  const rows = [
    headerRow,
    bgImageRow,
    [contentParts]
  ];

  const block = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(block);
}
