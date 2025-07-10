/* global WebImporter */
export default function parse(element, { document }) {
  // Header row: block name as in the requirement
  const headerRow = ['Hero (hero40)'];

  // Find the background image: prefer a prominent image with background role
  let bgImg = element.querySelector('img.cover-image, img[data-aisg-image-id], img');
  let bgImgCell = bgImg ? [bgImg] : [''];

  // Find the content column with headline, subheading, CTA
  // This is in the .container with .grid-layout inside
  let contentBlock = null;
  // Try to find the grid that contains the text, not the image
  // It is usually the second child .grid-layout (not the one with the image)
  const gridDivs = element.querySelectorAll('.w-layout-grid.grid-layout');
  if (gridDivs.length > 1) {
    contentBlock = gridDivs[1];
  } else {
    // fallback: try to find .container .grid-layout
    contentBlock = element.querySelector('.container .grid-layout') || element.querySelector('.container');
  }

  // Collect headline, subheading, CTA (if present)
  let contentEls = [];
  if (contentBlock) {
    // Headline
    const headline = contentBlock.querySelector('h1, h2, h3, h4, h5, h6');
    if (headline) contentEls.push(headline);
    // Subheading (typically a large paragraph)
    const subheading = contentBlock.querySelector('p');
    if (subheading) contentEls.push(subheading);
    // CTA
    const cta = contentBlock.querySelector('a, button');
    if (cta) contentEls.push(cta);
  }
  // If nothing found (robust fallback)
  if (contentEls.length === 0) {
    // fallback: search whole element
    const headline = element.querySelector('h1, h2, h3, h4, h5, h6');
    if (headline) contentEls.push(headline);
    const subheading = element.querySelector('p');
    if (subheading) contentEls.push(subheading);
    const cta = element.querySelector('a, button');
    if (cta) contentEls.push(cta);
  }

  // Prepare the content row
  const contentRow = [contentEls];

  // Compose the cells
  const cells = [
    headerRow,    // row 1: header
    bgImgCell,    // row 2: background image (can be empty)
    contentRow    // row 3: content
  ];

  // Create the block table
  const block = WebImporter.DOMUtils.createTable(cells, document);
  // Replace original element
  element.replaceWith(block);
}
