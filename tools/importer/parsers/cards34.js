/* global WebImporter */
export default function parse(element, { document }) {
  // Table header - matches example exactly
  const headerRow = ['Cards (cards34)'];

  // Card extraction: each card is a direct <a> child
  const cards = Array.from(element.querySelectorAll(':scope > a'));

  const rows = cards.map(card => {
    // Image: first <img> in card
    const img = card.querySelector('img');

    // Find the div containing the card text info (tags, heading, p, 'Read')
    // This is usually the second div inside the grid, after the img
    let contentDiv = null;
    const gridDivs = card.querySelectorAll('div.w-layout-grid');
    if (gridDivs.length > 0) {
      // In given HTML, the grid contains the image and a div with the rest
      const children = Array.from(gridDivs[0].children);
      // Find the div that is NOT the image (the content block)
      contentDiv = children.find(child => child !== img && child.tagName === 'DIV');
      // Fallback: If only one div, use it
      if (!contentDiv) contentDiv = children.find(child => child.tagName === 'DIV');
    }
    // Defensive: If not found, fallback to first div after img
    if (!contentDiv && img) {
      let sib = img.nextElementSibling;
      while (sib && sib.tagName !== 'DIV') sib = sib.nextElementSibling;
      contentDiv = sib;
    }
    // Defensive: If still not found, fallback to last div in card
    if (!contentDiv) {
      const allDivs = card.querySelectorAll('div');
      contentDiv = allDivs[allDivs.length - 1] || card;
    }

    // The table always has 2 columns: [img, content]
    return [img, contentDiv];
  });

  // Compose the table
  const table = WebImporter.DOMUtils.createTable([
    headerRow,
    ...rows
  ], document);

  // Replace the original element
  element.replaceWith(table);
}
