/* global WebImporter */
export default function parse(element, { document }) {
  // Cards (cards26) block: 2 columns (image, text), 1 header row, each card = 1 row
  const headerRow = ['Cards (cards26)'];
  const rows = [headerRow];
  // Each immediate child of the grid is a potential card
  const cardDivs = Array.from(element.children);
  cardDivs.forEach(cardDiv => {
    // Find image (first img in this card div or descendants)
    const img = cardDiv.querySelector('img');
    if (!img) return; // Only process cards with images, as per spec
    // Find text content
    let textCell = null;
    // Prefer the .utility-padding-all-2rem block if present
    const textBlock = cardDiv.querySelector('.utility-padding-all-2rem');
    if (textBlock) {
      textCell = textBlock;
    } else {
      // Fallback: try to find heading+desc if they exist (h3 and p)
      const h3 = cardDiv.querySelector('h3');
      const p = cardDiv.querySelector('p');
      if (h3 || p) {
        const frag = document.createElement('div');
        if (h3) frag.appendChild(h3);
        if (p) frag.appendChild(p);
        textCell = frag;
      } else {
        // If no heading or p, just use an empty div
        textCell = document.createElement('div');
      }
    }
    rows.push([img, textCell]);
  });
  const table = WebImporter.DOMUtils.createTable(rows, document);
  element.replaceWith(table);
}
