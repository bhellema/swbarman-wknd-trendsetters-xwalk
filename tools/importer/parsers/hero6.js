/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row for the block (per spec, always just the block name)
  const headerRow = ['Hero (hero6)'];

  // 2. Background Image (optional; row 2)
  // From HTML: <img ... class="cover-image ...">
  let bgImgEl = null;
  const imgCandidates = element.querySelectorAll('img');
  for (const img of imgCandidates) {
    if (img.classList.contains('cover-image')) {
      bgImgEl = img;
      break;
    }
  }
  // fallback: first image if no 'cover-image' found
  if (!bgImgEl && imgCandidates.length > 0) {
    bgImgEl = imgCandidates[0];
  }
  const imageRow = [bgImgEl ? bgImgEl : ''];

  // 3. Content Row: Headline, Subheading, CTAs (row 3)
  // Find the content container with the text/buttons
  // Look for .card, as that's where all hero text/buttons are
  let contentContainer = element.querySelector('.card');
  if (!contentContainer) {
    // Edge fallback: try direct child with h1 inside
    const maybe = Array.from(element.querySelectorAll('div')).find(div => div.querySelector('h1'));
    if (maybe) {
      contentContainer = maybe;
    } else {
      // fallback: just use the whole element (never ideal)
      contentContainer = element;
    }
  }
  const contentRow = [contentContainer];

  // 4. Create table block as per requirements: 1 column, 3 rows
  const cells = [
    headerRow,
    imageRow,
    contentRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
