/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Find the main hero content area, defensively
  let heroContent = null;
  const heroBlock = element.querySelector('.hero.block');
  if (heroBlock) {
    // Find the deepest child div that contains the actual content
    // hero.block > div > div
    const innerDivs = heroBlock.querySelectorAll(':scope > div > div');
    if (innerDivs.length > 0) {
      heroContent = innerDivs[0];
    } else {
      // fallback: maybe just hero.block > div
      const firstDiv = heroBlock.querySelector(':scope > div');
      if (firstDiv) {
        heroContent = firstDiv;
      } else {
        heroContent = heroBlock;
      }
    }
  } else {
    heroContent = element;
  }

  // 2. Find the image (picture or img)
  let imageCell = '';
  // Only match a <picture> or <img> that is a direct or indirect child of heroContent
  const picture = heroContent.querySelector('picture');
  if (picture) {
    imageCell = picture;
  } else {
    const img = heroContent.querySelector('img');
    if (img) {
      imageCell = img;
    }
  }

  // 3. Collect heading, subheading, cta, paragraphs in order
  // We'll grab all children except the one containing the image
  const contentElements = [];
  for (const child of heroContent.children) {
    // Skip <p> or any element that contains the picture/img
    if (imageCell && child.contains(imageCell)) continue;
    // Skip empty paragraphs, but preserve semantic headers and non-empty elements
    if (child.tagName === 'P' && child.textContent.trim() === '') continue;
    contentElements.push(child);
  }
  // If nothing was found, fallback: try text content (should not happen with provided html)

  // 4. Build the table
  const cells = [
    ['Hero'],
    [imageCell],
    [contentElements.length === 1 ? contentElements[0] : contentElements]
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
