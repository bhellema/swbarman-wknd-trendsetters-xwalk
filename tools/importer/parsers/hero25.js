/* global WebImporter */
export default function parse(element, { document }) {
  // 1. Header row - block name exactly as given
  const headerRow = ['Hero (hero25)'];

  // 2. Background image row - should be the prominent img
  // Find first img descendant (should be the hero image)
  const img = element.querySelector('img');
  const imageRow = [img || ''];

  // 3. Main text content (headline, subheading, CTAs)
  // Try to find content area: look for deepest .section under the grid
  let contentBlock = null;
  const grids = element.querySelectorAll('.grid-layout');
  if (grids.length > 1) {
    // The second grid contains the inner section
    contentBlock = grids[1].querySelector('.section');
  }
  if (!contentBlock) {
    // fallback: find .section anywhere inside
    contentBlock = element.querySelector('.section');
  }

  // Compose the content: heading, rich text, buttons (if present)
  let thirdRowContent = [];
  if (contentBlock) {
    // Heading (may be h1, h2, etc)
    const heading = contentBlock.querySelector('h1,h2,h3,h4,h5,h6');
    if (heading) thirdRowContent.push(heading);
    // Subheading / description
    const richText = contentBlock.querySelector('.rich-text');
    if (richText) thirdRowContent.push(richText);
    // CTA buttons
    const buttonGroup = contentBlock.querySelector('.button-group');
    if (buttonGroup) thirdRowContent.push(buttonGroup);
  }
  // fallback in case content missing
  if (thirdRowContent.length === 0) thirdRowContent = [''];

  const textRow = [thirdRowContent.length === 1 ? thirdRowContent[0] : thirdRowContent];

  // Build cells array for table
  const cells = [
    headerRow,
    imageRow,
    textRow
  ];
  const table = WebImporter.DOMUtils.createTable(cells, document);
  element.replaceWith(table);
}
