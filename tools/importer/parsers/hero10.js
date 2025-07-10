/* global WebImporter */
export default function parse(element, { document }) {
  // Header row
  const headerRow = ['Hero (hero10)'];

  // 1st content row: collage of images (background)
  // Find the collage container
  let images = [];
  const scaleDiv = element.querySelector('.ix-hero-scale-3x-to-1x');
  if (scaleDiv) {
    // Only immediate direct children: .grid-layout.desktop-3-column
    const grid = scaleDiv.querySelector('.grid-layout.desktop-3-column');
    if (grid) {
      images = Array.from(grid.querySelectorAll('img'));
    }
  }
  const imageRow = [images];

  // 2nd content row: text and CTAs
  let contentElements = [];
  const contentDiv = element.querySelector('.ix-hero-scale-3x-to-1x-content .container');
  if (contentDiv) {
    // Use order: h1, p, then all a (CTA buttons)
    const heading = contentDiv.querySelector('h1');
    const subheading = contentDiv.querySelector('p');
    const ctas = Array.from(contentDiv.querySelectorAll('a'));

    if (heading) contentElements.push(heading);
    if (subheading) contentElements.push(subheading);
    if (ctas.length) contentElements.push(...ctas);
  }
  const contentRow = [contentElements];

  // Assemble table
  const cells = [headerRow, imageRow, contentRow];
  const block = WebImporter.DOMUtils.createTable(cells, document);

  // Replace element
  element.replaceWith(block);
}
